# Story 2.1: User Registration API

**Epic:** Epic 2 - Authentication & User System  
**Story ID:** 2.1  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 2-3 (Week 3-4)

---

## User Story

**As a** new user,  
**I want** to create an account with email and password,  
**so that** I can access the platform and share recipes

---

## Acceptance Criteria

1. `POST /v1/auth/signup` endpoint created
2. Request validation:
   - Email: valid format, unique
   - Password: minimum 8 characters, contains letter and number
   - Display name: 2-50 characters
3. Password hashed using bcrypt (cost factor: 10)
4. User record created in database with:
   - UUID primary key
   - Email (unique, lowercase)
   - Password hash
   - Display name
   - Created timestamp
5. Success response returns user data (without password)
6. Error handling:
   - 400 for validation errors
   - 409 for duplicate email
   - 500 for server errors
7. Unit tests cover all validation scenarios
8. Integration test verifies database record creation

---

## Technical Notes

- Use Zod for request validation
- Hash password with bcrypt before saving
- Return sanitized user object (exclude password_hash)
- Log registration events (without sensitive data)

---

## Dependencies

- Epic 1 completed (database, backend setup)

---

## Testing Requirements

- Unit tests for validation logic
- Unit tests for password hashing
- Integration test for successful registration
- Integration test for duplicate email
- Integration test for invalid input

---

## Definition of Done

- [ ] Endpoint implemented and working
- [ ] All validation working correctly
- [ ] Password hashing implemented
- [ ] Error handling complete
- [ ] Unit tests passing (80%+ coverage)
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
