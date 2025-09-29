# Story 5.6: User Reviews Dashboard

**Epic:** Epic 5 - Review & Rating System  
**Story ID:** 5.6  
**Priority:** Low  
**Estimate:** 3 Story Points  
**Sprint:** Sprint 8-9 (Week 11-12)

---

## User Story

**As a** logged-in user,  
**I want** to see all my reviews in one place,  
**so that** I can manage my reviews easily

---

## Acceptance Criteria

1. User profile/dashboard enhanced with "My Reviews" section:
   - List of all user's reviews
   - Each review shows:
     - Recipe thumbnail and title (linked)
     - Star rating given
     - Comment excerpt
     - Date posted
     - Edit/Delete buttons
   - Pagination or infinite scroll
   - Empty state: "You haven't reviewed any recipes yet"
2. Edit/Delete functionality same as recipe detail page
3. Responsive design

---

## Technical Notes

- Create new API endpoint: `GET /v1/me/reviews`
- Returns user's reviews with recipe data
- Use same review components as recipe detail page
- Consider adding to profile page or separate tab

---

## Dependencies

- Story 5.3 (Review list API must work)
- Story 5.4 (Review edit/delete APIs must work)
- Story 2.6 (Profile page must exist)

---

## Testing Requirements

- Component test for reviews dashboard
- Integration test for user reviews list
- Test edit/delete functionality
- Test empty state

---

## Definition of Done

- [ ] My Reviews section implemented
- [ ] API endpoint created
- [ ] Edit/delete working
- [ ] Empty state working
- [ ] Responsive design verified
- [ ] Tests passing
- [ ] Code reviewed and merged
