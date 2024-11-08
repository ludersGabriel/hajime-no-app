import * as React from 'react'
import {
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import { QueryClient } from '@tanstack/react-query'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      {/* {import.meta.env.MODE === 'development' && (
        <TanStackRouterDevtools
          position='top-right'
          initialIsOpen={false}
        />
      )} */}
    </>
  )
}
