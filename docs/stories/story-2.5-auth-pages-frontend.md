# Story 2.5: Frontend Authentication Pages & State Management

**Epic:** Epic 2 - Authentication & User System  
**Story ID:** 2.5  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 2-3 (Week 3-4)

---

## User Story

**As a** user,  
**I want** intuitive signup and login pages,  
**so that** I can easily create an account or access my existing account

---

## Acceptance Criteria

1. Signup page created at `/signup`:
   - Form fields: email, password, confirm password, display name
   - Client-side validation matches API requirements
   - Password strength indicator
   - Submit button calls signup API
   - Success redirects to dashboard
   - Error messages displayed clearly
2. Login page created at `/login`:
   - Form fields: email, password
   - Submit button calls login API
   - Success redirects to dashboard
   - Error messages displayed clearly
   - Link to signup page
3. Auth state management with Zustand:
   - Store: user, accessToken, isAuthenticated
   - Actions: login, logout, setUser
   - Persist tokens in localStorage (with security considerations)
4. API client configured with React Query:
   - Automatic token attachment to requests
   - Token refresh on 401 errors
   - Logout on refresh failure
5. Protected route wrapper created:
   - Redirects to login if not authenticated
   - Shows loading state during auth check
6. Navigation updated with auth-aware links:
   - Show "Login/Signup" when logged out
   - Show "Profile/Logout" when logged in
7. Responsive design for mobile and desktop
8. Accessibility: proper labels, keyboard navigation, ARIA attributes

---

## Technical Notes

- Use shadcn/ui components: Form, Input, Button, Card
- Use React Hook Form for form management
- Use Zod for client-side validation (shared schema from `@recipe-wire/types`)
- Store tokens securely (consider httpOnly cookies for Phase 2)
- Implement auto-refresh logic with React Query

---

## Dependencies

- Story 2.1, 2.2, 2.3 (Auth APIs must work)
- Story 1.5 (Frontend skeleton must exist)

---

## Testing Requirements

- Component tests for signup form
- Component tests for login form
- Integration tests for auth flow
- Test validation messages
- Test error handling
- Test responsive design

---

## Definition of Done

- [ ] Signup page implemented
- [ ] Login page implemented
- [ ] Auth state management working
- [ ] Protected routes working
- [ ] Navigation updated
- [ ] Responsive design verified
- [ ] Accessibility verified
- [ ] Tests passing
- [ ] Code reviewed and merged
