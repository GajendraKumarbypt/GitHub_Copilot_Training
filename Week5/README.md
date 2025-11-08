# Week5 React Refactor

This folder contains a small React project scaffolding intended to satisfy the refactor/migration task.

What's included

- `src/utils/` - formatting, validation, converters
- `src/services/apiService.ts` - centralized API service using axios
- `src/components/` - small shared UI components
- `tests/` - vitest unit tests covering utils and service
- `vite.config.ts`, `tsconfig.json`, `package.json`

How to run (Windows PowerShell)

1. Install dependencies

```powershell
cd Week5
npm install
```

2. Run dev server

```powershell
npm run dev
```

3. Run tests

```powershell
npm run test
```

Notes

- The project is intentionally small and focuses on structure, utilities, service consolidation and tests.
- Replace `API.BASE_URL` in `src/constants/index.ts` with your real API endpoint.
