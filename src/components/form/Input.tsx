import type { ChangeEvent } from 'react';

type InputProps = {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
};

export default function Input({
  id,
  value,
  onChange,
  placeholder,
  disabled = false,
  invalid = false,
}: InputProps) {
  return (
    <input
      className="input"
      id={id}
      name={id}
      inputMode="decimal"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
    />
  );
}
