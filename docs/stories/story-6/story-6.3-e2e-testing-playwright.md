# Story 6.3: E2E Testing with Playwright

**Epic:** Epic 6 - Testing & Deployment  
**Story ID:** 6.3  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 10-11 (Week 13-15)

---

## User Story

**As a** QA engineer,  
**I want** end-to-end tests for critical user flows,  
**so that** I can verify the entire application works from user perspective

---

## Acceptance Criteria

1. Playwright configured:
   - Playwright installed and configured
   - Test files in `e2e/` directory
   - Multiple browsers configured (Chromium, Firefox, WebKit)
   - Screenshots and videos on failure
2. Critical user flows tested:
   - **User Registration & Login:**
     - Navigate to signup → fill form → submit → verify redirect to dashboard
     - Navigate to login → fill form → submit → verify redirect to dashboard
   - **Recipe Creation:**
     - Login → navigate to create recipe → fill form → upload image → submit → verify recipe detail page
   - **Recipe Search:**
     - Navigate to search → enter query → verify results → click recipe → verify detail page
   - **Review Submission:**
     - Login → navigate to recipe → submit review → verify review appears
   - **Recipe Edit & Delete:**
     - Login → navigate to own recipe → edit → verify changes → delete → verify removal
3. Test environment:
   - Tests run against local dev environment
   - Test data seeded before tests
   - Database reset after tests
4. CI integration:
   - E2E tests run on every PR
   - Tests run in headless mode
   - Artifacts (screenshots, videos) saved on failure
5. All E2E tests passing

---

## Technical Notes

- Use Playwright Test framework
- Configure base URL: `http://localhost:3000`
- Use Page Object Model for maintainability
- Run backend and frontend in Docker for tests
- Use test user accounts (seeded)

---

## Dependencies

- Story 6.2 (Integration tests must work)
- All frontend pages from Epics 2-5

---

## Testing Requirements

- All E2E tests passing
- Tests run in multiple browsers
- Artifacts saved on failure
- Tests run in CI

---

## Definition of Done

- [ ] Playwright configured
- [ ] All critical flows tested
- [ ] Tests passing in all browsers
- [ ] CI integration working
- [ ] Artifacts saved on failure
- [ ] Documentation updated
- [ ] Code reviewed and merged
