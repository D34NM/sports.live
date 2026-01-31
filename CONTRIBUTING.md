# Contributing to Sports.Live

Thank you for your interest in contributing to Sports.Live! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Keep discussions professional
- Help others learn and grow
- Focus on what's best for the community

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/sports.live.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Code will be automatically formatted on commit (via pre-commit hooks)
7. Test your changes: `npm run build` and `npm run lint`
8. Commit your changes: `git commit -m "Add feature: description"`
9. Push to your fork: `git push origin feature/your-feature-name`
10. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- A code editor (VS Code recommended)
- Basic knowledge of React, Next.js, and TypeScript

### Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to see your changes.

## Code Formatting

This project uses **Prettier** for code formatting and **ESLint** for code quality. All formatting is automated and enforced via pre-commit hooks.

### Automatic Formatting

Code is automatically formatted when you commit using Husky and lint-staged. No manual action required!

### Manual Formatting

To format all files manually:

```bash
npm run format
```

To check formatting without making changes:

```bash
npm run format:check
```

### Editor Setup

#### VS Code (Recommended)

1. Install recommended extensions when prompted (or manually):
   - Prettier - Code formatter
   - ESLint
   - Tailwind CSS IntelliSense
   - EditorConfig for VS Code

2. Settings are pre-configured in `.vscode/settings.json`:
   - Auto-format on save
   - Auto-fix ESLint issues on save
   - Use workspace TypeScript version

#### Other Editors

- Install Prettier and ESLint plugins for your editor
- Configure to use project's `.prettierrc` and `eslint.config.mjs`
- Enable format on save (optional but recommended)

### Formatting Rules

The project follows these conventions:

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS/TS, double quotes for JSX
- **Semicolons**: Always
- **Line Length**: 80 characters (recommended)
- **Trailing Commas**: ES5 style
- **End of Line**: LF (Unix-style)

See `.prettierrc` for full configuration.

### Pre-commit Hooks

When you commit, the following automatically runs:

1. **lint-staged** stages your changes
2. **ESLint** checks and fixes code issues
3. **Prettier** formats the code
4. If checks pass, commit proceeds
5. If checks fail, fix issues and try again

To bypass hooks (not recommended):

```bash
git commit --no-verify
```

## Project Structure

```
sports.live/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Base UI components
│   ├── game/        # Game-specific components
│   └── shared/      # Shared components
├── lib/             # Utility functions and helpers
├── types/           # TypeScript type definitions
├── public/          # Static assets
└── supabase/        # Database schema and migrations
```

## Coding Standards

### TypeScript

- Use strict mode
- Define proper types for all functions and components
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and prop names
- Add JSDoc comments for complex components

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Ensure dark mode compatibility
- Maintain consistent spacing and sizing

### Naming Conventions

- Components: PascalCase (e.g., `GameCard.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Functions: camelCase (e.g., `formatGameTime`)
- Constants: UPPER_SNAKE_CASE (e.g., `NBA_TEAMS`)

## Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]
[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```
feat(game-card): add save game button
fix(spoiler): prevent score leak on mobile
docs(readme): update installation instructions
```

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features (when test infrastructure exists)
3. **Run linter**: `npm run lint`
4. **Test build**: `npm run build`
5. **Write clear PR description**:
   - What does this PR do?
   - Why is this change needed?
   - How was it tested?
   - Screenshots for UI changes

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

How was this tested?

## Screenshots

(if applicable)

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-reviewed my code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Build passes
```

## Feature Requests

Have an idea? Open an issue with:

- Clear description of the feature
- Use cases and benefits
- Potential implementation approach
- Any relevant examples or mockups

## Bug Reports

Found a bug? Open an issue with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/device information
- Console errors (if any)

## Areas for Contribution

### High Priority

- NBA API integration
- Real-time game updates
- User authentication
- Push notifications
- Performance optimization

### Good First Issues

- UI improvements
- Documentation updates
- Additional test coverage
- Accessibility enhancements
- Bug fixes

### Advanced Features

- Team pages
- Advanced filtering
- Game recommendations
- Spoiler-free recaps
- Analytics integration

## Testing

Currently using:

- Manual testing
- Build verification
- Linting checks

Future testing:

- Unit tests with Vitest
- Integration tests
- E2E tests with Playwright
- Visual regression tests

## Review Process

1. Maintainer reviews PR
2. Feedback provided via comments
3. Changes requested if needed
4. Approved when ready
5. Merged to main branch
6. Deployed automatically

## Community

- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: Questions and general discussion
- Pull Requests: Code contributions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🏀
