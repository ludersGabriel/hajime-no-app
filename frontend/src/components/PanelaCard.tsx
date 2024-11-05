export interface PanelaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  label?: string
}

export default function PanelaCard({
  label,
  children,
  className,
  ...props
}: PanelaCardProps) {
  return (
    <div className='relative'>
      {label && (
        <label className='font-bold text-sm absolute left-3 bg-[#fdf8ee] px-2 -top-3'>
          {label}
        </label>
      )}
      <div
        className={`rounded-[10px] p-2 border-2 border-black bg-[#FDF8EE] shadow-[4px_4px_0px_#000000] overflow-hidden ${className ? className : ''}`}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
