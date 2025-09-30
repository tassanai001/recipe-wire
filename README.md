# RecipeWire

Recipe sharing web application - connecting amateur and professional cooks.

## Project Overview

RecipeWire is a recipe sharing platform that allows users to create, share, and discover recipes with features like search, filtering, and reviews.

## Tech Stack

- Frontend: Next.js with TypeScript, Tailwind CSS, shadcn/ui
- Backend: NestJS with TypeScript, PostgreSQL, Prisma ORM
- Package Manager: pnpm (monorepo)
- Infrastructure: Docker, Docker Compose

## Directory Structure

```
recipe-wire/
├── apps/
│   ├── backend/     # NestJS API
│   └── frontend/    # Next.js web app
├── packages/
│   ├── types/       # Shared TypeScript types and Zod schemas
│   ├── utils/       # Shared utilities
│   └── ui/          # Shared UI components
├── e2e/             # End-to-end tests
├── docs/            # Documentation
```

## Development Setup

1. Make sure you have Node.js (v18+) and pnpm installed
2. Clone the repository
3. Run `pnpm install` in the root directory
4. Follow the instructions in the individual app directories for running each service
