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
5. Make your changes (code is auto-formatted on commit)
6. Test your changes: `npm run build` and `npm run lint`
7. Commit your changes: `git commit -m "Add feature: description"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- A code editor (VS Code recommended)
- Basic knowledge of Svelte, SvelteKit, and TypeScript

### Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173 to see your changes.

## Code Formatting

Code is automatically formatted on commit using Prettier and ESLint via pre-commit hooks.

**Commands:**

```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

**Editor Setup:** Install recommended extensions (Prettier, ESLint) when prompted in VS Code.

## Project Structure

```
sports.live/
├── src/
│   ├── routes/      # SvelteKit routes
│   ├── lib/
│   │   ├── components/  # Svelte components
│   │   │   ├── ui/      # Base UI components
│   │   │   ├── game/    # Game-specific components
│   │   │   └── shared/  # Shared components
│   │   └── types/   # TypeScript type definitions
├── static/          # Static assets
└── supabase/        # Database schema and migrations
```

## Coding Standards

### TypeScript

- Use strict mode
- Define proper types for all functions and components
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes

### Svelte Components

- Use Svelte 5 runes ($state, $derived, $effect)
- Keep components small and focused
- Use meaningful component and prop names
- Add JSDoc comments for complex components
- Prefer reactive declarations over imperative effects

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Ensure dark mode compatibility
- Maintain consistent spacing and sizing

### Naming Conventions

- Components: PascalCase (e.g., `GameCard.svelte`)
- Files: PascalCase for components, camelCase for utilities
- Functions: camelCase (e.g., `formatGameTime`)
- Constants: UPPER_SNAKE_CASE (e.g., `NBA_TEAMS`)
- Routes: Lowercase with hyphens (e.g., `+page.svelte`, `+server.ts`)

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
