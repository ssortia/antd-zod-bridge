/**
 * Утилиты для работы с полями формы
 */

/**
 * Проверяет, есть ли ошибка у поля
 */
export const hasError = (error: any): boolean => {
  return Boolean(error?.message);
};

/**
 * Получает статус поля для Ant Design компонентов
 */
export const getFieldStatus = (error: any): 'error' | undefined => {
  return hasError(error) ? 'error' : undefined;
};

/**
 * Форматирует сообщение об ошибке
 */
export const formatErrorMessage = (error: any): string => {
  return error?.message || '';
};

/**
 * Проверяет, является ли поле обязательным
 */
export const isRequired = (required?: boolean): boolean => {
  return Boolean(required);
};