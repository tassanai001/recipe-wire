# Story 5.7: Rating Display on Recipe Cards

**Epic:** Epic 5 - Review & Rating System  
**Story ID:** 5.7  
**Priority:** Medium  
**Estimate:** 3 Story Points  
**Sprint:** Sprint 8-9 (Week 11-12)

---

## User Story

**As a** user,  
**I want** to see ratings on recipe cards,  
**so that** I can quickly identify popular recipes

---

## Acceptance Criteria

1. Recipe card component enhanced:
   - Star rating display (read-only)
   - Shows avgRating (e.g., "4.5 ⭐")
   - Shows review count (e.g., "(23 reviews)")
   - If no reviews: "No reviews yet"
2. Star display:
   - Visual star icons (filled/half/empty)
   - Accessible (aria-label with rating value)
3. Consistent across all pages:
   - Homepage
   - Search results
   - Dashboard
   - Category pages (if any)
4. Responsive and accessible

---

## Technical Notes

- Create reusable StarRating component
- Use avgRating and ratingsCount from recipe data
- Style with CSS or use icon library (Lucide)
- Ensure proper contrast for accessibility

---

## Dependencies

- Story 3.8 (Recipe card component must exist)
- Story 5.1 (Rating data must be available)

---

## Testing Requirements

- Component test for star rating
- Test different rating values
- Test zero reviews state
- Test accessibility
- Visual regression test

---

## Definition of Done

- [ ] StarRating component created
- [ ] Recipe cards updated
- [ ] Consistent across all pages
- [ ] Accessibility verified
- [ ] Tests passing
- [ ] Code reviewed and merged
