# Epic 4: Search & Filter

## Epic Goal

สร้างระบบค้นหาและกรองสูตรอาหารที่มีประสิทธิภาพ ใช้ PostgreSQL Full-Text Search เพื่อให้ผู้ใช้สามารถค้นหาสูตรที่ต้องการได้อย่างรวดเร็วและแม่นยำ

## Epic Owner

Development Team

## Dependencies

- Epic 1: Project Setup & Infrastructure
- Epic 3: Recipe Management (ต้องมีข้อมูลสูตรก่อน)

## Target Sprint/Timeline

Sprint 7 (Week 9-10)

---

## User Stories

### Story 4.1: PostgreSQL Full-Text Search Setup

**As a** developer,
**I want** PostgreSQL full-text search configured for recipes,
**so that** users can search recipes efficiently with text queries

**Acceptance Criteria:**

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

**Technical Notes:**

- Use `tsvector` for full-text search
- Use `pg_trgm` for similarity search (ILIKE queries)
- Weight title higher than description in search ranking
- Consider Thai language support (use 'simple' config for Thai)
- Index strategy: GIN index for tsvector, trigram index for ILIKE

---

### Story 4.2: Search API Enhancement

**As a** user,
**I want** to search recipes by keywords,
**so that** I can quickly find recipes I'm interested in

**Acceptance Criteria:**

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

**Technical Notes:**

- Use `@@` operator for tsvector matching
- Use `ts_rank()` for relevance scoring
- Use `similarity()` from pg_trgm for fuzzy matching
- Combine search with filters using WHERE clauses
- Log search queries for analytics (Phase 2)

---

### Story 4.3: Advanced Filtering API

**As a** user,
**I want** to filter recipes by multiple criteria,
**so that** I can find recipes that match my preferences

**Acceptance Criteria:**

1. `GET /v1/recipes` endpoint supports filters:
   - `category`: filter by category ID (single or multiple)
   - `maxTime`: filter by maximum cook time (minutes)
   - `minRating`: filter by minimum average rating (optional)
   - `ownerId`: filter by recipe owner (optional)
2. Filter logic:
   - Multiple categories: OR logic (recipe in any category)
   - maxTime: recipes with cookTimeMinutes <= maxTime
   - minRating: recipes with avgRating >= minRating
   - All filters: AND logic (all conditions must match)
3. Filters combined with search:
   - Search query applied first
   - Filters applied to search results
4. Performance:
   - Efficient queries with proper indexes
   - Query optimization for multiple filters
5. Unit and integration tests cover filter combinations

**Technical Notes:**

- Use Prisma `where` clauses for filtering
- Use `in` operator for multiple categories
- Use `lte` for maxTime, `gte` for minRating
- Ensure indexes exist on filtered columns
- Consider query builder for complex filter combinations

---

### Story 4.4: Search Page Frontend

**As a** user,
**I want** a dedicated search page with filters,
**so that** I can easily find recipes matching my criteria

**Acceptance Criteria:**

1. Search page at `/search` (public):
   - Search bar:
     - Text input for search query
     - Search button
     - Clear button
     - Placeholder: "Search recipes..."
   - Filter panel (sidebar or collapsible):
     - Category filter (checkboxes):
       - List all categories
       - Multi-select
       - Show count per category (optional)
     - Cook time filter (slider or input):
       - Max cook time slider (0-180 minutes)
       - Display selected value
     - Sort options (dropdown):
       - Popular (default)
       - Latest
       - Quickest
   - Results section:
     - Grid of recipe cards
     - Shows count: "Found X recipes"
     - Pagination or infinite scroll
     - Loading state
     - Empty state: "No recipes found"
2. URL query parameters:
   - Sync filters with URL (e.g., `/search?q=pasta&category=1&maxTime=30`)
   - Allow bookmarking and sharing searches
   - Browser back/forward works correctly
