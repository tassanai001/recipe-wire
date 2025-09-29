# Story 5.4: Review Update & Delete APIs

**Epic:** Epic 5 - Review & Rating System  
**Story ID:** 5.4  
**Priority:** Medium  
**Estimate:** 3 Story Points  
**Sprint:** Sprint 8-9 (Week 11-12)

---

## User Story

**As a** review author,  
**I want** to edit or delete my review,  
**so that** I can update my opinion or remove my review

---

## Acceptance Criteria

1. `PATCH /v1/reviews/:id` endpoint created (protected):
   - Only review author can update
   - Updatable fields: rating, comment
   - Validation same as creation
   - Database trigger updates recipe avgRating
   - Returns updated review
   - Error handling:
     - 401 for unauthenticated
     - 403 if not author
     - 404 if review not found
     - 400 for validation errors
2. `DELETE /v1/reviews/:id` endpoint created (protected):
   - Only review author can delete
   - Hard delete (removes from database)
   - Database trigger updates recipe avgRating and ratingsCount
   - Returns 204 No Content
   - Error handling:
     - 401 for unauthenticated
     - 403 if not author
     - 404 if review not found
3. Authorization checks verify ownership
4. Unit tests verify ownership checks
5. Integration tests verify updates and deletions affect rating

---

## Technical Notes

- Ownership check: `review.userId === request.user.id`
- Trigger handles rating recalculation automatically
- Log update/delete events

---

## Dependencies

- Story 5.2 (Review creation must work)
- Story 5.3 (Review read must work)

---

## Testing Requirements

- Unit tests for ownership validation
- Integration test for successful update
- Integration test for successful delete
- Integration test for non-author attempt
- Verify trigger updates rating

---

## Definition of Done

- [ ] PATCH endpoint implemented
- [ ] DELETE endpoint implemented
- [ ] Ownership checks working
- [ ] Trigger updates rating
- [ ] Error handling complete
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
