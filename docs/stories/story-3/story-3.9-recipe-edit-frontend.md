# Story 3.9: Recipe Edit Frontend Page

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.9  
**Priority:** Medium  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** recipe owner,  
**I want** to edit my existing recipes,  
**so that** I can update or correct information

---

## Acceptance Criteria

1. Recipe edit page at `/recipes/[id]/edit` (protected):
   - Only accessible by recipe owner (403 otherwise)
   - Form pre-filled with existing recipe data:
     - All fields populated from API
     - Ingredients and steps loaded into dynamic lists
     - Categories pre-selected
   - Form behavior same as creation page
   - Submit button:
     - Calls update API
     - Success redirects to recipe detail page
   - Cancel button returns to recipe detail
2. Image update:
   - Show current cover image
   - Allow uploading new image (replaces old)
3. Validation and error handling same as creation
4. Responsive and accessible

---

## Technical Notes

- Use same form component as creation (with edit mode)
- Fetch recipe data on page load
- Pre-populate form with `reset()` from React Hook Form
- Use PATCH API for updates
- Handle 403 errors with redirect to recipe detail

---

## Dependencies

- Story 3.4 (Recipe update API must work)
- Story 3.6 (Recipe creation form must exist)

---

## Testing Requirements

- Component tests for edit form
- Integration test for recipe update flow
- Test form pre-population
- Test ownership check
- Test validation
- Test error handling

---

## Definition of Done

- [ ] Edit page implemented
- [ ] Form pre-population working
- [ ] Update API integration working
- [ ] Ownership check working
- [ ] Validation working
- [ ] Responsive design verified
- [ ] Accessibility verified
- [ ] Tests passing
- [ ] Code reviewed and merged
