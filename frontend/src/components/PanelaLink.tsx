/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react'
import { createLink, LinkComponent } from '@tanstack/react-router'

interface BasicLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

const BasicLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  BasicLinkProps
>((props, ref) => {
  return <a ref={ref} {...props} />
})

const CreatedLinkComponent = createLink(BasicLinkComponent)

const PanelaLink: LinkComponent<typeof BasicLinkComponent> = (
  props
) => {
  return <CreatedLinkComponent preload={false} {...props} />
}

export default PanelaLink
