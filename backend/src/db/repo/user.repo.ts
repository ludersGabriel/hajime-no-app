import { Service } from 'typedi'
import db from '@/db'
import userTable, {
  userSchemas,
  type UserInput,
  type UserModel,
  type UserUpdate,
} from '../schema/user.model'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

@Service()
export class UserRepo {
  async findMany(): Promise<UserModel[]> {
    return z
      .array(userSchemas.model)
      .parse(await db.query.userTable.findMany())
  }

  async findByUsername(
    username: UserModel['username']
  ): Promise<UserModel | null> {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.username, username),
    })

    if (!user) return null

    return userSchemas.model.parse(user)
  }

  async create(user: UserInput, tx?: db): Promise<UserModel> {
    const repo = tx ?? db

    const [ret] = await repo
      .insert(userTable)
      .values(user)
      .returning()

    return userSchemas.model.parse(ret)
  }

  async update(user: UserUpdate): Promise<UserModel> {
    return db.transaction(async (tx) => {
      const [u] = await tx
        .update(userTable)
        .set(user)
        .where(eq(userTable.id, user.id))
        .returning()

      return userSchemas.model.parse(u)
    })
  }

  async createMany(
    users: UserInput[],
    tx?: db
  ): Promise<UserModel[]> {
    const repo = tx ?? db

    return z
      .array(userSchemas.model)
      .parse(await repo.insert(userTable).values(users).returning())
  }

  async uploadUsers(users: UserInput[]): Promise<UserModel[]> {
    return await db.transaction(async (tx) => {
      return z
        .array(userSchemas.model)
        .parse(await tx.insert(userTable).values(users).returning())
    })
  }
}
