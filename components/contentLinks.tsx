"use client"
import Link from "next/link"
import { Avatar } from "@radix-ui/react-avatar"
import Image from "next/image"
import { translations } from "@/translations/translations"
import { useLanguage } from "@/providers/language-provider"
import { socialLinks } from "@/types/socialinks"

export function ContentLinks() {
  const { language } = useLanguage()
  const t = translations[language]
  return (
    <div className="w-full max-w-150 mx-auto py-8  px-4 sm:px-0 ">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-5">
        <Avatar className="inline-flex items-center justify-center rounded-full mb-4 shadow-lg overflow-hidden shrink-0">
          <Image src="https://github.com/staffkv.png" alt="Kevin Ferreira" width={80} height={80} />
        </Avatar>
        <div className="mb-6">
          <p
            className="text-[15px] m-0 text-(--text-color-secondary)"
            dangerouslySetInnerHTML={{ __html: t.about }}
          />
        </div>
      </div>
      {socialLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block"
        >
          <div className="rounded-xl h-15 flex items-center justify-between px-4 bg-(--link-bg) border border-(--link-border) hover:border-(--link-border-hover) text-(--link-text)">
            <div className="flex items-center gap-4 transition duration-200 ease-in-out ">
              {typeof link.icon === 'string' ? (
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={35}
                  height={35}
                  className="object-contain"
                />
              ) : (
                <link.icon width={35} height={35} className="object-contain" />
              )}

              <span className="font-medium text-(--link-text)]">
                {link.label}
              </span>
            </div>

            <span className=" text-sm">↗</span>
          </div>
        </Link>
      ))}
    </div>
  )
}