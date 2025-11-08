# Utils module

Overview

This folder contains small, reusable utility functions used across the application.

Files

- `format.ts` - formatting helpers (date, currency)
- `validation.ts` - input validation helpers
- `converters.ts` - safe conversions and parsing

Usage examples

```ts
import { formatDate, formatCurrency } from './utils/format'

formatDate(new Date())
formatCurrency(12.5, 'USD')
```

Edge cases / limitations

- `formatDate` returns `''` for invalid dates.
- `formatCurrency` returns `''` for NaN or non-number inputs.
