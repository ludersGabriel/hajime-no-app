import { z } from 'zod'
import { loginSchemas, type LoginModel } from '../schema/login.model'
import { userRoleEnumSchema } from '../schema/enum/userRole.enum'

export function hashPassword(pass: LoginModel['password']) {
  return Bun.password.hashSync(pass, {
    memoryCost: 4,
    timeCost: 3,
    algorithm: 'argon2id',
  })
}

export function verifyPassword(
  pass: LoginModel['password'],
  hash: LoginModel['password']
) {
  return Bun.password.verifySync(pass, hash)
}

export const authSchema = loginSchemas.model
  .pick({
    username: true,
    l_user_id: true,
  })
  .extend({
    role: userRoleEnumSchema,
  })

export const authInputSchema = loginSchemas.model.pick({
  username: true,
  password: true,
})

export type AuthSchema = z.infer<typeof authSchema>
export type AuthInput = z.infer<typeof authInputSchema>
