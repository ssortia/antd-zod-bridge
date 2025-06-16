import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1, { FormHTMLAttributes } from 'react';
import { FieldValues, UseFormProps, ControllerRenderProps, FieldError } from 'react-hook-form';
import { ZodSchema, z } from 'zod';

/**
 * Типы для кастомизации стилей компонентов
 */
interface StyleClasses {
    /** Основной контейнер поля */
    field?: string;
    /** Метка поля */
    label?: string;
    /** Метка поля в состоянии ошибки */
    labelError?: string;
    /** Индикатор обязательного поля */
    labelRequired?: string;
    /** Контейнер сообщения об ошибке */
    error?: string;
    /** Контейнер элемента ввода */
    input?: string;
}
interface FormStyleClasses {
    /** Основной контейнер формы */
    form?: string;
    /** Контейнер содержимого формы */
    content?: string;
}
/**
 * Пропы для кастомизации стилей
 */
interface StyleProps {
    /** Кастомные CSS классы */
    classes?: StyleClasses;
    /** Inline стили (для обратной совместимости) */
    style?: React.CSSProperties;
    /** CSS класс (для обратной совместимости) */
    className?: string;
}

type ValidationMode = 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
interface ZodFormProps<TFieldValues extends FieldValues = FieldValues> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    schema: ZodSchema<TFieldValues>;
    onSubmit: (data: TFieldValues) => void | Promise<void>;
    children: React$1.ReactNode;
    validationMode?: ValidationMode;
    defaultValues?: UseFormProps<TFieldValues>['defaultValues'];
    resetAfterSubmit?: boolean;
    /** Кастомные CSS классы для формы */
    classes?: FormStyleClasses;
}
/**
 * Компонент формы с интегрированной валидацией Zod
 * Автоматически настраивает русскую локализацию ошибок
 */
declare function ZodForm<TFieldValues extends FieldValues = FieldValues>({ schema, onSubmit, children, validationMode, defaultValues, resetAfterSubmit, className, style, classes, ...formProps }: ZodFormProps<TFieldValues>): react_jsx_runtime.JSX.Element;

/**
 * Базовые свойства для всех полей формы
 */
interface BaseFieldProps {
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
    style?: React$1.CSSProperties;
    /** Кастомные CSS классы для детальной стилизации */
    classes?: StyleClasses;
}
interface TextFieldProps extends BaseFieldProps {
    placeholder?: string;
    prefix?: React$1.ReactNode;
    suffix?: React$1.ReactNode;
    maxLength?: number;
    showCount?: boolean;
}
interface NumberFieldProps extends BaseFieldProps {
    placeholder?: string;
    prefix?: React$1.ReactNode;
    suffix?: React$1.ReactNode;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    formatter?: (value: number | string | undefined) => string;
    parser?: (value: string | undefined) => number;
}
interface SelectOption {
    label: React$1.ReactNode;
    value: string | number;
    disabled?: boolean;
}
interface SelectFieldProps extends BaseFieldProps {
    placeholder?: string;
    options: SelectOption[];
    mode?: 'multiple' | 'tags';
    allowClear?: boolean;
    showSearch?: boolean;
    filterOption?: (input: string, option?: SelectOption) => boolean;
}
interface CheckboxFieldProps extends Omit<BaseFieldProps, 'label'> {
    children: React$1.ReactNode;
}
interface RadioOption {
    label: React$1.ReactNode;
    value: string | number;
    disabled?: boolean;
}
interface RadioFieldProps extends BaseFieldProps {
    options: RadioOption[];
    direction?: 'horizontal' | 'vertical';
}
interface DateFieldProps extends BaseFieldProps {
    placeholder?: string;
    format?: string;
    showTime?: boolean;
    disabledDate?: (current: any) => boolean;
}
interface TextAreaFieldProps extends BaseFieldProps {
    placeholder?: string;
    rows?: number;
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
    maxLength?: number;
    showCount?: boolean;
}

