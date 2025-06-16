import React from 'react';
import { Input } from 'antd';
import BaseField from './BaseField';
import { TextFieldProps } from '../types';

export default function PasswordField({ 
  name, 
  label, 
  placeholder, 
  prefix,
  size = 'large',
  disabled = false,
  required = false,
  className,
  style
}: Omit<TextFieldProps, 'suffix' | 'maxLength' | 'showCount'>) {
  return (
    <BaseField
      name={name}
      label={label}
      required={required}
      className={className}
      style={style}
    >
      {(field, { error, isTouched, isSubmitted }) => (
        <Input.Password
          {...field}
          placeholder={placeholder}
          prefix={prefix}
          size={size}
          disabled={disabled}
          status={error && (isTouched || isSubmitted) ? 'error' : undefined}
          visibilityToggle
        />
      )}
    </BaseField>
  );
}