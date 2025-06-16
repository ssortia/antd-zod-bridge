import React, { memo, useCallback } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';
import { BaseField } from './BaseField';
import { DateFieldProps } from '../types';

// Устанавливаем русскую локаль для dayjs глобально
dayjs.locale('ru');

/**
 * Компонент поля выбора даты с валидацией
 * Автоматически конвертирует dayjs объекты в нативные Date для совместимости с Zod
 */
function DateFieldComponent({ 
  name, 
  label, 
  placeholder, 
  format = 'DD.MM.YYYY',
  showTime = false,
  disabledDate,
  size = 'large',
  disabled = false,
  required = false,
  className,
  style
}: DateFieldProps) {
  
  const handleDateChange = useCallback((date: Dayjs | null, field: any) => {
    // Конвертируем dayjs в нативный Date для Zod валидации
    field.onChange(date ? date.toDate() : null);
  }, []);

  const formatString = showTime ? `${format} HH:mm:ss` : format;

  return (
    <ConfigProvider locale={locale}>
      <BaseField
        name={name}
        label={label}
        required={required}
        className={className}
        style={style}
      >
        {(field, { error, isTouched, isSubmitted }) => (
          <DatePicker
            {...field}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => handleDateChange(date, field)}
            placeholder={placeholder}
            format={formatString}
            showTime={showTime}
            disabledDate={disabledDate}
            size={size}
            disabled={disabled}
            status={error && (isTouched || isSubmitted) ? 'error' : undefined}
            style={{ width: '100%' }}
          />
        )}
      </BaseField>
    </ConfigProvider>
  );
}

export const DateField = memo(DateFieldComponent);
export default DateField;