import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

import { ZodError, z } from 'zod'

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === 'true'
  })
  .default('false')

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string(),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
  APP_SECRET: z.string(),

  S3_REGION: z.string(),
  S3_ADDRESS: z.string(),
  S3_ACCESSKEY_USER: z.string(),
  S3_ACCESSKEY_PASS: z.string(),
  S3_BUCKET: z.string(),

  MINIO_ADDRESS: z.string(),
  MINIO_PORT: z.coerce.number(),
})

export type EnvSchema = z.infer<typeof EnvSchema>

expand(config())

try {
  EnvSchema.parse(process.env)
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n'
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n'
    })

    const e = new Error(message)
    console.log(process.env)

    e.stack = ''
    throw e
  } else {
    console.log(error)
  }
}

export default EnvSchema.parse(process.env)
