import React from 'react';
import { Input } from 'antd';
import BaseField from './BaseField';
import { TextAreaFieldProps } from '../types';

const { TextArea } = Input;

export default function TextAreaField({ 
  name, 
  label, 
  placeholder, 
  rows = 4,
  autoSize = false,
  maxLength,
  showCount = false,
  size = 'large',
  disabled = false,
  required = false,
  className,
  style
}: TextAreaFieldProps) {
  return (
    <BaseField
      name={name}
      label={label}
      required={required}
      className={className}
      style={style}
    >
      {(field, { error, isTouched, isSubmitted }) => (
        <TextArea
          {...field}
          placeholder={placeholder}
          rows={rows}
          autoSize={autoSize}
          maxLength={maxLength}
          showCount={showCount}
          size={size}
          disabled={disabled}
          status={error && (isTouched || isSubmitted) ? 'error' : undefined}
        />
      )}
    </BaseField>
  );
}