import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

const userRoleEnum = pgEnum('user_role', ['admin', 'user'])

export const userRoleEnumSchema = z.enum(userRoleEnum.enumValues)

export type TagStatusEnum = z.infer<typeof userRoleEnumSchema>

export default userRoleEnum
