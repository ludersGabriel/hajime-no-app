import type db from '@/db'
import exerciseInfoTable, {
  exerciseInfoSchemas,
  type ExerciseInfoInput,
} from '../schema/exerciseInfo.model'

export default async function seed(db: db) {
  await db
    .insert(exerciseInfoTable)
    .values(exerciseInfoSchemas.input.array().parse(exerciseInfoData))
}

const exerciseInfoData: ExerciseInfoInput[] = [
  {
    ei_exercise_id: '7b329ed3-9e88-460a-a06f-c17d6b3448e5',
    title: 'Flexão',
    description: 'Bom pra peito',
  },
  {
    ei_exercise_id: 'dabecd0f-a855-4b3a-9ca6-186552d3dace',
    title: 'Barra',
    description: 'Bom pras costas',
  },
  {
    ei_exercise_id: '0847f5be-58b7-48e2-a44f-3096c4393143',
    title: 'Corrida',
    description: 'Bom pra cardio',
  },
  {
    ei_exercise_id: '62ecfc01-d745-4045-b7ce-1729cb27057c',
    title: 'Rosca',
    description: 'Bom pra biceps',
  },
  {
    ei_exercise_id: 'e36d1a0a-2360-48fa-9516-8dd1b73251fe',
    title: 'Serrote',
    description: 'Bom pras costas',
  },
  {
    ei_exercise_id: '0d1abedc-a56a-45d7-bd39-31428833bd60',
    title: 'Agachamento',
    description: 'Bom pras pernas',
  },
  {
    ei_exercise_id: '282123ac-b00f-4745-8f61-25a8aac5aeb8',
    title: 'Remador',
    description: 'Bom pro abdomen',
  },
]
