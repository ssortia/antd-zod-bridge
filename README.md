# Antd Zod Bridge

Библиотека-обертка над Zod и компонентами полей Ant Design для простого создания типобезопасных форм в React.

## Особенности

- 🔧 **Интеграция Zod + Ant Design** - Автоматическая валидация схем Zod с компонентами Ant Design
- 🎯 **Типобезопасность** - Полная поддержка TypeScript из коробки
- 🚀 **React Hook Form** - Использует react-hook-form для управления состоянием форм
- 📦 **Готовые компоненты** - Набор предварительно настроенных полей для всех основных типов данных
- 🎨 **Гибкая стилизация** - Поддержка кастомных стилей и классов CSS

## Установка

```bash
pnpm add antd-zod-bridge
```

## Быстрый старт

```tsx
import { z } from 'zod';
import { ZodForm, TextField, NumberField, SelectField } from 'antd-zod-bridge';

const schema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  age: z.number().min(18, "Возраст должен быть не менее 18"),
  role: z.enum(['admin', 'user'])
});

function MyForm() {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <ZodForm schema={schema} onSubmit={handleSubmit}>
      <TextField 
        name="name" 
        label="Имя" 
        placeholder="Введите ваше имя"
        required 
      />
      
      <NumberField 
        name="age" 
        label="Возраст" 
        min={0}
        max={120}
        required 
      />
      
      <SelectField 
        name="role" 
        label="Роль" 
        options={[
          { label: 'Администратор', value: 'admin' },
          { label: 'Пользователь', value: 'user' }
        ]}
        required 
      />
      
      <button type="submit">Отправить</button>
    </ZodForm>
  );
}
```

## Доступные компоненты

### Форма
- **ZodForm** - Основной компонент формы с валидацией Zod

### Поля ввода
- **TextField** - Текстовое поле
- **PasswordField** - Поле для пароля
- **TextAreaField** - Многострочное текстовое поле
- **NumberField** - Числовое поле

### Поля выбора
- **SelectField** - Выпадающий список
- **RadioField** - Группа радиокнопок
- **CheckboxField** - Чекбокс

### Поля даты
- **DateField** - Поле выбора даты

### Базовый компонент
- **BaseField** - Базовый компонент для создания кастомных полей

## API

### ZodForm

```tsx
interface ZodFormProps<T> {
  schema: ZodSchema<T>;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
}
```

### Общие свойства полей (BaseFieldProps)

```tsx
interface BaseFieldProps {
  name: string;           // Имя поля (обязательно)
  label: string;          // Метка поля (обязательно)
  size?: 'small' | 'middle' | 'large';  // Размер компонента
  disabled?: boolean;     // Отключить поле
  required?: boolean;     // Показать индикатор обязательности
  className?: string;     // CSS класс
  style?: React.CSSProperties;  // Inline стили
}
```

### TextField

```tsx
interface TextFieldProps extends BaseFieldProps {
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  maxLength?: number;
  showCount?: boolean;
}
```

### SelectField

```tsx
interface SelectFieldProps extends BaseFieldProps {
  placeholder?: string;
  options: SelectOption[];
  mode?: 'multiple' | 'tags';
  allowClear?: boolean;
  showSearch?: boolean;
  filterOption?: (input: string, option?: SelectOption) => boolean;
}

interface SelectOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}
```

### NumberField

```tsx
interface NumberFieldProps extends BaseFieldProps {
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
```

## Разработка

Этот проект использует pnpm workspace:

```bash
# Установка зависимостей
pnpm install

# Сборка библиотеки
pnpm --filter ui build

# Запуск playground для тестирования
pnpm --filter playground dev
```

## Структура проекта

```
packages/
├── ui/           # Основная библиотека компонентов
│   ├── src/
│   │   ├── ZodForm.tsx      # Основной компонент формы
│   │   ├── BaseField.tsx    # Базовый компонент поля
│   │   ├── TextField.tsx    # Текстовое поле
│   │   ├── SelectField.tsx  # Выпадающий список
│   │   └── ...              # Другие компоненты полей
└── playground/   # Playground для тестирования компонентов
```

## Лицензия

MIT