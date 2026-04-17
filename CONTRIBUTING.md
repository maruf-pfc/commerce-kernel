# Contributing to Commerce Kernel

Thank you for your interest in contributing! This guide will help you get started quickly.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Branch & Commit Conventions](#branch--commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold its standards. Please report unacceptable behavior to [mmsmaruf.official@gmail.com](mailto:mmsmaruf.official@gmail.com).

---

## Ways to Contribute

| Type | How |
|------|-----|
| 🐛 Bug fix | Open an issue first, then submit a PR |
| ✨ New feature | Open a feature request issue for discussion first |
| 📝 Documentation | PRs welcome directly |
| 🔒 Security issue | See [SECURITY.md](./SECURITY.md) — **do not open a public issue** |
| 💬 Question | Open a GitHub Discussion or Issue |

---

## Development Setup

### Prerequisites

- [Bun](https://bun.sh/) `>= 1.x`
- Git

### Steps

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/commerce-kernel.git
cd commerce-kernel

# 2. Add the upstream remote
git remote add upstream https://github.com/maruf-pfc/commerce-kernel.git

# 3. Install server dependencies
cd server && bun install && cd ..

# 4. Install client dependencies
cd client && bun install && cd ..

# 5. Copy and fill in environment files
cp server/.env.example server/.env
cp client/.env.example client/.env

# 6. Start the dev servers (two terminals)
cd server && bun run dev
cd client && bun run dev
```

Refer to [README.md](./README.md) for environment variable details.

---

## Branch & Commit Conventions

### Branch Names

Use the format: `<type>/<short-description>`

```
feat/admin-dashboard
fix/clerk-middleware-invocation
docs/auth-flow-guide
refactor/api-layer
chore/upgrade-dependencies
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(scope): <short description>

[optional body]
[optional footer]
```

**Types:**

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes only |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore` | Build process, tooling, or dependency updates |
| `test` | Adding or fixing tests |
| `style` | Formatting changes (no logic change) |

**Examples:**
```
feat(auth): add role-based route guard component
fix(server): invoke clerkMiddleware as factory function
docs(auth): add complete auth flow walkthrough
```

---

## Pull Request Process

1. **Sync with upstream** before starting work:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes** and commit with conventional commit messages.

4. **Verify your changes** build and run correctly:
   ```bash
   # Server typecheck
   cd server && bun run build

   # Client typecheck
   cd client && bun run typecheck
   ```

5. **Push and open a PR** against the `main` branch of this repository.

6. **Fill in the PR template** completely — PRs without adequate description will be asked for more context before review.

7. **Address review feedback** promptly. Stale PRs (no activity for 30 days) will be closed.

### PR Checklist

- [ ] My code follows the project's code style
- [ ] I have performed a self-review of my code
- [ ] I have added comments in hard-to-understand areas
- [ ] I have updated relevant documentation
- [ ] My changes don't break any existing functionality
- [ ] I have tested my changes locally

---

## Code Style

### TypeScript / JavaScript

- **Formatter:** Prettier (config in `.prettierrc`)
- **Linter:** ESLint (config in `eslint.config.js`)
- Run before committing:
  ```bash
  # Client
  cd client && bun run format && bun run lint

  # Server (if configured)
  cd server && bun run format
  ```

### General Guidelines

- Prefer `async/await` over raw Promise chains
- Use the `asyncHandler` wrapper for all Express route handlers (never handle errors inline)
- Always use the `ok()` / `fail()` envelope helpers for API responses
- Keep route files thin — business logic should live in service functions, not inline in routes
- Use `AppError` for all user-facing errors; never throw plain `Error` in routes

---

## Reporting Bugs

Before submitting a bug:
1. Search existing [issues](https://github.com/maruf-pfc/commerce-kernel/issues) to avoid duplicates.
2. Make sure you're on the latest version of `main`.

When opening a bug report, use the **Bug Report** issue template and include:
- Steps to reproduce
- Expected vs actual behaviour
- Relevant logs or screenshots
- Environment details (OS, Bun version, browser)

---

## Suggesting Features

1. Search existing issues/discussions first.
2. Open a **Feature Request** using the issue template.
3. Describe the problem you're solving, not just the solution.
4. Be open to discussion — features may be scoped down or declined if they don't align with the project direction.

---

## Questions?

Open a [GitHub Issue](https://github.com/maruf-pfc/commerce-kernel/issues) with the `question` label, or reach out directly: [mmsmaruf.official@gmail.com](mailto:mmsmaruf.official@gmail.com).
