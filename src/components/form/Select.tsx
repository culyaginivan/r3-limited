import { useEffect, useRef, useState, type ReactNode } from 'react';
import Icon from './Icon';

export type Option = {
  value: string;
  label: string;
  icon?: string;
  hint?: string;
  disabled?: boolean;
};

type SelectProps = {
  id: string;
  value: string;
  options: Option[];
  placeholder: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  selectedTemplate?: (option: Option | undefined) => ReactNode;
  optionTemplate?: (option: Option) => ReactNode;
};

export default function Select({
  id,
  value,
  ariaLabel,
  options,
  placeholder,
  onChange,
  className = '',
  disabled = false,
  selectedTemplate,
  optionTemplate,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const choose = (option: Option) => {
    if (!option.disabled) {
      onChange(option.value);
      setOpen(false);
    }
  };

  return (
    <div className={`select-root ${open ? 'select-root--open' : ''} ${className}`} ref={rootRef}>
      <input type="hidden" name={id} value={value} />
      <button
        className="select"
        id={id}
        type="button"
        role="combobox"
        aria-controls={`${id}-options`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={selected?.label ?? ariaLabel ?? placeholder}
        disabled={disabled}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span className={`select__content ${selected ? '' : 'list-placeholder'}`}>
          {selectedTemplate ? (
            selectedTemplate(selected)
          ) : (
            <>
              {selected?.icon && <Icon className="select__icon" name={selected.icon} />}
              {selected?.label ?? placeholder}
            </>
          )}
        </span>
        <Icon className="chevron" name="chevron" />
      </button>
      {open && (
        <ul className="select__options" id={`${id}-options`} role="listbox">
          {options.map((option) => (
            <li
              className={`select__option ${option.value === value ? 'list-selected' : ''} ${option.disabled ? 'list-disabled' : ''}`}
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled || undefined}
              tabIndex={option.disabled ? -1 : 0}
              onClick={() => choose(option)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  choose(option);
                }
              }}
            >
              {optionTemplate ? (
                optionTemplate(option)
              ) : (
                <>
                  {option.icon && <Icon className="select__icon" name={option.icon} />}
                  <span>{option.label}</span>
                  {option.hint && <span className="select__hint">{option.hint}</span>}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
