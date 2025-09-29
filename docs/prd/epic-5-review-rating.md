# Epic 5: Review & Rating System

## Epic Goal
สร้างระบบรีวิวและให้คะแนนสูตรอาหาร เพื่อให้ผู้ใช้สามารถแสดงความคิดเห็นและให้คะแนนสูตรของผู้อื่น ช่วยสร้างความน่าเชื่อถือและการมีส่วนร่วมในชุมชน

## Epic Owner
Development Team

## Dependencies
- Epic 1: Project Setup & Infrastructure
- Epic 2: Authentication & User System
- Epic 3: Recipe Management

## Target Sprint/Timeline
Sprint 8-9 (Week 11-12)

---

## User Stories

### Story 5.1: Review Data Model & Database Schema
**As a** developer,
**I want** a review data model with rating aggregation,
**so that** I can store reviews and calculate recipe ratings efficiently

**Acceptance Criteria:**
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

**Technical Notes:**
- Use CHECK constraint for rating (1-5)
- Denormalize avgRating and ratingsCount for performance
- Trigger ensures data consistency
- Consider soft delete for reviews (Phase 2)

---

### Story 5.2: Review Creation API
**As a** logged-in user,
**I want** to submit a review and rating for a recipe,
**so that** I can share my experience with others

**Acceptance Criteria:**
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

**Technical Notes:**
- Check recipe ownership: `recipe.ownerId !== request.user.id`
- Check existing review: query by (recipeId, userId)
- Return review with populated user data
- Log review creation events

---

### Story 5.3: Review Read & List APIs
**As a** user,
**I want** to view reviews for a recipe,
**so that** I can learn from others' experiences

**Acceptance Criteria:**
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

**Technical Notes:**
- Use Prisma `include` for user data
- Implement pagination with skip/take
- Order by createdAt or rating based on sort param
- Consider caching popular recipe reviews (Phase 2)

---

### Story 5.4: Review Update & Delete APIs
**As a** review author,
**I want** to edit or delete my review,
**so that** I can update my opinion or remove my review

**Acceptance Criteria:**
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

**Technical Notes:**
- Ownership check: `review.userId === request.user.id`
- Trigger handles rating recalculation automatically
- Log update/delete events

---

### Story 5.5: Review Section on Recipe Detail Page
**As a** user,
**I want** to see reviews and ratings on recipe detail page,
**so that** I can evaluate the recipe before trying it

**Acceptance Criteria:**
1. Recipe detail page enhanced with reviews section:
   - Rating summary at top:
     - Large star display showing avgRating
     - Text: "X.X out of 5 stars"
     - Total review count: "(Y reviews)"
     - Rating distribution (optional):
       - Bar chart showing count per star level
   - "Write a Review" button (if logged in and not owner):
     - Opens review form modal
     - Disabled if user already reviewed
   - Reviews list:
     - Shows all reviews, paginated
     - Each review displays:
       - User avatar and name
       - Star rating
       - Comment text
       - Date posted
       - Edit/Delete buttons (if user is author)
     - Sort dropdown: Latest, Highest, Lowest
     - Load more button or pagination
2. Review form modal:
   - Star rating selector (1-5 stars, interactive)
   - Comment textarea (optional)
   - Character count for comment
   - Submit button
   - Cancel button
   - Validation and error messages
3. Edit review:
   - Opens same modal with pre-filled data
   - Submit updates review
4. Delete review:
   - Confirmation dialog
   - Deletes review on confirm
5. Loading and error states
6. Responsive design
7. Accessibility compliant

**Technical Notes:**
- Use React Query for fetching and mutating reviews
- Use shadcn/ui: Dialog, Textarea, Button, AlertDialog
- Implement star rating component (interactive)
- Optimistic updates for better UX
- Show success toast on review submission

---

### Story 5.6: User Reviews Dashboard
**As a** logged-in user,
**I want** to see all my reviews in one place,
**so that** I can manage my reviews easily

**Acceptance Criteria:**
1. User profile/dashboard enhanced with "My Reviews" section:
   - List of all user's reviews
   - Each review shows:
     - Recipe thumbnail and title (linked)
     - Star rating given
     - Comment excerpt
     - Date posted
     - Edit/Delete buttons
   - Pagination or infinite scroll
   - Empty state: "You haven't reviewed any recipes yet"
2. Edit/Delete functionality same as recipe detail page
3. Responsive design

**Technical Notes:**
- Create new API endpoint: `GET /v1/me/reviews`
- Returns user's reviews with recipe data
- Use same review components as recipe detail page
- Consider adding to profile page or separate tab

---

### Story 5.7: Rating Display on Recipe Cards
**As a** user,
**I want** to see ratings on recipe cards,
**so that** I can quickly identify popular recipes

**Acceptance Criteria:**
1. Recipe card component enhanced:
   - Star rating display (read-only)
   - Shows avgRating (e.g., "4.5 ⭐")
   - Shows review count (e.g., "(23 reviews)")
   - If no reviews: "No reviews yet"
2. Star display:
   - Visual star icons (filled/half/empty)
   - Accessible (aria-label with rating value)
3. Consistent across all pages:
   - Homepage
   - Search results
   - Dashboard
   - Category pages (if any)
4. Responsive and accessible

**Technical Notes:**
- Create reusable StarRating component
- Use avgRating and ratingsCount from recipe data
- Style with CSS or use icon library (Lucide)
- Ensure proper contrast for accessibility

---

## Epic Acceptance Criteria
- [ ] All 7 stories completed and tested
- [ ] Users can submit reviews with ratings (1-5 stars) and comments
- [ ] Users can view all reviews for a recipe
- [ ] Review authors can edit and delete their reviews
- [ ] Recipe avgRating and ratingsCount update automatically
- [ ] Ratings displayed on recipe cards and detail pages
- [ ] Users cannot review their own recipes
- [ ] Users can only review each recipe once
- [ ] All pages responsive and accessible
- [ ] Unit and integration tests passing

## Technical Dependencies
- Epic 1, 2, and 3 completed
- PostgreSQL triggers for rating aggregation
- Prisma for database operations
- React Query for API calls
- shadcn/ui for UI components

## Business Rules
- Users must be logged in to submit reviews
- Users cannot review their own recipes
- One review per user per recipe
- Rating must be 1-5 stars (integer)
- Comment is optional but limited to 1000 characters
- Reviews are public (anyone can read)
- Only review author can edit/delete their review

## Performance Considerations
- Denormalized avgRating and ratingsCount for fast reads
- Database trigger ensures consistency
- Indexes on recipeId and userId for fast queries
- Pagination for large review lists
- Consider caching recipe ratings (Phase 2)

## Risks & Mitigations
- **Risk:** Fake or spam reviews
  - **Mitigation:** Implement moderation tools (Phase 2), rate limiting
- **Risk:** Trigger performance issues with many reviews
  - **Mitigation:** Optimize trigger function, consider async job (Phase 2)
- **Risk:** Users gaming the rating system
  - **Mitigation:** Implement review verification, user reputation (Phase 2)

## Definition of Done
- All stories meet acceptance criteria
- Code reviewed and merged
- Database trigger tested and optimized
- Unit tests: 80%+ coverage
- Integration tests verify review CRUD and rating updates
- UI/UX reviewed and approved
- Performance acceptable (trigger < 100ms)
- Documentation updated
- No critical bugs
