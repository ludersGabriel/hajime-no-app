import type db from '@/db'
import exerciseTable, {
  exerciseSchemas,
  type ExerciseInput,
} from '../schema/exercise.model'

export default async function seed(db: db) {
  await db
    .insert(exerciseTable)
    .values(exerciseSchemas.input.array().parse(exerciseData))
}

const exerciseData: ExerciseInput[] = [
  {
    exercise_id: '7b329ed3-9e88-460a-a06f-c17d6b3448e5',
    e_category_id: 'dd99ed14-248b-455f-980c-bf4cb18d8b51',
  },
  {
    exercise_id: 'dabecd0f-a855-4b3a-9ca6-186552d3dace',
    e_category_id: '1ce214ee-f01c-4178-9d2c-f451c9a6cad9',
  },
  {
    exercise_id: '0847f5be-58b7-48e2-a44f-3096c4393143',
    e_category_id: '4531fbc5-e8c6-4ff7-89cf-55aef2627a09',
  },
  {
    exercise_id: '62ecfc01-d745-4045-b7ce-1729cb27057c',
    e_category_id: '104120de-d105-4b9e-a9e6-ba88e0f2bd8b',
  },
  {
    exercise_id: 'e36d1a0a-2360-48fa-9516-8dd1b73251fe',
    e_category_id: '1ce214ee-f01c-4178-9d2c-f451c9a6cad9',
  },
  {
    exercise_id: '0d1abedc-a56a-45d7-bd39-31428833bd60',
    e_category_id: '4531fbc5-e8c6-4ff7-89cf-55aef2627a09',
  },
  {
    exercise_id: '282123ac-b00f-4745-8f61-25a8aac5aeb8',
    e_category_id: '398d03af-8770-4f68-86e2-ff31e9ae5afa',
  },
]
