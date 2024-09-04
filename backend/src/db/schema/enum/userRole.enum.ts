import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

const userRoleEnum = pgEnum('UserRoleEnum', ['admin', 'user'])

export const userRoleEnumSchema = z.enum(userRoleEnum.enumValues)

export type UserRoleEnum = z.infer<typeof userRoleEnumSchema>

export default userRoleEnum
