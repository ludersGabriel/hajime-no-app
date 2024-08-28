import type db from '@/db'
import exerciseCategoryTable, {
  exerciseCategorySchemas,
  type ExerciseCategoryInput,
} from '../schema/exerciseCategory.model'

export default async function seed(db: db) {
  await db
    .insert(exerciseCategoryTable)
    .values(exerciseCategorySchemas.input.array().parse(exerciseCategorysData))
}

const exerciseCategorysData: ExerciseCategoryInput[] = [
  {
    name: 'Boxing',
    category_id: 'dd99ed14-248b-455f-980c-bf4cb18d8b51'
  },
  {
    name: 'Cardio',
    category_id: '1ce214ee-f01c-4178-9d2c-f451c9a6cad9'
  },
  {
    name: 'Bodybuilding',
    category_id: '4531fbc5-e8c6-4ff7-89cf-55aef2627a09'
  },
  {
    name: 'Muay-Thai',
    category_id: '104120de-d105-4b9e-a9e6-ba88e0f2bd8b'
  },
  {
    name: 'BJJ',
    category_id: '398d03af-8770-4f68-86e2-ff31e9ae5afa'
  }
]
