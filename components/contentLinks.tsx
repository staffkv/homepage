
import Link from "next/link"
import { Linkedin, Github, Youtube, FileText, X, Twitter } from "lucide-react"
import { Avatar } from "@radix-ui/react-avatar"
import Image from "next/image"

interface SocialLinkProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | string
  label: string
  href: string
}
const socialLinks: SocialLinkProps[] = [
  {
    icon: "/linkedin.png",
    label: "Kevin - Linkedin",
    href: "https://www.linkedin.com/in/ksilvaf/"
  },
  {
    icon: "/github-desktop.png",
    label: "Staffkv- Github",
    href: "https://github.com/staffkv"
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png',
    label: "Staffkv- Youtube",
    href: "https://x.com/staffkvv",
  },
]

export function ContentLinks() {
  return (
    <div className="w-full max-w-150 mx-auto py-8  px-4 sm:px-0 ">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-5">
        <Avatar className="inline-flex items-center justify-center rounded-full mb-4 shadow-lg overflow-hidden shrink-0">
          <Image src="https://github.com/staffkv.png" alt="Kevin Ferreira" width={80} height={80} />
        </Avatar>
        <div className="mb-6">
          <p className="text-[15px] leading-[1.6] text-gray-600 dark:text-gray-400 m-0">
            Atuo como <strong className="font-semibold text-gray-900 dark:text-gray-400">Engenheiro de Software Sênior</strong> em um lugar tão <strong className="font-semibold text-gray-900 dark:text-gray-400">secreto</strong> que nem eu posso contar direito.{" "}
            gosto de resolver problemas, aprender continuamente e construir boas soluções.
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
          <div className="border dark:border-gray-700 rounded-xl dark:hover:shadow-[0_1px_3px_0_rgba(0,0,0,0.2),0_1px_2px_0_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out  dark:hover:bg-gray-500 h-15 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
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

             <h1 className="font-medium text-gray-900 dark:text-gray-100">
  {link.label}
</h1>
            </div>

            <span className="text-gray-400 dark:text-gray-500 text-sm">↗</span>
          </div>
        </Link>
      ))}
    </div>
  )
}