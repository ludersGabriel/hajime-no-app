import type db from '@/db'
import userTable, {
  userSchemas,
  type UserInput,
} from '../schema/user.model'

export default async function seed(db: db) {
  await db
    .insert(userTable)
    .values(userSchemas.input.array().parse(usersData))
}

const usersData: UserInput[] = [
  {role: 'admin'},
  {},{},{},{},{},{},{},{},{}
]
