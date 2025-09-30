# Story 5.2: Review Creation API

**Epic:** Epic 5 - Review & Rating System  
**Story ID:** 5.2  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 8-9 (Week 11-12)

---

## User Story

**As a** logged-in user,  
**I want** to submit a review and rating for a recipe,  
**so that** I can share my experience with others

---

## Acceptance Criteria

1. `POST /v1/recipes/:recipeId/reviews` endpoint created (protected)
2. Request body validation:
   - rating: required, integer 1-5
   - comment: optional, max 1000 characters
3. Business logic:
   - Verify recipe exists and is published
   - Verify user hasn't already reviewed this recipe
   - User cannot review their own recipe
   - Create review record
   - Database trigger updates recipe avgRating and ratingsCount
4. Response:
   - 201 status
   - Review object with user info (id, displayName, avatarUrl)
5. Error handling:
   - 401 for unauthenticated
   - 400 for validation errors
   - 403 if user tries to review own recipe
   - 404 if recipe not found
   - 409 if user already reviewed this recipe
6. Unit tests cover validation and business rules
7. Integration test verifies review creation and rating update

---

## Technical Notes

- Check recipe ownership: `recipe.ownerId !== request.user.id`
- Check existing review: query by (recipeId, userId)
- Return review with populated user data
- Log review creation events

---

## Dependencies

- Story 5.1 (Review schema must exist)
- Story 3.3 (Recipe read API must work)

---

## Testing Requirements

- Unit tests for validation
- Unit tests for business rules
- Integration test for successful review
- Integration test for duplicate review
- Integration test for own recipe review
- Verify trigger updates rating

---

## Definition of Done

- [ ] Endpoint implemented
- [ ] Validation working
- [ ] Business rules enforced
- [ ] Error handling complete
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
