import SubscriptionService from '@/services/subscription.service'
import Container from 'typedi'
import { honoWithJwt } from '..'
import { zValidator } from '@hono/zod-validator'
import { subscriptionSchemas } from '@/db/schema/subscription.model'
import { hajimeError, HttpStatus } from '@/services/error.service'

const service = Container.get(SubscriptionService)

export const subscriptionRouter = honoWithJwt()
  .post(
    '/create',
    zValidator('json', subscriptionSchemas.input),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const subscription = subscriptionSchemas.dto.parse(
          await service.create(context, input)
        )

        return c.json({ subscription })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not create subscription',
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
    zValidator('json', subscriptionSchemas.update),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const subscription = subscriptionSchemas.dto.parse(
          await service.update(context, input)
        )

        return c.json({ subscription })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not update subscription',
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
    zValidator('json', subscriptionSchemas.find),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const subscription = subscriptionSchemas.dto.parse(
          await service.delete(context, input)
        )

        return c.json({ subscription })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not delete subscription',
            code: HttpStatus.BAD_REQUEST,
            path: c.req.routePath,
            suggestion: 'check the input and try again',
          }),
          HttpStatus.BAD_REQUEST
        )
      }
    }
  )
  .get(
    '/:id',
    zValidator('param', subscriptionSchemas.find),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('param')

        const subscription = subscriptionSchemas.dto.parse(
          await service.find(context, input)
        )

        return c.json({ subscription })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not find subscription',
            code: HttpStatus.BAD_REQUEST,
            path: c.req.routePath,
            suggestion: 'check the input and try again',
          }),
          HttpStatus.BAD_REQUEST
        )
      }
    }
  )
