import CheckinService from '@/services/checkin.service'
import Container from 'typedi'
import { honoWithJwt } from '..'
import { zValidator } from '@hono/zod-validator'
import { checkinSchemas } from '@/db/schema/checkin.model'
import { hajimeError, HttpStatus } from '@/services/error.service'
import { stringParamSchema } from './util'

const service = Container.get(CheckinService)

export const checkinRouter = honoWithJwt()
  .post(
    '/create',
    zValidator('json', checkinSchemas.input),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const checkin = checkinSchemas.dto.parse(
          await service.create(context, input)
        )

        return c.json({ checkin })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not checkin',
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
    zValidator('json', checkinSchemas.update),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const checkin = checkinSchemas.dto.parse(
          await service.update(context, input)
        )

        return c.json({ checkin })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not update checkin',
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

        const checkin = checkinSchemas.dto.parse(
          await service.delete(context, id)
        )

        return c.json({ checkin })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not delete checkin',
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

      const checkin = checkinSchemas.dto.parse(
        await service.find(context, id)
      )

      return c.json({ checkin })
    } catch {
      return c.json(
        hajimeError({
          status: 'error',
          message: 'could not find checkin',
          code: HttpStatus.BAD_REQUEST,
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
      const checkins = await service.findMany(context)
      return c.json({ checkins })
    } catch {
      return c.json(
        hajimeError({
          status: 'error',
          message: 'could not find checkins',
          code: HttpStatus.BAD_REQUEST,
          path: c.req.routePath,
          suggestion: 'check the input and try again',
        }),
        HttpStatus.BAD_REQUEST
      )
    }
  })
