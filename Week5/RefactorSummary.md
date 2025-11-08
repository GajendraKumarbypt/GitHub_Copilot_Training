# Refactor Summary

Files added/changed

- package.json, vite.config.ts, tsconfig.json
- src/main.tsx, src/App.tsx, src/styles.css
- src/components/{Button.tsx,Input.tsx,Modal.tsx}
- src/services/apiService.ts
- src/utils/{format.ts,validation.ts,converters.ts,README.md}
- src/constants/index.ts
- tests/ for utils and services
- README.md

Utilities extracted

- formatDate, formatCurrency (format.ts)
- isEmail, isNonEmptyString (validation.ts)
- toNumber, safeParseJson (converters.ts)

Services

- Consolidated API logic into `src/services/apiService.ts` using axios
- ApiError class for normalized error handling

Tests

- Unit tests for utils and apiService (vitest). The tests cover normal and error flows.

Patterns

- Small, focused utilities in `src/utils` (SRP)
- Centralized service for HTTP calls (single responsibility)
- Shared components in `src/components` for reusability

Next steps / improvements

- Add more component tests and snapshot tests
- Add E2E tests (Cypress) if needed
- Wire authentication into ApiService interceptors
- Expand constants and theme system
