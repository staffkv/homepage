"use client"
import { useEffect, useRef } from "react"

/**
 * Interactive glyph grid background.
 * - A faint grid of "·" with a brighter "+" every MARK cells, drifting at 0.2× scroll.
 * - Hover: glyphs near the cursor brighten, upgrade (· : + ×) and are pushed away.
 * - Click / drag on empty space: ripples propagate through the grid (damped wave equation).
 * The static grid is a single repeating pattern; only "active" cells are redrawn per frame.
 */
const CELL = 12
const MARK = 8
const GLYPHS = ["·", ":", "+", "×"]
const BASE_ALPHA = 0.07
const MARK_ALPHA = 0.16
const GLOW_RADIUS = 150
const PUSH_RADIUS = 120
const PUSH_MAX = 6
const PARALLAX = 0.2
const WAVE_SPREAD = 0.24
const WAVE_DAMP = 0.985
const IGNORE = "a, button, input, textarea, select, label, summary, p, h1, h2, h3, li, img, pre, dd, dt"

export function GlyphField() {
  const baseRef = useRef<HTMLCanvasElement>(null)
  const fxRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const base = baseRef.current
    const fx = fxRef.current
    if (!base || !fx) return
    const bctx = base.getContext("2d")
    const fctx = fx.getContext("2d")
    if (!bctx || !fctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0
    let h = 0
    let dpr = 1
    let cols = 0
    let rows = 0
    let ink = "#000"
    let bg = "#fff"
    let family = "ui-monospace, monospace"
    let sprites: HTMLCanvasElement[] = []
    let tile: HTMLCanvasElement | null = null
    let cur = new Float32Array(0)
    let prev = new Float32Array(0)
    let waveOn = false
    let mx = -1e4
    let my = -1e4
    let sx = -1e4
    let sy = -1e4
    let presence = 0
    let dragging = false
    let lastX = 0
    let lastY = 0
    let dragDist = 0
    let raf = 0
    let fxDirty = false
    let baseHoles = false
    let lastOffset = -1

    const offset = () => (reduced ? 0 : (window.scrollY * PARALLAX) % (CELL * MARK))

    function readColors() {
      const cs = getComputedStyle(document.body)
      ink = cs.color || ink
      bg = cs.backgroundColor || bg
      const mono = cs.getPropertyValue("--font-geist-mono").trim()
      family = mono ? `${mono}, ui-monospace, monospace` : family
    }

    function makeSprites() {
      const s = Math.ceil(CELL * dpr)
      sprites = GLYPHS.map((g) => {
        const c = document.createElement("canvas")
        c.width = s
        c.height = s
        const x = c.getContext("2d")!
        x.font = `400 ${11 * dpr}px ${family}`
        x.textAlign = "center"
        x.textBaseline = "middle"
        x.fillStyle = ink
        x.fillText(g, s / 2, s / 2)
        return c
      })
      // one MARK×MARK tile of the resting grid
      tile = document.createElement("canvas")
      tile.width = s * MARK
      tile.height = s * MARK
      const t = tile.getContext("2d")!
      for (let r = 0; r < MARK; r++)
        for (let c = 0; c < MARK; c++) {
          const mark = r === 4 && c === 4
          t.globalAlpha = mark ? MARK_ALPHA : BASE_ALPHA
          t.drawImage(sprites[mark ? 2 : 0], c * s, r * s)
        }
    }

    function drawBase() {
      const off = offset()
      lastOffset = off
      bctx!.setTransform(1, 0, 0, 1, 0, 0)
      bctx!.clearRect(0, 0, base!.width, base!.height)
      if (!tile) return
      const pattern = bctx!.createPattern(tile, "repeat")
      if (!pattern) return
      pattern.setTransform(new DOMMatrix([1, 0, 0, 1, 0, Math.round(-off * dpr)]))
      bctx!.fillStyle = pattern
      bctx!.fillRect(0, 0, base!.width, base!.height)
    }

    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = window.innerWidth
      h = window.innerHeight
      for (const c of [base!, fx!]) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
      }
      fctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL) + 2
      rows = Math.ceil(h / CELL) + 2
      cur = new Float32Array(cols * rows)
      prev = new Float32Array(cols * rows)
      waveOn = false
      readColors()
      makeSprites()
      drawBase()
      kick()
    }

    function impulse(x: number, y: number, amp: number, sigma = 1.6) {
      const gx = x / CELL
      const gy = y / CELL
      const r = Math.ceil(sigma * 2)
      for (let j = -r; j <= r; j++)
        for (let i = -r; i <= r; i++) {
          const cx = Math.round(gx) + i
          const cy = Math.round(gy) + j
          if (cx < 1 || cy < 1 || cx >= cols - 1 || cy >= rows - 1) continue
          cur[cy * cols + cx] += amp * Math.exp(-((cx - gx) ** 2 + (cy - gy) ** 2) / (sigma * sigma))
        }
      waveOn = true
      kick()
    }

    function stepWave() {
      let peak = 0
      for (let y = 1; y < rows - 1; y++)
        for (let x = 1, i = y * cols + 1; x < cols - 1; x++, i++) {
          const next =
            (2 * cur[i] - prev[i] + WAVE_SPREAD * (cur[i - 1] + cur[i + 1] + cur[i - cols] + cur[i + cols] - 4 * cur[i])) * WAVE_DAMP
          prev[i] = next
          const a = next < 0 ? -next : next
          if (a > peak) peak = a
        }
      const t = cur
      cur = prev
      prev = t
      if (peak < 0.004) {
        cur.fill(0)
        prev.fill(0)
        waveOn = false
      }
    }

    function drawFx() {
      fctx!.clearRect(0, 0, w, h)
      const off = offset()
      const near = presence > 0.01
      if (!near && !waveOn) {
        fxDirty = false
        if (baseHoles) {
          drawBase()
          baseHoles = false
        }
        return
      }
      fxDirty = true
      const masks: number[] = []
      const draws: number[] = [] // x, y, glyph, alpha

      // grid rows/cols in view, aligned with the drifting base pattern
      const rowStart = waveOn ? -MARK : Math.max(-MARK, Math.floor((sy - GLOW_RADIUS + off) / CELL))
      const rowEnd = waveOn ? rows : Math.min(rows, Math.ceil((sy + GLOW_RADIUS + off) / CELL) + 1)
      const colStart = waveOn ? 0 : Math.max(0, Math.floor((sx - GLOW_RADIUS) / CELL))
      const colEnd = waveOn ? cols : Math.min(cols, Math.ceil((sx + GLOW_RADIUS) / CELL) + 1)

      for (let r = rowStart; r < rowEnd; r++) {
        const y = r * CELL + CELL / 2 - off
        if (y < -CELL || y > h + CELL) continue
        for (let c = colStart; c < colEnd; c++) {
          const x = c * CELL + CELL / 2
          const mark = ((r % MARK) + MARK) % MARK === 4 && c % MARK === 4
          let level = 0
          let push = 0
          let dx = 0
          let dy = 0
          let dist = 1
          if (waveOn) {
            const wi = Math.round(y / CELL) * cols + c
            const e = wi >= 0 && wi < cur.length ? cur[wi] : 0
            level += Math.min(1, (e > 0 ? e : -e * 0.3) * 0.75)
          }
          if (near) {
            dx = x - sx
            dy = y - sy
            if (dx < GLOW_RADIUS && dx > -GLOW_RADIUS && dy < GLOW_RADIUS && dy > -GLOW_RADIUS) {
              dist = Math.hypot(dx, dy) || 1
              level += Math.max(0, 1 - dist / GLOW_RADIUS) ** 2 * presence
              push = Math.max(0, 1 - dist / PUSH_RADIUS) ** 2 * PUSH_MAX * presence
            }
          }
          if (level < 0.02 && push < 0.5) continue
          if (level > 1) level = 1
          const restAlpha = mark ? MARK_ALPHA : BASE_ALPHA
          const glyph = level > 0.22 ? Math.min(3, Math.floor(level * GLYPHS.length)) : mark ? 2 : 0
          const alpha = Math.min(1, restAlpha + level * 0.5)
          masks.push(x, y)
          draws.push(x + (dx / dist) * push, y + (dy / dist) * push, glyph, alpha)
        }
      }

      // punch the resting glyph out of the base layer (transparent, so the page texture shows through),
      // then draw the active glyph on the fx layer
      drawBase()
      const cell = CELL * dpr
      for (let i = 0; i < masks.length; i += 2)
        bctx!.clearRect(Math.round((masks[i] - CELL / 2) * dpr), Math.round((masks[i + 1] - CELL / 2) * dpr), Math.ceil(cell), Math.ceil(cell))
      baseHoles = masks.length > 0
      for (let i = 0; i < draws.length; i += 4) {
        fctx!.globalAlpha = draws[i + 3]
        fctx!.drawImage(sprites[draws[i + 2]], draws[i] - CELL / 2, draws[i + 1] - CELL / 2, CELL, CELL)
      }
      fctx!.globalAlpha = 1
    }

    function frame() {
      raf = 0
      sx += (mx - sx) * 0.15
      sy += (my - sy) * 0.15
      presence += ((mx > -1000 ? 1 : 0) - presence) * 0.08
      if (offset() !== lastOffset) drawBase()
      if (waveOn) stepWave()
      drawFx()
      const settling = Math.abs(mx - sx) > 0.5 || Math.abs(my - sy) > 0.5 || (presence > 0.005 && presence < 0.995)
      if (waveOn || settling || (fxDirty && presence > 0.01)) kick()
    }

    function kick() {
      if (!raf && !document.hidden) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        if (mx < -1000) {
          sx = e.clientX
          sy = e.clientY
        }
        mx = e.clientX
        my = e.clientY
      }
      if (dragging) {
        const ddx = e.clientX - lastX
        const ddy = e.clientY - lastY
        const len = Math.hypot(ddx, ddy)
        const steps = Math.max(1, Math.ceil(len / (CELL * 0.75)))
        const amp = Math.min(0.4, 0.1 + len * 0.009)
        for (let i = 1; i <= steps; i++) impulse(lastX + (ddx * i) / steps, lastY + (ddy * i) / steps, amp / Math.sqrt(steps), 1.1)
        dragDist += len
        lastX = e.clientX
        lastY = e.clientY
      }
      kick()
    }
    const onLeave = () => {
      mx = my = -1e4
      kick()
    }
    const onDown = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null
      if (e.button !== 0 || target?.closest(IGNORE)) return
      lastX = e.clientX
      lastY = e.clientY
      dragDist = 0
      if (e.pointerType === "touch") {
        impulse(e.clientX, e.clientY, 1.3)
        return
      }
      dragging = true
      document.documentElement.style.userSelect = "none"
    }
    const onUp = () => {
      if (!dragging) return
      dragging = false
      document.documentElement.style.userSelect = ""
      if (dragDist < 6) impulse(lastX, lastY, 1.3)
    }
    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 120)
    }
    const onVisibility = () => {
      if (!document.hidden) kick()
    }
    // re-read colours when the theme class on <html> changes
    const themeObserver = new MutationObserver(() => {
      readColors()
      makeSprites()
      drawBase()
      kick()
    })

    resize()
    document.fonts?.ready.then(() => {
      readColors()
      makeSprites()
      drawBase()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    window.addEventListener("resize", onResize)
    window.addEventListener("scroll", kick, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true })
      document.addEventListener("pointerleave", onLeave)
      window.addEventListener("pointerdown", onDown)
      window.addEventListener("pointerup", onUp)
      window.addEventListener("pointercancel", onUp)
      window.addEventListener("blur", onUp)
    }

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      themeObserver.disconnect()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", kick)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      window.removeEventListener("blur", onUp)
      document.documentElement.style.userSelect = ""
    }
  }, [])

  return (
    <>
      <canvas ref={baseRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 size-full" />
      <canvas ref={fxRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 size-full" />
    </>
  )
}
