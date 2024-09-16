import {
  pgTable,
  uuid,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

// Relations
import userTable from './user.model'
import classTable from './class.model'

const subscriptionTable = pgTable('Subscription', {
  s_user_id: uuid('s_user_id')
    .notNull()
    .references(() => userTable.user_id),

  s_class_id: uuid('s_class_id')
    .notNull()
    .references(() => classTable.class_id),

  expiry_date: timestamp('expiry_date', {
    mode: 'string',
  }).notNull(),

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

  active: boolean('active').default(true).notNull(),
})

const subscriptionModelSchema = createSelectSchema(subscriptionTable)
const subscriptionDtoSchema = subscriptionModelSchema
const subscriptionInputSchema = createInsertSchema(subscriptionTable)
const subscriptionUpdateSchema = subscriptionInputSchema
  .partial()
  .required({ s_user_id: true, s_class_id: true })
const subscriptionFindSchema = subscriptionModelSchema.pick({
  s_user_id: true,
  s_class_id: true,
})

export type SubscriptionModel = z.infer<
  typeof subscriptionModelSchema
>
export type SubscriptionDto = z.infer<typeof subscriptionDtoSchema>
export type SubscriptionInput = z.infer<
  typeof subscriptionInputSchema
>
export type SubscriptionUpdate = z.infer<
  typeof subscriptionUpdateSchema
>
export type SubscriptionFind = z.infer<typeof subscriptionFindSchema>

export const subscriptionSchemas = {
  model: subscriptionModelSchema,
  dto: subscriptionDtoSchema,
  input: subscriptionInputSchema,
  update: subscriptionUpdateSchema,
  find: subscriptionFindSchema,
}

export default subscriptionTable
