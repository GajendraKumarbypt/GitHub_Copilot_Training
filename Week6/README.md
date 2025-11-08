# Week6 Utilities

This module contains a collection of small, focused utility libraries split by concern:

- `dateUtils.js` — date/time helpers
- `stringUtils.js` — strings, slug, email helpers
- `mathUtils.js` — numeric helpers
- `arrayUtils.js` — array helpers
- `userUtils.js` — user display helpers
- `logUtils.js` — lightweight logging helpers

These utilities are pure (where appropriate), well-documented with JSDoc, and covered by Jest tests.

Usage examples

Import single helper:
```js
import { toSlug } from './src/utils/stringUtils';
console.log(toSlug('Hello World'));
```

Import module default:
```js
import dateUtils from './src/utils/dateUtils';
console.log(dateUtils.toISODate(new Date()));
```

Key functions
- `toISODate`, `daysBetween`, `addDays`
- `toSlug`, `isEmail`, `capitalize`, `truncate`
- `clamp`, `percent`, `randomInt`, `sum`
- `flatten`, `chunk`, `unique`, `merge`
- `formatName`, `initials`, `statusFromLastActive`
- `format`, `log`, `info`, `warn`, `debug`

Testing

Run tests with:

```powershell
cd Week6
npm install
npm test
```

Edge cases and limitations
- Functions perform input validation and will throw on obviously invalid inputs (see tests).
- `randomInt` uses `Math.random()` (not seeded). For deterministic tests, avoid relying on exact random output.
