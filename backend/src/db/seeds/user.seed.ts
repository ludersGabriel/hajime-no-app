import type db from '@/db'
import userTable, {
  userSchemas,
  type UserInput,
} from '../schema/user.model'

export default async function seed(db: db) {
  await db
    .insert(userTable)
    .values(userSchemas.input.array().parse(userData))
}

const userData: UserInput[] = [
  {user_id: '55561080-f8a4-4e54-b8f9-23dcb9477147', role: 'admin'},
  {user_id: '9b3ee08c-b767-4be8-a8d3-f2e0e3c566bf'}, 
  {user_id: '2490e42f-b829-40a9-ae9c-3a31e86e90ad'},
  {user_id: 'ada888fc-1fb1-4f80-9fd1-1bca99228ff1'},
  {user_id: '9d23b9bc-8522-44f6-bc96-b7e5625469a7'},
  {user_id: '8d3f0b0e-8a6e-4404-a4e4-fe6771599960'},
  {user_id: 'cd8c799d-2db2-481e-8f73-0d4aeb613304'},
  {user_id: 'c768cbaf-4776-444e-8a58-61609544a333'},  
  {user_id: 'd5f4bea8-c4ac-435f-9b16-499f9f3d3a40'},
  {user_id: 'c121e537-f084-4589-b5db-9f4c1e96f4ca'}
]
