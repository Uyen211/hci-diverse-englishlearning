import React from 'react'
import { AlertCircle, Check } from 'lucide-react'

// Error Message component
export function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className="error-message text-error text-[12px] font-semibold mt-1 flex items-center gap-1.5">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{message}</span>
    </div>
  )
}

// Input component
export const Input = React.forwardRef(({
  label,
  error,
  required,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className={`text-[13px] font-bold ${error ? 'text-error' : 'text-text-primary'}`}>
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-surface text-text-primary font-sans text-[14px] px-4 py-3 rounded-lg border outline-hidden transition-all placeholder:text-text-secondary/60 placeholder:opacity-60 ${
          error
            ? 'border-dashed border-error bg-error/2 focus:border-error'
            : 'border-secondary/20 focus:border-primary'
        } ${className}`}
        {...props}
      />
      <ErrorMessage message={error} />
    </div>
  )
})

Input.displayName = 'Input'

// Textarea component
export const Textarea = React.forwardRef(({
  label,
  error,
  required,
  className = '',
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className={`text-[13px] font-bold ${error ? 'text-error' : 'text-text-primary'}`}>
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full bg-surface text-text-primary font-sans text-[14px] px-4 py-3 rounded-lg border outline-hidden transition-all resize-none leading-relaxed placeholder:text-text-secondary/60 placeholder:opacity-60 ${
          error
            ? 'border-dashed border-error bg-error/2 focus:border-error'
            : 'border-secondary/20 focus:border-primary'
        } ${className}`}
        {...props}
      />
      <ErrorMessage message={error} />
    </div>
  )
})

Textarea.displayName = 'Textarea'

// Select component
export const Select = React.forwardRef(({
  label,
  error,
  required,
  options = [],
  placeholder = 'Chọn một tùy chọn...',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className={`text-[13px] font-bold ${error ? 'text-error' : 'text-text-primary'}`}>
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <select
          ref={ref}
          className={`w-full bg-surface text-text-primary font-sans text-[14px] pl-4 pr-10 py-3 rounded-lg border outline-hidden transition-all appearance-none cursor-pointer ${
            error
              ? 'border-dashed border-error bg-error/2 focus:border-error'
              : 'border-secondary/20 focus:border-primary'
          } ${className}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235A5A7A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
            backgroundSize: '16px',
          }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <ErrorMessage message={error} />
    </div>
  )
})

Select.displayName = 'Select'

// Custom Checkbox component
export function Checkbox({
  checked = false,
  onChange = () => {},
  label,
  className = '',
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none ${className}`}>
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
          checked
            ? 'bg-primary border-primary text-white shadow-xs'
            : 'border-primary/25 bg-surface text-transparent'
        }`}
      >
        <Check className="w-3.5 h-3.5 stroke-[3.5]" />
      </div>
      {label && (
        <span className={`text-[14px] font-semibold transition-colors ${checked ? 'text-text-primary' : 'text-text-secondary'}`}>
          {label}
        </span>
      )}
    </label>
  )
}

// Custom Radio component
export function RadioList({
  label,
  options = [],
  value,
  onChange = () => {},
  error,
  required,
  className = '',
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className={`text-[13px] font-bold ${error ? 'text-error' : 'text-text-primary'}`}>
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className={`flex flex-col gap-3 ${className}`}>
        {options.map((opt) => {
          const isActive = opt.value === value
          return (
            <div
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <div
                className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isActive
                    ? 'border-primary bg-surface shadow-xs'
                    : 'border-primary/30 bg-surface'
                }`}
              >
                {isActive && (
                  <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                )}
              </div>
              <span
                className={`text-[14px] font-semibold transition-colors ${
                  isActive ? 'text-text-primary font-bold' : 'text-text-secondary group-hover:text-text-primary'
                }`}
              >
                {opt.label}
              </span>
            </div>
          )
        })}
      </div>
      <ErrorMessage message={error} />
    </div>
  )
}
