# Epic 2: Authentication & User System

## Epic Goal
สร้างระบบ authentication และ user management ที่ปลอดภัย รวมถึง user registration, login, JWT token management, และ user profile CRUD เพื่อให้ผู้ใช้สามารถสร้างบัญชีและจัดการข้อมูลส่วนตัวได้

## Epic Owner
Development Team

## Dependencies
- Epic 1: Project Setup & Infrastructure (ต้องเสร็จก่อน)

## Target Sprint/Timeline
Sprint 2-3 (Week 3-4)

---

## User Stories

### Story 2.1: User Registration API
**As a** new user,
**I want** to create an account with email and password,
**so that** I can access the platform and share recipes

**Acceptance Criteria:**
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

**Technical Notes:**
- Use Zod for request validation
- Hash password with bcrypt before saving
- Return sanitized user object (exclude password_hash)
- Log registration events (without sensitive data)

---

### Story 2.2: User Login & JWT Token Generation
**As a** registered user,
**I want** to log in with my email and password,
**so that** I can access my account and protected features

**Acceptance Criteria:**
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

**Technical Notes:**
- Use `@nestjs/jwt` for token generation
- Store JWT secret in environment variables
- Use RS256 algorithm (generate key pair)
- Token payload: `{ userId, email, iat, exp }`
- Log login attempts (success/failure)

---

### Story 2.3: JWT Authentication Guard & Token Refresh
**As a** logged-in user,
**I want** my session to be maintained securely,
**so that** I can access protected resources without re-logging in frequently

**Acceptance Criteria:**
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

**Technical Notes:**
- Use `@nestjs/passport` and `passport-jwt`
- Extract token from `Authorization: Bearer <token>` header
- Attach user object to `request.user`
- Refresh token stored in database (optional for MVP, document for Phase 2)

---

### Story 2.4: User Profile Management API
**As a** logged-in user,
**I want** to view and update my profile information,
**so that** I can personalize my account

**Acceptance Criteria:**
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

**Technical Notes:**
- Use JWT guard to protect endpoints
- Validate updates with Zod schemas
- Return sanitized user object
- Log profile update events

---

### Story 2.5: Frontend Authentication Pages & State Management
**As a** user,
**I want** intuitive signup and login pages,
**so that** I can easily create an account or access my existing account

**Acceptance Criteria:**
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

**Technical Notes:**
- Use shadcn/ui components: Form, Input, Button, Card
- Use React Hook Form for form management
- Use Zod for client-side validation (shared schema from `@recipe-wire/types`)
- Store tokens securely (consider httpOnly cookies for Phase 2)
- Implement auto-refresh logic with React Query

---

### Story 2.6: User Profile Page & Edit Functionality
**As a** logged-in user,
**I want** a profile page where I can view and edit my information,
**so that** I can keep my account up to date

**Acceptance Criteria:**
1. Profile page created at `/profile`:
   - Protected route (requires authentication)
   - Displays current user information:
     - Avatar (placeholder if not set)
     - Display name
     - Email (read-only)
     - Bio
   - "Edit Profile" button
2. Edit profile modal/form:
   - Fields: display name, bio, avatar URL
   - Pre-filled with current values
   - Client-side validation
   - Submit calls `PATCH /v1/me` API
   - Success updates UI and shows success message
   - Cancel button discards changes
3. Avatar upload functionality (uses local upload):
   - File picker for image selection
   - Preview before upload
   - Calls upload API, then updates avatarUrl
   - Shows upload progress
4. Responsive design
5. Loading states during API calls
6. Error handling with user-friendly messages
7. Accessibility compliant

**Technical Notes:**
- Use shadcn/ui: Dialog, Form, Avatar, Button
- Use React Query mutations for updates
- Optimistic updates for better UX
- Image upload: call `/v1/uploads` first, then update profile with returned URL

---

## Epic Acceptance Criteria
- [ ] All 6 stories completed and tested
- [ ] Users can sign up with email and password
- [ ] Users can log in and receive JWT tokens
- [ ] Protected API routes require valid JWT
- [ ] Users can view and update their profile
- [ ] Frontend pages are responsive and accessible
- [ ] Token refresh works automatically
- [ ] All unit and integration tests passing
- [ ] Security best practices followed (password hashing, JWT validation)

## Technical Dependencies
- Epic 1 completed (database, backend, frontend skeleton)
- bcrypt for password hashing
- @nestjs/jwt and @nestjs/passport for JWT
- React Hook Form and Zod for frontend validation
- Zustand for auth state management

## Security Considerations
- Passwords hashed with bcrypt (cost factor 10+)
- JWT tokens signed with RS256
- Access tokens short-lived (15 minutes)
- Refresh tokens longer-lived (7 days)
- No sensitive data in JWT payload
- HTTPS required in production
- Rate limiting on auth endpoints (Phase 2)

## Risks & Mitigations
- **Risk:** Token theft/XSS attacks
  - **Mitigation:** Use httpOnly cookies (Phase 2), implement CSP headers
- **Risk:** Brute force attacks on login
  - **Mitigation:** Implement rate limiting (Phase 2), account lockout after failed attempts

## Definition of Done
- All stories meet acceptance criteria
- Code reviewed and merged
- Unit tests: 80%+ coverage for auth logic
- Integration tests verify end-to-end auth flow
- Security review completed
- Documentation updated with auth flow diagrams
- No critical security vulnerabilities
