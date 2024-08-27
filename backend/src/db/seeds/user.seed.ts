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
    user_id: 'e447ab66-ea1c-4b96-8238-f5951ff8c60c',
    
  },
]
