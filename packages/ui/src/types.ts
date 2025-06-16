import React from 'react';
import { StyleClasses } from './types/styles';

/**
 * Базовые свойства для всех полей формы
 */
export interface BaseFieldProps {
  /** Уникальное имя поля */
  name: string;
  /** Текст метки поля */
  label: string;
  /** Размер компонента */
  size?: 'small' | 'middle' | 'large';
  /** Отключить поле */
  disabled?: boolean;
  /** Обязательное поле (добавляет визуальный индикатор) */
  required?: boolean;
  /** CSS класс для кастомизации (legacy) */
  className?: string;
  /** Inline стили (legacy) */
  style?: React.CSSProperties;
  /** Кастомные CSS классы для детальной стилизации */
  classes?: StyleClasses;
}

export interface TextFieldProps extends BaseFieldProps {
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  maxLength?: number;
  showCount?: boolean;
}

export interface NumberFieldProps extends BaseFieldProps {
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  formatter?: (value: number | string | undefined) => string;
  parser?: (value: string | undefined) => number;
}

export interface SelectOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface SelectFieldProps extends BaseFieldProps {
  placeholder?: string;
  options: SelectOption[];
  mode?: 'multiple' | 'tags';
  allowClear?: boolean;
  showSearch?: boolean;
  filterOption?: (input: string, option?: SelectOption) => boolean;
}

export interface CheckboxFieldProps extends Omit<BaseFieldProps, 'label'> {
  children: React.ReactNode;
}

export interface RadioOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface RadioFieldProps extends BaseFieldProps {
  options: RadioOption[];
  direction?: 'horizontal' | 'vertical';
}

export interface DateFieldProps extends BaseFieldProps {
  placeholder?: string;
  format?: string;
  showTime?: boolean;
  disabledDate?: (current: any) => boolean;
}

export interface TextAreaFieldProps extends BaseFieldProps {
  placeholder?: string;
  rows?: number;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  maxLength?: number;
  showCount?: boolean;
}