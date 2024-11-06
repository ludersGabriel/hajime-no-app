import ContentService from '@/services/content.service'
import Container from 'typedi'
import { honoWithJwt } from '..'
import { zValidator } from '@hono/zod-validator'
import { contentSchemas } from '@/db/schema/content.model'
import { hajimeError, HttpStatus } from '@/services/error.service'
import { stringParamSchema } from './util'

const service = Container.get(ContentService)

export const contentRouter = honoWithJwt()
  .post(
    '/create',
    zValidator('json', contentSchemas.input),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const contentRet = contentSchemas.dto.parse(
          await service.create(context, input)
        )

        return c.json({ class: contentRet })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not create content',
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
    zValidator('json', contentSchemas.update),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const contentRet = contentSchemas.dto.parse(
          await service.update(context, input)
        )

        return c.json({ calss: contentRet })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not update content',
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

        const contentRet = contentSchemas.dto.parse(
          await service.delete(context, id)
        )

        return c.json({ class: contentRet })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not delete content',
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

      const contentRet = contentSchemas.dto.parse(
        await service.find(context, id)
      )

      return c.json({ class: contentRet })
    } catch {
      return c.json(
        hajimeError({
          status: 'error',
          message: 'could not find content',
          code: HttpStatus.BAD_REQUEST,
          path: c.req.routePath,
          suggestion: 'check the input and try again',
        }),
        HttpStatus.BAD_REQUEST
      )
    }
  })
