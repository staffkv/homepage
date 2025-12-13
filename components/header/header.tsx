import Link from "next/link"

interface NavHeadersLink {
  href: string
  label: string
}
const navHeaders: NavHeadersLink[] = [
  { href: "/projects", label: "/projects" },
  { href: "/articles", label: "/articles" },
  { href: "/bookmarks", label: "/bookmarks" },
]
export function Header() {
  return (
    <div className="max-w-150 flex flex-col md:flex-row items-center md:items-center mx-auto gap-8 pt-8 md:justify-between">
      <div>
        <div>Kevin Ferreira</div>
        <div>Engenheiro de Software</div>
      </div>
      <div className="flex justify-between items-center md:ml-auto gap-4">
        <button>🌙</button>
        <button>🇧🇷</button>
        {navHeaders.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </div>
    </div>
  )
}