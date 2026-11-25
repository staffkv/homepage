"use client"
import { useState } from "react"
import { useTheme } from "next-themes"
import { ChevronsDownUp, ChevronsUpDown, Moon, Sun } from "lucide-react"
import { EXPAND_ALL_EVENT } from "./experience"
import { useLanguage } from "@/providers/language-provider"
import { translations } from "@/translations/translations"

const btn =
  "inline-flex size-9 items-center justify-center rounded-full border-0 bg-transparent text-ink-muted transition hover:bg-surface-hover hover:text-ink active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-ink"

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
    </svg>
  )
}

export function Dock() {
  const { resolvedTheme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const [allOpen, setAllOpen] = useState(false)

  const toggleAll = () => {
    const next = !allOpen
    setAllOpen(next)
    window.dispatchEvent(new CustomEvent(EXPAND_ALL_EVENT, { detail: next }))
    document.getElementById("experiencia")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav
      aria-label="Quick actions"
      className="dock fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-bg/80 p-[0.45rem] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150"
    >
      <a href="https://github.com/staffkv" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className={btn}>
        <GitHubIcon />
      </a>
      <a href="https://www.linkedin.com/in/ksilvaf/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className={btn}>
        <LinkedInIcon />
      </a>
      <a href="https://x.com/staffkvv" target="_blank" rel="noopener noreferrer" aria-label="X" title="X" className={btn}>
        <XIcon />
      </a>
      <span role="separator" className="mx-[0.2rem] h-5 w-px bg-line" />
      <button
        type="button"
        onClick={toggleAll}
        aria-label={allOpen ? t.dock.collapseAll : t.dock.expandAll}
        title={allOpen ? t.dock.collapseAll : t.dock.expandAll}
        className={btn}
      >
        {allOpen ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />}
      </button>
      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label={t.dock.theme}
        title={t.dock.theme}
        className={btn}
      >
        <Moon size={16} className="dark:hidden" />
        <Sun size={16} className="hidden dark:block" />
      </button>
      <button
        type="button"
        onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
        aria-label={t.dock.language}
        title={t.dock.language}
        className={`${btn} font-mono text-[0.68rem] font-semibold uppercase tracking-wide`}
      >
        {language === "pt" ? "EN" : "PT"}
      </button>
    </nav>
  )
}
