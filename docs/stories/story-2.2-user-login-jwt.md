# Story 2.2: User Login & JWT Token Generation

**Epic:** Epic 2 - Authentication & User System  
**Story ID:** 2.2  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 2-3 (Week 3-4)

---

## User Story

**As a** registered user,  
**I want** to log in with my email and password,  
**so that** I can access my account and protected features

---

## Acceptance Criteria

1. `POST /v1/auth/login` endpoint created
2. Request validation:
   - Email: required, valid format
   - Password: required
3. Authentication logic:
   - Find user by email (case-insensitive)
   - Verify password using bcrypt
   - Generate JWT tokens on success
4. JWT tokens generated:
   - Access token: RS256, 15 minutes TTL, contains userId and email
   - Refresh token: RS256, 7 days TTL, contains userId only
5. Response includes:
   - Access token
   - Refresh token
   - User data (without password)
6. Error handling:
   - 401 for invalid credentials
   - 400 for validation errors
7. Rate limiting considered (document for Phase 2)
8. Unit and integration tests cover success and failure cases

---

## Technical Notes

- Use `@nestjs/jwt` for token generation
- Store JWT secret in environment variables
- Use RS256 algorithm (generate key pair)
- Token payload: `{ userId, email, iat, exp }`
- Log login attempts (success/failure)

---

## Dependencies

- Story 2.1 (User registration must work)

---

## Testing Requirements

- Unit tests for authentication logic
- Unit tests for JWT generation
- Integration test for successful login
- Integration test for invalid credentials
- Integration test for non-existent user

---

## Definition of Done

- [ ] Login endpoint implemented
- [ ] JWT generation working
- [ ] Password verification working
- [ ] Error handling complete
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
