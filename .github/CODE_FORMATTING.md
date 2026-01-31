# Code Formatting Guide

This document provides details about the code formatting setup for Sports.Live.

## Overview

- **Formatter**: Prettier 3.x
- **Linter**: ESLint 9.x with Next.js config
- **Pre-commit**: Husky + lint-staged
- **Editor Config**: EditorConfig for consistent settings

## Quick Commands

```bash
# Format all files
npm run format

# Check formatting (CI/CD)
npm run format:check

# Lint and auto-fix
npm run lint

# Run on commit (automatic)
git commit -m "your message"
```

## Configuration Files

### `.prettierrc`

Main Prettier configuration with project-specific rules.

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "quoteProps": "as-needed"
}
```

### `.prettierignore`

Files and directories excluded from formatting:

- `node_modules/`
- `.next/`, `build/`, `dist/`
- `package-lock.json`, lock files
- `public/sw.js` (service worker)
- Environment files

### `eslint.config.mjs`

ESLint configuration with Prettier integration (ESLint 9+ flat config format):

```javascript
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'plugin:prettier/recommended'),
  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
```

### `.editorconfig`

Editor settings for consistency across different editors:

- 2-space indentation
- LF line endings
- UTF-8 charset
- Trim trailing whitespace
- Insert final newline

### `.vscode/settings.json`

VS Code specific settings:

- Auto-format on save
- Use Prettier as default formatter
- Auto-fix ESLint issues on save
- Use workspace TypeScript version

### `.vscode/extensions.json`

Recommended VS Code extensions:

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- EditorConfig for VS Code

## Pre-commit Hooks

### Setup

Husky is installed and configured automatically when you run `npm install` (via the `prepare` script).

### How It Works

1. You make changes and stage them: `git add .`
2. You commit: `git commit -m "message"`
3. Husky triggers pre-commit hook
4. lint-staged runs on staged files:
   - **TypeScript/JavaScript**: ESLint fix + Prettier format
   - **JSON/CSS/Markdown**: Prettier format
5. If all pass, commit succeeds
6. If any fail, commit is blocked and you fix issues

### Bypass (Not Recommended)

```bash
git commit --no-verify -m "message"
```

Only use in emergencies. CI/CD will still check formatting.

## CI/CD Integration

Add to your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Check code formatting
  run: npm run format:check

- name: Lint code
  run: npm run lint
```

## Troubleshooting

### Husky not installed

```bash
npm run prepare
```

### Pre-commit hook not running

```bash
chmod +x .husky/pre-commit
```

### Formatting conflicts

```bash
# Re-format everything
npm run format

# Check what needs formatting
npm run format:check
```

### ESLint errors

```bash
# Auto-fix what can be fixed
npm run lint

# For manual fixes, check error messages
```

## Best Practices

1. **Let automation handle formatting** - Don't waste time on manual formatting
2. **Commit frequently** - Pre-commit hooks run fast
3. **Use recommended editor extensions** - Get instant feedback
4. **Don't bypass hooks** - They catch issues early
5. **Keep configs in sync** - Don't modify without team discussion

## Customization

To change formatting rules:

1. Update `.prettierrc`
2. Run `npm run format` to apply to all files
3. Commit changes
4. Notify team of the change

To change linting rules:

1. Update `.eslintrc.json`
2. Run `npm run lint` to verify
3. Commit changes
4. Notify team of the change

## Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/lint-staged/lint-staged)
- [EditorConfig Documentation](https://editorconfig.org/)

## Support

Having issues? Open an issue on GitHub or ask in discussions.
