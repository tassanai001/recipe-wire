# Epic 3: Recipe Management

## Epic Goal
สร้างระบบจัดการสูตรอาหารที่สมบูรณ์ รวมถึง CRUD operations, image upload, และ UI สำหรับสร้าง แก้ไข และแสดงสูตรอาหาร เพื่อให้ผู้ใช้สามารถแชร์และจัดการสูตรอาหารได้

## Epic Owner
Development Team

## Dependencies
- Epic 1: Project Setup & Infrastructure
- Epic 2: Authentication & User System

## Target Sprint/Timeline
Sprint 4-6 (Week 5-8)

---

## User Stories

### Story 3.1: Recipe Data Model & Database Schema
**As a** developer,
**I want** a complete recipe data model with all relationships,
**so that** I can store and query recipe data efficiently

**Acceptance Criteria:**
1. Prisma schema updated with recipe-related models:
   - `Recipe` model with fields:
     - id (UUID, PK)
     - ownerId (UUID, FK to User)
     - title (string, required)
     - description (text, optional)
     - coverImageUrl (string, optional)
     - cookTimeMinutes (integer, required)
     - avgRating (decimal, default 0)
     - ratingsCount (integer, default 0)
     - isPublished (boolean, default true)
     - createdAt, updatedAt (timestamps)
   - `RecipeStep` model:
     - id (UUID, PK)
     - recipeId (UUID, FK to Recipe)
     - stepNumber (integer, required)
     - instruction (text, required)
   - `RecipeIngredient` model:
     - id (UUID, PK)
     - recipeId (UUID, FK to Recipe)
     - label (string, required) - e.g., "ไข่ 2 ฟอง"
   - `Category` model:
     - id (smallint, PK)
     - name (string, unique) - e.g., "ของหวาน", "อาหารเช้า"
   - `RecipeCategory` junction table:
     - id (UUID, PK)
     - recipeId (UUID, FK)
     - categoryId (smallint, FK)
     - Unique constraint on (recipeId, categoryId)
2. Database relationships configured:
   - User → Recipes (one-to-many)
   - Recipe → Steps (one-to-many, cascade delete)
   - Recipe → Ingredients (one-to-many, cascade delete)
   - Recipe ↔ Categories (many-to-many via RecipeCategory)
