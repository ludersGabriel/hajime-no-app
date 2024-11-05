import type db from '@/db'
import classExerciseTable, {
  classExerciseSchemas,
  type ClassExerciseInput,
} from '../schema/classExercise.model'

export default async function seed(db: db) {
  await db
    .insert(classExerciseTable)
    .values(
      classExerciseSchemas.input.array().parse(classExerciseData)
    )
}

const classExerciseData: ClassExerciseInput[] = [
  {
    ce_class_id: 'f0853cb9-82bf-4f79-a83a-9d13bd3d6c58',
    ce_exercise_id: '7b329ed3-9e88-460a-a06f-c17d6b3448e5',
    series: 3,
    repetitions: 10,
  },

  {
    ce_class_id: '390295a2-7640-4a82-9ef8-e5d7789b2cb8',
    ce_exercise_id: '7b329ed3-9e88-460a-a06f-c17d6b3448e5',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '390295a2-7640-4a82-9ef8-e5d7789b2cb8',
    ce_exercise_id: 'dabecd0f-a855-4b3a-9ca6-186552d3dace',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '390295a2-7640-4a82-9ef8-e5d7789b2cb8',
    ce_exercise_id: '0847f5be-58b7-48e2-a44f-3096c4393143',
    series: 3,
    repetitions: 10,
  },

  {
    ce_class_id: '57fcc5b6-616a-41cb-8f4f-3a20bf37427a',
    ce_exercise_id: '7b329ed3-9e88-460a-a06f-c17d6b3448e5',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '57fcc5b6-616a-41cb-8f4f-3a20bf37427a',
    ce_exercise_id: 'dabecd0f-a855-4b3a-9ca6-186552d3dace',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '57fcc5b6-616a-41cb-8f4f-3a20bf37427a',
    ce_exercise_id: '0847f5be-58b7-48e2-a44f-3096c4393143',
    series: 3,
    repetitions: 10,
  },

  {
    ce_class_id: '5db5537e-c8f2-40a2-92ca-6711bd4dbb17',
    ce_exercise_id: '62ecfc01-d745-4045-b7ce-1729cb27057c',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '5db5537e-c8f2-40a2-92ca-6711bd4dbb17',
    ce_exercise_id: 'e36d1a0a-2360-48fa-9516-8dd1b73251fe',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '5db5537e-c8f2-40a2-92ca-6711bd4dbb17',
    ce_exercise_id: '0d1abedc-a56a-45d7-bd39-31428833bd60',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '5db5537e-c8f2-40a2-92ca-6711bd4dbb17',
    ce_exercise_id: '282123ac-b00f-4745-8f61-25a8aac5aeb8',
    series: 3,
    repetitions: 10,
  },

  {
    ce_class_id: '4ecbd5e4-248f-4312-8628-dfa76eefd699',
    ce_exercise_id: '62ecfc01-d745-4045-b7ce-1729cb27057c',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '4ecbd5e4-248f-4312-8628-dfa76eefd699',
    ce_exercise_id: 'e36d1a0a-2360-48fa-9516-8dd1b73251fe',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '4ecbd5e4-248f-4312-8628-dfa76eefd699',
    ce_exercise_id: '0d1abedc-a56a-45d7-bd39-31428833bd60',
    series: 3,
    repetitions: 10,
  },
  {
    ce_class_id: '4ecbd5e4-248f-4312-8628-dfa76eefd699',
    ce_exercise_id: '282123ac-b00f-4745-8f61-25a8aac5aeb8',
    series: 3,
    repetitions: 10,
  },
]
