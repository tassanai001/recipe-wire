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

### Prerequisites

- Docker 24+ and Docker Compose 2+
- Node.js (v18+) and pnpm (for local development without Docker)

### Using Docker (Recommended)

The project includes a Docker Compose configuration for easy development setup:

1. Make sure you have Docker and Docker Compose installed
2. Clone the repository
3. Create your environment file:
   ```bash
   cp .env.example .env
   # Edit .env to customize environment variables if needed
   ```
4. Start the entire stack with Docker Compose:
   ```bash
   docker-compose up
   ```
5. The applications will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - PostgreSQL: localhost:5432 (for direct access)

To stop the services, press `Ctrl+C` or run `docker-compose down` from another terminal.

### Local Development (Alternative)

If you prefer to run services locally without Docker:

1. Make sure you have Node.js (v18+) and pnpm installed
2. Clone the repository
3. Run `pnpm install` in the root directory
4. Set up PostgreSQL database (version 15+) locally
5. Update your .env file with the appropriate database connection details
6. Run services separately:
   ```bash
   # Terminal 1: Start the backend
   cd apps/backend
   pnpm run dev
   
   # Terminal 2: Start the frontend (in a new terminal)
   cd apps/frontend
   pnpm run dev
   ```

## Docker Setup Details

The Docker Compose configuration includes:

- `db`: PostgreSQL 15+ service with persistent data storage
- `api`: Backend API service with hot reload capability
- `frontend`: Frontend service with hot reload capability

Volume mounts are configured for:
- Database data persistence
- Source code for hot reload
- Uploads directory (`/var/app/uploads`)

Health checks are configured for all services to ensure proper startup sequence.
