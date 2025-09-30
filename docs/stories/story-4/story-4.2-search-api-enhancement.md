# Story 4.2: Search API Enhancement

**Epic:** Epic 4 - Search & Filter  
**Story ID:** 4.2  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 7 (Week 9-10)

---

## User Story

**As a** user,  
**I want** to search recipes by keywords,  
**so that** I can quickly find recipes I'm interested in

---

## Acceptance Criteria

1. `GET /v1/recipes` endpoint enhanced with search:
   - Query parameter `q` (search query)
   - Search logic:
     - If `q` provided, use full-text search on searchVector
     - Rank results by relevance (ts_rank)
     - Support partial matching with trigram similarity
     - Minimum similarity threshold: 0.3
   - Search behavior:
     - Searches in recipe title and description
     - Case-insensitive
     - Supports multiple keywords (AND logic)
     - Returns results ordered by relevance
2. Search combined with other filters:
   - Can combine with category, maxTime filters
   - Filters applied after search
3. Performance:
   - Search queries use indexes
   - Response time < 500ms for typical queries
4. Empty query handling:
   - If `q` is empty, return all recipes (with other filters)
5. Unit tests verify search logic
6. Integration tests with sample data

---

## Technical Notes

- Use `@@` operator for tsvector matching
- Use `ts_rank()` for relevance scoring
- Use `similarity()` from pg_trgm for fuzzy matching
- Combine search with filters using WHERE clauses
- Log search queries for analytics (Phase 2)

---

## Dependencies

- Story 4.1 (FTS setup must be complete)
- Story 3.3 (Recipe list API must exist)

---

## Testing Requirements

- Unit tests for search query building
- Integration test for basic search
- Integration test for multi-keyword search
- Integration test for search + filters
- Integration test for empty query
- Performance test

---

## Definition of Done

- [ ] Search functionality implemented
- [ ] Relevance ranking working
- [ ] Combined with filters
- [ ] Performance acceptable
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
