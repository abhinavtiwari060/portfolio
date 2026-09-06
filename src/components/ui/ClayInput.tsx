import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface ClayInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const ClayInput: React.FC<ClayInputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`clay-input px-4 py-3 text-sm placeholder:text-charcoal-500 w-full transition-all ${
          error ? "border-red-500/50 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400">{error}</span>}
      {helperText && !error && <span className="text-xs text-charcoal-400">{helperText}</span>}
    </div>
  );
};

interface ClayTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const ClayTextarea: React.FC<ClayTextareaProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  rows = 4,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={textareaId} className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`clay-input px-4 py-3 text-sm placeholder:text-charcoal-500 w-full resize-y transition-all ${
          error ? "border-red-500/50 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400">{error}</span>}
      {helperText && !error && <span className="text-xs text-charcoal-400">{helperText}</span>}
    </div>
  );
};

export default ClayInput;
