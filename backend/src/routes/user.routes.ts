import { userSchemas } from '@/db/schema/user.model'
import { UserService } from '@/services/user.service'
import { Container } from 'typedi'
import { zValidator } from '@hono/zod-validator'
// import { honoWithJwt } from '..'
import { hajimeError, HttpStatus } from '@/services/error.service'
import { Hono } from 'hono'

const service = Container.get(UserService)

export const userRouter = new Hono()
  .post(
    '/create',
    zValidator('json', userSchemas.input),
    async (c) => {
      try {
        const input = await c.req.valid('json')

        const user = userSchemas.dto.parse(
          await service.create(input)
        )

        return c.json({ user })
      } catch (e) {
        console.log(e)

        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not create user',
            code: HttpStatus.BAD_REQUEST,
            path: c.req.routePath,
            suggestion: 'check the input and try again',
          }),
          HttpStatus.BAD_REQUEST
        )
      }
    }
  )
  .post(
    '/update',
    zValidator('json', userSchemas.update),
    async (c) => {
      try {
        const input = await c.req.valid('json')

        const user = userSchemas.dto.parse(
          await service.update(input)
        )

        return c.json({ user })
      } catch (e) {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not update user',
            code: HttpStatus.BAD_REQUEST,
            path: c.req.routePath,
            suggestion: 'check the input and try again',
          }),
          HttpStatus.BAD_REQUEST
        )
      }
    }
  )
