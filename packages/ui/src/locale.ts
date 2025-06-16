import { z } from 'zod';

/**
 * Русская локализация для Zod
 * Предоставляет понятные сообщения об ошибках валидации на русском языке
 */
export const zodRuLocale: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      // Для пустых обязательных полей показываем сообщение об обязательности
      if (issue.received === 'undefined' || issue.received === 'null') {
        return { message: 'Поле обязательно для заполнения' };
      }
      
      // Для других случаев показываем стандартные сообщения о типах
      if (issue.expected === 'string') {
        return { message: 'Ожидается строка' };
      }
      if (issue.expected === 'number') {
        return { message: 'Ожидается число' };
      }
      if (issue.expected === 'boolean') {
        return { message: 'Ожидается булево значение' };
      }
      if (issue.expected === 'date') {
        return { message: 'Ожидается дата' };
      }
      return { message: `Неверный тип данных. Ожидается ${issue.expected}, получено ${issue.received}` };
    
    case z.ZodIssueCode.invalid_literal:
      return { message: `Недопустимое значение. Ожидается ${issue.expected}` };
    
    case z.ZodIssueCode.unrecognized_keys:
      return { message: `Нераспознанные ключи в объекте: ${issue.keys.map(k => `'${k}'`).join(', ')}` };
    
    case z.ZodIssueCode.invalid_union:
      return { message: 'Недопустимые входные данные' };
    
    case z.ZodIssueCode.invalid_union_discriminator:
      return { message: `Недопустимое значение дискриминатора. Ожидается ${issue.options.join(' | ')}` };
    
    case z.ZodIssueCode.invalid_enum_value:
      return { message: `Недопустимое значение перечисления. Ожидается ${issue.options?.join(' | ')}, получено '${issue.received}'` };
    
    case z.ZodIssueCode.invalid_arguments:
      return { message: 'Недопустимые аргументы функции' };
    
    case z.ZodIssueCode.invalid_return_type:
      return { message: 'Недопустимый тип возвращаемого значения' };
    
    case z.ZodIssueCode.invalid_date:
      return { message: 'Недопустимая дата' };
    
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: 'Недопустимый email адрес' };
      }
      if (issue.validation === 'url') {
        return { message: 'Недопустимый URL' };
      }
      if (issue.validation === 'uuid') {
        return { message: 'Недопустимый UUID' };
      }
      if (issue.validation === 'cuid') {
        return { message: 'Недопустимый CUID' };
      }
      if (issue.validation === 'regex') {
        return { message: 'Недопустимый формат' };
      }
      if (issue.validation === 'datetime') {
        return { message: 'Недопустимый формат даты и времени' };
      }
      return { message: `Недопустимая строка: ${issue.validation}` };
    
    case z.ZodIssueCode.too_small:
      if (issue.type === 'array') {
        return { 
          message: issue.exact 
            ? `Массив должен содержать ровно ${issue.minimum} элемент(ов)`
            : issue.inclusive 
              ? `Массив должен содержать не менее ${issue.minimum} элемент(ов)`
              : `Массив должен содержать более ${issue.minimum} элемент(ов)`
        };
      }
      if (issue.type === 'string') {
        return { 
          message: issue.exact 
            ? `Строка должна содержать ровно ${issue.minimum} символ(ов)`
            : issue.inclusive 
              ? `Строка должна содержать не менее ${issue.minimum} символ(ов)`
              : `Строка должна содержать более ${issue.minimum} символ(ов)`
        };
      }
      if (issue.type === 'number') {
        return { 
          message: issue.exact 
            ? `Число должно быть равно ${issue.minimum}`
            : issue.inclusive 
              ? `Число должно быть не менее ${issue.minimum}`
              : `Число должно быть больше ${issue.minimum}`
        };
      }
      if (issue.type === 'date') {
        return { 
          message: issue.exact 
            ? `Дата должна быть равна ${new Date(Number(issue.minimum))}`
            : issue.inclusive 
              ? `Дата должна быть не раньше ${new Date(Number(issue.minimum))}`
              : `Дата должна быть позже ${new Date(Number(issue.minimum))}`
        };
      }
      return { message: 'Недопустимое значение' };
    
    case z.ZodIssueCode.too_big:
      if (issue.type === 'array') {
        return { 
          message: issue.exact 
            ? `Массив должен содержать ровно ${issue.maximum} элемент(ов)`
            : issue.inclusive 
              ? `Массив должен содержать не более ${issue.maximum} элемент(ов)`
              : `Массив должен содержать менее ${issue.maximum} элемент(ов)`
        };
      }
      if (issue.type === 'string') {
        return { 
          message: issue.exact 
            ? `Строка должна содержать ровно ${issue.maximum} символ(ов)`
            : issue.inclusive 
              ? `Строка должна содержать не более ${issue.maximum} символ(ов)`
              : `Строка должна содержать менее ${issue.maximum} символ(ов)`
        };
      }
      if (issue.type === 'number') {
        return { 
          message: issue.exact 
            ? `Число должно быть равно ${issue.maximum}`
            : issue.inclusive 
              ? `Число должно быть не более ${issue.maximum}`
              : `Число должно быть меньше ${issue.maximum}`
        };
      }
      if (issue.type === 'date') {
        return { 
          message: issue.exact 
            ? `Дата должна быть равна ${new Date(Number(issue.maximum))}`
            : issue.inclusive 
              ? `Дата должна быть не позже ${new Date(Number(issue.maximum))}`
              : `Дата должна быть раньше ${new Date(Number(issue.maximum))}`
        };
      }
      return { message: 'Недопустимое значение' };
    
    case z.ZodIssueCode.custom:
      return { message: issue.message || 'Недопустимое значение' };
    
    case z.ZodIssueCode.invalid_intersection_types:
      return { message: 'Результаты пересечения не могут быть объединены' };
    
    case z.ZodIssueCode.not_multiple_of:
      return { message: `Число должно быть кратно ${issue.multipleOf}` };
    
    case z.ZodIssueCode.not_finite:
      return { message: 'Число должно быть конечным' };
    
    default:
      return { message: ctx.defaultError };
  }
};

// Функция для установки русской локализации Zod
export const setupZodRuLocale = () => {
  z.setErrorMap(zodRuLocale);
};

// Функция для сброса локализации к стандартной
export const resetZodLocale = () => {
  z.setErrorMap(z.defaultErrorMap);
};