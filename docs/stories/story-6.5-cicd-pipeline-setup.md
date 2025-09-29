# Story 6.5: CI/CD Pipeline Setup

**Epic:** Epic 6 - Testing & Deployment  
**Story ID:** 6.5  
**Priority:** High  
**Estimate:** 8 Story Points  
**Sprint:** Sprint 10-11 (Week 13-15)

---

## User Story

**As a** DevOps engineer,  
**I want** a CI/CD pipeline for automated testing and deployment,  
**so that** code changes are tested and deployed reliably

---

## Acceptance Criteria

1. CI pipeline configured (GitHub Actions or GitLab CI):
   - Triggers on: push to main, pull requests
   - Jobs:
     - Lint (ESLint, Prettier)
     - Type check (TypeScript)
     - Unit tests (backend + frontend)
     - Integration tests (backend)
     - Build (Docker images)
     - E2E tests (Playwright)
   - Jobs run in parallel where possible
   - Pipeline fails if any job fails
2. CD pipeline configured:
   - Triggers on: push to main (after CI passes)
   - Steps:
     - Build production Docker images
     - Push images to container registry (Docker Hub, GitHub Container Registry, etc.)
     - Tag images with commit SHA and `latest`
   - Deployment step (manual approval for MVP):
     - SSH to production server
     - Pull latest images
     - Run database migrations
     - Restart services with docker-compose
3. Pipeline configuration file:
   - `.github/workflows/ci-cd.yml` (for GitHub Actions)
   - Well-documented with comments
4. Secrets configured:
   - Docker registry credentials
   - Production server SSH key
   - Database credentials (for migrations)
5. Pipeline runs successfully on test PR

---

## Technical Notes

- Use GitHub Actions or GitLab CI
- Cache dependencies for faster builds
- Use matrix strategy for parallel jobs
- Store secrets in CI/CD platform (GitHub Secrets, GitLab Variables)
- Consider using Docker layer caching

---

## Dependencies

- Story 6.1, 6.2, 6.3 (All tests must work)
- Story 6.4 (Production Docker must exist)

---

## Testing Requirements

- Verify pipeline runs on PR
- Verify all jobs execute
- Verify pipeline fails on test failure
- Test deployment step (staging)

---

## Definition of Done

- [ ] CI pipeline configured
- [ ] CD pipeline configured
- [ ] All jobs working
- [ ] Secrets configured
- [ ] Pipeline tested on PR
- [ ] Documentation updated
- [ ] Code reviewed and merged
