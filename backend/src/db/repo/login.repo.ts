import { Service } from 'typedi'
import type {
  LoginInput,
  LoginModel,
  LoginUpdate,
} from '../schema/login.model'
import db from '..'
import loginTable, { loginSchemas } from '../schema/login.model'
import { eq } from 'drizzle-orm'

@Service()
export default class LoginRepo {
  async create(login: LoginInput): Promise<LoginModel> {
    const [ret] = await db
      .insert(loginTable)
      .values(login)
      .returning()

    return loginSchemas.model.parse(ret)
  }

  async update(login: LoginUpdate): Promise<LoginModel> {
    const [ret] = await db
      .update(loginTable)
      .set(login)
      .where(eq(loginTable.username, login.username))
      .returning()

    return loginSchemas.model.parse(ret)
  }

  async delete(
    username: LoginModel['username']
  ): Promise<LoginModel> {
    const [ret] = await db
      .delete(loginTable)
      .where(eq(loginTable.username, username))
      .returning()

    return loginSchemas.model.parse(ret)
  }

  async find(
    username: LoginModel['username']
  ): Promise<LoginModel | undefined> {
    const [ret] = await db
      .select()
      .from(loginTable)
      .where(eq(loginTable.username, username))

    return ret ? loginSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<LoginModel[]> {
    return loginSchemas.model
      .array()
      .parse(await db.query.loginTable.findMany())
  }
}
