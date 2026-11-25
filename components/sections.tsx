"use client"
import Image from "next/image"
import avatar from "@/public/avatar.jpg"
import { useLanguage } from "@/providers/language-provider"
import { translations } from "@/translations/translations"
import { projects } from "@/types/projects"
import { bookmarks } from "@/types/bookmarks"
import { socialLinks } from "@/types/socialinks"
import { Row, RowList, Section } from "./cv"

function useT() {
  const { language } = useLanguage()
  return { t: translations[language], language }
}

function formatMonth(dateStr: string, language: "pt" | "en") {
  const d = new Date(`${dateStr}T12:00:00`)
  const month = d.toLocaleString(language === "pt" ? "pt-BR" : "en-US", { month: "short" }).replace(".", "")
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${d.getFullYear()}`
}

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export function Intro() {
  const { t } = useT()
  return (
    <header className="rise relative mb-13 flex flex-wrap items-start justify-between gap-x-6 gap-y-5">
      <div className="min-w-0 flex-1">
        <h1 className="m-0 text-[clamp(2rem,5.5vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-ink">
          {t.greeting}
          <span className="animate-wave ml-1 inline-block origin-[70%_70%] text-[0.85em]">👋</span>
        </h1>
        <p className="mt-[1.1rem] max-w-xl text-[1.05rem] leading-[1.6] text-ink-muted">{t.lead}</p>
      </div>
      <Image
        src={avatar}
        alt={t.name}
        width={112}
        height={112}
        priority
        className="size-24 shrink-0 rounded-full border border-line object-cover sm:size-28"
      />
    </header>
  )
}

export function AboutSection({ num = "01" }: { num?: string }) {
  const { t } = useT()
  return (
    <Section id="sobre" num={num} title={t.sections.about} delay={0.15}>
      <p
        className="bio m-0 text-[0.95rem] leading-[1.65] text-ink-muted"
        dangerouslySetInnerHTML={{ __html: t.about }}
      />
    </Section>
  )
}

export function ProjectsSection({ num = "02", standalone = false }: { num?: string; standalone?: boolean }) {
  const { t } = useT()
  return (
    <Section
      id="projetos"
      num={num}
      title={t.sections.projects}
      delay={0.22}
      action={standalone ? { label: t.back, href: "/" } : undefined}
    >
      <RowList>
        {projects.map((p) => (
          <Row
            key={p.id}
            href={p.websiteUrl}
            name={p.name}
            description={p.description}
            logo={p.logo}
            tags={p.tags.slice(0, 1)}
            meta={hostname(p.websiteUrl)}
          />
        ))}
      </RowList>
    </Section>
  )
}

export function CommunitySection({ num = "03" }: { num?: string }) {
  const { t } = useT()
  return (
    <Section id="comunidade" num={num} title={t.sections.community} delay={0.29}>
      <RowList>
        {t.community.map((c) => (
          <Row key={c.href} href={c.href} name={c.name} description={c.description} logo={c.logo} tags={[c.tag]} />
        ))}
      </RowList>
    </Section>
  )
}

export function BookmarksSection({
  num = "04",
  limit,
  standalone = false,
}: {
  num?: string
  limit?: number
  standalone?: boolean
}) {
  const { t, language } = useT()
  const sorted = [...bookmarks].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
  const visible = limit ? sorted.slice(0, limit) : sorted
  const action = standalone
    ? { label: t.back, href: "/" }
    : limit && sorted.length > limit
      ? { label: t.seeAll, href: "/bookmarks" }
      : undefined

  return (
    <Section id="marcadores" num={num} title={t.sections.bookmarks} delay={0.36} action={action}>
      <RowList>
        {visible.map((b) => (
          <Row
            key={b.id}
            href={b.url}
            name={b.title}
            description={hostname(b.url)}
            meta={formatMonth(b.savedAt, language)}
            showLogo={false}
          />
        ))}
      </RowList>
    </Section>
  )
}

export function InterestsSection({ num = "05" }: { num?: string }) {
  const { t } = useT()
  return (
    <Section id="interesses" num={num} title={t.sections.interests} delay={0.43}>
      <div className="grid grid-cols-[8.5rem_1fr] items-start gap-x-6 gap-y-[0.85rem] max-sm:grid-cols-1 max-sm:gap-y-[0.4rem]">
        {t.interestGroups.map((g, i) => (
          <div key={g.label} className="contents">
            <span
              className={`pt-[0.4rem] font-mono text-[0.72rem] font-medium lowercase tracking-[0.01em] text-ink-faint max-sm:pt-0 ${
                i > 0 ? "max-sm:mt-[0.85rem]" : ""
              }`}
            >
              {g.label}
            </span>
            <ul className="m-0 flex list-none flex-wrap gap-[0.4rem] p-0">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-tile px-[0.7rem] py-[0.28rem] text-[0.78rem] font-medium tracking-[-0.005em] text-ink transition hover:-translate-y-px hover:border-line-strong hover:bg-surface"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

const contactLinks = [
  { label: "GitHub", href: "https://github.com/staffkv" },
  { label: "LinkedIn", href: socialLinks.find((l) => l.href.includes("linkedin"))?.href ?? "https://www.linkedin.com/in/ksilvaf/" },
  { label: "X", href: "https://x.com/staffkvv" },
]

export function ContactSection() {
  const { t } = useT()
  return (
    <section aria-labelledby="contato-h" className="rise relative mt-20 text-center" style={{ animationDelay: "0.5s" }}>
      <h2 id="contato-h" className="m-0 mb-[0.85rem] text-[1.0625rem] font-bold tracking-[-0.018em] text-ink">
        {t.contactTitle}
      </h2>
      <p className="m-0 mx-auto max-w-[30rem] text-[0.95rem] leading-[1.6] text-ink-muted">{t.contactText}</p>
      <p className="mt-4 font-mono text-[0.78rem] tracking-[-0.005em] text-ink-faint">
        {contactLinks.map((l, i) => (
          <span key={l.label}>
            {i > 0 && "·"}
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-[0.4rem] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          </span>
        ))}
      </p>
    </section>
  )
}
