# Story 1.5: Setup Next.js Frontend Skeleton

**Epic:** Epic 1 - Project Setup & Infrastructure  
**Story ID:** 1.5  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 1 (Week 1-2)

---

## User Story

**As a** developer,  
**I want** a Next.js application skeleton with Tailwind CSS and shadcn/ui,  
**so that** I can start building UI components with modern styling

---

## Acceptance Criteria

1. Next.js 14+ application initialized in `apps/frontend` with App Router
2. TypeScript configured with strict mode
3. Tailwind CSS installed and configured
4. shadcn/ui initialized with base components
5. Basic layout structure created:
   - Root layout with metadata
   - Navigation component (placeholder)
   - Footer component (placeholder)
6. Home page created with basic content
7. React Query configured for server state management
8. Zustand configured for client state (auth state placeholder)
9. Application runs successfully on port 3000

---

## Technical Notes

- Use Next.js App Router (not Pages Router)
- Install shadcn/ui components: Button, Card, Input, Label
- Configure Tailwind with custom theme colors
- React Query provider setup in root layout
- Environment variables for API URL: `NEXT_PUBLIC_API_URL`

---

## Dependencies

- Story 1.1 (Monorepo structure)
- Story 1.4 (Backend API for integration)

---

## Testing Requirements

- Verify Next.js application starts
- Verify Tailwind CSS works
- Verify shadcn/ui components render
- Verify React Query provider works
- Verify Zustand store works
- Verify API calls can be made to backend

---

## Definition of Done

- [ ] Next.js application running
- [ ] Tailwind CSS configured
- [ ] shadcn/ui initialized
- [ ] Basic layout created
- [ ] React Query configured
- [ ] Zustand configured
- [ ] Documentation updated
- [ ] Code reviewed and merged
