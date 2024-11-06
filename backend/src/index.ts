import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { userRouter } from './routes/user.routes'
import { contentRouter } from './routes/content.route'
// import { authRouter } from './routes/auth.route'
// import { jwt } from 'hono/jwt'
import env from './env'
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
  .use(
    `${basePath}/*`,
    jwt({
      secret: env.APP_SECRET,
    })
  )
  .get('/', (c) =>
    c.json({ message: `core api running on ${basePath}` })
  )
  .basePath(basePath)
  .route('/auth', authRouter)
  .route('/user', userRouter)
  .route('/content', userRouter)

export default app
export type AppType = typeof app

export function honoWithJwt() {
  return new Hono<{
    Variables: {
      jwtPayload: AuthSchema
    }
  }>()
}
