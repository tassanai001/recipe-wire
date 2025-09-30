# Story 6.1: Unit Testing Setup & Core Tests

**Epic:** Epic 6 - Testing & Deployment  
**Story ID:** 6.1  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 10-11 (Week 13-15)

---

## User Story

**As a** developer,  
**I want** comprehensive unit tests for backend and frontend,  
**so that** I can ensure individual components work correctly

---

## Acceptance Criteria

1. Backend unit testing configured:
   - Jest configured for NestJS
   - Test files follow pattern: `*.spec.ts`
   - Coverage reporting enabled
   - Scripts added to package.json: `test`, `test:watch`, `test:cov`
2. Frontend unit testing configured:
   - Vitest configured for Next.js
   - React Testing Library installed
   - Test files follow pattern: `*.test.tsx` or `*.test.ts`
   - Coverage reporting enabled
   - Scripts added: `test`, `test:watch`, `test:cov`
3. Core backend tests written:
   - Auth service tests (signup, login, JWT validation)
   - Recipe service tests (CRUD operations)
   - Review service tests (CRUD, rating calculation)
   - Validation tests (Zod schemas)
4. Core frontend tests written:
   - Component tests (RecipeCard, ReviewForm, etc.)
   - Hook tests (useAuth, custom hooks)
   - Utility function tests
5. Test coverage targets:
   - Backend: 80%+ coverage
   - Frontend: 70%+ coverage
6. CI integration (runs on every commit)

---

## Technical Notes

- Use Jest for backend (NestJS default)
- Use Vitest for frontend (faster than Jest)
- Mock external dependencies (database, APIs)
- Use Testing Library best practices (user-centric tests)
- Configure coverage thresholds in config files

---

## Dependencies

- All previous epics (1-5) completed

---

## Testing Requirements

- All unit tests passing
- Coverage thresholds met
- Tests run in CI
- No flaky tests

---

## Definition of Done

- [ ] Backend testing configured
- [ ] Frontend testing configured
- [ ] Core tests written
- [ ] Coverage targets met
- [ ] CI integration working
- [ ] Documentation updated
- [ ] Code reviewed and merged
