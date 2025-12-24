"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

type Language = "pt" | "en"

type ContextType = {
  language: Language
  setLanguage: (l: Language) => void
}

const LanguageContext = createContext<ContextType>({
  language: "pt",
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("language")
      if (stored === "pt" || stored === "en") setLanguage(stored)
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("language", language)
    } catch (e) {}
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
