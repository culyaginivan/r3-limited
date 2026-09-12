import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  invalid?: boolean;
};

export default function Input({
  id,
  invalid = false,
  ...props
}: InputProps) {
  return (
    <input
      className="input"
      id={id}
      name={id}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
