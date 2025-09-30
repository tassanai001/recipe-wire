# Story 4.1: PostgreSQL Full-Text Search Setup

**Epic:** Epic 4 - Search & Filter  
**Story ID:** 4.1  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 7 (Week 9-10)

---

## User Story

**As a** developer,  
**I want** PostgreSQL full-text search configured for recipes,  
**so that** users can search recipes efficiently with text queries

---

## Acceptance Criteria

1. PostgreSQL extensions enabled:
   - `pg_trgm` (trigram similarity for fuzzy matching)
   - `unaccent` (optional, for accent-insensitive search)
2. Full-text search column added to Recipe table:
   - `searchVector` column (tsvector type)
   - Generated from title and description
   - Weighted: title (A), description (B)
3. Database trigger created:
   - Auto-updates searchVector on recipe insert/update
   - Trigger function uses `to_tsvector('english', ...)`
4. GIN index created on searchVector column
5. Trigram index created on Recipe.title for fuzzy matching
6. Migration created and applied
7. Test queries verify search functionality

---

## Technical Notes

- Use `tsvector` for full-text search
- Use `pg_trgm` for similarity search (ILIKE queries)
- Weight title higher than description in search ranking
- Consider Thai language support (use 'simple' config for Thai)
- Index strategy: GIN index for tsvector, trigram index for ILIKE

---

## Dependencies

- Story 3.1 (Recipe schema must exist)

---

## Testing Requirements

- Verify extensions are enabled
- Verify trigger creates searchVector
- Verify indexes are created
- Test search queries return correct results
- Test search ranking
- Performance test with large dataset

---

## Definition of Done

- [ ] Extensions enabled
- [ ] searchVector column added
- [ ] Trigger created and working
- [ ] Indexes created
- [ ] Migration applied
- [ ] Test queries working
- [ ] Documentation updated
- [ ] Code reviewed and merged
