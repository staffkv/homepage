import { Pool } from 'pg'

declare global {
  var pool: Pool | undefined
}

export const db =
  global.pool ??
  new Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: '0.0.0.0',
  })

if (process.env.NODE_ENV !== 'production') {
  global.pool = db
}
