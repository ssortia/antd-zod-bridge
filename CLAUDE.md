# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Antd Zod Bridge - a wrapper library over Zod and Ant Design field components for easier type-safe form creation in React. The project is a monorepo using pnpm workspaces with two main packages:

- `packages/ui/` - The main library with Zod-integrated Ant Design form components
- `packages/playground/` - Development playground for testing the form components

## Development Commands

### UI Library (`packages/ui/`)
- `pnpm run build` - Build the library using tsup (outputs ESM, CJS, and TypeScript declarations)

### Playground (`packages/playground/`)
- `pnpm run dev` - Start the Vite development server for testing components

### Root Level
- Use `pnpm` as the package manager (not npm or yarn)
- Run commands from specific packages using `pnpm --filter <package-name> <command>`

## Architecture Notes

- The UI library uses tsup for bundling with dual ESM/CJS output
- React and react-dom are externalized in the build to avoid bundling conflicts
- The playground uses Vite with a path alias `@my/ui` that resolves to `../ui/src`
- Components are exported from `packages/ui/src/index.ts`
- TypeScript configurations use project references for proper workspace linking

## Component Architecture

### Core Components

- **ZodForm**: Main form wrapper that integrates Zod validation with React Hook Form
- **BaseField**: Base component that handles common field logic (validation, labels, errors)
- **Field Components**: Specific field implementations for different input types

### Available Field Components

- **TextField**: Text input with Ant Design Input component
- **PasswordField**: Password input with Ant Design Input.Password
- **TextAreaField**: Multi-line text with Ant Design Input.TextArea
- **NumberField**: Numeric input with Ant Design InputNumber
- **SelectField**: Dropdown selection with Ant Design Select
- **CheckboxField**: Checkbox with Ant Design Checkbox
- **RadioField**: Radio button group with Ant Design Radio
- **DateField**: Date picker with Ant Design DatePicker

### Key Dependencies

- **zod**: Schema validation library
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Zod integration for react-hook-form
- **antd**: UI component library
- **react**: Core React library

### Form Validation Flow

1. Zod schema defines validation rules
2. ZodForm component uses zodResolver to connect Zod with react-hook-form
3. BaseField component handles error display and validation state
4. Individual field components render Ant Design components with validation feedback

### Conventions

- All field components extend BaseFieldProps interface
- Error handling is centralized in BaseField component
- Ant Design components are wrapped to provide consistent API
- TypeScript types are exported for all component props