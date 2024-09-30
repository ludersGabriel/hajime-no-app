import { AuthInput } from '@server/db/repo/auth.repo'
import { useMutation } from '@tanstack/react-query'
import { client } from '..'

export function useLogin() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (input: AuthInput) => {
      const resp = await client.auth.$post({ json: input })

      if (!resp.ok) throw new Error('Login failed')

      return resp.json()
    },
  })
}
