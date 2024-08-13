import db from '@/db'
import {
  userSchemas,
  type UserDto,
  type UserInput,
  type UserUpdate,
} from '@/db/schema/user.model'
import { describe, it, expect } from 'bun:test'
import { sql } from 'drizzle-orm'
import app from '..'
import { api, reqOptions } from './preload-tests'
import { HttpStatus } from '@/services/error.service'

describe('Test for user routes', async () => {
  const ret: { nextval: string }[] = await db.execute(
    sql<{
      nextval: string
    }>`select nextval('user_id_seq')`
  )
  const id = parseInt(ret[0].nextval)
  const base = `${api}/user`

  it('should create a new user', async () => {
    const input: UserInput = {
      id,
      storeId: 1,
      username: 'test',
      cpf: '99999999999',
      email: 'teste@mail.com',
      name: 'Test User',
      password: '1234mudar',
    }

    const res = await app.request(
      `${base}/create`,
      reqOptions({
        method: 'POST',
        body: JSON.stringify(input),
      })
    )
    expect(res.status).toBe(HttpStatus.OK)
    const data = (await res.json()) as { user: UserDto }
    userSchemas.dto.parse(data.user)
  })

  it('should update an user', async () => {
    const input: UserUpdate = {
      id,
      name: 'Test User Updated',
    }

    const res = await app.request(
      `${base}/update`,
      reqOptions({
        method: 'POST',
        body: JSON.stringify(input),
      })
    )
    expect(res.status).toBe(HttpStatus.OK)
    const data = (await res.json()) as { user: UserDto }
    userSchemas.dto.parse(data.user)
    expect(data.user.name).toBe(input.name!)
  })
})
