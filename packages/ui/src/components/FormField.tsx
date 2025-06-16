import React from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { Input } from 'antd';

interface FormFieldProps {
  name: string;
  label: string;
  prefix?: React.ReactNode;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  type?: 'text' | 'password';
}

export default function FormField({ 
  name, 
  label, 
  prefix, 
  placeholder, 
  size = 'large',
  type = 'text'
}: FormFieldProps) {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });
  const error = errors[name];

  return (
    <div>
      <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const InputComponent = type === 'password' ? Input.Password : Input;
          return (
            <InputComponent
              {...field}
              prefix={prefix}
              placeholder={placeholder}
              size={size}
              status={error ? 'error' : ''}
            />
          );
        }}
      />
      {error && (
        <div style={{ color: '#ff4d4f', fontSize: 14, marginTop: 4 }}>
          {error.message as string}
        </div>
      )}
    </div>
  );
}