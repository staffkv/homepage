"use client"
import { Intro } from "@/components/sections"
import { Row, RowList, Section } from "@/components/cv"
import { articles } from "@/types/articles"

export default function Articles() {
  const sorted = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return (
    <>
      <Intro />
      <Section id="artigos" num="01" title="Artigos" action={{ label: "voltar", href: "/" }}>
        <RowList>
          {sorted.map((a) => (
            <Row
              key={a.id}
              href={a.url}
              name={a.title}
              description={a.tags.map((t) => `#${t}`).join("  ")}
              meta={a.publishedAt.slice(0, 7)}
              showLogo={false}
            />
          ))}
        </RowList>
      </Section>
    </>
  )
}
