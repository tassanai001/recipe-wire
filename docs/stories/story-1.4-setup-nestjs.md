# Story 1.4: Setup NestJS Backend Skeleton

**Epic:** Epic 1 - Project Setup & Infrastructure  
**Story ID:** 1.4  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 1 (Week 1-2)

---

## User Story

**As a** developer,  
**I want** a NestJS application skeleton with basic configuration,  
**so that** I can start implementing API endpoints with proper structure

---

## Acceptance Criteria

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

---

## Technical Notes

- Use NestJS CLI for scaffolding
- Install: `@nestjs/config`, `zod`, `pino-http`
- Enable global validation pipe
- CORS origin: `http://localhost:3000` (dev)

---

## Dependencies

- Story 1.1 (Monorepo structure)
- Story 1.3 (Database setup for Prisma integration)

---

## Testing Requirements

- Verify NestJS application starts
- Verify health check endpoint responds
- Verify CORS works from frontend origin
- Verify logging outputs correctly
- Verify environment variables load

---

## Definition of Done

- [ ] NestJS application running
- [ ] Health check endpoint working
- [ ] CORS configured
- [ ] Logging configured
- [ ] Environment configuration working
- [ ] Documentation updated
- [ ] Code reviewed and merged
