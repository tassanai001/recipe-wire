# Story 6.2: Integration Testing

**Epic:** Epic 6 - Testing & Deployment  
**Story ID:** 6.2  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 10-11 (Week 13-15)

---

## User Story

**As a** developer,  
**I want** integration tests for API endpoints,  
**so that** I can verify end-to-end API functionality

---

## Acceptance Criteria

1. Integration test setup:
   - Supertest configured for API testing
   - Test database configured (separate from dev DB)
   - Database seeding for test data
   - Test files follow pattern: `*.integration.spec.ts`
2. API integration tests written:
   - Auth flow: signup → login → access protected route
   - Recipe CRUD: create → read → update → delete
   - Review flow: create review → verify rating update
   - Search: search recipes → verify results
3. Test database management:
   - Database reset before each test suite
   - Seed data loaded for consistent tests
   - Cleanup after tests
4. Tests run in CI pipeline
5. All tests passing

---

## Technical Notes

- Use Supertest for HTTP assertions
- Use test database: `recipewire_test`
- Reset database with Prisma: `prisma migrate reset --force`
- Seed test data with Prisma seed script
- Run tests in isolated environment

---

## Dependencies

- Story 6.1 (Unit testing must be set up)
- All API endpoints from Epics 2-5

---

## Testing Requirements

- All integration tests passing
- Tests isolated and repeatable
- Database cleanup working
- Tests run in CI

---

## Definition of Done

- [ ] Integration test setup complete
- [ ] All API flows tested
- [ ] Database management working
- [ ] All tests passing
- [ ] CI integration working
- [ ] Documentation updated
- [ ] Code reviewed and merged
