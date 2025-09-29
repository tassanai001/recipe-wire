# 📖 User Stories – RecipeWire MVP

This directory contains all individual user stories for the RecipeWire MVP project, organized by epic.

**Total Stories:** 41 stories across 6 epics

---

## 📋 Story Index by Epic

### Epic 1: Project Setup & Infrastructure (6 stories)
Sprint 1 (Week 1-2)

- [Story 1.1: Initialize Monorepo Structure](./story-1.1-initialize-monorepo.md)
- [Story 1.2: Setup Docker Development Environment](./story-1.2-setup-docker.md)
- [Story 1.3: Setup PostgreSQL Database & Prisma](./story-1.3-setup-database.md)
- [Story 1.4: Setup NestJS Backend Skeleton](./story-1.4-setup-nestjs.md)
- [Story 1.5: Setup Next.js Frontend Skeleton](./story-1.5-setup-nextjs.md)
- [Story 1.6: Setup Local File Upload Infrastructure](./story-1.6-setup-file-upload.md)

---

### Epic 2: Authentication & User System (6 stories)
Sprint 2-3 (Week 3-4)

- [Story 2.1: User Registration API](./story-2.1-user-registration-api.md)
- [Story 2.2: User Login & JWT Token Generation](./story-2.2-user-login-jwt.md)
- [Story 2.3: JWT Authentication Guard & Token Refresh](./story-2.3-jwt-auth-guard.md)
- [Story 2.4: User Profile Management API](./story-2.4-user-profile-api.md)
- [Story 2.5: Frontend Authentication Pages & State Management](./story-2.5-auth-pages-frontend.md)
- [Story 2.6: User Profile Page & Edit Functionality](./story-2.6-profile-page-frontend.md)

---

### Epic 3: Recipe Management (9 stories)
Sprint 4-6 (Week 5-8)

- [Story 3.1: Recipe Data Model & Database Schema](./story-3.1-recipe-data-model.md)
- [Story 3.2: Recipe Creation API](./story-3.2-recipe-creation-api.md)
- [Story 3.3: Recipe Read & List APIs](./story-3.3-recipe-read-list-api.md)
- [Story 3.4: Recipe Update & Delete APIs](./story-3.4-recipe-update-delete-api.md)
- [Story 3.5: Image Upload API Enhancement](./story-3.5-image-upload-api.md)
- [Story 3.6: Recipe Creation Frontend Page](./story-3.6-recipe-creation-frontend.md)
- [Story 3.7: Recipe Detail Frontend Page](./story-3.7-recipe-detail-frontend.md)
- [Story 3.8: Recipe List & Dashboard Frontend](./story-3.8-recipe-list-dashboard.md)
- [Story 3.9: Recipe Edit Frontend Page](./story-3.9-recipe-edit-frontend.md)

---

### Epic 4: Search & Filter (6 stories)
Sprint 7 (Week 9-10)

- [Story 4.1: PostgreSQL Full-Text Search Setup](./story-4.1-postgresql-fts-setup.md)
- [Story 4.2: Search API Enhancement](./story-4.2-search-api-enhancement.md)
- [Story 4.3: Advanced Filtering API](./story-4.3-advanced-filtering-api.md)
- [Story 4.4: Search Page Frontend](./story-4.4-search-page-frontend.md)
- [Story 4.5: Homepage Search Integration](./story-4.5-homepage-search.md)
- [Story 4.6: Dashboard Search & Filter](./story-4.6-dashboard-search-filter.md)

---

### Epic 5: Review & Rating System (7 stories)
Sprint 8-9 (Week 11-12)

- [Story 5.1: Review Data Model & Database Schema](./story-5.1-review-data-model.md)
- [Story 5.2: Review Creation API](./story-5.2-review-creation-api.md)
- [Story 5.3: Review Read & List APIs](./story-5.3-review-read-list-api.md)
- [Story 5.4: Review Update & Delete APIs](./story-5.4-review-update-delete-api.md)
- [Story 5.5: Review Section on Recipe Detail Page](./story-5.5-review-section-frontend.md)
- [Story 5.6: User Reviews Dashboard](./story-5.6-user-reviews-dashboard.md)
- [Story 5.7: Rating Display on Recipe Cards](./story-5.7-rating-display-cards.md)

---

### Epic 6: Testing & Deployment (7 stories)
Sprint 10-11 (Week 13-15)

- [Story 6.1: Unit Testing Setup & Core Tests](./story-6.1-unit-testing-setup.md)
- [Story 6.2: Integration Testing](./story-6.2-integration-testing.md)
- [Story 6.3: E2E Testing with Playwright](./story-6.3-e2e-testing-playwright.md)
- [Story 6.4: Production Docker Setup](./story-6.4-production-docker-setup.md)
- [Story 6.5: CI/CD Pipeline Setup](./story-6.5-cicd-pipeline-setup.md)
- [Story 6.6: Production Deployment & Monitoring](./story-6.6-production-deployment.md)
- [Story 6.7: Performance Testing & Optimization](./story-6.7-performance-testing.md)

---

## 📊 Story Statistics

| Epic | Stories | Estimated Points | Sprint |
|------|---------|------------------|--------|
| Epic 1 | 6 | ~26 | Sprint 1 |
| Epic 2 | 6 | ~31 | Sprint 2-3 |
| Epic 3 | 9 | ~51 | Sprint 4-6 |
| Epic 4 | 6 | ~27 | Sprint 7 |
| Epic 5 | 7 | ~32 | Sprint 8-9 |
| Epic 6 | 7 | ~50 | Sprint 10-11 |
| **Total** | **41** | **~217** | **11 sprints** |

---

## 🎯 Story Format

Each story file contains:

- **Epic & Story ID** - For tracking and reference
- **Priority** - High/Medium/Low
- **Estimate** - Story points
- **Sprint** - Target sprint/timeline
- **User Story** - As a... I want... so that...
- **Acceptance Criteria** - Detailed requirements
- **Technical Notes** - Implementation guidance
- **Dependencies** - Required stories/epics
- **Testing Requirements** - Test coverage expectations
- **Definition of Done** - Completion checklist

---

## 🔗 Related Documentation

- [PRD (Product Requirements Document)](../prd.md)
- [Architecture Documentation](../architecture.md)
- [Epic Files](../prd/)
- [Roadmap](../roadmap.md)

---

**Last Updated:** 2025-09-30  
**Maintained By:** Development Team
