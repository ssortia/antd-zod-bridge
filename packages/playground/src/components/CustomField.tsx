import React from 'react';
import { Input, Alert } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { hasError, getFieldStatus, formatErrorMessage, isRequired } from '@my/ui';

interface CustomFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

/**
 * Пример кастомного поля с использованием fieldHelpers
 * Демонстрирует как использовать утилиты из библиотеки
 */
export function CustomField({ name, label, placeholder, required = false }: CustomFieldProps) {
  const { control, formState: { errors } } = useFormContext();
  const fieldError = errors[name];

  // Используем утилиты из fieldHelpers
  const hasFieldError = hasError(fieldError);
  const fieldStatus = getFieldStatus(fieldError);
  const errorMessage = formatErrorMessage(fieldError);
  const fieldRequired = isRequired(required);

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ 
        display: 'block', 
        marginBottom: 4, 
        fontWeight: 500,
        color: hasFieldError ? '#ff4d4f' : undefined 
      }}>
        {label}
        {fieldRequired && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
      </label>
      
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={placeholder}
            status={fieldStatus}
            style={{ width: '100%' }}
          />
        )}
      />
      
      {hasFieldError && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{ marginTop: 8 }}
        />
      )}
      
      {/* Демонстрация использования утилит */}
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        <div>hasError: {hasFieldError.toString()}</div>
        <div>fieldStatus: {fieldStatus || 'undefined'}</div>
        <div>isRequired: {fieldRequired.toString()}</div>
      </div>
    </div>
  );
}