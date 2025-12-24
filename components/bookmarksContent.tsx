import { Bookmark, bookmarks } from "@/types/bookmarks"

function formatMonth(dateStr: string) {
  const d = new Date(dateStr)
  const month = d.toLocaleString('pt-BR', { month: 'long' })
  const year = d.getFullYear()
  const monthCap = month.charAt(0).toUpperCase() + month.slice(1)
  return `${monthCap} / ${year}`
}

export function BookmarksContent() {
  const groups = bookmarks.reduce((acc: Record<string, Bookmark[]>, b) => {
    const month = formatMonth(b.savedAt)
    if (!acc[month]) acc[month] = []
    acc[month].push(b)
    return acc
  }, {})

  return (
    <div className="w-full max-w-150 mx-auto py-8  px-4 sm:px-0 ">
      {Object.entries(groups).map(([month, items]) => (
        <section key={month} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{month}</h2>
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex flex-col items-start">
                <a
                  href={it.url}
                  className="text-lg font-medium underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {it.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}