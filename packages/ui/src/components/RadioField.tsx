import React from 'react';
import { Radio, Space } from 'antd';
import BaseField from './BaseField';
import { RadioFieldProps } from '../types';

export default function RadioField({ 
  name, 
  label, 
  options,
  direction = 'vertical',
  size = 'large',
  disabled = false,
  required = false,
  className,
  style
}: RadioFieldProps) {
  return (
    <BaseField
      name={name}
      label={label}
      required={required}
      className={className}
      style={style}
    >
      {(field, { error, isTouched, isSubmitted }) => (
        <Radio.Group
          {...field}
          size={size}
          disabled={disabled}
        >
          <Space direction={direction}>
            {options.map((option) => (
              <Radio 
                key={option.value} 
                value={option.value}
                disabled={option.disabled || disabled}
                style={{
                  color: (error && (isTouched || isSubmitted)) ? '#ff4d4f' : undefined
                }}
              >
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      )}
    </BaseField>
  );
}