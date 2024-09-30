import {
  queryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { api } from '..'

export const userQueryOptions = queryOptions({
  queryKey: ['user'],
  queryFn: me,
  staleTime: Infinity,
})

export function useUser(token: string | undefined) {
  useQueryClient()

  return useQuery({
    ...userQueryOptions,
    enabled: !!token,
  })
}

async function me() {
  const token = localStorage.getItem('corax-token')

  if (!token) throw new Error('No token')

  const resp = await api.user.$get(undefined, {
    headers: { authorization: `Bearer ${token}` },
  })

  if (!resp.ok) throw new Error('Not authenticated')

  return resp.json()
}
