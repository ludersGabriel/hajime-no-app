import {
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'
import userRoleEnum from './enum/user-role.enum'

const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  username: varchar('username', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  cpf: varchar('cpf', { length: 11 }).unique().notNull(),
  role: userRoleEnum('user_role').notNull().default('user'),
  createdAt: timestamp('created_at', {
    mode: 'string',
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'string',
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`current_timestamp`),
})

const userModelSchema = createSelectSchema(userTable)
const userDtoSchema = userModelSchema.omit({
  password: true,
})
const userInputSchema = createInsertSchema(userTable)
const userUpdateSchema = userInputSchema
  .partial()
  .required({ id: true })

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
