import {
  pgTable,
  uuid,
  timestamp,
  boolean
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

// Relations
import exerciseCategoryTable from './exerciseCategory.model'

const classTable = pgTable('Class', {
  class_id: uuid('class_id')
    .primaryKey()
    .defaultRandom(),

  c_category_id: uuid('c_category_id')
    .notNull()
    .references(() => exerciseCategoryTable.category_id),

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

  active: boolean('active')
    .notNull()
    .default(true)
})

const classModelSchema = createSelectSchema(classTable)
const classDtoSchema = classModelSchema
const classInputSchema = createInsertSchema(classTable)
const classUpdateSchema = classInputSchema
  .partial()
  .required({ class_id: true })

export type ClassModel = z.infer<typeof classModelSchema>
export type ClassDto = z.infer<typeof classDtoSchema>
export type ClassInput = z.infer<typeof classInputSchema>
export type ClassUpdate = z.infer<typeof classUpdateSchema>

export const classSchemas = {
  model: classModelSchema,
  dto: classDtoSchema,
  input: classInputSchema,
  update: classUpdateSchema,
}

export default classTable
