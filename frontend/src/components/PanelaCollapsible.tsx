import { useState } from 'react'

import Chevron from '../assets/chevron.svg'

interface PanelaCollapsibleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
}

export default function PanelaCollapsible({
  title,
  children,
  className,
  ...props
}: PanelaCollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`flex flex-col gap-5 ${className}`} {...props}>
      <div
        className='flex cursor-pointer items-start justify-between'
        onClick={toggleCollapse}
      >
        <div className='overflow-hidden'>
          <h1 className='font-medium text-2xl whitespace-normal break-words'>
            {title}
          </h1>
        </div>
        <img
          src={Chevron}
          alt='Chevron'
          className={`transform ${
            !isCollapsed ? 'rotate-180' : 'rotate-0'
          } transition-transform duration-300 w-7 h-7`}
        />
      </div>
      {!isCollapsed && children}
    </div>
  )
}
