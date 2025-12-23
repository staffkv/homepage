import { db } from "@/lib/db";
import { NextResponse } from "next/server";
console.log('NEXT_PUBLIC_DATABASE_URL:', process.env.NEXT_PUBLIC_DATABASE_URL)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year');
  
  if (!year) {
    return NextResponse.json(
      { error: 'year is required' },
      { status: 400 }
    )
  }

  const { rows } = await db.query(
    `
    SELECT
      TO_CHAR(created_at, 'YYYY-MM') AS month,
      json_agg(bookmarks.* ORDER BY created_at DESC) AS items
    FROM bookmarks
    WHERE created_at >= $1
      AND created_at <  $2
    GROUP BY month
    ORDER BY month DESC;
    `,
    [`${year}-01-01`, `${Number(year) + 1}-01-01`]
  )

  const result = Object.fromEntries(
    rows.map(row => [row.month, row.items])
  )

  return NextResponse.json(result)
}

export async function POST(req: Request) {
  try {
    console.log('POST /api/bookmarks chamado')
    
    const body = await req.json()
    console.log('Body recebido:', body)
    
    const { url, title } = body

    if (!url || !title) {
      return NextResponse.json(
        { error: 'URL e título são obrigatórios' },
        { status: 400 }
      )
    }

    console.log('Executando query...')
    const result = await db.query(
      `INSERT INTO bookmarks (url, title) VALUES ($1, $2) RETURNING *`,
      [url, title]
    )
    
    console.log('Query executada com sucesso:', result.rows[0])

    return NextResponse.json(
      { 
        message: 'Bookmark adicionado com sucesso',
        bookmark: result
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro detalhado:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao adicionar bookmark',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}