import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { userRouter } from './routes/user.routes'
// import { authRouter } from './routes/auth.route'
// import { jwt } from 'hono/jwt'
import env from './env'
import type { AuthPayload } from './db/repo/auth.repo'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { clientRouter } from './routes/client.route'
import { swaggerUI } from '@hono/swagger-ui'
import { serveStatic } from 'hono/bun'

const app = new Hono()
const basePath = '/api/v1'

app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors())
// app.use(
//   `${basePath}/*`,
//   jwt({
//     secret: env.APP_SECRET,
//   })
// )

if (env.NODE_ENV === 'development') {
  app.use('/public/*', serveStatic({ root: './' }))
  app.get('/ui', swaggerUI({ url: '/public/openapi.json' }))
}

app.get('/', (c) =>
  c.json({ message: `core api running on ${basePath}` })
)
// app.route('auth', authRouter)

app
  .basePath(basePath)
  .route('/user', userRouter)
  .route('/client', clientRouter)

export default app
export type AppType = typeof app

export function honoWithJwt() {
  return new Hono<{
    Variables: {
      jwtPayload: AuthPayload
    }
  }>()
}
