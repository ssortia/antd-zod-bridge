import React, { memo } from 'react';
import { Input } from 'antd';
import { BaseField } from './BaseField';
import { TextFieldProps } from '../types';

/**
 * Компонент текстового поля с валидацией
 * Использует Ant Design Input с интеграцией в react-hook-form
 */
function TextFieldComponent({ 
  name, 
  label, 
  placeholder, 
  prefix, 
  suffix,
  maxLength,
  showCount = false,
  size = 'large',
  disabled = false,
  required = false,
  className,
  style,
  classes
}: TextFieldProps) {
  return (
    <BaseField
      name={name}
      label={label}
      required={required}
      className={className}
      style={style}
      classes={classes}
    >
      {(field, { error, isTouched, isSubmitted }) => (
        <Input
          {...field}
          placeholder={placeholder}
          prefix={prefix}
          suffix={suffix}
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

export const TextField = memo(TextFieldComponent);
export default TextField;