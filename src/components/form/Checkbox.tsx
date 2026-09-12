import React, { type InputHTMLAttributes } from 'react';
import './Checkbox.css';
import Icon from './Icon';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  ...props
}) => {
  return (
    <label htmlFor={id} className="checkbox-label">
      <input
        type="checkbox"
        id={id}
        name={id}
        aria-required={props.required ? 'true' : undefined}
        {...props}
      />
      <span className="custom-checkbox" aria-hidden="true">
        <Icon name="checked"/>
      </span>
      <span className="checkbox-text">{label}</span>
    </label>
  );
};
