import { userSchemas } from '@/db/schema/user.model'
import { UserService } from '@/services/user.service'
import { Container } from 'typedi'
import { zValidator } from '@hono/zod-validator'
import { honoWithJwt } from '..'
import { hajimeError, HttpStatus } from '@/services/error.service'
import { stringParamSchema } from './util'

const service = Container.get(UserService)

export const userRouter = honoWithJwt()
  .post(
    '/create',
    zValidator('json', userSchemas.input),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const user = userSchemas.dto.parse(
          await service.create(context, input)
        )

        return c.json({ user })
      } catch {
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
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const user = userSchemas.dto.parse(
          await service.update(context, input)
        )

        return c.json({ user })
      } catch {
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
  .delete(
    '/delete/:id',
    zValidator('param', stringParamSchema),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const { id } = await c.req.valid('param')

        const user = userSchemas.dto.parse(
          await service.delete(context, id)
        )

        return c.json({ user })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not delete user',
            code: HttpStatus.BAD_REQUEST,
            path: c.req.routePath,
            suggestion: 'check the input and try again',
          }),
          HttpStatus.BAD_REQUEST
        )
      }
    }
  )
  .get('/:id', zValidator('param', stringParamSchema), async (c) => {
    try {
      const context = await c.get('jwtPayload')
      const { id } = await c.req.valid('param')

      const user = userSchemas.dto.parse(
        await service.find(context, id)
      )

      return c.json({ user })
    } catch {
      return c.json(
        hajimeError({
          status: 'error',
          message: 'could not find user',
          code: HttpStatus.NOT_FOUND,
          path: c.req.routePath,
          suggestion: 'check the input and try again',
        }),
        HttpStatus.BAD_REQUEST
      )
    }
  })
  .get('/', async (c) => {
    try {
      const context = await c.get('jwtPayload')
      const user = userSchemas.dto.parse(await service.me(context))

      return c.json({ user })
    } catch {
      return c.json(
        hajimeError({
          status: 'error',
          message: 'Not authorized',
          code: HttpStatus.UNAUTHORIZED,
          path: c.req.routePath,
          suggestion: 'Make sure you have the correct role',
        }),
        HttpStatus.BAD_REQUEST
      )
    }
  })
