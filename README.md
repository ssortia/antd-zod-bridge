# Antd Zod Bridge

A powerful TypeScript library that seamlessly integrates Zod validation with Ant Design form components for React, providing type-safe form handling with minimal boilerplate.

📘 [Read this document in Russian](./README_RU.md)

## 🚀 Features

- 🔗 **Seamless Integration** – Direct mapping between Zod schemas and Ant Design components  
- 📝 **Type Safety** – Full TypeScript support with automatic type inference  
- 🎨 **Consistent UI** – Pre-styled components following Ant Design patterns  
- 🔍 **Smart Validation** – Built-in validation with custom error messages  
- 🧩 **Modular** – Use individual components or a complete form solution  
- 🎯 **Accessibility** – WCAG-compliant with proper label associations  
- 🎭 **Auto Styling** – Styles are injected automatically with no need for manual CSS imports  
- 🌙 **Dark Mode** – Full support for both light and dark themes out of the box  
- 🧪 **Well Tested** – Comprehensive test coverage with Vitest  
- 🌐 **i18n-Ready** – Supports localization with Russian locale included  

## 📦 Installation

```bash
npm i @ssortia/antd-zod-bridge
```

## ⚡ Quick Start

```tsx
import { z } from 'zod';
import { ZodForm, TextField, NumberField, SelectField } from '@ssortia/antd-zod-bridge';

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(18, "You must be at least 18"),
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
        label="Name" 
        placeholder="Enter your name"
        required 
      />

      <NumberField 
        name="age" 
        label="Age" 
        min={0}
        max={120}
        required 
      />

      <SelectField 
        name="role" 
        label="Role" 
        options={[
          { label: 'Administrator', value: 'admin' },
          { label: 'User', value: 'user' }
        ]}
        required 
      />

      <button type="submit">Submit</button>
    </ZodForm>
  );
}
```

## 📚 Available Components

| Component        | Description                          | Key Features                                                   |
|------------------|--------------------------------------|----------------------------------------------------------------|
| **ZodForm**       | Main form component with validation  | Integration with `react-hook-form`, automatic validation       |
| **TextField**     | Single-line text input field         | Prefix/suffix, char counter, length restriction                |
| **PasswordField** | Password input field                 | Toggle visibility, built-in icon                               |
| **NumberField**   | Numeric input field                  | Increment/decrement buttons, formatting, precision             |
| **TextAreaField** | Multiline text input                 | Autosize, character count, max rows                            |
| **SelectField**   | Dropdown select                      | Search, multi-select, grouped options                          |
| **RadioField**    | Radio button group                   | Horizontal/vertical layout, option disabling                   |
| **CheckboxField** | Checkbox input                       | JSX label support, checked/unchecked state                     |
| **DateField**     | Date picker                          | Localization, time picker, date limits                         |
| **ListField**     | Dynamic list                         | Add/remove items, nested form support                          |
| **PhoneField**    | Phone number input                   | Auto-masking for Russian format                                |
| **BaseField**     | Base field component                 | Foundation for custom validated fields                         |

## 🛠 Development

This project uses a pnpm workspace:

```bash
# Install dependencies
pnpm install

# Build the library
pnpm --filter ui build

# Run the playground for testing
pnpm --filter playground dev
```

## 🗂 Project Structure

```
packages/
├── ui/             # Main component library
│   ├── src/
│   │   ├── ZodForm.tsx       # Core form component
│   │   ├── BaseField.tsx     # Base field component
│   │   ├── TextField.tsx     # Text input
│   │   ├── SelectField.tsx   # Dropdown select
│   │   └── ...               # Other form components
└── playground/     # Playground for testing components
```
