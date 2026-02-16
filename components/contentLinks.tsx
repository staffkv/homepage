"use client"
import Link from "next/link"
import Image from "next/image"
import { translations } from "@/translations/translations"
import { useLanguage } from "@/providers/language-provider"
import { socialLinks } from "@/types/socialinks"

export function ContentLinks() {
  const { language } = useLanguage()
  const t = translations[language]

  const renderCard = (link: (typeof socialLinks)[number], index: number) => (
    <Link
      key={link.href}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block px-5 py-5 text-(--link-text) transition-colors duration-200 hover:bg-(--link-bg-hover) ${
        index > 0 ? "border-t border-(--link-border)" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-7 w-7 items-center justify-center">
            {typeof link.icon === "string" ? (
              <Image
                src={link.icon}
                alt={link.label}
                width={28}
                height={28}
                className="object-contain"
              />
            ) : (
              <link.icon width={24} height={24} className="object-contain" />
            )}
          </span>
          <span className="text-base font-medium tracking-[0.01em] sm:text-lg">
            {link.label}
          </span>
        </div>
        <span className="text-xl leading-none text-(--text-color-secondary)">↗</span>
      </div>
    </Link>
  )

  return (
    <div className="w-full max-w-150 mx-auto py-8 px-4 sm:px-0">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-5">
        <div className="mb-6">
          <p
            className="text-[15px] m-0 text-(--text-color-secondary)"
            dangerouslySetInnerHTML={{ __html: t.about }}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-(--link-border) bg-(--link-bg)">
        {socialLinks.map(renderCard)}
      </div>
    </div>
  )
}
