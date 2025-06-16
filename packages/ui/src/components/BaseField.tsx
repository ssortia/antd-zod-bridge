import React, { memo, useMemo } from 'react';
import { Controller, ControllerRenderProps, FieldError, useFormContext } from 'react-hook-form';
import { BaseFieldProps } from '../types';
import { StyleClasses } from '../types/styles';
import { useFormField } from '../hooks/useFormField';

interface BaseFieldWrapperProps extends BaseFieldProps {
  children: (field: ControllerRenderProps, fieldState: {
    error: FieldError | undefined;
    isDirty: boolean;
    isTouched: boolean;
    isValid: boolean;
    isSubmitted: boolean;
  }) => React.ReactElement;
  /** Кастомные CSS классы для стилизации */
  classes?: StyleClasses;
}

/**
 * Базовый компонент поля формы
 * Обеспечивает единообразное отображение лейблов, ошибок валидации и обязательности полей
 */
function BaseFieldComponent({
  name,
  label,
  required = false,
  className,
  style,
  classes,
  children
}: BaseFieldWrapperProps) {
  const { control } = useFormContext();
  const { error, isDirty, isTouched, isValid, isSubmitted } = useFormField(name);

  const fieldState = useMemo(() => ({
    error,
    isDirty,
    isTouched,
    isValid,
    isSubmitted,
  }), [error, isDirty, isTouched, isValid, isSubmitted]);

  // Собираем CSS классы
  const fieldClassName = [
    'azb-field',
    classes?.field,
    className
  ].filter(Boolean).join(' ');

  const labelClassName = [
    'azb-field-label',
    error && (isTouched || isSubmitted) && 'azb-field-label--error',
    error && (isTouched || isSubmitted) && classes?.labelError,
    classes?.label
  ].filter(Boolean).join(' ');

  const errorClassName = [
    'azb-field-error',
    classes?.error
  ].filter(Boolean).join(' ');

  return (
    <div className={fieldClassName} style={style}>
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && (
          <span className={`azb-field-label-required ${classes?.labelRequired || ''}`}>
            *
          </span>
        )}
      </label>
      
      <div className={classes?.input}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const childElement = children(field, fieldState);
            // Добавляем id к дочернему элементу для связи с label
            return React.cloneElement(childElement as React.ReactElement<any>, {
              id: name
            });
          }}
        />
      </div>
      
      <div className={errorClassName}>
        {(error && (isTouched || isSubmitted)) ? error.message : ''}
      </div>
    </div>
  );
}

export const BaseField = memo(BaseFieldComponent);
export default BaseField;