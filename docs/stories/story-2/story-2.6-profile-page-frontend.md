# Story 2.6: User Profile Page & Edit Functionality

**Epic:** Epic 2 - Authentication & User System  
**Story ID:** 2.6  
**Priority:** Medium  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 2-3 (Week 3-4)

---

## User Story

**As a** logged-in user,  
**I want** a profile page where I can view and edit my information,  
**so that** I can keep my account up to date

---

## Acceptance Criteria

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

---

## Technical Notes

- Use shadcn/ui: Dialog, Form, Avatar, Button
- Use React Query mutations for updates
- Optimistic updates for better UX
- Image upload: call `/v1/uploads` first, then update profile with returned URL

---

## Dependencies

- Story 2.4 (Profile API must work)
- Story 2.5 (Auth state management must work)
- Story 1.6 (File upload infrastructure must exist)

---

## Testing Requirements

- Component tests for profile page
- Component tests for edit form
- Integration test for profile update
- Test avatar upload flow
- Test validation
- Test error handling

---

## Definition of Done

- [ ] Profile page implemented
- [ ] Edit functionality working
- [ ] Avatar upload working
- [ ] Validation working
- [ ] Responsive design verified
- [ ] Accessibility verified
- [ ] Tests passing
- [ ] Code reviewed and merged
