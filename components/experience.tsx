"use client"
import { Fragment, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/providers/language-provider"
import { translations } from "@/translations/translations"
import { experiences, type Experience } from "@/types/experience"
import { LogoTile, RowList, Section, Tag } from "./cv"

export const EXPAND_ALL_EVENT = "cv:expand-all"

function formatMonth(iso: string, language: "pt" | "en") {
  const d = new Date(`${iso}-15T12:00:00`)
  const m = d.toLocaleString(language === "pt" ? "pt-BR" : "en-US", { month: "short" }).replace(".", "")
  return `${m.charAt(0).toUpperCase()}${m.slice(1)} ${d.getFullYear()}`
}

/** Renders **bold** segments as <strong>. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

function ExperienceItem({ exp }: { exp: Experience }) {
  const { language } = useLanguage()
  const t = translations[language]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onExpandAll = (e: Event) => setOpen((e as CustomEvent<boolean>).detail)
    window.addEventListener(EXPAND_ALL_EVENT, onExpandAll)
    return () => window.removeEventListener(EXPAND_ALL_EVENT, onExpandAll)
  }, [])

  const period = exp.start
    ? `${formatMonth(exp.start, language)} — ${exp.end ? formatMonth(exp.end, language) : t.present}`
    : ""
  const hasDetails = exp.bullets[language].length > 0 || exp.stack.length > 0

  return (
    <li className="group rounded-[10px]">
      <button
        type="button"
        aria-expanded={hasDetails ? open : undefined}
        disabled={!hasDetails}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "grid w-full grid-cols-[2.5rem_1fr_auto_auto] items-center gap-x-[0.85rem] rounded-[10px] px-[0.65rem] py-[0.7rem] text-left transition",
          hasDetails ? "cursor-pointer hover:bg-surface" : "cursor-default",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink",
          "max-sm:grid-cols-[2.25rem_1fr_auto] max-sm:grid-rows-[auto_auto] max-sm:gap-x-[0.65rem] max-sm:gap-y-[0.05rem] max-sm:px-2 max-sm:py-[0.6rem]",
        )}
      >
        <LogoTile src={exp.logo} name={exp.company} />
        <span className="col-start-2 row-start-1 flex min-w-0 flex-col gap-[0.15rem]">
          <span className="flex flex-wrap items-center gap-[0.45rem]">
            <span className="text-[0.95rem] font-semibold tracking-[-0.012em] text-ink max-sm:text-[0.9rem]">
              {exp.company}
            </span>
            {exp.start && !exp.end && <Tag>{t.current}</Tag>}
            {exp.kind && (
              <span className="inline-flex items-center whitespace-nowrap rounded-md border border-line px-[0.4rem] py-[0.05rem] font-mono text-[0.68rem] font-medium leading-[1.55] text-ink-faint">
                {exp.kind[language]}
              </span>
            )}
          </span>
          <span className="text-[0.85rem] tracking-[-0.003em] text-ink-muted max-sm:text-[0.8rem]">
            {exp.role[language]}
          </span>
        </span>
        <span className="col-start-3 row-start-1 whitespace-nowrap text-right font-mono text-[0.75rem] tabular-nums tracking-[-0.005em] text-ink-faint max-sm:col-start-2 max-sm:row-start-2 max-sm:mt-[0.1rem] max-sm:text-left">
          {period}
        </span>
        {hasDetails && (
        <span
          aria-hidden="true"
          className={cn(
            "col-start-4 row-start-1 -ml-[0.45rem] inline-flex h-6 w-4 items-center justify-center text-ink-fainter transition group-hover:text-ink-muted max-sm:col-start-3 max-sm:row-span-2 max-sm:ml-0",
            open && "rotate-180 text-ink",
          )}
        >
          <ChevronDown size={15} strokeWidth={2} />
        </span>
        )}
      </button>
      {hasDetails && (
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden" inert={!open}>
          <div className="pb-[0.85rem] pl-[calc(0.65rem+2.5rem+0.85rem)] pr-[0.65rem] max-sm:pl-[calc(0.5rem+2.25rem+0.65rem)]">
            {exp.location && (
              <p className="m-0 mb-2 font-mono text-[0.72rem] text-ink-faint">{exp.location[language]}</p>
            )}
            <ul className="m-0 list-none p-0">
              {exp.bullets[language].map((b) => (
                <li
                  key={b}
                  className="relative mb-[0.3rem] pl-4 text-[0.875rem] leading-[1.6] text-ink-muted last:mb-0 before:absolute before:left-0 before:top-[0.65rem] before:size-1 before:rounded-full before:bg-ink-fainter before:content-['']"
                >
                  <Rich text={b} />
                </li>
              ))}
            </ul>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-[0.35rem] p-0">
              {exp.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-line bg-tile px-[0.45rem] py-[0.1rem] font-mono text-[0.68rem] text-ink-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      )}
    </li>
  )
}

export function ExperienceSection({ num = "02" }: { num?: string }) {
  const { language } = useLanguage()
  const t = translations[language]
  return (
    <Section id="experiencia" num={num} title={t.sections.experience} delay={0.2}>
      <RowList>
        {experiences.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} />
        ))}
      </RowList>
    </Section>
  )
}
