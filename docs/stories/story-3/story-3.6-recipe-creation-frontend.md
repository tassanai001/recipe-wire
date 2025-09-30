# Story 3.6: Recipe Creation Frontend Page

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.6  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** logged-in user,  
**I want** an intuitive form to create recipes,  
**so that** I can easily share my recipes

---

## Acceptance Criteria

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

---

## Technical Notes

- Use shadcn/ui: Form, Input, Textarea, Button, Select
- Use React Hook Form with Zod validation
- Use React Query mutation for API calls
- Dynamic fields with `useFieldArray`
- Upload image first, then include URL in recipe creation

---

## Dependencies

- Story 3.2 (Recipe creation API must work)
- Story 3.5 (Image upload API must work)
- Story 2.5 (Auth state must work)

---

## Testing Requirements

- Component tests for form
- Integration test for recipe creation flow
- Test validation messages
- Test dynamic field add/remove
- Test image upload
- Test error handling
- Test responsive design

---

## Definition of Done

- [ ] Creation page implemented
- [ ] Form validation working
- [ ] Dynamic fields working
- [ ] Image upload working
- [ ] API integration working
- [ ] Responsive design verified
- [ ] Accessibility verified
- [ ] Tests passing
- [ ] Code reviewed and merged
