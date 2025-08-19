
# Crew Front-End Assignment

Two reusable UI components built with **React + TypeScript + Tailwind** and documented in **Storybook**.

- `InputField` with variants, sizes, validation, loading, clear button, password toggle, and dark mode.
- `DataTable` with sorting, row selection, loading state, and empty state.

## Stack
- Vite + React + TypeScript
- TailwindCSS
- Storybook 8 (React Vite)
- Vitest + Testing Library

## Getting Started

```bash
pnpm i   # or npm i / yarn
pnpm dev # run the demo app
```

Open http://localhost:5173

### Storybook
```bash
pnpm storybook
```

### Tests
```bash
pnpm test
```

## File Structure
```text
src/
  components/
    InputField.tsx
    DataTable.tsx
    __tests__/
      InputField.test.tsx
      DataTable.test.tsx
  stories/
    InputField.stories.tsx
    DataTable.stories.tsx
  App.tsx
  main.tsx
  index.css
.storybook/
  main.ts
  preview.ts
```

## Notes
- Both components are typed with generics & proper props.
- Accessibility: labels, `aria-invalid`, `aria-describedby`, `aria-busy`, table headers with `scope` and native inputs.
- Styling: Tailwind with light/dark support via `dark` class on `html`.
- The demo in `App.tsx` shows common states and interactions.
