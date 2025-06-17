import React, { FormHTMLAttributes } from 'react';
import { FieldValues, FormProvider, useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStyleClasses } from '../types/styles';
import { setupZodRuLocale } from "../locale";
import { ZodType } from "zod";

type ValidationMode = 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';

interface ZodFormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  schema: ZodType<any, any, TFieldValues>;
  onSubmit: (data: TFieldValues) => void | Promise<void>;
  children: React.ReactNode;
  validationMode?: ValidationMode;
  defaultValues?: UseFormProps<TFieldValues>['defaultValues'];
  resetAfterSubmit?: boolean;
  classes?: FormStyleClasses;
}

/**
 * Компонент формы с интегрированной валидацией Zod
 * Автоматически настраивает русскую локализацию ошибок
 */
export function ZodForm<TFieldValues extends FieldValues = FieldValues>({
  schema,
  onSubmit,
  children,
  validationMode = 'onSubmit',
  defaultValues,
  resetAfterSubmit = false,
  className,
  style,
  classes,
  ...formProps
}: ZodFormProps<TFieldValues>) {

  setupZodRuLocale()

  const form = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    mode: validationMode,
    defaultValues,
  });

  const handleFormSubmit = async (data: TFieldValues) => {
    try {
      await onSubmit(data);
      if (resetAfterSubmit) {
        form.reset();
      }
    } catch (error) {
      // Ошибки обработки формы можно логировать или показывать пользователю
      console.error('Form submission error:', error);
    }
  };

  // Собираем CSS классы для формы
  const formClassName = [
    'azb-form',
    classes?.form,
    className
  ].filter(Boolean).join(' ');

  const contentClassName = [
    'azb-form-content',
    classes?.content
  ].filter(Boolean).join(' ');

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={formClassName}
        style={style}
        {...formProps}
      >
        <div className={contentClassName}>
          {children}
        </div>
      </form>
    </FormProvider>
  );
}
