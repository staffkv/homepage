import { articles, Article } from "@/types/articles"

function formatMonth(dateStr: string) {
  const d = new Date(dateStr)
  const month = d.toLocaleString("en-US", { month: "short" })
  const year = d.getFullYear()
  return `${month}/${year}`
}

function renderTags(tags: string[]) {
  return tags.map((tag) => `#${tag}`).join("  ")
}

export function ArticlesContent() {
  const sortedArticles = [...articles].sort(
    (a: Article, b: Article) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="w-full max-w-150 mx-auto py-8 px-4 sm:px-0">
      <div className="overflow-hidden rounded-xl border border-(--link-border) bg-(--link-bg)">
        {sortedArticles.map((article, index) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block px-5 py-5 text-(--link-text) transition-colors duration-200 hover:bg-(--link-bg-hover) ${
              index > 0 ? "border-t border-(--link-border)" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-base font-medium sm:text-lg">{article.title}</h3>
                <p className="mt-1 text-sm text-(--text-color-secondary)">
                  {renderTags(article.tags)}
                </p>
              </div>
              <span className="shrink-0 text-sm text-(--text-color-secondary) sm:text-base">
                {formatMonth(article.publishedAt)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
