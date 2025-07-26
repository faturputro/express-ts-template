# 🧪 Node.js Express Starter Template

A Node.js Express project template with built-in support for TypeScript, Redis, RBAC, and modern tooling — built for speed, flexibility, and clean architecture.

## ✨ Features

- **Express + OvernightJS** — Clean controller-based routing with decorators.
- **TypeScript** — Full static typing with strict mode enabled.
- **[SWC](https://swc.rs/)** — Ultra-fast TypeScript transpilation.
- **[Sequelize ORM](https://sequelize.org/)** — Use any SQL database (MySQL, PostgreSQL, SQLite, etc.).
- **Database Migrations & Seeders** — Built-in tooling for managing schema and test data.
- **Redis Integration** — For caching and fast in-memory data access.
- **Cookie-based Authentication** — Stateless secure session handling.
- **Role-Based Access Control (RBAC)** — Fine-grained access control per route.
- **Logging**
  - Console in development
  - SQLite persistence in production
  - 🔒 **PII-safe via log redactor**
- **i18n Support** — Internationalized error messages & responses (Bahasa & English)
- **Unit Testing** — Powered by [Vitest](https://vitest.dev), with fast and simple testing setup.
- **[Biome](https://biomejs.dev/)** — Code formatter and linter in one, for consistent style and code quality.
- **Pre-commit Hooks** — Prevent bad code from being committed (via [husky](https://typicode.github.io/husky/)).
- **GitHub Actions CI/CD** — Auto-deploy to your VPS on push to main.

---

## Getting Started

### 1. Set Up Environment
Copy the .env example and configure:

```bash
npm install
cp .env.example .env
```
Update .env with your database, Redis, and app settings.

### 2. Secure JWT with JWE (JOSE + PKCS8)

This project uses [JOSE](https://github.com/panva/jose) to encrypt JWT tokens using asymmetric encryption (JWE) for enhanced security.

Run the following commands to generate a private key in PKCS8 format:

```bash
# Step 1: Generate a 2048-bit RSA key
openssl genrsa -out keypair.pem 2048

# Step 2: Convert to PKCS#8 format (no passphrase)
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out pkcs8.key
```
Copy and paste the output as the `APP_PKCS8_KEY` env variable value
```bash
# example
APP_PKCS8_KEY=-----BEGIN_PRIVATE_KEY-----MIIEvQIBAD......
```

### 3. Run in Development Mode
```bash
npm run dev
```
---
## Project Structure
```bash
.
├── .github/               # CI/CD workflow (using Github Action)
├── .husky/                # Git hooks (pre-commit, etc.)
├── config/                # Static config (app/DB constants)
├── dist/                  # Compiled output (from SWC)
├── logs/                  # Log output (e.g. SQLite)
├── migrations/            # Sequelize migrations
├── seeders/               # Sequelize seeders
├── src/                   # Core backend application
│   ├── config/            # Runtime configuration
│   ├── controllers/v1/    # API controllers (v1)
│   ├── middlewares/       # Express middleware (auth, errors)
│   ├── models/            # Sequelize models
│   ├── repositories/      # DB access abstraction
│   ├── services/          # Business logic
│   ├── types/             # TypeScript type declarations
│   ├── utils/             # Helper utilities
│   ├── index.ts           # Entry point (for dev)
│   └── server.ts          # App + server startup logic
├── .env
├── .env.example
├── .gitignore
├── .sequelizerc
├── .swcrc
├── biome.json
├── ecosystem.config.js    # PM2 config for production
├── jsconfig.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```