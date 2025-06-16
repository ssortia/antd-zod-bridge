import { useFormContext, FieldError } from 'react-hook-form';

interface UseFormFieldReturn {
  field: any;
  error: FieldError | undefined;
  isDirty: boolean;
  isTouched: boolean;
  isValid: boolean;
  isSubmitted: boolean;
}

/**
 * Простая реализация get для получения вложенных значений по пути
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object') {
      // Проверяем на массив с числовым индексом
      if (Array.isArray(current) && /^\d+$/.test(key)) {
        return current[parseInt(key, 10)];
      }
      return current[key];
    }
    return undefined;
  }, obj);
}

/**
 * Hook для работы с полем формы
 * Предоставляет удобный интерфейс для получения состояния поля
 */
export const useFormField = (name: string): UseFormFieldReturn => {
  const { formState } = useFormContext();
  const { errors, dirtyFields, touchedFields, isSubmitted } = formState;
  
  // Используем собственную функцию для получения вложенных значений по пути
  const error = getNestedValue(errors, name) as FieldError | undefined;
  const isDirty = Boolean(getNestedValue(dirtyFields, name));
  const isTouched = Boolean(getNestedValue(touchedFields, name));
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