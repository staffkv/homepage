export type Article = {
  id: string
  title: string
  tags: string[]
  url: string
  publishedAt: string // ISO date
}

export const articles: Article[] = [
  {
    id: "1",
    title: "How (not) to get a job in Spain",
    tags: ["life", "travel"],
    url: "#",
    publishedAt: "2024-09-01",
  },
  {
    id: "2",
    title: "Frontend Debugging 101",
    tags: ["technology", "beginner"],
    url: "#",
    publishedAt: "2024-07-01",
  },
  {
    id: "3",
    title: "Raycast: Second Impressions",
    tags: ["raycast", "technology"],
    url: "#",
    publishedAt: "2024-05-01",
  },
]
