import type db from '@/db'
import subscriptionTable, {
  subscriptionSchemas,
  type SubscriptionInput,
} from '../schema/subscription.model'

export default async function seed(db: db) {
  await db
    .insert(subscriptionTable)
    .values(subscriptionSchemas.input.array().parse(subscriptionData))
}

const subscriptionData: SubscriptionInput[] = [
  {
    s_user_id: '55561080-f8a4-4e54-b8f9-23dcb9477147',
    s_class_id: '57fcc5b6-616a-41cb-8f4f-3a20bf37427a',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: '9b3ee08c-b767-4be8-a8d3-f2e0e3c566bf',
    s_class_id: '390295a2-7640-4a82-9ef8-e5d7789b2cb8',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: '2490e42f-b829-40a9-ae9c-3a31e86e90ad',
    s_class_id: 'f0853cb9-82bf-4f79-a83a-9d13bd3d6c58',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: '2490e42f-b829-40a9-ae9c-3a31e86e90ad',
    s_class_id: 'f0853cb9-82bf-4f79-a83a-9d13bd3d6c58',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: 'ada888fc-1fb1-4f80-9fd1-1bca99228ff1',
    s_class_id: 'f0853cb9-82bf-4f79-a83a-9d13bd3d6c58',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: 'ada888fc-1fb1-4f80-9fd1-1bca99228ff1',
    s_class_id: 'f0853cb9-82bf-4f79-a83a-9d13bd3d6c58',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: '9d23b9bc-8522-44f6-bc96-b7e5625469a7',
    s_class_id: 'f0853cb9-82bf-4f79-a83a-9d13bd3d6c58',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: '8d3f0b0e-8a6e-4404-a4e4-fe6771599960',
    s_class_id: '5db5537e-c8f2-40a2-92ca-6711bd4dbb17',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: '8d3f0b0e-8a6e-4404-a4e4-fe6771599960',
    s_class_id: '57fcc5b6-616a-41cb-8f4f-3a20bf37427a',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: 'cd8c799d-2db2-481e-8f73-0d4aeb613304',
    s_class_id: '4ecbd5e4-248f-4312-8628-dfa76eefd699',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: 'c768cbaf-4776-444e-8a58-61609544a333',
    s_class_id: '57fcc5b6-616a-41cb-8f4f-3a20bf37427a',
    expiry_date: '2024-10-05 00:00:00',
  },
  {
    s_user_id: 'c768cbaf-4776-444e-8a58-61609544a333',
    s_class_id: '390295a2-7640-4a82-9ef8-e5d7789b2cb8',
    expiry_date: '2024-10-05 00:00:00',
  }
]
