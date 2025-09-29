# Story 4.6: Dashboard Search & Filter

**Epic:** Epic 4 - Search & Filter  
**Story ID:** 4.6  
**Priority:** Low  
**Estimate:** 3 Story Points  
**Sprint:** Sprint 7 (Week 9-10)

---

## User Story

**As a** logged-in user,  
**I want** to search and filter my own recipes on dashboard,  
**so that** I can quickly find recipes I created

---

## Acceptance Criteria

1. Dashboard "My Recipes" section enhanced:
   - Search bar above recipe grid
   - Filters: category, cook time
   - Search and filters apply to user's recipes only
2. Search behavior:
   - Client-side filtering (if small dataset) OR
   - API call with ownerId filter
3. Filter UI similar to search page
4. Results update in real-time
5. Empty state: "You haven't created any recipes yet"

---

## Technical Notes

- Use same search/filter components as search page
- Add `ownerId` filter to API call
- Consider client-side filtering if user has < 50 recipes
- Use React Query with user-specific query key

---

## Dependencies

- Story 3.8 (Dashboard must exist)
- Story 4.2, 4.3 (Search/filter APIs must work)

---

## Testing Requirements

- Component test for dashboard search
- Integration test for user recipe search
- Test filter interactions
- Test empty state

---

## Definition of Done

- [ ] Dashboard search implemented
- [ ] Filters working
- [ ] User recipes filtered correctly
- [ ] Empty state working
- [ ] Tests passing
- [ ] Code reviewed and merged
