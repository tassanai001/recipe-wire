# Story 3.4: Recipe Update & Delete APIs

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.4  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** recipe owner,  
**I want** to update or delete my recipes,  
**so that** I can keep my content accurate and remove unwanted recipes

---

## Acceptance Criteria

1. `PATCH /v1/recipes/:id` endpoint created (protected):
   - Only recipe owner can update
   - Updatable fields:
     - title, description, coverImageUrl, cookTimeMinutes
     - ingredients (replaces all)
     - steps (replaces all)
     - categoryIds (replaces all)
   - Validation same as creation
   - Returns updated recipe with all relations
   - Error handling:
     - 401 for unauthenticated
     - 403 if not owner
     - 404 if recipe not found
     - 400 for validation errors
2. `DELETE /v1/recipes/:id` endpoint created (protected):
   - Only recipe owner can delete
   - Hard delete (removes from database)
   - Cascade deletes ingredients, steps, category links
   - Returns 204 No Content on success
   - Error handling:
     - 401 for unauthenticated
     - 403 if not owner
     - 404 if recipe not found
3. Authorization guard checks ownership
4. Unit tests verify ownership checks
5. Integration tests verify updates and deletions

---

## Technical Notes

- Use Prisma transactions for update operations
- Ownership check: `recipe.ownerId === request.user.id`
- Cascade delete configured in Prisma schema
- Log update/delete events with user and recipe IDs

---

## Dependencies

- Story 3.2 (Recipe creation must work)
- Story 3.3 (Recipe read must work)

---

## Testing Requirements

- Unit tests for ownership validation
- Integration test for successful update
- Integration test for successful delete
- Integration test for non-owner attempt
- Integration test for cascade delete
- Verify transaction rollback on error

---

## Definition of Done

- [ ] PATCH endpoint implemented
- [ ] DELETE endpoint implemented
- [ ] Ownership checks working
- [ ] Cascade delete working
- [ ] Error handling complete
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
