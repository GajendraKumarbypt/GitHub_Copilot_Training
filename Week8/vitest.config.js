import { defineConfig } from 'vitest/config';

// Vitest config to ensure coverage thresholds and jsdom environment.
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      // thresholds mirror original request
      lines: 95,
      functions: 95,
      branches: 95,
      statements: 95,
    },
  },
});
