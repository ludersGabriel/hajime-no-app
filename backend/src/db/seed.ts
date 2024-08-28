import env from '@/env'
import { connection, db } from '@/db'
import { Table, getTableName, sql } from 'drizzle-orm'
import * as schema from '@/db/schema'
import * as seeds from '@/db/seeds'

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when seeding')
}

// Drop table before seeding
async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(
      `TRUNCATE TABLE "${getTableName(table)}" RESTART IDENTITY CASCADE`
    )
  )
}

for (const table of schema.tables) {
  await resetTable(db, table)
}

await seeds.userSeed(db)
await seeds.personalInfoSeed(db)
await seeds.loginSeed(db)
await seeds.exerciseCategorySeed(db)
await seeds.classSeed(db)
await seeds.checkinSeed(db)
await seeds.subscriptionSeed(db)
await seeds.exerciseSeed(db)
await seeds.exerciseInfoSeed(db)

await connection.end()
