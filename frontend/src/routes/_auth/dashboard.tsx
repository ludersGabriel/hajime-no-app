import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

export default function Dashboard() {
  const { user } = Route.useRouteContext()

  return (
    <div className='bg-red-400 flex justify-center align-middle items-center'>
      <p>Welcome to the dashboard, {user.user_id}</p>
    </div>
  )
}
