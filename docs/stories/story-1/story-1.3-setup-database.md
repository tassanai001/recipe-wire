# Story 1.3: Setup PostgreSQL Database & Prisma

**Epic:** Epic 1 - Project Setup & Infrastructure  
**Story ID:** 1.3  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 1 (Week 1-2)

---

## User Story

**As a** developer,  
**I want** PostgreSQL database configured with Prisma ORM,  
**so that** I can define schemas and perform database operations with type safety

---

## Acceptance Criteria

1. PostgreSQL database created and accessible
2. Prisma installed and configured in `apps/backend`
3. Prisma schema file created with initial User model (placeholder)
4. Database connection string configured via environment variables
5. Prisma migrations initialized
6. Prisma Client generated and importable
7. Database seeding script created (optional for MVP)

---

## Technical Notes

- Database name: `recipewire_dev`
- Use UUID for primary keys
- Enable PostgreSQL extensions: `uuid-ossp`, `pg_trgm` (for search)
- Prisma schema location: `apps/backend/prisma/schema.prisma`

---

## Dependencies

- Story 1.2 (Docker setup with PostgreSQL service)

---

## Testing Requirements

- Verify database connection works
- Verify Prisma Client generates correctly
- Verify migrations can be applied
- Verify seed script runs successfully
- Test database operations (CRUD)

---

## Definition of Done

- [ ] PostgreSQL database running
- [ ] Prisma configured and working
- [ ] Initial schema created
- [ ] Migrations applied successfully
- [ ] Prisma Client generated
- [ ] Documentation updated
- [ ] Code reviewed and merged
