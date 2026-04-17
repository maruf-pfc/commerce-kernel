<div align="center">

# Commerce Kernel

**A production-grade, full-stack e-commerce engine built with the MERN stack.**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk&logoColor=white)](https://clerk.com/)

</div>

---

## What is Commerce Kernel?

Commerce Kernel is a monorepo e-commerce platform built as an educational reference implementation of a production-ready MERN stack application. It covers authentication, role-based access control, product management, cart & wishlist, promotions, checkout, and orders — with clean architecture patterns throughout.

> **Reference project:** Built by following [`mern-ecommerce-2026`](../mern-ecommerce-2026) as the source of truth.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, TailwindCSS v4, shadcn/ui |
| **State Management** | Zustand |
| **Routing** | React Router v7 |
| **Authentication** | Clerk (`@clerk/react`, `@clerk/express`) |
| **HTTP Client** | Axios |
| **Backend** | Express 5, TypeScript, Bun |
| **Database** | MongoDB (Mongoose ODM) |
| **Validation** | Zod |
| **Dev Runtime** | Bun |

---

## Project Structure

```
commerce-kernel/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── features/       # Feature modules (auth, cart, etc.)
│       ├── lib/            # Shared utilities (api client, types)
│       ├── pages/          # Route-level page components
│       └── router.tsx      # React Router config
│
├── server/                 # Express backend (Bun)
│   └── src/
│       ├── middlewares/    # Auth, error handler, notFound
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Route handlers grouped by domain
│       └── utils/          # AppError, asyncHandler, envelope
│
├── docs/                   # Architecture & flow documentation
│   └── auth-flow.md        # Complete auth system walkthrough
│
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) `>= 1.x`
- [Node.js](https://nodejs.org/) `>= 20` (for tooling compatibility)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier works)
- A [Clerk](https://clerk.com/) application (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/maruf-pfc/commerce-kernel.git
cd commerce-kernel
```

### 2. Set up the Server

```bash
cd server
cp .env.example .env   # then fill in your values
bun install
```

**Required environment variables (`server/.env`):**

```env
PORT=5000
CORS_ORIGINS=http://localhost:5173
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
ADMIN_EMAILS=your@email.com
```

### 3. Set up the Client

```bash
cd client
cp .env.example .env   # then fill in your values
bun install
```

**Required environment variables (`client/.env`):**

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000
```

### 4. Run the Development Servers

```bash
# In /server
bun run dev

# In /client (separate terminal)
bun run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`
- Health check: `http://localhost:5000/health`

---

## Authentication Flow

This project uses **Clerk** for identity and syncs users to MongoDB on first login. See [`docs/auth-flow.md`](./docs/auth-flow.md) for the full walkthrough including:

- How `clerkMiddleware()` works
- The `POST /auth/sync` upsert flow
- Client-side bootstrap with `useBootstrapAuth`
- Zustand store state machine
- Route guard components
- Admin role assignment

---

## API Overview

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET` | `/health` | Public | Server health check |
| `POST` | `/auth/sync` | Private | Sync Clerk user to MongoDB |
| `GET` | `/auth/me` | Private | Get current user from DB |

---

## Documentation

| Document | Description |
|----------|-------------|
| [`docs/auth-flow.md`](./docs/auth-flow.md) | Full auth architecture, flow diagrams, and bug history |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | How to contribute |
| [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) | Community standards |
| [`SECURITY.md`](./SECURITY.md) | How to report security vulnerabilities |

---

## License

Copyright © 2026 **Md. Maruf Sarker**. Licensed under the [MIT License](./LICENSE).
