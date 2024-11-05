import {
  pgTable,
  uuid,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

const exerciseCategoryTable = pgTable('ExerciseCategory', {
  category_id: uuid('category_id').primaryKey().defaultRandom(),

  name: varchar('name', { length: 100 }).notNull(),

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

const exerciseCategoryModelSchema = createSelectSchema(
  exerciseCategoryTable
)
const exerciseCategoryDtoSchema = exerciseCategoryModelSchema
const exerciseCategoryInputSchema = createInsertSchema(
  exerciseCategoryTable
)
const exerciseCategoryUpdateSchema = exerciseCategoryInputSchema
  .partial()
  .required({ category_id: true })

export type ExerciseCategoryModel = z.infer<
  typeof exerciseCategoryModelSchema
>
export type ExerciseCategoryDto = z.infer<
  typeof exerciseCategoryDtoSchema
>
export type ExerciseCategoryInput = z.infer<
  typeof exerciseCategoryInputSchema
>
export type ExerciseCategoryUpdate = z.infer<
  typeof exerciseCategoryUpdateSchema
>

export const exerciseCategorySchemas = {
  model: exerciseCategoryModelSchema,
  dto: exerciseCategoryDtoSchema,
  input: exerciseCategoryInputSchema,
  update: exerciseCategoryUpdateSchema,
}

export default exerciseCategoryTable
