import * as React from 'react'
import {
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import { QueryClient } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

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
      <TanStackRouterDevtools
        position='bottom-right'
        initialIsOpen={false}
      />
    </>
  )
}
