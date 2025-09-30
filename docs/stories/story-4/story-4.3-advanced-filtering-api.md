# Story 4.3: Advanced Filtering API

**Epic:** Epic 4 - Search & Filter  
**Story ID:** 4.3  
**Priority:** Medium  
**Estimate:** 3 Story Points  
**Sprint:** Sprint 7 (Week 9-10)

---

## User Story

**As a** user,  
**I want** to filter recipes by multiple criteria,  
**so that** I can find recipes that match my preferences

---

## Acceptance Criteria

1. `GET /v1/recipes` endpoint supports filters:
   - `category`: filter by category ID (single or multiple)
   - `maxTime`: filter by maximum cook time (minutes)
   - `minRating`: filter by minimum average rating (optional)
   - `ownerId`: filter by recipe owner (optional)
2. Filter logic:
   - Multiple categories: OR logic (recipe in any category)
   - maxTime: recipes with cookTimeMinutes <= maxTime
   - minRating: recipes with avgRating >= minRating
   - All filters: AND logic (all conditions must match)
3. Filters combined with search:
   - Search query applied first
   - Filters applied to search results
4. Performance:
   - Efficient queries with proper indexes
   - Query optimization for multiple filters
5. Unit and integration tests cover filter combinations

---

## Technical Notes

- Use Prisma `where` clauses for filtering
- Use `in` operator for multiple categories
- Use `lte` for maxTime, `gte` for minRating
- Ensure indexes exist on filtered columns
- Consider query builder for complex filter combinations

---

## Dependencies

- Story 3.3 (Recipe list API must exist)
- Story 4.2 (Search API must work)

---

## Testing Requirements

- Unit tests for filter query building
- Integration test for each filter type
- Integration test for multiple filters
- Integration test for filters + search
- Performance test with filters

---

## Definition of Done

- [ ] All filters implemented
- [ ] Filter logic working correctly
- [ ] Combined with search
- [ ] Performance acceptable
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
