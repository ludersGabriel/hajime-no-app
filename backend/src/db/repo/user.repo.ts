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
        .where(eq(userTable.user_id, user.user_id))
        .returning()

      return userSchemas.model.parse(u)
    })
  }

  async delete(user_id: UserModel['user_id']): Promise<UserModel> {
    const [ret] = await db
      .delete(userTable)
      .where(eq(userTable.user_id, user_id))
      .returning()

    return userSchemas.model.parse(ret)
  }

  async find(
    user_id: UserModel['user_id']
  ): Promise<UserModel | undefined> {
    const [ret] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.user_id, user_id))

    return userSchemas.model.parse(ret)
  }

  async findMany(): Promise<UserModel[]> {
    return z
      .array(userSchemas.model)
      .parse(await db.query.userTable.findMany())
  }
}
