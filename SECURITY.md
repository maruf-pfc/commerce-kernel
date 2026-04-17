# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` (latest) | ✅ Yes |
| Older branches | ❌ No |

Only the latest commit on the `main` branch receives security fixes.

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub Issues, Discussions, or Pull Requests.**

If you discover a security vulnerability, please report it privately:

**Email:** [mmsmaruf.official@gmail.com](mailto:mmsmaruf.official@gmail.com)  
**Subject line:** `[SECURITY] commerce-kernel — <brief description>`

### What to include in your report

To help us triage quickly, please include:

- **Description** — what is the vulnerability and its potential impact
- **Affected component** — client, server, or both (and relevant file paths)
- **Steps to reproduce** — a minimal, reliable reproduction
- **Proof of concept** — code snippet, curl command, or screenshot (if applicable)
- **Suggested fix** — if you have one (optional but appreciated)

---

## Response Timeline

| Stage | Target time |
|-------|-------------|
| Initial acknowledgement | Within **48 hours** |
| Triage and severity assessment | Within **5 business days** |
| Fix deployed to `main` | Depends on severity (see below) |
| Public disclosure | After fix is released |

### Severity-based fix timelines

| Severity | Examples | Target fix time |
|----------|----------|-----------------|
| **Critical** | Auth bypass, RCE, full data exposure | ≤ 3 days |
| **High** | Privilege escalation, PII leak | ≤ 7 days |
| **Medium** | CSRF, limited data exposure | ≤ 14 days |
| **Low** | Minor info disclosure | Next release cycle |

---

## Disclosure Policy

We follow **responsible disclosure**:

1. You report privately.
2. We acknowledge and investigate.
3. We develop and deploy a fix.
4. We notify you before public disclosure.
5. We credit you in the release notes (unless you prefer to remain anonymous).

Please allow us reasonable time to fix the issue before any public disclosure.

---

## Out of Scope

The following are **not** considered security vulnerabilities for this project:

- Issues in third-party dependencies (please report those upstream — e.g., Clerk, MongoDB, Express)
- Social engineering attacks
- Denial-of-service attacks requiring physical access
- Issues in branches other than `main`
- Vulnerabilities that only affect users running intentionally misconfigured environments

---

## Security Best Practices for Self-Hosting

If you are running Commerce Kernel in your own environment:

- **Never commit `.env` files** — always use `.env.example` with placeholders
- **Rotate Clerk secret keys** if they are ever exposed
- **Restrict `ADMIN_EMAILS`** to only trusted email addresses
- **Use MongoDB IP allowlisting** in Atlas to restrict database access
- **Keep dependencies up to date** — run `bun update` regularly and review changelogs

---

## Attribution

We are grateful to security researchers who responsibly disclose vulnerabilities and help make this project safer for everyone.
