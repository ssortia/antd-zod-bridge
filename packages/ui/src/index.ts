// Импорт стилей
import './styles/index.css';

export { ZodForm } from './components/ZodForm';
export { BaseField } from './components/BaseField';
export { TextField } from './components/TextField';
export { default as PasswordField } from './components/PasswordField';
export { default as TextAreaField } from './components/TextAreaField';
export { default as NumberField } from './components/NumberField';
export { default as SelectField } from './components/SelectField';
export { default as RadioField } from './components/RadioField';
export { default as CheckboxField } from './components/CheckboxField';
export { DateField } from './components/DateField';
export { useFormField } from './hooks/useFormField';

// Утилиты
export * from './utils/fieldHelpers';

// Локализация
export { zodRuLocale, setupZodRuLocale } from './locale';

// Типы
export type {
  BaseFieldProps,
  TextFieldProps,
  NumberFieldProps,
  SelectFieldProps,
  SelectOption,
  CheckboxFieldProps,
  RadioFieldProps,
  RadioOption,
  DateFieldProps,
  TextAreaFieldProps,
} from './types';

// Типы стилей
export type {
  StyleClasses,
  FormStyleClasses,
  StyleProps,
} from './types/styles';
