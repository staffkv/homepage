import { getRandomPhrase } from "@/lib/randomPhrases"

export function Footer() {
  const phrase = getRandomPhrase()
  return (
    <footer className="mt-16 text-center font-mono text-[0.72rem] tracking-[0.01em] text-ink-fainter">
      {phrase}
    </footer>
  )
}
