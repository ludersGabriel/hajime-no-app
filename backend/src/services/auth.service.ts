import { Inject, Service } from 'typedi'
import { UserService } from './user.service'
import { sign } from 'hono/jwt'
import env from '@/env'
import {
  authSchema,
  verifyPassword,
  type AuthInput,
  type AuthSchema,
} from '@/db/repo/auth.repo'
import LoginService from './login.service'

@Service()
export class AuthService {
  @Inject()
  private readonly userService: UserService

  @Inject()
  private readonly loginService: LoginService

  async login(input: AuthInput): Promise<string> {
    const loginInfo = await this.loginService.find(input.username)

    if (!loginInfo) throw new Error('Login info not found')

    if (!verifyPassword(input.password, loginInfo.password))
      throw new Error('Wrong password')

    const user = await this.userService.authFind(loginInfo.l_user_id)

    if (!user) throw new Error('User not found')

    const payload: AuthSchema = authSchema.parse({
      l_user_id: loginInfo.l_user_id,
      username: loginInfo.username,
      role: user.role,
    })

    const token = await sign(payload, env.APP_SECRET)

    return token
  }
}
