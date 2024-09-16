import { authInputSchema } from '@/db/repo/auth.repo'
import { AuhtService } from '@/services/auth.service'
import { HttpStatus, hajimeError } from '@/services/error.service'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import Container from 'typedi'

const service = Container.get(AuhtService)

export const authRouter = new Hono().post(
  '/',
  zValidator('json', authInputSchema),
  async (c) => {
    try {
      const input = await c.req.valid('json')

      const token = await service.login(input)

      return c.json({ token })
    } catch (e) {
      console.log(e)

      return c.json(
        hajimeError({
          status: 'error',
          code: HttpStatus.NOT_FOUND,
          message: 'Invalid or inexistent user',
          path: c.req.routePath,
          suggestion: 'Check your credentials',
        }),
        HttpStatus.NOT_FOUND
      )
    }
  }
)
