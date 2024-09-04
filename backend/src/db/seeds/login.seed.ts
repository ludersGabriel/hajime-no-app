import type db from '@/db'
import loginTable, {
  loginSchemas,
  type LoginInput,
} from '../schema/login.model'

export default async function seed(db: db) {
  await db
    .insert(loginTable)
    .values(loginSchemas.input.array().parse(loginData))
}

const loginData: LoginInput[] = [
  {
    username: 'admin',
    password: await Bun.password.hash('123mudar'),
    l_user_id: '55561080-f8a4-4e54-b8f9-23dcb9477147',
  },
  {
    username: 'robertolucassantos200',
    password: await Bun.password.hash('JVOifKho7HMYcDOT'),
    l_user_id: '9b3ee08c-b767-4be8-a8d3-f2e0e3c566bf',
  },
  {
    username: 'mrcioedsonrocha423',
    password: await Bun.password.hash('iykL40tWhogJRrl5'),
    l_user_id: '2490e42f-b829-40a9-ae9c-3a31e86e90ad',
  },
  {
    username: 'jennifercarlafernandaarajo764',
    password: await Bun.password.hash('EpUvB9tRvBaB9uvL'),
    l_user_id: 'ada888fc-1fb1-4f80-9fd1-1bca99228ff1',
  },
  {
    username: 'ryanrodrigodapaz610',
    password: await Bun.password.hash('AS83rlnhkwYBka0b'),
    l_user_id: '9d23b9bc-8522-44f6-bc96-b7e5625469a7',
  },
  {
    username: 'giovanacludiadanielasilveira590',
    password: await Bun.password.hash('G7KTDFpAa1gpA70S'),
    l_user_id: '8d3f0b0e-8a6e-4404-a4e4-fe6771599960',
  },
  {
    username: 'jorgefelipemateusaparcio439',
    password: await Bun.password.hash('xk2jAdHzNd50Sj2s'),
    l_user_id: 'cd8c799d-2db2-481e-8f73-0d4aeb613304',
  },
  {
    username: 'murilojoonunes531',
    password: await Bun.password.hash('MdAQuYWgEUjjUR8w'),
    l_user_id: 'c768cbaf-4776-444e-8a58-61609544a333',
  },
  {
    username: 'rodrigodiegodias135',
    password: await Bun.password.hash('QrK13UXZJGYzBwDh'),
    l_user_id: 'd5f4bea8-c4ac-435f-9b16-499f9f3d3a40',
  },
  {
    username: 'vitriamarinamendes371',
    password: await Bun.password.hash('bcSj3w5n8tSYF7z5'),
    l_user_id: 'c121e537-f084-4589-b5db-9f4c1e96f4ca',
  }
]
