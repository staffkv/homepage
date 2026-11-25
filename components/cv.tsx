import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type SectionProps = {
  id: string
  num: string
  title: string
  action?: { label: string; href: string }
  delay?: number
  children: React.ReactNode
}

export function Section({ id, num, title, action, delay = 0, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="rise relative mt-13"
      style={{ animationDelay: `${delay}s` }}
    >
      <header className="mb-6 flex items-baseline gap-[0.65rem]">
        <span className="font-mono text-[0.72rem] tracking-[0.04em] text-ink-fainter">{num}</span>
        <span aria-hidden="true" className="h-px flex-[0_0_0.65rem] -translate-y-1 bg-line-strong" />
        <h2 id={`${id}-h`} className="m-0 text-[1.0625rem] font-bold tracking-[-0.018em] text-ink">
          {title}
        </h2>
        {action && (
          <Link
            href={action.href}
            className="ml-auto font-mono text-[0.72rem] text-ink-faint transition-colors hover:text-ink"
          >
            {action.label} →
          </Link>
        )}
      </header>
      {children}
    </section>
  )
}

/** Square logo tile; falls back to a monogram when there is no image. */
export function LogoTile({ src, name }: { src?: string; name: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <span className="col-start-1 row-start-1 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-line bg-tile transition group-hover:-translate-y-px group-hover:border-line-strong max-sm:row-span-2 max-sm:size-9">
      {src ? (
        <Image src={src} alt="" width={40} height={40} className="size-full object-cover" />
      ) : (
        <span className="font-mono text-[0.72rem] font-semibold tracking-tight text-ink-muted">{initials}</span>
      )}
    </span>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-md bg-tag-bg px-[0.45rem] py-[0.1rem] font-mono text-[0.68rem] font-medium leading-[1.55] tracking-[-0.005em] text-tag-fg">
      {children}
    </span>
  )
}

type RowProps = {
  href: string
  name: string
  description?: string
  logo?: string
  tags?: string[]
  meta?: string
  showLogo?: boolean
}

/** A linked list row: logo · name + tags · description · meta (date) · ↗ */
export function Row({ href, name, description, logo, tags = [], meta, showLogo = true }: RowProps) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group grid w-full items-center gap-x-[0.85rem] rounded-[10px] px-[0.65rem] py-[0.7rem] text-left no-underline transition hover:bg-surface",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink",
          "max-sm:grid-rows-[auto_auto] max-sm:gap-x-[0.65rem] max-sm:gap-y-[0.05rem] max-sm:px-2 max-sm:py-[0.6rem]",
          showLogo
            ? "grid-cols-[2.5rem_1fr_auto_auto] max-sm:grid-cols-[2.25rem_1fr_auto]"
            : "grid-cols-[1fr_auto_auto] max-sm:grid-cols-[1fr_auto]",
        )}
      >
        {showLogo && <LogoTile src={logo} name={name} />}
        <span className={cn("row-start-1 flex min-w-0 flex-col gap-[0.15rem]", showLogo ? "col-start-2" : "col-start-1")}>
          <span className="flex flex-wrap items-center gap-[0.45rem]">
            <span className="text-[0.95rem] font-semibold tracking-[-0.012em] text-ink max-sm:text-[0.9rem]">
              {name}
            </span>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </span>
          {description && (
            <span className="text-[0.85rem] tracking-[-0.003em] text-ink-muted max-sm:text-[0.8rem]">
              {description}
            </span>
          )}
        </span>
        {meta && (
          <span
            className={cn(
              "row-start-1 whitespace-nowrap text-right font-mono text-[0.75rem] tabular-nums tracking-[-0.005em] text-ink-faint",
              "max-sm:row-start-2 max-sm:mt-[0.1rem] max-sm:text-left",
              showLogo ? "col-start-3 max-sm:col-start-2" : "col-start-2 max-sm:col-start-1",
            )}
          >
            {meta}
          </span>
        )}
        <span
          aria-hidden="true"
          className={cn(
            "row-start-1 inline-flex h-6 w-4 items-center justify-center text-ink-fainter transition group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-ink max-sm:row-span-2",
            showLogo ? "col-start-4 max-sm:col-start-3" : "col-start-3 max-sm:col-start-2",
          )}
        >
          <ArrowUpRight size={15} strokeWidth={2} />
        </span>
      </a>
    </li>
  )
}

export function RowList({ children }: { children: React.ReactNode }) {
  return <ul className="m-0 flex list-none flex-col gap-1 p-0">{children}</ul>
}
