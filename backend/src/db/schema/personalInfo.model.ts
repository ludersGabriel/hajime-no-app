import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// Relations
import userTable from './user.model'

const personalInfoTable = pgTable('PersonalInfo', {
  pi_user_id: uuid('pi_user_id')
    .primaryKey()
    .references(() => userTable.user_id),

  cpf: varchar('cpf', { length: 11 })
    .notNull(),
  email: varchar('email', { length: 100 })
    .notNull(),
  name: varchar('name', { length: 200 })
    .notNull(),
  phone: varchar('phone', { length: 50 })
    .notNull(),

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

const personalInfoModelSchema = createSelectSchema(personalInfoTable)
const personalInfoDtoSchema = personalInfoModelSchema
const personalInfoInputSchema = createInsertSchema(personalInfoTable)
const personalInfoUpdateSchema = personalInfoInputSchema
  .partial()
  .required({ pi_user_id: true })

export type PersonalInfoModel = z.infer<typeof personalInfoDtoSchema>
export type PersonalInfoDto = z.infer<typeof personalInfoDtoSchema>
export type PersonalInfoInput = z.infer<typeof personalInfoInputSchema>
export type PersonalInfoUpdate = z.infer<typeof personalInfoUpdateSchema>

export const personalInfoSchemas = {
  model: personalInfoModelSchema,
  dto: personalInfoDtoSchema,
  input: personalInfoInputSchema,
  update: personalInfoUpdateSchema,
}

export default personalInfoTable
