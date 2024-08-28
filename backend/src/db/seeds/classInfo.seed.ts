import type db from '@/db'
import classInfoTable, {
  classInfoSchemas,
  type ClassInfoInput,
} from '../schema/classInfo.model'

export default async function seed(db: db) {
  await db
    .insert(classInfoTable)
    .values(classInfoSchemas.input.array().parse(classInfosData))
}

const classInfosData: ClassInfoInput[] = [
  {
    ci_class_id: 'f0853cb9-82bf-4f79-a83a-9d13bd3d6c58',
    title: 'Aula de Capoeira',
    description: 'Foda'
  },
  {
    ci_class_id: '390295a2-7640-4a82-9ef8-e5d7789b2cb8',
    title: 'Como Tirar Leite de Burra',
    description: '3 passos simples'
  },
  {
    ci_class_id: '57fcc5b6-616a-41cb-8f4f-3a20bf37427a',
    title: 'Como fazer dinheiro usando apenas javascript e maizena',
    description: 'Clica aqui duvido'
  },
  {
    ci_class_id: '5db5537e-c8f2-40a2-92ca-6711bd4dbb17',
    title: 'Me paga primeiro',
    description: 'Meu pix é 41992563074'
  },
  {
    ci_class_id: '4ecbd5e4-248f-4312-8628-dfa76eefd699',
    title: 'Meia noite eu te conto',
    description: 'Aguarde...'
  }
]
