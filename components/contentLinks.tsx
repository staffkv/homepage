
import Link from "next/link"
import { Avatar } from "@radix-ui/react-avatar"
import Image from "next/image"

interface SocialLinkProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | string
  label: string
  href: string
}
const socialLinks: SocialLinkProps[] = [
  {
    icon: "/github-desktop.png",
    label: "Staffkv - Github",
    href: "https://github.com/staffkv"
  },
  {
    icon: "/linkedin.png",
    label: "Kevin - LinkedIn",
    href: "https://www.linkedin.com/in/ksilvaf/"
  },
    {
    icon: "/mal.png",
    label: "Staffkv - My Anime List",
    href: "https://myanimelist.net/profile/staffkv",
  },
  {
    icon: "/paraibajs.jpeg",
    label: "ParaibaJS - Comunidade de JavaScript na Paraíba",
    href: "https://linktr.ee/paraibajs",
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png',
    label: "Staffkv - Youtube",
    href: "https://x.com/staffkvv",
  }
]

export function ContentLinks() {
  return (
    <div className="w-full max-w-150 mx-auto py-8  px-4 sm:px-0 ">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-5">
        <Avatar className="inline-flex items-center justify-center rounded-full mb-4 shadow-lg overflow-hidden shrink-0">
          <Image src="https://github.com/staffkv.png" alt="Kevin Ferreira" width={80} height={80} />
        </Avatar>
        <div className="mb-6">
          <p className="text-[15px] m-0 text-(--text-color-secondary)">
            Atuo como <strong className="font-semibold">Engenheiro de Software Sênior</strong> em um lugar tão <strong className="font-semibold">secreto</strong> que sou impedido de contar.{" "}
            Interesso-me por <strong className="font-semibold">SaaS, open source, DevOps e Arquitetura de Software.</strong>.
          </p>
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