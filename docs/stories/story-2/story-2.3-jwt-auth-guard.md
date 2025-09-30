# Story 2.3: JWT Authentication Guard & Token Refresh

**Epic:** Epic 2 - Authentication & User System  
**Story ID:** 2.3  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 2-3 (Week 3-4)

---

## User Story

**As a** logged-in user,  
**I want** my session to be maintained securely,  
**so that** I can access protected resources without re-logging in frequently

---

## Acceptance Criteria

1. JWT Authentication Guard created and configured globally
2. Guard validates access token on protected routes:
   - Verify token signature
   - Check expiration
   - Extract user information
   - Attach user to request object
3. `POST /v1/auth/refresh` endpoint created:
   - Accepts refresh token
   - Validates refresh token
   - Issues new access token
   - Returns new access token
4. Error handling:
   - 401 for invalid/expired tokens
   - 403 for missing tokens
5. Public routes excluded from guard:
   - `/v1/auth/signup`
   - `/v1/auth/login`
   - `/health`
6. Unit tests verify token validation logic
7. Integration tests verify protected route access

---

## Technical Notes

- Use `@nestjs/passport` and `passport-jwt`
- Extract token from `Authorization: Bearer <token>` header
- Attach user object to `request.user`
- Refresh token stored in database (optional for MVP, document for Phase 2)

---

## Dependencies

- Story 2.2 (Login and JWT generation must work)

---

## Testing Requirements

- Unit tests for guard logic
- Unit tests for token validation
- Integration test for protected route access
- Integration test for token refresh
- Integration test for expired token
- Integration test for invalid token

---

## Definition of Done

- [ ] Auth guard implemented
- [ ] Token validation working
- [ ] Refresh endpoint working
- [ ] Protected routes secured
- [ ] Public routes accessible
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
