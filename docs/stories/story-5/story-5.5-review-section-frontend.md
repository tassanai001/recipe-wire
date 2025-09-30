# Story 5.5: Review Section on Recipe Detail Page

**Epic:** Epic 5 - Review & Rating System  
**Story ID:** 5.5  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 8-9 (Week 11-12)

---

## User Story

**As a** user,  
**I want** to see reviews and ratings on recipe detail page,  
**so that** I can evaluate the recipe before trying it

---

## Acceptance Criteria

1. Recipe detail page enhanced with reviews section:
   - Rating summary at top:
     - Large star display showing avgRating
     - Text: "X.X out of 5 stars"
     - Total review count: "(Y reviews)"
     - Rating distribution (optional):
       - Bar chart showing count per star level
   - "Write a Review" button (if logged in and not owner):
     - Opens review form modal
     - Disabled if user already reviewed
   - Reviews list:
     - Shows all reviews, paginated
     - Each review displays:
       - User avatar and name
       - Star rating
       - Comment text
       - Date posted
       - Edit/Delete buttons (if user is author)
     - Sort dropdown: Latest, Highest, Lowest
     - Load more button or pagination
2. Review form modal:
   - Star rating selector (1-5 stars, interactive)
   - Comment textarea (optional)
   - Character count for comment
   - Submit button
   - Cancel button
   - Validation and error messages
3. Edit review:
   - Opens same modal with pre-filled data
   - Submit updates review
4. Delete review:
   - Confirmation dialog
   - Deletes review on confirm
5. Loading and error states
6. Responsive design
7. Accessibility compliant

---

## Technical Notes

- Use React Query for fetching and mutating reviews
- Use shadcn/ui: Dialog, Textarea, Button, AlertDialog
- Implement star rating component (interactive)
- Optimistic updates for better UX
- Show success toast on review submission

---

## Dependencies

- Story 5.2, 5.3, 5.4 (Review APIs must work)
- Story 3.7 (Recipe detail page must exist)

---

## Testing Requirements

- Component tests for review section
- Component tests for review form
- Integration test for review submission
- Integration test for review edit/delete
- Test validation
- Test responsive design

---

## Definition of Done

- [ ] Review section implemented
- [ ] Review form working
- [ ] Edit/delete working
- [ ] Star rating component working
- [ ] Responsive design verified
- [ ] Accessibility verified
- [ ] Tests passing
- [ ] Code reviewed and merged