3. Real-time search (debounced):
   - Search triggers automatically after typing stops (300ms delay)
   - Or on Enter key press
4. Filter interactions:
   - Applying filters updates results immediately
   - Clear all filters button
   - Active filters displayed as removable chips
5. Responsive design:
   - Mobile: filters in drawer/modal
   - Desktop: filters in sidebar
6. Accessibility compliant

**Technical Notes:**

- Use React Query for search API calls
- Use `useSearchParams` for URL state management
- Debounce search input with `useDebouncedValue` or lodash
- Use shadcn/ui: Input, Checkbox, Slider, Select, Sheet (for mobile filters)
- Implement filter chips with remove functionality

---

### Story 4.5: Homepage Search Integration

**As a** user,
**I want** a search bar on the homepage,
**so that** I can quickly start searching without navigating to search page

**Acceptance Criteria:**

1. Search bar added to homepage hero section:
   - Prominent placement in hero
   - Text input with search icon
   - Placeholder: "What do you want to cook today?"
   - Submit button or Enter key triggers search
2. Search behavior:
   - Redirects to `/search?q={query}` with search query
   - Preserves query in search page
3. Auto-complete suggestions (optional for MVP):
   - Shows popular searches or recipe titles
   - Clickable suggestions
4. Responsive design
5. Accessibility: proper labels, keyboard navigation

**Technical Notes:**

- Use Next.js router for navigation
- Use shadcn/ui: Input, Button
- Consider implementing autocomplete with debounced API call (Phase 2)
- Style to match hero section design

---

### Story 4.6: Dashboard Search & Filter

**As a** logged-in user,
**I want** to search and filter my own recipes on dashboard,
**so that** I can quickly find recipes I created

**Acceptance Criteria:**

1. Dashboard "My Recipes" section enhanced:
   - Search bar above recipe grid
   - Filters: category, cook time
   - Search and filters apply to user's recipes only
2. Search behavior:
   - Client-side filtering (if small dataset) OR
   - API call with ownerId filter
3. Filter UI similar to search page
4. Results update in real-time
5. Empty state: "You haven't created any recipes yet"

**Technical Notes:**

- Use same search/filter components as search page
- Add `ownerId` filter to API call
- Consider client-side filtering if user has < 50 recipes
- Use React Query with user-specific query key

---

## Epic Acceptance Criteria

- [ ] All 6 stories completed and tested
- [ ] Full-text search works on recipe titles and descriptions
- [ ] Users can filter recipes by category and cook time
- [ ] Search page provides intuitive search and filter UI
- [ ] Homepage has prominent search bar
- [ ] Dashboard allows searching user's own recipes
- [ ] Search performance < 500ms for typical queries
- [ ] All pages responsive and accessible
- [ ] URL state management works for bookmarking
- [ ] Unit and integration tests passing

## Technical Dependencies

- Epic 1 and 3 completed
- PostgreSQL pg_trgm extension
- Prisma for database queries
- React Query for API calls
- Next.js router for navigation

## Performance Considerations

- GIN and trigram indexes for fast search
- Debounced search input to reduce API calls
- Efficient query building with Prisma
- Consider caching popular searches (Phase 2)
- Pagination to limit result size

## Risks & Mitigations

- **Risk:** Search results not relevant
  - **Mitigation:** Tune search ranking weights, implement user feedback
- **Risk:** Slow search with large dataset
  - **Mitigation:** Optimize indexes, implement caching, consider Elasticsearch (Phase 2)
- **Risk:** Complex filter UI confuses users
  - **Mitigation:** User testing, clear labels, progressive disclosure

## Definition of Done

- All stories meet acceptance criteria
- Code reviewed and merged
- Search indexes created and optimized
- Unit tests: 80%+ coverage for search logic
- Integration tests verify search and filter combinations
- Performance benchmarks met (< 500ms)
- UI/UX reviewed and approved
- Documentation updated with search implementation details
- No critical bugs
