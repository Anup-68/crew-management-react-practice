
import React from 'react'
import clsx from 'clsx'

export type InputVariant = 'filled' | 'outlined' | 'ghost'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  variant?: InputVariant
  size?: InputSize
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  clearable?: boolean
  passwordToggle?: boolean
  id?: string
  name?: string
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'text-sm px-3 py-2 rounded-lg',
  md: 'text-base px-3.5 py-2.5 rounded-xl',
  lg: 'text-lg px-4 py-3 rounded-2xl',
}

const variantClasses: Record<InputVariant, string> = {
  filled: 'bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500',
  outlined: 'bg-transparent border border-gray-300 dark:border-gray-700 focus:border-blue-500',
  ghost: 'bg-transparent border border-transparent focus:border-blue-500',
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable,
  passwordToggle,
  id,
  name,
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const inputId = id || React.useId()
  const describedById = helperText || errorMessage ? `${inputId}-desc` : undefined
  const isPassword = type === 'password'

  const inputType = isPassword && passwordToggle ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block mb-1.5 text-sm font-medium text-gray-800 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className={clsx(
        'relative flex items-center',
      )}>
        <input
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-disabled={disabled || loading}
          aria-invalid={invalid || !!errorMessage}
          aria-describedby={describedById}
          type={inputType}
          className={clsx(
            'w-full outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'text-gray-900 dark:text-gray-100',
            variantClasses[variant],
            sizeClasses[size],
            (disabled || loading) && 'opacity-60 cursor-not-allowed',
            (invalid || errorMessage) && 'border-red-500 focus:border-red-500'
          )}
        />

        {loading && (
          <div className="absolute right-2" aria-hidden>
            <span className="spinner text-gray-500"></span>
          </div>
        )}

        {!loading && clearable && !!value && (
          <button
            type="button"
            onClick={() => onChange?.({ target: { value: '' } } as any)}
            aria-label="Clear input"
            className="absolute right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        )}

        {!loading && isPassword && passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className={clsx(
              'absolute',
              clearable && value ? 'right-8' : 'right-2',
              'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            )}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>

      {(helperText || errorMessage) && (
        <p
          id={describedById}
          className={clsx('mt-1 text-xs',
            errorMessage ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
          )}
          role={errorMessage ? 'alert' : undefined}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  )
}

export default InputField
