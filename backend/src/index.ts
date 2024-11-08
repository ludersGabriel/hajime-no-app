import 'reflect-metadata'
import env from './env'

import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { userRouter } from './routes/user.routes'
import type { AuthSchema } from './db/repo/auth.repo'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { authRouter } from './routes/auth.route'
import { jwt } from 'hono/jwt'

const basePath = '/api/v1'
const app = new Hono()
  .use('*', logger())
  .use('*', prettyJSON())
  .use('*', cors())
  .use(`${basePath}/*`, (c, next) => {
    if (c.req.path.startsWith(`${basePath}/auth`)) {
      return next()
    }
    return jwt({
      secret: env.APP_SECRET,
    })(c, next)
  })
  .get('/', (c) =>
    c.json({ message: `core api running on ${basePath}` })
  )
  .basePath(basePath)
  .route('/auth', authRouter)
  .route('/user', userRouter)

export default app
export type AppType = typeof app

export function honoWithJwt() {
  return new Hono<{
    Variables: {
      jwtPayload: AuthSchema
    }
  }>()
}
