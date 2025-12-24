interface SocialLinkProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | string
  label: string
  href: string
}
export const socialLinks: SocialLinkProps[] = [
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