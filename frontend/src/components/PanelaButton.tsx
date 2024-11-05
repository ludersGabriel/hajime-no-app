import React from 'react'

interface PanelaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
}

export default function PanelaButton({
  children,
  className,
  loading,
  ...props
}: PanelaButtonProps) {
  return (
    <button
      className={`rounded-[10px] p-2 bg-[#FF4A81] text-white shadow-[4px_4px_0px_#000000] active:bg-[#7556DF] border-2 border-black w-full overflow-hidden ${loading ? 'cursor-not-allowed bg-gray-500' : ''} ${className ? className : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
