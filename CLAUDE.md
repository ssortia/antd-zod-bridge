# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo UI library template using pnpm workspaces with two main packages:

- `packages/ui/` - The main UI component library built with React and TypeScript
- `packages/playground/` - Development playground for testing UI components using Vite

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