# Story 5.1: Review Data Model & Database Schema

**Epic:** Epic 5 - Review & Rating System  
**Story ID:** 5.1  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 8-9 (Week 11-12)

---

## User Story

**As a** developer,  
**I want** a review data model with rating aggregation,  
**so that** I can store reviews and calculate recipe ratings efficiently

---

## Acceptance Criteria

1. Prisma schema updated with Review model:
   - id (UUID, PK)
   - recipeId (UUID, FK to Recipe, required)
   - userId (UUID, FK to User, required)
   - rating (integer, required, 1-5)
   - comment (text, optional)
   - createdAt (timestamp)
   - Unique constraint on (recipeId, userId) - one review per user per recipe
2. Recipe model already has:
   - avgRating (decimal, default 0)
   - ratingsCount (integer, default 0)
3. Database trigger created for rating aggregation:
   - Trigger on Review INSERT/UPDATE/DELETE
   - Automatically updates Recipe.avgRating and Recipe.ratingsCount
   - Trigger function calculates:
     - avgRating = AVG(rating) from all reviews
     - ratingsCount = COUNT(*) of reviews
4. Database indexes:
   - Review.recipeId (for fetching recipe reviews)
   - Review.userId (for user's reviews)
   - Review (recipeId, userId) unique index
5. Migration created and applied
6. Test data verifies trigger works correctly

---

## Technical Notes

- Use CHECK constraint for rating (1-5)
- Denormalize avgRating and ratingsCount for performance
- Trigger ensures data consistency
- Consider soft delete for reviews (Phase 2)

---

## Dependencies

- Story 3.1 (Recipe schema must exist)
- Epic 2 completed (User model must exist)

---

## Testing Requirements

- Verify schema compiles
- Verify migration applies
- Verify trigger creates/updates ratings
- Test trigger on INSERT/UPDATE/DELETE
- Verify unique constraint works
- Performance test trigger

---

## Definition of Done

- [ ] Review model created
- [ ] Trigger created and working
- [ ] Indexes created
- [ ] Migration applied
- [ ] Trigger tested
- [ ] Documentation updated
- [ ] Code reviewed and merged
