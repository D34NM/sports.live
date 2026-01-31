# Testing Guide

This document describes the testing infrastructure and how to run tests for the Sports.Live NBA web application.

## Testing Stack

- **Unit/Integration Tests**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **E2E Tests**: [Playwright](https://playwright.dev/)
- **Performance**: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- **Mocking**: Custom mock NBA API and Supabase mocks

## Running Tests

### Unit Tests

```bash
# Run unit tests once
npm run test:unit

# Run in watch mode (during development)
npm run test:unit:watch

# Run with UI
npm run test:unit:ui

# Run with coverage report
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run with UI (interactive mode)
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug
```

### Lighthouse CI

```bash
# Build the app first
npm run build

# Run Lighthouse tests
npm run lighthouse
```

### All Tests

```bash
# Run all tests (unit + e2e)
npm run test:all
```

## Test Structure

```
sports.live/
├── e2e/                          # End-to-end tests (Playwright)
│   ├── home.spec.ts
│   └── spoiler-protection.spec.ts
├── components/
│   ├── ui/
│   │   └── Button.test.tsx      # Component tests
│   └── game/
│       └── GameCard.test.tsx
├── lib/
│   └── test-utils/
│       ├── index.tsx             # Test utilities
│       ├── mockNbaApi.ts         # Mock NBA API
│       ├── mockNbaApi.test.ts    # Mock API tests
│       └── mockSupabase.ts       # Mock Supabase client
├── vitest.config.ts              # Vitest configuration
├── vitest.setup.ts               # Test setup
├── playwright.config.ts          # Playwright configuration
└── lighthouserc.js               # Lighthouse CI config
```

## Writing Tests

### Unit Tests

Unit tests use Vitest and Testing Library. Place test files next to the code they test with a `.test.ts` or `.test.tsx` extension.

Example:

```typescript
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/lib/test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const { user } = renderWithProviders(
      <Button onClick={handleClick}>Click me</Button>
    );
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Tests

E2E tests use Playwright. Place them in the `e2e/` directory with a `.spec.ts` extension.

Example:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/sports\.live/i);
  });
});
```

## Mock NBA API

The project includes a mock NBA API client for testing without hitting real API endpoints:

```typescript
import { mockNbaApiClient } from '@/lib/test-utils/mockNbaApi';

// Get games for a specific date
const games = await mockNbaApiClient.getSchedule('2026-01-31');

// Get scores for a game
const scores = await mockNbaApiClient.getGameScores('game-1');
```

Mock data includes:
- Multiple teams (LAL, BOS, GSW, MIA)
- Games in different states (scheduled, live, final)
- Realistic game scores and metadata

## Mock Supabase

For tests that need to interact with Supabase, use the mock client:

```typescript
import { mockSupabaseClient, mockSupabaseModule } from '@/lib/test-utils/mockSupabase';

// Mock the entire module
mockSupabaseModule();

// Or use the mock client directly
const client = mockSupabaseClient;
```

## CI/CD Integration

Tests run automatically on GitHub Actions:

- **Lint & Type Check**: Runs ESLint and TypeScript compiler
- **Unit Tests**: Runs Vitest with coverage reports
- **E2E Tests**: Runs Playwright tests with artifact uploads
- **Lighthouse CI**: Performance and accessibility audits
- **Build Check**: Verifies production build

See `.github/workflows/ci.yml` for the complete CI configuration.

## Test Coverage

Generate coverage reports with:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory and uploaded to Codecov in CI.

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Avoid Implementation Details**: Don't test internal state or private methods
4. **Mock External Dependencies**: Use mock NBA API and Supabase clients
5. **Keep Tests Fast**: Unit tests should run in milliseconds
6. **Use Descriptive Names**: Test names should clearly describe what they test
7. **One Assertion Per Test**: Keep tests focused and easy to debug

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
npm run test:unit path/to/test.test.ts

# Run tests matching pattern
npm run test:unit -- --grep "Button"

# Run with UI for debugging
npm run test:unit:ui
```

### E2E Tests

```bash
# Run specific test file
npm run test:e2e e2e/home.spec.ts

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Debug mode with inspector
npm run test:e2e:debug
```

## Troubleshooting

### Tests failing in CI but passing locally

- Ensure you're using the same Node version
- Check for timing issues (add appropriate waits)
- Review CI logs for environment-specific errors

### Playwright installation issues

```bash
# Reinstall browsers
npx playwright install --with-deps
```

### Coverage not generating

```bash
# Install v8 coverage provider
npm install -D @vitest/coverage-v8
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
