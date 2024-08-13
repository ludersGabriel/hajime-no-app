import { sql } from 'drizzle-orm'
import {
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

const clientTable = pgTable('client', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  cnpj: varchar('cnpj', { length: 20 }).unique().notNull(),
  industry: varchar('industry', { length: 50 }),
  hqAddress: varchar('hq_address', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }).unique(),
  contactPerson: varchar('contact_person', { length: 255 }),
  createdAt: timestamp('created_at', { mode: 'string' })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`current_timestamp`),
})

const clientModelSchema = createSelectSchema(clientTable)
const clientDtoSchema = clientModelSchema
const clientInputSchema = createInsertSchema(clientTable)
const clientUpdateSchema = clientInputSchema
  .partial()
  .required({ id: true })

export type ClientModel = z.infer<typeof clientModelSchema>
export type ClientDto = z.infer<typeof clientDtoSchema>
export type ClientInput = z.infer<typeof clientInputSchema>
export type ClientUpdate = z.infer<typeof clientUpdateSchema>

export const clientSchemas = {
  model: clientModelSchema,
  dto: clientDtoSchema,
  input: clientInputSchema,
  update: clientUpdateSchema,
}

export default clientTable
