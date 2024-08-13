import { sql } from 'drizzle-orm'
import type db from '..'
import type { ClientInput } from '../schema/client.model'
import clientTable, { clientSchemas } from '../schema/client.model'

export default async function seed(db: db) {
  await db
    .insert(clientTable)
    .values(clientSchemas.input.array().parse(clientData))

  await db.execute(
    sql`select setval('client_id_seq', ${clientData.length})`
  )
}

const clientData: ClientInput[] = [
  {
    id: 1,
    name: 'Acme Corp',
    cnpj: '12.345.678/0001-91',
    industry: 'Manufacturing',
    hqAddress: '1234 Industry Rd, City',
    phone: '123-456-7890',
    email: 'contact@acmecorp.com',
    contactPerson: 'John Doe',
  },
  {
    id: 2,
    name: 'Example Corp',
    cnpj: '98.765.432/0001-21',
    industry: 'Technology',
    hqAddress: '5678 Tech St, City',
    phone: '987-654-3210',
    email: 'contact@examplecorp.com',
    contactPerson: 'Jane Smith',
  },
  {
    id: 3,
    name: 'XYZ Corp',
    cnpj: '11.223.344/0001-55',
    industry: 'Finance',
    hqAddress: '9876 Finance St, City',
    phone: '555-555-5555',
    email: 'contact@xyzcorp.com',
    contactPerson: 'Bob Johnson',
  },
  {
    id: 4,
    name: 'ABC Corp',
    cnpj: '99.888.777/0001-33',
    industry: 'Retail',
    hqAddress: '5432 Retail St, City',
    phone: '111-222-3333',
    email: 'contact@abccorp.com',
    contactPerson: 'Alice Brown',
  },
  {
    id: 5,
    name: 'DEF Corp',
    cnpj: '44.555.666/0001-44',
    industry: 'Healthcare',
    hqAddress: '8765 Healthcare St, City',
    phone: '999-888-7777',
    email: 'contact@defcorp.com',
    contactPerson: 'David Wilson',
  },
  {
    id: 6,
    name: 'GHI Corp',
    cnpj: '77.888.999/0001-66',
    industry: 'Education',
    hqAddress: '2345 Education St, City',
    phone: '333-444-5555',
    email: 'contact@ghicorp.com',
    contactPerson: 'Grace Thompson',
  },
  {
    id: 7,
    name: 'JKL Corp',
    cnpj: '22.333.444/0001-77',
    industry: 'Hospitality',
    hqAddress: '7654 Hospitality St, City',
    phone: '777-666-5555',
    email: 'contact@jklcorp.com',
    contactPerson: 'James Davis',
  },
  {
    id: 8,
    name: 'MNO Corp',
    cnpj: '66.777.888/0001-88',
    industry: 'Transportation',
    hqAddress: '1234 Transportation St, City',
    phone: '222-111-9999',
    email: 'contact@mnocorp.com',
    contactPerson: 'Mary Johnson',
  },
  {
    id: 9,
    name: 'PQR Corp',
    cnpj: '33.444.555/0001-99',
    industry: 'Energy',
    hqAddress: '9876 Energy St, City',
    phone: '444-333-2222',
    email: 'contact@pqrcorp.com',
    contactPerson: 'Peter Wilson',
  },
  {
    id: 10,
    name: 'STU Corp',
    cnpj: '55.666.777/0001-00',
    industry: 'Telecommunications',
    hqAddress: '5432 Telecom St, City',
    phone: '888-999-0000',
    email: 'contact@stucorp.com',
    contactPerson: 'Sarah Brown',
  },
]
