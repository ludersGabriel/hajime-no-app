import ClassService from '@/services/class.service'
import Container from 'typedi'
import { honoWithJwt } from '..'
import { zValidator } from '@hono/zod-validator'
import { classSchemas } from '@/db/schema/class.model'
import { hajimeError, HttpStatus } from '@/services/error.service'
import { stringParamSchema } from './util'

const service = Container.get(ClassService)

export const classRouter = honoWithJwt()
  .post(
    '/create',
    zValidator('json', classSchemas.input),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const classRet = classSchemas.dto.parse(
          await service.create(context, input)
        )

        return c.json({ class: classRet })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not create class',
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
    zValidator('json', classSchemas.update),
    async (c) => {
      try {
        const context = await c.get('jwtPayload')
        const input = await c.req.valid('json')

        const classRet = classSchemas.dto.parse(
          await service.update(context, input)
        )

        return c.json({ calss: classRet })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not update class',
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

        const classRet = classSchemas.dto.parse(
          await service.delete(context, id)
        )

        return c.json({ class: classRet })
      } catch {
        return c.json(
          hajimeError({
            status: 'error',
            message: 'could not delete class',
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

      const classRet = classSchemas.dto.parse(
        await service.find(context, id)
      )

      return c.json({ class: classRet })
    } catch {
      return c.json(
        hajimeError({
          status: 'error',
          message: 'could not find class',
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

      const classes = classSchemas.dto
        .array()
        .parse(await service.findMany(context))

      return c.json({ classes })
    } catch {
      return c.json(
        hajimeError({
          status: 'error',
          message: 'could not find classes',
          code: HttpStatus.NOT_FOUND,
          path: c.req.routePath,
          suggestion: 'check the input and try again',
        }),
        HttpStatus.BAD_REQUEST
      )
    }
  })
