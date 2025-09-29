# Story 3.2: Recipe Creation API

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.2  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** logged-in user,  
**I want** to create a new recipe via API,  
**so that** I can share my recipes with others

---

## Acceptance Criteria

1. `POST /v1/recipes` endpoint created (protected)
2. Request body validation:
   - title: required, 3-200 characters
   - description: optional, max 2000 characters
   - coverImageUrl: optional, valid URL
   - cookTimeMinutes: required, positive integer
   - ingredients: required array, min 1 item, each item is string
   - steps: required array, min 1 item, each item is string
   - categoryIds: optional array of category IDs
3. Business logic:
   - Create recipe record with ownerId = current user
   - Create related ingredient records
   - Create related step records (with auto-incremented stepNumber)
   - Link to categories if provided
   - Set isPublished = true by default
4. Response:
   - 201 status
   - Complete recipe object with all relations
5. Error handling:
   - 401 for unauthenticated
   - 400 for validation errors
   - 404 if category IDs don't exist
6. Unit tests cover validation and business logic
7. Integration test verifies database records

---

## Technical Notes

- Use Prisma transactions for atomic creation
- Validate category IDs exist before linking
- Return recipe with nested ingredients, steps, categories
- Log recipe creation events

---

## Dependencies

- Story 3.1 (Recipe schema must exist)
- Story 2.3 (Auth guard must work)

---

## Testing Requirements

- Unit tests for validation
- Unit tests for business logic
- Integration test for successful creation
- Integration test for invalid input
- Integration test for non-existent categories
- Verify transaction rollback on error

---

## Definition of Done

- [ ] Endpoint implemented
- [ ] Validation working
- [ ] Transaction handling working
- [ ] Error handling complete
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
