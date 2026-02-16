import Image from "next/image"
import { Globe, GitBranch } from "lucide-react"
import { projects } from "@/types/projects"

function tagClassByIndex(index: number) {
  const classes = [
    "bg-[#0e7acb] text-white",
    "bg-[#2ba4df] text-[#001220]",
    "bg-black text-white",
  ]

  return classes[index % classes.length]
}

export function ProjectsContent() {
  return (
    <div className="w-full max-w-150 mx-auto py-8 px-4 sm:px-0">
      <div className="space-y-5">
        {projects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-xl border border-(--link-border) bg-(--link-bg)"
          >
            <header className="flex flex-col gap-3 border-b border-(--link-border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base font-medium text-(--link-text) sm:text-lg">{project.name}</h2>
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${tagClassByIndex(index)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="border-b border-(--link-border) px-5 py-5">
              <p className="text-base leading-relaxed text-(--link-text) sm:text-lg">
                {project.description}
              </p>
            </div>

            <div className="relative h-64 border-b border-(--link-border) bg-black sm:h-[380px]">
              {project.image ? (
                <Image src={project.image} alt={project.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                  Adicione a imagem em types/projects.tsx
                </div>
              )}
            </div>

            <footer className={`grid grid-cols-1 ${project.codeUrl ? "sm:grid-cols-2" : ""}`}>
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 border-b border-(--link-border) px-4 py-4 text-(--link-text) transition-colors hover:bg-(--link-bg-hover) ${
                  project.codeUrl ? "sm:border-b-0 sm:border-r sm:border-(--link-border)" : "border-b-0"
                }`}
              >
                <Globe size={20} />
                <span className="text-lg">Visit website</span>
              </a>
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-4 text-(--link-text) transition-colors hover:bg-(--link-bg-hover)"
                >
                  <GitBranch size={20} />
                  <span className="text-lg">View code</span>
                </a>
              )}
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}
