import React, { useState, forwardRef, Ref } from 'react'
import EyeHide from '../assets/eye-hide.png'
import EyeShow from '../assets/eye-show.png'

interface BaseInputProps
  extends React.InputHTMLAttributes<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > {
  label?: string
  error?: string
  isTextarea?: boolean
}

interface DropdownInputProps extends BaseInputProps {
  isDropdown: true
  options: {
    label: string
    value: string
  }[] // Required when isDropdown is true
}

interface TextInputProps extends BaseInputProps {
  isDropdown?: false // Optional when not a dropdown
  options?: never // Cannot have options when not a dropdown
}

type PanelaInputProps = DropdownInputProps | TextInputProps

const PanelaInput = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  PanelaInputProps
>(
  (
    {
      className,
      label,
      type,
      error,
      isDropdown,
      options,
      isTextarea,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const togglePasswordVisibility = (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault()
      setShowPassword((prev) => !prev)
    }

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsFocused(false)
      }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) =>
      e.preventDefault()

    const defStyles = () => {
      let styles = 'border-2 border-black shadow-[4px_4px_0px_#000000]'

      if (error) {
        styles =
          'border-2 border-[#F02424] focus:border-[#F02424] focus:ring-1 focus:ring-[#F02424] shadow-[4px_4px_0px_#EA4335] border-[#EA4335]'
      }

      if (isFocused) {
        styles =
          'border-2 border-[#7556DF] focus:border-[#7556DF] focus:ring-1 focus:ring-[#7556DF] shadow-[4px_4px_0px_#7556DF] border-[#7556DF]'
      }

      styles +=
        ' rounded-[10px] p-4 w-full bg-[#fdf8ee] focus:outline-none normal-case text-[#000000]'
      return styles
    }

    const defColor = () => {
      if (isFocused) return 'text-[#7556DF]'
      if (!error) return 'text-[#000000]'
      return 'text-[#F02424]'
    }

    return (
      <div
        className='relative w-full'
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {(label || error) && (
          <label
            className={`absolute -top-3 left-3 bg-[#fdf8ee] px-2 text-[14px] ${defColor()}`}
          >
            <b>{error || label}</b>
          </label>
        )}

        {isDropdown ? (
          <select
            ref={ref as Ref<HTMLSelectElement>}
            className={`${defStyles()} ${className ?? ''} `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : isTextarea ? (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            className={`${defStyles()} ${className ?? ''}`}
            rows={8}
            {...props}
          />
        ) : (
          <input
            ref={ref as Ref<HTMLInputElement>}
            type={showPassword && type === 'password' ? 'text' : type}
            className={`${defStyles()} ${className ?? ''}`}
            {...props}
          />
        )}

        {type === 'password' && isFocused && (
          <button
            type='button'
            onMouseDown={handleMouseDown}
            onClick={togglePasswordVisibility}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600'
          >
            <img
              src={showPassword ? EyeHide : EyeShow}
              alt={showPassword ? 'Hide password' : 'Show password'}
              className='w-8 fill-black'
            />
          </button>
        )}
      </div>
    )
  }
)

export default PanelaInput
