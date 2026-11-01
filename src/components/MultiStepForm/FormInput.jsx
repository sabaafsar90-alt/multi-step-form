import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  icon: Icon,
  helperText,
  disabled = false,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full text-left">
      <div className="flex justify-between items-center mb-1.5">
        <label htmlFor={name} className="block text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        {helperText && !error && (
          <span className="text-xs text-slate-400">{helperText}</span>
        )}
      </div>

      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white py-2.5 px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 outline-none
            ${Icon ? 'pl-11' : 'pl-3.5'}
            ${isPassword ? 'pr-11' : 'pr-3.5'}
            ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 text-rose-900 bg-rose-50/20'
                : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10'
            }
            ${disabled ? 'bg-slate-100 cursor-not-allowed text-slate-500' : ''}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-600 font-medium animate-fadeIn">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  options = [],
  required = false,
  icon: Icon,
  helperText,
}) {
  return (
    <div className="w-full text-left">
      <div className="flex justify-between items-center mb-1.5">
        <label htmlFor={name} className="block text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        {helperText && !error && (
          <span className="text-xs text-slate-400">{helperText}</span>
        )}
      </div>

      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <select
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full rounded-xl border bg-white py-2.5 px-3 text-sm text-slate-900 transition-all duration-200 outline-none appearance-none cursor-pointer
            ${Icon ? 'pl-11' : 'pl-3.5'}
            pr-10
            ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20'
                : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10'
            }
          `}
        >
          <option value="" disabled>
            Select an option...
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-600 font-medium">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
