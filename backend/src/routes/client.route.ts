import { ClientService } from '@/services/client.service'
import Container from 'typedi'
// import { honoWithJwt } from '..'
import { zValidator } from '@hono/zod-validator'
import { clientSchemas } from '@/db/schema/client.model'
import { HttpStatus, hajimeError } from '@/services/error.service'
import { numberParamSchema } from './util'
import { Hono } from 'hono'

const service = Container.get(ClientService)

export const clientRouter = new Hono()
  .post(
    '/create',
    zValidator('json', clientSchemas.input),
    async (c) => {
      try {
        const input = await c.req.valid('json')

        const client = clientSchemas.dto.parse(
          await service.create(input)
        )

        return c.json({ client })
      } catch (e) {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not create client',
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
    zValidator('json', clientSchemas.update),
    async (c) => {
      try {
        const input = await c.req.valid('json')

        const client = clientSchemas.dto.parse(
          await service.update(input)
        )

        return c.json({ client })
      } catch (e) {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not update client',
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
    '/delete/:id',
    zValidator('param', numberParamSchema),
    async (c) => {
      try {
        const { id } = c.req.valid('param')

        const client = clientSchemas.dto.parse(
          await service.delete(id)
        )

        return c.json({ client })
      } catch (e) {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not delete client',
            code: HttpStatus.BAD_REQUEST,
            path: c.req.routePath,
            suggestion: 'check the input and try again',
          }),
          HttpStatus.BAD_REQUEST
        )
      }
    }
  )
  .get('/:id', zValidator('param', numberParamSchema), async (c) => {
    try {
      const { id } = c.req.valid('param')

      const client = clientSchemas.dto.parse(await service.find(id))

      return c.json({ client })
    } catch (e) {
      return c.json(
        hajimeError({
          status: 'error',
          message: 'could not find client',
          code: HttpStatus.NOT_FOUND,
          path: c.req.routePath,
          suggestion: 'are you sure this client exists?',
        }),
        HttpStatus.NOT_FOUND
      )
    }
  })
