# Pull Request (Draft): feature_week8 — SDLC automation + WeatherWidget

Summary
- Add a small React app `Week8` that provides a reusable `WeatherWidget({ cityName })` component.
- Implements client-side TTL caching (localStorage with memory fallback).
- Adds tests (Jest + React Testing Library) mocking network calls with >=95% coverage threshold configured.
- Adds ESLint/Prettier, README, .env.example, and GitHub workflows for CI and CodeQL.

Changelog
- Create Week8 project scaffold
- Implement `src/components/WeatherWidget.jsx`
- Implement `src/hooks/useWeather.js` and `src/utils/cache.js`
- Tests: `src/__tests__/WeatherWidget.test.jsx` covering success, error, and cache branches
- CI: `.github/workflows/ci.yml` and CodeQL workflow

Test coverage summary (expected):
- Global coverage thresholds set to 95% for branches, functions, lines, and statements.

Notes
- All network calls are mocked in tests. No secrets are committed. See `.env.example` for required variables.
