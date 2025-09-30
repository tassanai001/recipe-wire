# Epic 1: Project Setup & Infrastructure

## Epic Goal

สร้างโครงสร้างพื้นฐานของโปรเจกต์ รวมถึง monorepo setup, development environment, database, และ skeleton code สำหรับ frontend และ backend เพื่อให้พร้อมสำหรับการพัฒนาฟีเจอร์

## Epic Owner

Development Team

## Dependencies

- ไม่มี (Epic แรก)

## Target Sprint/Timeline

Sprint 1 (Week 1-2)

---

## User Stories

### Story 1.1: Initialize Monorepo Structure

**As a** developer,
**I want** a properly configured monorepo with workspace management,
**so that** I can develop frontend and backend applications with shared packages efficiently

**Acceptance Criteria:**

1. Monorepo initialized with pnpm workspaces
2. Directory structure follows architecture specification:
   - `apps/frontend/` - Next.js application
   - `apps/backend/` - NestJS application
   - `packages/types/` - Shared TypeScript types and Zod schemas
   - `packages/utils/` - Shared utilities
   - `packages/ui/` - Shared UI components (placeholder)
3. Root `package.json` configured with workspace references
4. TypeScript configured with strict mode and path aliases
5. ESLint and Prettier configured for consistent code style
6. Git repository initialized with `.gitignore` configured

**Technical Notes:**

- Use pnpm for package management
- TypeScript strict mode enabled
- Configure path aliases: `@recipe-wire/types`, `@recipe-wire/utils`, `@recipe-wire/ui`

---

### Story 1.2: Setup Docker Development Environment

**As a** developer,
**I want** a Docker Compose setup for local development,
**so that** I can run the entire stack (frontend, backend, database) consistently across different machines

**Acceptance Criteria:**

1. `docker-compose.yml` created with services:
   - `db` - PostgreSQL 15+
   - `api` - NestJS backend (development mode with hot reload)
   - `frontend` - Next.js frontend (development mode with hot reload)
2. Volume mounts configured for:
   - Database data persistence
   - Source code (for hot reload)
   - Uploads folder (`/var/app/uploads`)
3. Environment variables configured via `.env` files
4. Health checks configured for all services
5. Services can communicate via Docker network
6. Documentation in `README.md` for running Docker setup

**Technical Notes:**

- PostgreSQL port: 5432 (mapped to host)
- API port: 3001 (mapped to host)
- Frontend port: 3000 (mapped to host)
- Use bind mounts for development hot reload

---

### Story 1.3: Setup PostgreSQL Database & Prisma

**As a** developer,
**I want** PostgreSQL database configured with Prisma ORM,
**so that** I can define schemas and perform database operations with type safety

**Acceptance Criteria:**

1. PostgreSQL database created and accessible
2. Prisma installed and configured in `apps/backend`
3. Prisma schema file created with initial User model (placeholder)
4. Database connection string configured via environment variables
5. Prisma migrations initialized
6. Prisma Client generated and importable
7. Database seeding script created (optional for MVP)

**Technical Notes:**

- Database name: `recipewire_dev`
- Use UUID for primary keys
- Enable PostgreSQL extensions: `uuid-ossp`, `pg_trgm` (for search)
- Prisma schema location: `apps/backend/prisma/schema.prisma`

---

### Story 1.4: Setup NestJS Backend Skeleton

**As a** developer,
**I want** a NestJS application skeleton with basic configuration,
**so that** I can start implementing API endpoints with proper structure

**Acceptance Criteria:**

1. NestJS application initialized in `apps/backend`
2. TypeScript configured with strict mode
3. Basic modules created:
   - `AppModule` (root)
   - `HealthModule` (health check endpoint)
4. Environment configuration using `@nestjs/config`
5. Global validation pipe configured with Zod
6. CORS configured for frontend origin
7. Logging configured using Pino
8. API runs successfully on port 3001
9. Health check endpoint `/health` returns 200 OK

**Technical Notes:**

- Use NestJS CLI for scaffolding
- Install: `@nestjs/config`, `zod`, `pino-http`
- Enable global validation pipe
- CORS origin: `http://localhost:3000` (dev)

---

### Story 1.5: Setup Next.js Frontend Skeleton

**As a** developer,
**I want** a Next.js application skeleton with Tailwind CSS and shadcn/ui,
**so that** I can start building UI components with modern styling

**Acceptance Criteria:**

1. Next.js 14+ application initialized in `apps/frontend` with App Router
2. TypeScript configured with strict mode
3. Tailwind CSS installed and configured
4. shadcn/ui initialized with base components
5. Basic layout structure created:
   - Root layout with metadata
   - Navigation component (placeholder)
   - Footer component (placeholder)
6. Home page created with basic content
7. React Query configured for server state management
8. Zustand configured for client state (auth state placeholder)
9. Application runs successfully on port 3000

**Technical Notes:**

- Use Next.js App Router (not Pages Router)
- Install shadcn/ui components: Button, Card, Input, Label
- Configure Tailwind with custom theme colors
- React Query provider setup in root layout
- Environment variables for API URL: `NEXT_PUBLIC_API_URL`

---

### Story 1.6: Setup Local File Upload Infrastructure

**As a** developer,
**I want** a local file upload system configured,
**so that** users can upload recipe and profile images

**Acceptance Criteria:**

1. Upload directory created: `/var/app/uploads` (or `./uploads` in dev)
2. Directory structure organized by type:
   - `uploads/recipes/` - Recipe images
   - `uploads/profiles/` - Profile images
3. Upload directory mounted in Docker Compose
4. File upload middleware configured in NestJS
5. File validation implemented:
   - Allowed types: `image/jpeg`, `image/png`, `image/webp`
   - Max size: 3 MB per file
   - Filename sanitization (prevent path traversal)
6. Static file serving configured for uploads
7. Environment variable for upload path configured

**Technical Notes:**

- Use `multer` for file uploads in NestJS
- Generate unique filenames: `{uuid}-{timestamp}.{ext}`
- Serve uploads via `/uploads/*` route
- Validate MIME type and file extension

---

## Epic Acceptance Criteria

- [ ] All 6 stories completed and tested
- [ ] Development environment runs successfully with `docker-compose up`
- [ ] Frontend accessible at `http://localhost:3000`
- [ ] Backend API accessible at `http://localhost:3001`
- [ ] Database accessible and migrations applied
- [ ] Health check endpoints return 200 OK
- [ ] File upload directory accessible and writable
- [ ] Documentation updated with setup instructions

## Technical Dependencies

- Node.js 18+ / 20+
- pnpm 8+
- Docker & Docker Compose
- PostgreSQL 15+

## Risks & Mitigations

- **Risk:** Docker setup issues on different OS
  - **Mitigation:** Provide OS-specific documentation, use cross-platform paths
- **Risk:** Port conflicts on developer machines
  - **Mitigation:** Document port requirements, provide alternative port configuration

## Definition of Done

- All stories meet acceptance criteria
- Code reviewed and merged
- Documentation complete
- Development environment tested on at least 2 different machines
- No critical bugs or blockers
