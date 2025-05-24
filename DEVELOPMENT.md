# Development Workflow Guide

## Git Workflow

This project follows a **feature branch workflow** with **Conventional Commits** for clean history.

### Branch Strategy

- `main` - Production-ready code, protected branch
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `fix/*` - Bug fix branches
- `hotfix/*` - Critical production fixes

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes

#### Examples:
```bash
feat: add expense form validation with Zod
fix: resolve chart rendering issue on mobile
docs: update API documentation for expenses endpoint
test: add unit tests for expense utils
```

### Pre-commit Checklist

Before committing, ensure:
1. ✅ `npm run lint` passes
2. ✅ `npm run test` passes
3. ✅ `npm run build` succeeds
4. ✅ Code is formatted with Prettier
5. ✅ TypeScript has no errors
6. ✅ Commit message follows conventional format

### Development Commands

```bash
# Development
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbopack (faster)

# Quality Assurance
npm run lint             # ESLint check
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript check
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run end-to-end tests
npm run test:e2e:ui      # Run e2e tests with UI

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Build & Deploy
npm run build            # Production build
npm run start            # Start production server
npm run analyze          # Analyze bundle size
```

### Pull Request Guidelines

1. **Branch naming**: `feature/expense-dashboard`, `fix/chart-rendering`
2. **PR title**: Follow conventional commit format
3. **Description**: Include what, why, and how
4. **Reviews**: At least 1 approval required
5. **Tests**: All CI checks must pass
6. **Squash**: Use squash and merge for clean history

### Code Quality Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended + custom rules
- **Prettier**: Consistent code formatting
- **Accessibility**: WCAG AA compliance
- **Performance**: Core Web Vitals targets
- **Testing**: >80% code coverage

### File Organization

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Auth route group
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── forms/          # Form components
├── lib/                # Utilities and configurations
│   ├── utils.ts        # General utilities
│   ├── validations.ts  # Zod schemas
│   └── prisma.ts       # Database client
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── styles/             # Additional CSS files
```

### Environment Setup

1. **Node.js**: v18+ required
2. **Package Manager**: npm (lock file committed)
3. **Database**: SQLite for development, PostgreSQL for production
4. **IDE**: VS Code with recommended extensions

### Deployment Strategy

- **Development**: Auto-deploy from `develop` branch
- **Staging**: Auto-deploy from `main` branch to staging environment
- **Production**: Manual deployment with approval after staging validation

### Troubleshooting

Common issues and solutions:

1. **Build fails**: Check TypeScript errors with `npm run type-check`
2. **Tests fail**: Run `npm run test:watch` for debugging
3. **Linting errors**: Use `npm run lint:fix` for auto-fixes
4. **Database issues**: Reset with `npm run db:reset`

### Getting Help

- 📖 **Documentation**: See `/docs` folder
- 🐛 **Issues**: Create GitHub issue with reproduction steps
- 💬 **Discussions**: Use GitHub Discussions for questions
- 📧 **Contact**: Reach out to the development team
