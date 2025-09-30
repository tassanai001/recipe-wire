# Story 1.2: Setup Docker Development Environment

**Epic:** Epic 1 - Project Setup & Infrastructure  
**Story ID:** 1.2  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 1 (Week 1-2)

---

## User Story

**As a** developer,  
**I want** a Docker Compose setup for local development,  
**so that** I can run the entire stack (frontend, backend, database) consistently across different machines

---

## Acceptance Criteria

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

---

## Technical Notes

- PostgreSQL port: 5432 (mapped to host)
- API port: 3001 (mapped to host)
- Frontend port: 3000 (mapped to host)
- Use bind mounts for development hot reload

---

## Dependencies

- Story 1.1 (Monorepo structure must exist)

---

## Testing Requirements

- Verify all services start successfully
- Verify hot reload works for frontend and backend
- Verify services can communicate
- Verify database persistence works
- Test on at least 2 different machines

---

## Definition of Done

- [ ] docker-compose.yml created and working
- [ ] All services start and run successfully
- [ ] Hot reload working for development
- [ ] Environment variables documented
- [ ] README updated with Docker instructions
- [ ] Code reviewed and merged
