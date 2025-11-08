## Weather Dashboard — Week8

This project is a compact React frontend that fetches weather data from OpenWeatherMap, implements a TTL cache (localStorage fallback), and exposes a reusable `WeatherWidget({ cityName })` component.

Features
- Fetch weather via Axios using an environment variable API key
- Client-side TTL cache (localStorage with in-memory fallback)
- Modern React hooks and functional components
- Tests with Jest + React Testing Library with mocked network calls
- GitHub Actions CI (lint, test, coverage) and CodeQL security scan

Quick start
1. Copy `.env.example` to `.env` and set `REACT_APP_WEATHER_API_KEY`.
2. Install deps: `npm install`
3. Run tests: `npm test`
4. Start dev server: `npm start`

Project layout (key files)
- `src/components/WeatherWidget.jsx` — main reusable component
- `src/hooks/useWeather.js` — data fetching and cache logic
- `src/utils/cache.js` — TTL cache (localStorage & in-memory)
- `src/__tests__/WeatherWidget.test.jsx` — tests (mocks Axios)

See `.github/workflows/ci.yml` and `.github/workflows/codeql.yml` for CI.
