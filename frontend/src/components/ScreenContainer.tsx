import { LinkProps } from '@tanstack/react-router'
import Back from '../assets/back.svg'
import Gear from '../assets/gear.svg'
import PanelaLink from './PanelaLink'

interface ScreenContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  back?: boolean
  to?: LinkProps['to']
  params?: LinkProps['params']
  noHeader?: boolean
}

export default function ScreenContainer({
  children,
  title,
  back,
  noHeader,
  to,
  params,
  className,
  ...props
}: ScreenContainerProps) {
  return (
    <div
      className={`grid grid-rows-[auto_1fr] pt-3 gap-1 h-full ${className ?? ''}`}
      {...props}
    >
      {!noHeader && (
        <div className='flex items-center justify-between relative pb-3'>
          {back && (
            <img
              src={Back}
              alt='back'
              className='w-7 h-7 cursor-pointer absolute left-5'
              onClick={() => window.history.back()}
            />
          )}
          <h4 className='mx-auto text-center'>
            {title?.toUpperCase() || 'TITLE'}
          </h4>
          {to && (
            <PanelaLink
              className='cursor-pointer absolute right-5'
              to={to}
              params={params}
            >
              <img src={Gear} className='w-7 h-7' />
            </PanelaLink>
          )}
        </div>
      )}

      <div className='pb-3 px-[5%] overflow-auto'>{children}</div>
    </div>
  )
}
