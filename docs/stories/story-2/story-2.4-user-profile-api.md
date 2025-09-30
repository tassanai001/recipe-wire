# Story 2.4: User Profile Management API

**Epic:** Epic 2 - Authentication & User System  
**Story ID:** 2.4  
**Priority:** Medium  
**Estimate:** 3 Story Points  
**Sprint:** Sprint 2-3 (Week 3-4)

---

## User Story

**As a** logged-in user,  
**I want** to view and update my profile information,  
**so that** I can personalize my account

---

## Acceptance Criteria

1. `GET /v1/me` endpoint created (protected):
   - Returns current user profile
   - Excludes password hash
2. `PATCH /v1/me` endpoint created (protected):
   - Allows updating: displayName, bio, avatarUrl
   - Validates input:
     - Display name: 2-50 characters
     - Bio: max 500 characters
     - Avatar URL: valid URL format
   - Returns updated user profile
3. User cannot update email or password (document separate endpoints for Phase 2)
4. Error handling:
   - 401 for unauthenticated requests
   - 400 for validation errors
5. Unit tests cover validation scenarios
6. Integration tests verify profile updates

---

## Technical Notes

- Use JWT guard to protect endpoints
- Validate updates with Zod schemas
- Return sanitized user object
- Log profile update events

---

## Dependencies

- Story 2.3 (Auth guard must work)

---

## Testing Requirements

- Unit tests for validation
- Integration test for getting profile
- Integration test for updating profile
- Integration test for invalid updates
- Integration test for unauthenticated access

---

## Definition of Done

- [ ] GET /v1/me endpoint working
- [ ] PATCH /v1/me endpoint working
- [ ] Validation working
- [ ] Error handling complete
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
