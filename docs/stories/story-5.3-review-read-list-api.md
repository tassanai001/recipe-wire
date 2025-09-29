# Story 5.3: Review Read & List APIs

**Epic:** Epic 5 - Review & Rating System  
**Story ID:** 5.3  
**Priority:** High  
**Estimate:** 3 Story Points  
**Sprint:** Sprint 8-9 (Week 11-12)

---

## User Story

**As a** user,  
**I want** to view reviews for a recipe,  
**so that** I can learn from others' experiences

---

## Acceptance Criteria

1. `GET /v1/recipes/:recipeId/reviews` endpoint created (public):
   - Returns paginated list of reviews for recipe
   - Query parameters:
     - `page`: page number (default 1)
     - `limit`: items per page (default 20, max 100)
     - `sort`: sorting option (default `latest`)
       - `latest`: createdAt DESC
       - `highest`: rating DESC
       - `lowest`: rating ASC
   - Each review includes:
     - Review data (id, rating, comment, createdAt)
     - User info (id, displayName, avatarUrl)
   - Returns pagination metadata
2. `GET /v1/reviews/:id` endpoint created (public):
   - Returns single review by ID
   - Includes user and recipe info
   - 404 if not found
3. Performance:
   - Efficient queries with proper joins
   - Uses indexes for sorting
4. Unit and integration tests

---

## Technical Notes

- Use Prisma `include` for user data
- Implement pagination with skip/take
- Order by createdAt or rating based on sort param
- Consider caching popular recipe reviews (Phase 2)

---

## Dependencies

- Story 5.1 (Review schema must exist)
- Story 5.2 (Need reviews to query)

---

## Testing Requirements

- Unit tests for query building
- Integration test for list reviews
- Integration test for each sort option
- Integration test for pagination
- Integration test for get by ID

---

## Definition of Done

- [ ] List endpoint implemented
- [ ] Get by ID endpoint implemented
- [ ] Pagination working
- [ ] Sorting working
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
