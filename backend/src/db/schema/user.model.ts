import {
  pgTable,
  uuid,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'
import userRoleEnum from './enum/userRole.enum'

const userTable = pgTable('User', {
  user_id: uuid('user_id')
    .primaryKey()
    .defaultRandom(),

  role: userRoleEnum('role')
    .notNull()
    .default('user'),

  created_at: timestamp('created_at', {
    mode: 'string',
  })
    .notNull()
    .defaultNow(),
    
  updated_at: timestamp('updated_at', {
    mode: 'string',
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`current_timestamp`),
})

const userModelSchema = createSelectSchema(userTable)
const userDtoSchema = userModelSchema
const userInputSchema = createInsertSchema(userTable)
const userUpdateSchema = userInputSchema
  .partial()
  .required({ user_id: true })

export type UserModel = z.infer<typeof userModelSchema>
export type UserDto = z.infer<typeof userDtoSchema>
export type UserInput = z.infer<typeof userInputSchema>
export type UserUpdate = z.infer<typeof userUpdateSchema>

export const userSchemas = {
  model: userModelSchema,
  dto: userDtoSchema,
  input: userInputSchema,
  update: userUpdateSchema,
}

export default userTable