interface BaseFieldWrapperProps extends BaseFieldProps {
    children: (field: ControllerRenderProps, fieldState: {
        error: FieldError | undefined;
        isDirty: boolean;
        isTouched: boolean;
        isValid: boolean;
    }) => React$1.ReactElement;
    /** Кастомные CSS классы для стилизации */
    classes?: StyleClasses;
}
/**
 * Базовый компонент поля формы
 * Обеспечивает единообразное отображение лейблов, ошибок валидации и обязательности полей
 */
declare function BaseFieldComponent({ name, label, required, className, style, classes, children }: BaseFieldWrapperProps): react_jsx_runtime.JSX.Element;
declare const BaseField: React$1.MemoExoticComponent<typeof BaseFieldComponent>;

/**
 * Компонент текстового поля с валидацией
 * Использует Ant Design Input с интеграцией в react-hook-form
 */
declare function TextFieldComponent({ name, label, placeholder, prefix, suffix, maxLength, showCount, size, disabled, required, className, style, classes }: TextFieldProps): react_jsx_runtime.JSX.Element;
declare const TextField: React$1.MemoExoticComponent<typeof TextFieldComponent>;

declare function PasswordField({ name, label, placeholder, prefix, size, disabled, required, className, style }: Omit<TextFieldProps, 'suffix' | 'maxLength' | 'showCount'>): react_jsx_runtime.JSX.Element;

declare function TextAreaField({ name, label, placeholder, rows, autoSize, maxLength, showCount, size, disabled, required, className, style }: TextAreaFieldProps): react_jsx_runtime.JSX.Element;

declare function NumberField({ name, label, placeholder, prefix, suffix, min, max, step, precision, formatter, parser, size, disabled, required, className, style }: NumberFieldProps): react_jsx_runtime.JSX.Element;

declare function SelectField({ name, label, placeholder, options, mode, allowClear, showSearch, filterOption, size, disabled, required, className, style }: SelectFieldProps): react_jsx_runtime.JSX.Element;

declare function RadioField({ name, label, options, direction, size, disabled, required, className, style }: RadioFieldProps): react_jsx_runtime.JSX.Element;

declare function CheckboxField({ name, children, disabled, className, style }: Omit<CheckboxFieldProps, 'size'>): react_jsx_runtime.JSX.Element;

/**
 * Компонент поля выбора даты с валидацией
 * Автоматически конвертирует dayjs объекты в нативные Date для совместимости с Zod
 */
declare function DateFieldComponent({ name, label, placeholder, format, showTime, disabledDate, size, disabled, required, className, style }: DateFieldProps): react_jsx_runtime.JSX.Element;
declare const DateField: React$1.MemoExoticComponent<typeof DateFieldComponent>;

interface UseFormFieldReturn {
    field: any;
    error: FieldError | undefined;
    isDirty: boolean;
    isTouched: boolean;
    isValid: boolean;
}
/**
 * Hook для работы с полем формы
 * Предоставляет удобный интерфейс для получения состояния поля
 */
declare const useFormField: (name: string) => UseFormFieldReturn;

/**
 * Утилиты для работы с полями формы
 */
/**
 * Проверяет, есть ли ошибка у поля
 */
declare const hasError: (error: any) => boolean;
/**
 * Получает статус поля для Ant Design компонентов
 */
declare const getFieldStatus: (error: any) => "error" | undefined;
/**
 * Форматирует сообщение об ошибке
 */
declare const formatErrorMessage: (error: any) => string;
/**
 * Проверяет, является ли поле обязательным
 */
declare const isRequired: (required?: boolean) => boolean;

/**
 * Русская локализация для Zod
 * Предоставляет понятные сообщения об ошибках валидации на русском языке
 */
declare const zodRuLocale: z.ZodErrorMap;
declare const setupZodRuLocale: () => void;

export { BaseField, type BaseFieldProps, CheckboxField, type CheckboxFieldProps, DateField, type DateFieldProps, type FormStyleClasses, NumberField, type NumberFieldProps, PasswordField, RadioField, type RadioFieldProps, type RadioOption, SelectField, type SelectFieldProps, type SelectOption, type StyleClasses, type StyleProps, TextAreaField, type TextAreaFieldProps, TextField, type TextFieldProps, ZodForm, formatErrorMessage, getFieldStatus, hasError, isRequired, setupZodRuLocale, useFormField, zodRuLocale };
