import { AppType } from '@server/index'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { hc } from 'hono/client'

const url = import.meta.env.VITE_API

const client = hc<AppType>(`${url ? url : '/server'}`)
const api = client.api.v1

export { api, client }

export function useIndexQuery() {
  useQueryClient()

  return useQuery({
    queryKey: ['index'],
    queryFn: async () => {
      const resp = await client.index.$get()

      return resp.json()
    },
  })
}
