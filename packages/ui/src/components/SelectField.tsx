import React from 'react';
import { Select } from 'antd';
import { BaseField } from './BaseField';
import { SelectFieldProps } from '../types';

export function SelectField({ 
  name, 
  label, 
  placeholder, 
  options,
  mode,
  allowClear = true,
  showSearch = false,
  filterOption,
  size = 'large',
  disabled = false,
  required = false,
  className,
  style
}: SelectFieldProps) {
  const defaultFilterOption = (input: string, option?: any) => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  };

  return (
    <BaseField
      name={name}
      label={label}
      required={required}
      className={className}
      style={style}
    >
      {(field, { error, isTouched, isSubmitted }) => (
        <Select
          {...field}
          placeholder={placeholder}
          options={options}
          mode={mode}
          allowClear={allowClear}
          showSearch={showSearch}
          filterOption={filterOption || (showSearch ? defaultFilterOption : false)}
          size={size}
          disabled={disabled}
          status={error && (isTouched || isSubmitted) ? 'error' : undefined}
          style={{ width: '100%' }}
        />
      )}
    </BaseField>
  );
}