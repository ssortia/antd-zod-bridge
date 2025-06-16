# Шаблон UI Библиотеки

Монорепозиторий для создания UI библиотеки компонентов на React с TypeScript, использующий pnpm workspaces.

## Структура проекта

- `packages/ui/` - Основная UI библиотека компонентов (React + TypeScript)
- `packages/playground/` - Площадка для разработки и тестирования компонентов (Vite)

## Установка

```bash
pnpm install
```

## Команды разработки

### UI Библиотека (`packages/ui/`)

```bash
# Сборка библиотеки
pnpm --filter ui build
```

### Playground (`packages/playground/`)

```bash
# Запуск dev сервера для тестирования компонентов
pnpm --filter playground dev
```

## Архитектура

- **Сборка**: tsup с поддержкой ESM/CJS и TypeScript деклараций
- **Внешние зависимости**: React и react-dom не включаются в бандл
- **Алиасы**: Playground использует алиас `@my/ui` для импорта из `../ui/src`
- **Экспорты**: Все компоненты экспортируются через `packages/ui/src/index.ts`
- **TypeScript**: Конфигурация с project references для корректной работы workspace

## Добавление новых компонентов

1. Создайте компонент в `packages/ui/src/`
2. Экспортируйте его в `packages/ui/src/index.ts`
3. Тестируйте в `packages/playground/src/main.tsx`
4. Соберите библиотеку: `pnpm --filter ui build`

## Использование

После сборки библиотеку можно импортировать:

```tsx
import { Button } from '@my/ui'
```