import React from 'react'

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  active?: boolean
}

export default function NavButton({
  children,
  active,
  className,
  ...props
}: NavButtonProps) {
  return (
    <button
      className={`rounded-[10px] p-1 ${active ? 'shadow-[4px_4px_0px_#FF4A81] border-2 border-[#FF4A81] bg-[#FFE9ED]' : ''} ${className ? className : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
