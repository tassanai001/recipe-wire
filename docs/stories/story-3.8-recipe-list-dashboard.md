# Story 3.8: Recipe List & Dashboard Frontend

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.8  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** user,  
**I want** to browse recipes on the homepage and dashboard,  
**so that** I can discover new recipes

---

## Acceptance Criteria

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

---

## Technical Notes

- Use React Query with pagination/infinite query
- Use shadcn/ui: Card, Button, Skeleton
- Implement recipe card as reusable component
- Optimize images with Next.js Image component
- Use CSS Grid for responsive layout

---

## Dependencies

- Story 3.3 (Recipe list API must work)
- Story 3.7 (Recipe card design from detail page)

---

## Testing Requirements

- Component tests for homepage
- Component tests for dashboard
- Component tests for recipe card
- Integration test for recipe list
- Test pagination/infinite scroll
- Test empty states
- Test responsive design

---

## Definition of Done

- [ ] Homepage implemented
- [ ] Dashboard implemented
- [ ] Recipe card component created
- [ ] Pagination/infinite scroll working
- [ ] Loading states working
- [ ] Empty states working
- [ ] Responsive design verified
- [ ] Tests passing
- [ ] Code reviewed and merged
