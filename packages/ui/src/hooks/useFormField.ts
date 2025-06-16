import { useFormContext, useFormState, FieldError } from 'react-hook-form';

interface UseFormFieldReturn {
  field: any;
  error: FieldError | undefined;
  isDirty: boolean;
  isTouched: boolean;
  isValid: boolean;
  isSubmitted: boolean;
}

/**
 * Hook для работы с полем формы
 * Предоставляет удобный интерфейс для получения состояния поля
 */
export const useFormField = (name: string): UseFormFieldReturn => {
  const { control } = useFormContext();
  const { errors, dirtyFields, touchedFields, isSubmitted } = useFormState({ control });
  
  const error = errors[name] as FieldError | undefined;
  const isDirty = Boolean(dirtyFields[name]);
  const isTouched = Boolean(touchedFields[name]);
  const isValid = !error;
  
  return {
    field: { name },
    error,
    isDirty,
    isTouched,
    isValid,
    isSubmitted,
  };
};