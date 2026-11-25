export type Project = {
  id: string
  name: string
  description: string
  tags: string[]
  image?: string
  logo?: string
  websiteUrl: string
  codeUrl?: string
}

export const projects: Project[] = [
  {
    id: "2",
    name: "Zeety",
    description: "Automatize seu atendimento com IA",
    tags: ["IA", "Atendimento"],
    logo: "/zeety.png",
    websiteUrl: "https://www.zeety.com.br/",
  },
  {
    id: "3",
    name: "Pedgo App",
    description: "Gerencia seu delivery com facilidade",
    tags: ["Delivery", "Gestao"],
    logo: "/logos/pedgo.png",
    websiteUrl: "https://www.pedgo.com.br/",
  },
  {
    id: "1",
    name: "Finampy",
    description: "Software House",
    tags: ["Software House"],
    logo: "/logos/finampy.png",
    websiteUrl: "https://finampy.vercel.app/",
  },
]
