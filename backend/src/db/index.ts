import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/db/schema'
import env from '@/env'

export const connection = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  onnotice: env.DB_SEEDING ? () => {} : undefined,
  ssl: env.DATABASE_URL.includes('localhost')
    ? false
    : {
        rejectUnauthorized: false,
      },
})

export const db = drizzle(connection, {
  schema,
  logger: true,
})

export type db = typeof db

export default db