3. Database indexes created:
   - Recipe.title (for search)
   - Recipe.ownerId (for user's recipes)
   - Recipe.avgRating (for sorting)
   - Recipe.createdAt (for sorting)
4. Full-text search index on Recipe (title, description)
5. Migration created and applied successfully
6. Seed data script with sample categories

**Technical Notes:**
- Use UUID v4 for all primary keys
- Cascade delete for dependent records (steps, ingredients)
- Index strategy optimized for common queries
- Seed categories: ของหวาน, อาหารเช้า, อาหารกลางวัน, อาหารเย็น, ของว่าง, เครื่องดื่ม

---

### Story 3.2: Recipe Creation API
**As a** logged-in user,
**I want** to create a new recipe via API,
**so that** I can share my recipes with others

**Acceptance Criteria:**
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

**Technical Notes:**
- Use Prisma transactions for atomic creation
- Validate category IDs exist before linking
- Return recipe with nested ingredients, steps, categories
- Log recipe creation events

---

### Story 3.3: Recipe Read & List APIs
**As a** user,
**I want** to view recipe details and browse recipes,
**so that** I can discover and learn new recipes

**Acceptance Criteria:**
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

**Technical Notes:**
- Use Prisma `include` for nested relations
- Implement cursor-based pagination for better performance (optional)
- Use `ts_vector` for full-text search
- Cache popular queries (Phase 2)

---

### Story 3.4: Recipe Update & Delete APIs
**As a** recipe owner,
**I want** to update or delete my recipes,
**so that** I can keep my content accurate and remove unwanted recipes

**Acceptance Criteria:**
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

**Technical Notes:**
- Use Prisma transactions for update operations
- Ownership check: `recipe.ownerId === request.user.id`
- Cascade delete configured in Prisma schema
- Log update/delete events with user and recipe IDs

---

### Story 3.5: Image Upload API Enhancement
**As a** user,
**I want** to upload recipe images,
**so that** I can make my recipes visually appealing

**Acceptance Criteria:**
1. `POST /v1/uploads` endpoint enhanced (protected):
   - Accepts multipart/form-data with `file` field
   - Validates:
     - File type: image/jpeg, image/png, image/webp
     - File size: max 3 MB
     - Filename sanitization
   - Generates unique filename: `{uuid}-{timestamp}.{ext}`
   - Saves to `uploads/recipes/` directory
   - Returns:
     - File URL: `/uploads/recipes/{filename}`
     - Metadata: filename, size, mimetype
2. Multiple file upload support:
   - Accept up to 10 files per request
   - Validate total size limit: 30 MB
   - Return array of uploaded file URLs
3. Error handling:
   - 400 for invalid file type or size
   - 401 for unauthenticated
   - 500 for file system errors
4. Image optimization (optional for MVP):
   - Resize to max width 1200px
   - Compress to reduce file size
5. Unit tests verify validation logic
6. Integration test uploads actual files

**Technical Notes:**
- Use `multer` for file handling
- Use `sharp` for image optimization (optional)
- Validate MIME type and file extension
- Prevent path traversal attacks
- Set proper file permissions

---

### Story 3.6: Recipe Creation Frontend Page
**As a** logged-in user,
**I want** an intuitive form to create recipes,
**so that** I can easily share my recipes

**Acceptance Criteria:**
1. Recipe creation page at `/recipes/new` (protected):
   - Form fields:
     - Title (text input, required)
     - Description (textarea, optional)
     - Cover image (file upload with preview)
     - Cook time (number input, required)
     - Ingredients (dynamic list):
       - Add/remove ingredient fields
       - Each ingredient is a text input
       - Minimum 1 ingredient required
     - Steps (dynamic list):
       - Add/remove step fields
       - Each step is a textarea
       - Auto-numbered
       - Minimum 1 step required
     - Categories (multi-select dropdown)
   - Image upload:
     - File picker button
     - Preview uploaded image
     - Progress indicator during upload
     - Upload happens before recipe creation
   - Form validation:
     - Client-side validation matches API
     - Real-time error messages
   - Submit button:
     - Disabled during submission
     - Shows loading state
     - Calls recipe creation API
     - Success redirects to recipe detail page
2. Responsive design for mobile and desktop
3. Accessibility: labels, keyboard navigation, ARIA
4. Auto-save draft to localStorage (optional)

**Technical Notes:**
- Use shadcn/ui: Form, Input, Textarea, Button, Select
- Use React Hook Form with Zod validation
- Use React Query mutation for API calls
- Dynamic fields with `useFieldArray`
- Upload image first, then include URL in recipe creation

---

### Story 3.7: Recipe Detail Frontend Page
**As a** user,
**I want** to view complete recipe details,
**so that** I can follow the recipe and learn how to cook it

**Acceptance Criteria:**
1. Recipe detail page at `/recipes/[id]` (public):
   - Display all recipe information:
     - Cover image (large, responsive)
     - Title (heading)
     - Owner info (avatar, name, link to profile)
     - Description
     - Cook time (with icon)
     - Categories (tags/badges)
     - Average rating (stars) and count
     - Created date
   - Ingredients section:
     - Heading "Ingredients"
     - List of ingredients (checkable for user convenience)
   - Steps section:
     - Heading "Steps"
     - Numbered list of instructions
   - Owner actions (if current user is owner):
     - Edit button → redirects to edit page
     - Delete button → shows confirmation modal → deletes recipe
2. Loading state while fetching recipe
3. Error state if recipe not found (404 page)
4. Responsive design
5. Accessibility compliant
6. SEO optimized (meta tags, structured data)

**Technical Notes:**
- Use Next.js dynamic route: `app/recipes/[id]/page.tsx`
- Use React Query for data fetching
- Use shadcn/ui: Card, Badge, Button, AlertDialog (for delete confirmation)
- Implement checkable ingredient list with local state
- Add structured data for SEO (Recipe schema.org)

---

### Story 3.8: Recipe List & Dashboard Frontend
**As a** user,
**I want** to browse recipes on the homepage and dashboard,
**so that** I can discover new recipes

**Acceptance Criteria:**
1. Homepage at `/` (public):
   - Hero section with app description and CTA
   - "Latest Recipes" section:
     - Grid of recipe cards (6-12 recipes)
     - Each card shows: image, title, cook time, rating, owner
     - Click redirects to recipe detail
   - "Popular Recipes" section:
     - Grid of top-rated recipes
   - Search bar (links to search page)
2. Dashboard at `/dashboard` (protected):
   - "My Recipes" section:
     - Grid of user's own recipes
     - Each card has edit/delete actions
     - "Create New Recipe" button
   - "Latest Recipes" section (same as homepage)
3. Recipe card component:
   - Reusable across pages
   - Shows: image, title, cook time, rating, categories
   - Hover effects
   - Responsive
4. Infinite scroll or pagination for recipe lists
5. Loading skeletons during fetch
6. Empty states with helpful messages

**Technical Notes:**
- Use React Query with pagination/infinite query
- Use shadcn/ui: Card, Button, Skeleton
- Implement recipe card as reusable component
- Optimize images with Next.js Image component
- Use CSS Grid for responsive layout

---

### Story 3.9: Recipe Edit Frontend Page
**As a** recipe owner,
**I want** to edit my existing recipes,
**so that** I can update or correct information

**Acceptance Criteria:**
1. Recipe edit page at `/recipes/[id]/edit` (protected):
   - Only accessible by recipe owner (403 otherwise)
   - Form pre-filled with existing recipe data:
     - All fields populated from API
     - Ingredients and steps loaded into dynamic lists
     - Categories pre-selected
   - Form behavior same as creation page
   - Submit button:
     - Calls update API
     - Success redirects to recipe detail page
   - Cancel button returns to recipe detail
2. Image update:
   - Show current cover image
   - Allow uploading new image (replaces old)
3. Validation and error handling same as creation
4. Responsive and accessible

**Technical Notes:**
- Use same form component as creation (with edit mode)
- Fetch recipe data on page load
- Pre-populate form with `reset()` from React Hook Form
- Use PATCH API for updates
- Handle 403 errors with redirect to recipe detail

---

## Epic Acceptance Criteria
- [ ] All 9 stories completed and tested
- [ ] Users can create recipes with ingredients, steps, images, and categories
- [ ] Users can view recipe details with all information
- [ ] Users can browse recipes on homepage and dashboard
- [ ] Recipe owners can edit and delete their recipes
- [ ] Image upload works for recipe covers
- [ ] Search and filtering work correctly
- [ ] All pages are responsive and accessible
- [ ] Unit and integration tests passing
- [ ] Performance acceptable (page load < 2s)

## Technical Dependencies
- Epic 1 and 2 completed
- Prisma for database operations
- Multer for file uploads
- PostgreSQL full-text search
- React Hook Form and Zod for frontend forms
- Next.js Image component for optimization

## Performance Considerations
- Database indexes on frequently queried fields
- Efficient queries with proper joins
- Image optimization and lazy loading
- Pagination for large result sets
- Caching for popular queries (Phase 2)

## Risks & Mitigations
- **Risk:** Large images slow down page load
  - **Mitigation:** Implement image optimization, lazy loading, CDN (Phase 2)
- **Risk:** Complex forms confuse users
  - **Mitigation:** Clear instructions, inline validation, preview functionality

## Definition of Done
- All stories meet acceptance criteria
- Code reviewed and merged
- Unit tests: 80%+ coverage
- Integration tests verify CRUD operations
- UI/UX reviewed and approved
- Performance benchmarks met
- Documentation updated
- No critical bugs
