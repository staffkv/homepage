export type Project = {
  id: string
  name: string
  description: string
  tags: string[]
  image?: string
  websiteUrl: string
  codeUrl?: string
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Finampy",
    description: "Software House",
    tags: ["Software House"],
    websiteUrl: "https://finampy.vercel.app/",
  },
  {
    id: "2",
    name: "Zeety",
    description: "Automatize seu atendimento com IA",
    tags: ["IA", "Atendimento"],
    websiteUrl: "https://www.zeety.com.br/",
  },
  {
    id: "3",
    name: "Pedgo App",
    description: "Gerencia seu delivery com facilidade",
    tags: ["Delivery", "Gestao"],
    websiteUrl: "https://www.pedgo.com.br/",
  },
  {
    id: "4",
    name: "Liviit",
    description: "Sua vida digital comeca aqui",
    tags: ["Digital", "Plataforma"],
    websiteUrl: "https://www.liviit.com/",
  },
  {
    id: "5",
    name: "Ilcontabilidade",
    description: "Contabilidade digital para MEI e pequenas empresas",
    tags: ["Contabilidade", "MEI"],
    websiteUrl: "https://ilcontabilidade.lovable.app/",
  },
]
