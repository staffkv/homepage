import { translations } from "@/translations/translations"
import Link from "next/link"

type Language = "pt" | "en"

export function Header() {
  const language: Language = "pt"
  const t = translations[language]
  return (
    <div className="max-w-150 flex flex-col md:flex-row items-center md:items-center mx-auto gap-8 pt-8 md:justify-between">
      <div className="text-center md:text-left">
        <div className="font-normal">{t.name}</div>
        <div className="font-normal">{t.title}</div>
      </div>
      <div className="flex justify-between items-center md:ml-auto gap-2.5">
        <button>🌙</button>
        <button>🇧🇷</button>
        {translations[language].nav.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </div>
    </div>
  )
}