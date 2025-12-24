import { getRandomPhrase } from "@/lib/randomPhrases"
import Link from "next/link"

export function Footer() {
  const phrase = getRandomPhrase()
  return (
    <footer className="max-w-150 mx-auto pt-8 mt-16">
      <div className="flex items-center justify-center gap-6 mb-4">
        <Link 
          href="https://github.com/staffkv" 
          target="_blank"
          className="flex items-center gap-2 text-(--text-color-secondary)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          @staffkvv
        </Link>

        <Link 
          href="https://x.com/staffkvv" 
          target="_blank"
          className="flex items-center gap-2 text-(--text-color-secondary)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.68 6.68 0 0 0 16 3.542a6.66 6.66 0 0 1-1.889.518 3.34 3.34 0 0 0 1.447-1.817 6.53 6.53 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.32 3.32 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.28 3.28 0 0 1-.863.113 3.26 3.26 0 0 1-.621-.058 3.28 3.28 0 0 0 3.067 2.277A6.59 6.59 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
          </svg>
          @staffkvv
        </Link>
      </div>
      <div className="text-center text-sm pb-8 font-semibold text-(--text-color-tertiary)">
        {phrase}
      </div>
    </footer>
  )
}