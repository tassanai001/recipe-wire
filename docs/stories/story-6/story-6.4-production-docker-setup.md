# Story 6.4: Production Docker Setup

**Epic:** Epic 6 - Testing & Deployment  
**Story ID:** 6.4  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 10-11 (Week 13-15)

---

## User Story

**As a** DevOps engineer,  
**I want** production-ready Docker images and compose file,  
**so that** the application can be deployed to production

---

## Acceptance Criteria

1. Production Dockerfiles created:
   - `apps/backend/Dockerfile.prod`:
     - Multi-stage build (build → production)
     - Node.js Alpine base image
     - Only production dependencies
     - Non-root user
     - Health check configured
   - `apps/frontend/Dockerfile.prod`:
     - Multi-stage build (build → production)
     - Next.js standalone output
     - Node.js Alpine base image
     - Non-root user
     - Health check configured
2. Production docker-compose.yml:
   - Services: db, api, frontend, nginx (reverse proxy)
   - Production environment variables
   - Volume for database persistence
   - Volume for uploads
   - Restart policies configured
   - Resource limits set
3. Nginx reverse proxy configured:
   - Routes `/api/*` to backend
   - Routes `/*` to frontend
   - Serves static uploads
   - SSL/TLS ready (certificate mounting)
   - Gzip compression enabled
4. Environment variable management:
   - `.env.production.example` file created
   - Secrets not committed to git
   - Documentation for required variables
5. Build and run successfully:
   - `docker-compose -f docker-compose.prod.yml build`
   - `docker-compose -f docker-compose.prod.yml up -d`
   - All services healthy

---

## Technical Notes

- Use multi-stage builds to minimize image size
- Use `.dockerignore` to exclude unnecessary files
- Set NODE_ENV=production
- Use Next.js standalone output for smaller image
- Configure proper logging (JSON format)

---

## Dependencies

- Story 1.2 (Development Docker setup must exist)

---

## Testing Requirements

- Verify images build successfully
- Verify all services start
- Verify health checks work
- Verify services communicate
- Test on clean environment

---

## Definition of Done

- [ ] Production Dockerfiles created
- [ ] Production docker-compose created
- [ ] Nginx configured
- [ ] Environment variables documented
- [ ] Build and run successfully
- [ ] Documentation updated
- [ ] Code reviewed and merged
