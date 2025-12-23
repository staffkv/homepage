'use client'

import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)

  async function addBookmark() {
    try {
      setLoading(true)
      
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Next.js Docs',
          url: 'https://nextjs.org'
        }),
      })

      // Pega o texto da resposta primeiro
      const text = await response.text()
      console.log('Resposta da API:', text)

      if (!response.ok) {
        // Se não for OK, mostra o HTML de erro
        console.error('HTML de erro:', text)
        throw new Error('Erro na API - veja o console')
      }

      // Tenta parsear como JSON
      const data = JSON.parse(text)
      alert('Bookmark adicionado com sucesso!')
      console.log('Bookmark criado:', data.bookmark)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao adicionar bookmark - veja o console')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Bookmarks</h1>

      <button onClick={addBookmark} disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar bookmark'}
      </button>
    </main>
  )
}