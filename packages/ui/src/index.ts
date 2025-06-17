export { ZodForm } from './components/ZodForm';
export { BaseField } from './components/BaseField';
export { TextField } from './components/TextField';
export { PhoneField } from './components/PhoneField';
export { PasswordField } from './components/PasswordField';
export { TextAreaField } from './components/TextAreaField';
export { NumberField } from './components/NumberField';
export { SelectField } from './components/SelectField';
export { RadioField } from './components/RadioField';
export { CheckboxField } from './components/CheckboxField';
export { DateField } from './components/DateField';
export { ListField } from './components/ListField';
export { useFormField } from './hooks/useFormField';

// Утилиты
export * from './utils/fieldUtils';
export * from './utils/phoneUtils';

// Локализация
export { zodRuLocale, setupZodRuLocale } from './locale';

// Типы
export type {
  BaseFieldProps,
  TextFieldProps,
  PhoneFieldProps,
  NumberFieldProps,
  SelectFieldProps,
  SelectOption,
  CheckboxFieldProps,
  RadioFieldProps,
  RadioOption,
  DateFieldProps,
  TextAreaFieldProps,
  ListFieldProps,
} from './types';

// Типы стилей
export type {
  StyleClasses,
  FormStyleClasses,
  StyleProps,
} from './types/styles';
