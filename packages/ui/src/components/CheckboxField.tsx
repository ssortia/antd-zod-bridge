import React from 'react';
import { Checkbox } from 'antd';
import { Controller, useFormContext, useFormState, FieldError } from 'react-hook-form';
import { CheckboxFieldProps } from '../types';

export default function CheckboxField({ 
  name, 
  children,
  disabled = false,
  className,
  style
}: Omit<CheckboxFieldProps, 'size'>) {
  const { control } = useFormContext();
  const { errors, touchedFields, isSubmitted } = useFormState({ control });
  const error = errors[name] as FieldError | undefined;
  const isTouched = Boolean(touchedFields[name]);

  return (
    <div className={className} style={style}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, ...field } }) => (
          <Checkbox
            {...field}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            style={{
              color: (error && (isTouched || isSubmitted)) ? '#ff4d4f' : undefined
            }}
          >
            {children}
          </Checkbox>
        )}
      />
      {(error && (isTouched || isSubmitted)) && (
        <div style={{ 
          color: '#ff4d4f', 
          fontSize: 14, 
          marginTop: 4,
          lineHeight: 1.5
        }}>
          {error.message as string}
        </div>
      )}
    </div>
  );
}