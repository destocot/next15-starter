import * as v from 'valibot'

const ServerEnvSchema = v.pipe(
  v.object({
    NODE_ENV: v.picklist(['development', 'production']),
  }),
  v.check(
    () => typeof window === 'undefined',
    'Server environment variables can only be used in the server',
  ),
)

const serverEnv = v.parse(ServerEnvSchema, {
  NODE_ENV: process.env.NODE_ENV,
})

export default serverEnv
