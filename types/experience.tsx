type Localized = { pt: string; en: string }

export type Experience = {
  id: string
  company: string
  role: Localized
  /** Employment type shown as a tag, e.g. Freelance */
  kind?: Localized
  /** ISO month, e.g. "2021-09" — omit while unknown */
  start?: string
  /** ISO month, or undefined for the current position */
  end?: string
  location?: Localized
  logo?: string
  bullets: { pt: string[]; en: string[] }
  stack: string[]
}

const freelance: Localized = { pt: "Freelance", en: "Freelance" }

/** Current roles first (newest start first), then past roles (newest end first). */
export const experiences: Experience[] = [
  {
    id: "zeety",
    company: "Zeety",
    role: { pt: "Senior Software Engineer", en: "Senior Software Engineer" },
    start: "2025-11",
    location: { pt: "João Pessoa, PB · Remoto", en: "João Pessoa, Brazil · Remote" },
    logo: "/zeety.png",
    bullets: {
      pt: [
        "Lidero a **estratégia técnica** da Zeety, plataforma SaaS de agentes de IA no WhatsApp para o mercado imobiliário.",
        "Conduzo o desenvolvimento de agentes que **automatizam atendimento, qualificação de leads, agendamento e follow-up**.",
        "Desenhei a arquitetura **multi-tenant em microsserviços**, com integrações externas preparadas para escalar a operação.",
        "Defino o **roadmap técnico** e os padrões de engenharia, qualidade e observabilidade, em alinhamento com os stakeholders do produto.",
      ],
      en: [
        "Lead the **technical strategy** of Zeety, a SaaS platform of WhatsApp AI agents for the real-estate market.",
        "Drive development of agents that **automate customer service, lead qualification, scheduling and follow-up**.",
        "Designed the **multi-tenant microservice architecture**, with external integrations built to scale the operation.",
        "Own the **technical roadmap** and engineering, quality and observability standards, aligned with product stakeholders.",
      ],
    },
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "OpenAI", "LangChain"],
  },
  {
    id: "minsait",
    company: "Minsait",
    role: { pt: "Senior Software Engineer", en: "Senior Software Engineer" },
    start: "2021-12",
    location: { pt: "João Pessoa, PB · Remoto", en: "João Pessoa, Brazil · Remote" },
    logo: "/logos/minsait.png",
    bullets: {
      pt: [
        "Desenvolvo a plataforma de reembolso de celulares corporativos (BYOD), que processa **~700 solicitações e ~R$700 mil por mês**.",
        "Reduzi a análise manual de notas fiscais **de mais de 50% para 20%** ao automatizar a validação eletrônica com a Receita Federal via Serpro.",
        "Reduzi o envio de uma solicitação para **1 minuto** com leitura automática da nota fiscal no upload, eliminando a digitação da chave de 44 dígitos.",
        "Migrei **mais de 50 módulos COBOL** para microsserviços em Java + Quarkus, reduzindo débito técnico e facilitando a manutenção.",
        "Implantei pipelines de CI/CD com GitHub Actions, ArgoCD e OpenShift, **cortando o tempo de deploy em 50%**.",
        "Participo das decisões de arquitetura, da definição de padrões de código e do refinamento de requisitos com stakeholders.",
      ],
      en: [
        "Build the corporate phone reimbursement (BYOD) platform, which processes **~700 requests and ~R$700K per month**.",
        "Cut manual invoice review **from over 50% to 20%** by automating electronic validation with Brazil's tax authority through Serpro.",
        "Brought request submission down to **1 minute** with automatic invoice reading on upload, removing the need to type a 44-digit key.",
        "Migrated **50+ COBOL modules** to Java + Quarkus microservices, reducing tech debt and easing maintenance.",
        "Set up CI/CD pipelines with GitHub Actions, ArgoCD and OpenShift, **cutting deploy time by 50%**.",
        "Take part in architecture decisions, coding standards and requirements refinement with stakeholders.",
      ],
    },
    stack: ["Java", "Quarkus", "OpenShift", "ArgoCD", "GitHub Actions"],
  },
  {
    id: "kohls",
    company: "Kohl's",
    role: { pt: "Senior Software Engineer", en: "Senior Software Engineer" },
    kind: freelance,
    start: "2026-04",
    end: "2026-06",
    location: { pt: "EUA · Remoto", en: "USA · Remote" },
    logo: "/logos/kohls.png",
    bullets: {
      pt: [
        "Modernizei **microsserviços em Node.js/Express e Java (Gradle)** no GCP.",
        "Otimizei queries no **Cloud Spanner**, melhorando a performance dos serviços.",
        "Corrigi **vulnerabilidades em dependências**, reforçando a segurança dos serviços.",
      ],
      en: [
        "Modernized **Node.js/Express and Java (Gradle) microservices** on GCP.",
        "Optimized **Cloud Spanner** queries, improving service performance.",
        "Fixed **vulnerable dependencies**, hardening service security.",
      ],
    },
    stack: ["Node.js", "Express", "Java", "Gradle", "GCP", "Cloud Spanner"],
  },
  {
    id: "bny",
    company: "BNY",
    role: { pt: "Senior Software Engineer", en: "Senior Software Engineer" },
    kind: freelance,
    start: "2026-01",
    end: "2026-04",
    location: { pt: "EUA · Remoto", en: "USA · Remote" },
    logo: "/logos/bny.png",
    bullets: {
      pt: [
        "Modelei as permissões dos papéis PM, DEV e AGENT no **sistema de autorização RBAC** em Java.",
        "Integrei o **Auth0** para autenticação e controle de acesso em um ambiente bancário de alta criticidade.",
        "Escrevi a **documentação técnica** do sistema de autorização para apoiar a governança e o onboarding do time.",
      ],
      en: [
        "Modeled PM, DEV and AGENT role permissions in the Java-based **RBAC authorization system**.",
        "Integrated **Auth0** for authentication and access control in a highly critical banking environment.",
        "Wrote the authorization system's **technical documentation** to support governance and team onboarding.",
      ],
    },
    stack: ["Java", "Auth0", "RBAC"],
  },
  {
    id: "liviit",
    company: "Liviit",
    role: { pt: "Software Engineer", en: "Software Engineer" },
    kind: freelance,
    start: "2023-01",
    end: "2023-06",
    location: { pt: "Austrália · Remoto", en: "Australia · Remote" },
    logo: "/logos/liviit.jpg",
    bullets: {
      pt: [
        "Atualizei a **versão do React** e refatorei o código da plataforma web.",
        "Atualizei o **Redux-Saga** e criei novos componentes React reutilizáveis.",
        "Corrigi bugs, deixando a aplicação **mais estável**.",
      ],
      en: [
        "Upgraded the **React version** and refactored the web platform's codebase.",
        "Upgraded **Redux-Saga** and built new reusable React components.",
        "Fixed bugs, making the application **more stable**.",
      ],
    },
    stack: ["React", "Redux-Saga", "JavaScript"],
  },
  {
    id: "indra",
    company: "Indra",
    role: { pt: "Senior Software Engineer", en: "Senior Software Engineer" },
    start: "2021-09",
    end: "2021-12",
    location: { pt: "João Pessoa, PB · Remoto", en: "João Pessoa, Brazil · Remote" },
    logo: "/logos/indra.png",
    bullets: {
      pt: [
        "Desenvolvi e mantive aplicações corporativas em **Java, Spring Boot e Angular** para operações de grande escala.",
        "Implementei e evoluí **APIs REST** e integrações entre sistemas, melhorando confiabilidade e interoperabilidade.",
        "Automatizei a integração e a entrega contínua com **Jenkins e ArgoCD**, tornando as implantações mais rápidas e estáveis.",
        "Trabalhei com equipes multidisciplinares na análise de requisitos e na sustentação de soluções para grandes clientes.",
      ],
      en: [
        "Built and maintained enterprise applications in **Java, Spring Boot and Angular** for large-scale operations.",
        "Implemented and evolved **REST APIs** and system integrations, improving reliability and interoperability.",
        "Automated continuous integration and delivery with **Jenkins and ArgoCD**, making deployments faster and more stable.",
        "Worked with cross-functional teams on requirements analysis and support of solutions for large clients.",
      ],
    },
    stack: ["Java", "Spring Boot", "Angular", "Jenkins", "ArgoCD"],
  },
  {
    id: "7encompany",
    company: "7enCompany",
    role: { pt: "Software Engineer Lead", en: "Software Engineer Lead" },
    start: "2020-06",
    end: "2021-09",
    location: { pt: "Cabedelo, PB", en: "Cabedelo, Brazil" },
    bullets: {
      pt: [
        "Desenvolvi interfaces de alta performance em **React, Vite e TypeScript**, com foco em otimização de bundle e componentes reutilizáveis.",
        "Construí aplicações em **Next.js** com SSR, SSG, ISR e Server Components para melhorar **SEO e Core Web Vitals**.",
        "Implementei telas fiéis aos protótipos do Figma em TailwindCSS, alinhadas ao design system, **reduzindo o retrabalho de QA**.",
        "Escrevi testes com React Testing Library, Jest e Cypress para **prevenir regressões**.",
      ],
      en: [
        "Built high-performance interfaces in **React, Vite and TypeScript**, focused on bundle optimization and reusable components.",
        "Shipped **Next.js** apps with SSR, SSG, ISR and Server Components to improve **SEO and Core Web Vitals**.",
        "Implemented Figma-faithful screens in TailwindCSS aligned with the design system, **reducing QA rework**.",
        "Wrote tests with React Testing Library, Jest and Cypress to **prevent regressions**.",
      ],
    },
    stack: ["React", "Next.js", "NestJS", "PostgreSQL", "Docker", "Jest"],
  },
]
