# Story 4.4: Search Page Frontend

**Epic:** Epic 4 - Search & Filter  
**Story ID:** 4.4  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 7 (Week 9-10)

---

## User Story

**As a** user,  
**I want** a dedicated search page with filters,  
**so that** I can easily find recipes matching my criteria

---

## Acceptance Criteria

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

---

## Technical Notes

- Use React Query for search API calls
- Use `useSearchParams` for URL state management
- Debounce search input with `useDebouncedValue` or lodash
- Use shadcn/ui: Input, Checkbox, Slider, Select, Sheet (for mobile filters)
- Implement filter chips with remove functionality

---

## Dependencies

- Story 4.2 (Search API must work)
- Story 4.3 (Filter API must work)
- Story 3.8 (Recipe card component must exist)

---

## Testing Requirements

- Component tests for search page
- Integration test for search flow
- Test filter interactions
- Test URL state sync
- Test debounced search
- Test responsive design

---

## Definition of Done

- [ ] Search page implemented
- [ ] Search bar working
- [ ] Filters working
- [ ] URL state sync working
- [ ] Debounced search working
- [ ] Responsive design verified
- [ ] Accessibility verified
- [ ] Tests passing
- [ ] Code reviewed and merged
