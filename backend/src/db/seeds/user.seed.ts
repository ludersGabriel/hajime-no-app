import type db from '@/db'
import userTable, {
  userSchemas,
  type UserInput,
} from '../schema/user.model'
import { hashPassword } from '../repo/auth.repo'
import { sql } from 'drizzle-orm'

export default async function seed(db: db) {
  await db
    .insert(userTable)
    .values(userSchemas.input.array().parse(usersData))

  await db.execute(
    sql`select setval('user_id_seq', ${usersData.length})`
  )
}

const usersData: UserInput[] = [
  {
    
  },
]
