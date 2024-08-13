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
    id: 1,
    name: 'Admin name',
    username: 'admin',
    role: 'admin',
    password: hashPassword('1234mudar'),
    email: 'contact@store1.com',
    cpf: '12345678901',
  },
  {
    id: 2,
    name: 'User 1',
    username: 'user1',
    password: hashPassword('1234mudar'),
    email: 'user1@store1.com',
    cpf: '12345678902',
  },
  {
    id: 3,
    name: 'User 2',
    username: 'user2',
    password: hashPassword('1234mudar'),
    email: 'user2@store2.com',
    cpf: '12345678903',
  },
  {
    id: 4,
    name: 'User 3',
    username: 'user3',
    password: hashPassword('1234mudar'),
    email: 'user3@store3.com',
    cpf: '12345678904',
  },
  {
    id: 5,
    name: 'User 4',
    username: 'user4',
    password: hashPassword('1234mudar'),
    email: 'user4@store1.com',
    cpf: '12345678905',
  },
  {
    id: 6,
    name: 'User 5',
    username: 'user5',
    password: hashPassword('1234mudar'),
    email: 'user5@store2.com',
    cpf: '12345678906',
  },
  {
    id: 7,
    name: 'User 6',
    username: 'user6',
    password: hashPassword('1234mudar'),
    email: 'user6@store3.com',
    cpf: '12345678907',
  },
  {
    id: 8,
    name: 'User 7',
    username: 'user7',
    password: hashPassword('1234mudar'),
    email: 'user7@store1.com',
    cpf: '12345678908',
  },
  {
    id: 9,
    name: 'User 8',
    username: 'user8',
    password: hashPassword('1234mudar'),
    email: 'user8@store2.com',
    cpf: '12345678909',
  },
  {
    id: 10,
    name: 'User 9',
    username: 'user9',
    password: hashPassword('1234mudar'),
    email: 'user9@store3.com',
    cpf: '12345678910',
  },
]
