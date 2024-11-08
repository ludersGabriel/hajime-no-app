import React from 'react'

interface PanelaModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const PanelaModal = React.forwardRef<
  HTMLDivElement,
  PanelaModalProps
>(
  (
    { title, isOpen, onClose, children, className, ...props },
    ref
  ) => {
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    }

    if (!isOpen) return null

    return (
      <div
        className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
        onClick={handleClose}
      >
        <div
          ref={ref}
          className={`bg-[#FDF8EE] rounded-lg w-11/12 max-w-md relative pt-3 ${className}`}
          {...props}
        >
          <h2 className='text-2xl font-medium text-center mb-4'>
            {title}
          </h2>
          <div className='overflow-y-auto max-h-[50vh] px-[5%] pb-3'>
            {children}
          </div>
        </div>
      </div>
    )
  }
)

export default PanelaModal
