import type db from '@/db'
import classTable, {
  classSchemas,
  type ClassInput,
} from '../schema/class.model'

export default async function seed(db: db) {
  await db
    .insert(classTable)
    .values(classSchemas.input.array().parse(classData))
}

const classData: ClassInput[] = [
  {
    class_id: 'f0853cb9-82bf-4f79-a83a-9d13bd3d6c58',
    c_category_id: 'dd99ed14-248b-455f-980c-bf4cb18d8b51',
  },
  {
    class_id: '390295a2-7640-4a82-9ef8-e5d7789b2cb8',
    c_category_id: 'dd99ed14-248b-455f-980c-bf4cb18d8b51',
  },
  {
    class_id: '57fcc5b6-616a-41cb-8f4f-3a20bf37427a',
    c_category_id: 'dd99ed14-248b-455f-980c-bf4cb18d8b51',
  },
  {
    class_id: '5db5537e-c8f2-40a2-92ca-6711bd4dbb17',
    c_category_id: 'dd99ed14-248b-455f-980c-bf4cb18d8b51',
  },
  {
    class_id: '4ecbd5e4-248f-4312-8628-dfa76eefd699',
    c_category_id: 'dd99ed14-248b-455f-980c-bf4cb18d8b51',
  },
]
