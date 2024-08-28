import type db from '@/db'
import personalInfoTable, {
  personalInfoSchemas,
  type PersonalInfoInput,
} from '../schema/personalInfo.model'

export default async function seed(db: db) {
  await db
    .insert(personalInfoTable)
    .values(personalInfoSchemas.input.array().parse(personalInfosData))
}

const personalInfosData: PersonalInfoInput[] = [
  {
    pi_user_id:  '55561080-f8a4-4e54-b8f9-23dcb9477147',
    name:  'admin',
    email: 'admin@admin.COM',
    phone: '0000000000000',
    cpf: '00000000000'
  },
  {
    pi_user_id:  '9b3ee08c-b767-4be8-a8d3-f2e0e3c566bf',
    name:  'Lorem Ipsum da Silva',
    email: 'robertolucassantos@willianfernandes.com.br',
    phone: '92982532020',
    cpf: '97589908533'
  },
  {
    pi_user_id:  '2490e42f-b829-40a9-ae9c-3a31e86e90ad',
    name:  'Márcio Edson Rocha',
    email: 'marcio-rocha89@camilapassos.com.br',
    phone: '84994191239',
    cpf: '45987616018'
  },
  {
    pi_user_id:  'ada888fc-1fb1-4f80-9fd1-1bca99228ff1',
    name:  'Jennifer Carla Fernanda Araújo',
    email: 'jennifercarlaaraujo@dyna.com.br',
    phone: '84984213619',
    cpf: '99982994891'
  },
  {
    pi_user_id:  '9d23b9bc-8522-44f6-bc96-b7e5625469a7',
    name:  'Ryan Rodrigo da Paz',
    email: 'ryan.rodrigo.dapaz@prcondominios.com.br',
    phone: '79988488616',
    cpf: '26667490022'
  },
  {
    pi_user_id:  '8d3f0b0e-8a6e-4404-a4e4-fe6771599960',
    name:  'Giovana Cláudia Daniela Silveira',
    email: 'giovana_claudia_silveira@suzano.com.br',
    phone: '67992001316',
    cpf: '67224094145'
  },
  {
    pi_user_id:  'cd8c799d-2db2-481e-8f73-0d4aeb613304',
    name:  'Jorge Felipe Mateus Aparício',
    email: 'jorge_felipe_aparicio@integrasjc.com.br',
    phone: '81988259134',
    cpf: '23392861235'
  },
  {
    pi_user_id:  'c768cbaf-4776-444e-8a58-61609544a333',
    name:  'Murilo João Nunes',
    email: 'murilojoaonunes@iedi.com.br',
    phone: '21998839700',
    cpf: '87024831146'
  },
  {
    pi_user_id:  'd5f4bea8-c4ac-435f-9b16-499f9f3d3a40',
    name:  'Rodrigo Diego Dias',
    email: 'rodrigo-dias88@yahool.com',
    phone: '96983955868',
    cpf: '85118613434'
  },
  {
    pi_user_id:  'c121e537-f084-4589-b5db-9f4c1e96f4ca',
    name:  'Vitória Marina Mendes',
    email: 'vitoriamarinamendes@yaooll.com',
    phone: '67991969756',
    cpf: '21661096832'
  }
]
