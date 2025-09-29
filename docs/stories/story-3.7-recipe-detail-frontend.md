# Story 3.7: Recipe Detail Frontend Page

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.7  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** user,  
**I want** to view complete recipe details,  
**so that** I can follow the recipe and learn how to cook it

---

## Acceptance Criteria

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

---

## Technical Notes

- Use Next.js dynamic route: `app/recipes/[id]/page.tsx`
- Use React Query for data fetching
- Use shadcn/ui: Card, Badge, Button, AlertDialog (for delete confirmation)
- Implement checkable ingredient list with local state
- Add structured data for SEO (Recipe schema.org)

---

## Dependencies

- Story 3.3 (Recipe read API must work)
- Story 3.4 (Recipe delete API must work)

---

## Testing Requirements

- Component tests for recipe detail
- Integration test for loading recipe
- Test owner actions visibility
- Test delete confirmation
- Test 404 handling
- Test responsive design

---

## Definition of Done

- [ ] Detail page implemented
- [ ] All recipe info displayed
- [ ] Owner actions working
- [ ] Delete confirmation working
- [ ] Loading/error states working
- [ ] Responsive design verified
- [ ] SEO optimized
- [ ] Accessibility verified
- [ ] Tests passing
- [ ] Code reviewed and merged
