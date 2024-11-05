import type db from '@/db'
import checkinTable, {
  checkinSchemas,
  type CheckinInput,
} from '../schema/checkin.model'

export default async function seed(db: db) {
  await db
    .insert(checkinTable)
    .values(checkinSchemas.input.array().parse(checkinData))
}

const checkinData: CheckinInput[] = [
  {
    ci_user_id: '55561080-f8a4-4e54-b8f9-23dcb9477147',
    class_time: '17:30',
  },
  {
    ci_user_id: '9b3ee08c-b767-4be8-a8d3-f2e0e3c566bf',
    class_time: '17:30',
  },
  {
    ci_user_id: '2490e42f-b829-40a9-ae9c-3a31e86e90ad',
    class_time: '17:30',
  },
  {
    ci_user_id: 'ada888fc-1fb1-4f80-9fd1-1bca99228ff1',
    class_time: '17:30',
  },
  {
    ci_user_id: '9d23b9bc-8522-44f6-bc96-b7e5625469a7',
    class_time: '17:30',
  },
  {
    ci_user_id: '8d3f0b0e-8a6e-4404-a4e4-fe6771599960',
    class_time: '17:30',
  },
  {
    ci_user_id: 'cd8c799d-2db2-481e-8f73-0d4aeb613304',
    class_time: '17:30',
  },
]
