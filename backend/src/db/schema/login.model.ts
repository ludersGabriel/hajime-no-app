import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

// Relations
import userTable from './user.model'

const loginTable = pgTable('Login', {
  username: varchar('username', { length: 50 }).primaryKey(),

  password: varchar('password', { length: 118 }).notNull(),

  l_user_id: uuid('l_user_id')
    .notNull()
    .references(() => userTable.user_id),

  last_login: timestamp('last_login', {
    mode: 'string',
  })
    .notNull()
    .defaultNow(),

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

const loginModelSchema = createSelectSchema(loginTable)
const loginDtoSchema = loginModelSchema.omit({ password: true })
const loginInputSchema = createInsertSchema(loginTable)
const loginUpdateSchema = loginInputSchema
  .partial()
  .required({ username: true })

export type LoginModel = z.infer<typeof loginModelSchema>
export type LoginDto = z.infer<typeof loginDtoSchema>
export type LoginInput = z.infer<typeof loginInputSchema>
export type LoginUpdate = z.infer<typeof loginUpdateSchema>

export const loginSchemas = {
  model: loginModelSchema,
  dto: loginDtoSchema,
  input: loginInputSchema,
  update: loginUpdateSchema,
}

export default loginTable
