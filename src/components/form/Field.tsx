import type { ReactNode } from 'react';

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export default function Field({ id, label, required = false, error, children }: FieldProps) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      {children}
      <div className="field__error" role={error ? 'alert' : undefined}>
        {error}
      </div>
    </div>
  );
}
