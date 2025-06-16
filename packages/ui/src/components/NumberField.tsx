import React from 'react';
import { InputNumber } from 'antd';
import BaseField from './BaseField';
import { NumberFieldProps } from '../types';

export default function NumberField({ 
  name, 
  label, 
  placeholder, 
  prefix,
  suffix,
  min: _min, // Игнорируем min для предотвращения автокоррекции
  max: _max, // Игнорируем max для предотвращения автокоррекции
  step = 1,
  precision,
  formatter,
  parser,
  size = 'large',
  disabled = false,
  required = false,
  className,
  style
}: NumberFieldProps) {
  return (
    <BaseField
      name={name}
      label={label}
      required={required}
      className={className}
      style={style}
    >
      {(field, { error, isTouched, isSubmitted }) => (
        <InputNumber
          {...field}
          placeholder={placeholder}
          prefix={prefix}
          suffix={suffix}
          step={step}
          precision={precision}
          formatter={formatter}
          parser={parser}
          size={size}
          disabled={disabled}
          status={error && (isTouched || isSubmitted) ? 'error' : undefined}
          style={{ width: '100%' }}
        />
      )}
    </BaseField>
  );
}