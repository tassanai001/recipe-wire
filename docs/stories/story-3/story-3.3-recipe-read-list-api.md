# Story 3.3: Recipe Read & List APIs

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.3  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** user,  
**I want** to view recipe details and browse recipes,  
**so that** I can discover and learn new recipes

---

## Acceptance Criteria

1. `GET /v1/recipes/:id` endpoint created (public):
   - Returns complete recipe with:
     - All recipe fields
     - Nested ingredients (ordered)
     - Nested steps (ordered by stepNumber)
     - Categories
     - Owner information (id, displayName, avatarUrl)
   - 404 if recipe not found or not published
2. `GET /v1/recipes` endpoint created (public):
   - Query parameters:
     - `q`: search query (optional) - searches title and description
     - `category`: category ID filter (optional)
     - `maxTime`: max cook time filter (optional)
     - `sort`: sorting option (optional) - values: `popular`, `latest`, `time`
     - `page`: page number (default 1)
     - `limit`: items per page (default 20, max 100)
   - Returns paginated results:
     - Array of recipes (with owner info, categories)
     - Pagination metadata (total, page, limit, totalPages)
   - Default sort: `latest` (createdAt DESC)
   - Sort options:
     - `popular`: avgRating DESC, ratingsCount DESC
     - `latest`: createdAt DESC
     - `time`: cookTimeMinutes ASC
3. Search implementation:
   - Use PostgreSQL full-text search on title and description
   - Support partial matching with trigram similarity
4. Performance:
   - Efficient queries with proper joins
   - Indexes utilized for filtering and sorting
5. Unit and integration tests cover all query combinations

---

## Technical Notes

- Use Prisma `include` for nested relations
- Implement cursor-based pagination for better performance (optional)
- Use `ts_vector` for full-text search
- Cache popular queries (Phase 2)

---

## Dependencies

- Story 3.1 (Recipe schema must exist)
- Story 3.2 (Need recipes to query)

---

## Testing Requirements

- Unit tests for query building
- Integration test for get by ID
- Integration test for list with pagination
- Integration test for each sort option
- Integration test for filters
- Performance test for large datasets

---

## Definition of Done

- [ ] GET /v1/recipes/:id working
- [ ] GET /v1/recipes working
- [ ] Pagination working
- [ ] Sorting working
- [ ] Filtering working
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Performance acceptable
- [ ] API documented
- [ ] Code reviewed and merged
