import type { ReactNode } from 'react';

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
};

export default function Field({ id, label, required = false, error, children, className }: FieldProps) {
  return (
    <div className={`group field flex flex-col gap-1 ${error ? 'field--error' : ''} ${className ?? ''}`}>
      <label className="field__label text-[12px] leading-[14px] text-[var(--neutral-90)]" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      {children}
      <div className="field__error min-h-0 text-[var(--warning-80)] text-[12px] leading-[14px] group-[.field--error]:text-warning-80" role={error ? 'alert' : undefined}>
        {error}
      </div>
    </div>
  );
}
