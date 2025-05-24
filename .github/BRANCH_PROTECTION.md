# Branch Protection Rules

This document outlines the recommended branch protection rules for the ExpenseTracker repository.

## Main Branch Protection

### Required Settings:
- ✅ **Require pull request reviews before merging**
  - Required approving reviews: 1
  - Dismiss stale reviews when new commits are pushed
  - Require review from code owners (when CODEOWNERS file is added)

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Required status checks:
    - `CI / lint-and-test`
    - `CI / build`
    - `CI / type-check`

- ✅ **Require branches to be up to date before merging**
- ✅ **Require linear history** (enforces squash and merge)
- ✅ **Include administrators** (even admins must follow rules)
- ✅ **Restrict pushes that create files**
- ✅ **Allow force pushes** (disabled)
- ✅ **Allow deletions** (disabled)

### Auto-merge Settings:
- Enable auto-merge for dependabot PRs after CI passes
- Require at least 1 approval for auto-merge

## Develop Branch Protection

### Required Settings:
- ✅ **Require pull request reviews before merging**
  - Required approving reviews: 1
  - Allow bypassing for small changes (< 10 lines)

- ✅ **Require status checks to pass before merging**
  - Required status checks:
    - `CI / lint-and-test`
    - `CI / build`

## Feature Branch Workflow

### Naming Convention:
- `feature/` - New features
- `fix/` - Bug fixes  
- `hotfix/` - Critical production fixes
- `chore/` - Maintenance tasks
- `docs/` - Documentation updates

### Branch Lifecycle:
1. Create feature branch from `develop`
2. Develop and commit with conventional commits
3. Push and create PR to `develop`
4. Code review and CI checks
5. Squash and merge to `develop`
6. Weekly releases from `develop` to `main`

## GitHub Settings Commands

To set up these rules via GitHub CLI:

```bash
# Protect main branch
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI / lint-and-test","CI / build","CI / type-check"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null

# Protect develop branch  
gh api repos/:owner/:repo/branches/develop/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI / lint-and-test","CI / build"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

## Code Review Guidelines

### What to Review:
- Code quality and readability
- TypeScript types and interfaces
- Performance implications
- Security considerations
- Accessibility compliance
- Test coverage
- Documentation updates

### Review Checklist:
- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Tests are included and pass
- [ ] No console.log or debug statements
- [ ] Accessibility standards met
- [ ] Performance impact considered
- [ ] Documentation updated if needed
