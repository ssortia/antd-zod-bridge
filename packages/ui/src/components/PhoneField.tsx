import React, { memo } from 'react';
import { Input } from 'antd';
import { BaseField } from './BaseField';
import { PhoneFieldProps } from '../types';
import { formatPhoneNumber, parsePhoneNumber } from '../utils/phoneUtils';

/**
 * Компонент поля для ввода телефона с маской для российских номеров
 * Использует Ant Design Input с интеграцией в react-hook-form
 */
function PhoneFieldComponent({ 
  name, 
  label, 
  placeholder = '+7 (___) ___-__-__', 
  prefix, 
  suffix,
  size = 'large',
  disabled = false,
  required = false,
  className,
  style,
  classes
}: PhoneFieldProps) {
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
          name={field.name}
          ref={field.ref}
          value={field.value ? formatPhoneNumber(field.value) : ''}
          onChange={(e) => {
            const parsed = parsePhoneNumber(e.target.value);
            field.onChange(parsed);
          }}
          onBlur={(e) => {
            // Call the original onBlur handler for validation
            field.onBlur();
          }}
          placeholder={placeholder}
          prefix={prefix}
          suffix={suffix}
          maxLength={18} // +7 (999) 999-99-99
          size={size}
          disabled={disabled}
          status={error && (isTouched || isSubmitted) ? 'error' : undefined}
        />
      )}
    </BaseField>
  );
}

export const PhoneField = memo(PhoneFieldComponent);