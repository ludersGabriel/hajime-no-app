import { userQueryOptions } from '@client/api/user/user.query'
import { useAuth } from '@client/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    const client = context.queryClient

    try {
      const data = await client.fetchQuery(userQueryOptions)

      return { user: data.user }
    } catch {
      throw redirect({
        to: '/',
      })
    }
  },
})

function AuthLayout() {
  const auth = useAuth()

  return (
    <>
      <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
        <p>Auth navbar</p>
        <button onClick={auth.logout}>Logout</button>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  )
}
