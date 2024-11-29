import * as v from 'valibot'

const ClientEnvSchema = v.pipe(
  v.object({
    NEXT_PUBLIC_BASE_URL: v.pipe(v.string(), v.nonEmpty()),
  }),
  v.check(
    (input) => Object.keys(input).every((i) => i.startsWith('NEXT_PUBLIC_')),
    'Environment variables for the client must start with NEXT_PUBLIC_',
  ),
)

const clientEnv = v.parse(ClientEnvSchema, {
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
})

export default clientEnv
