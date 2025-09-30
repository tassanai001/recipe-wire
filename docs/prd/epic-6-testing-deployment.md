# Epic 6: Testing & Deployment

## Epic Goal

สร้างระบบ testing ที่ครอบคลุมและ deployment pipeline สำหรับ production เพื่อให้มั่นใจในคุณภาพของโค้ดและความพร้อมในการเปิดตัว MVP

## Epic Owner

Development Team & DevOps

## Dependencies

- Epic 1-5: ฟีเจอร์หลักทั้งหมดเสร็จสมบูรณ์

## Target Sprint/Timeline

Sprint 10-11 (Week 13-15)

---

## User Stories

### Story 6.1: Unit Testing Setup & Core Tests

**As a** developer,
**I want** comprehensive unit tests for backend and frontend,
**so that** I can ensure individual components work correctly

**Acceptance Criteria:**

1. Backend unit testing configured:
   - Jest configured for NestJS
   - Test files follow pattern: `*.spec.ts`
   - Coverage reporting enabled
   - Scripts added to package.json: `test`, `test:watch`, `test:cov`
2. Frontend unit testing configured:
   - Vitest configured for Next.js
   - React Testing Library installed
   - Test files follow pattern: `*.test.tsx` or `*.test.ts`
   - Coverage reporting enabled
   - Scripts added: `test`, `test:watch`, `test:cov`
3. Core backend tests written:
   - Auth service tests (signup, login, JWT validation)
   - Recipe service tests (CRUD operations)
   - Review service tests (CRUD, rating calculation)
   - Validation tests (Zod schemas)
4. Core frontend tests written:
   - Component tests (RecipeCard, ReviewForm, etc.)
   - Hook tests (useAuth, custom hooks)
   - Utility function tests
5. Test coverage targets:
   - Backend: 80%+ coverage
   - Frontend: 70%+ coverage
6. CI integration (runs on every commit)

**Technical Notes:**

- Use Jest for backend (NestJS default)
- Use Vitest for frontend (faster than Jest)
- Mock external dependencies (database, APIs)
- Use Testing Library best practices (user-centric tests)
- Configure coverage thresholds in config files

---

### Story 6.2: Integration Testing

**As a** developer,
**I want** integration tests for API endpoints,
**so that** I can verify end-to-end API functionality

**Acceptance Criteria:**

1. Integration test setup:
   - Supertest configured for API testing
   - Test database configured (separate from dev DB)
   - Database seeding for test data
   - Test files follow pattern: `*.integration.spec.ts`
2. API integration tests written:
   - Auth flow: signup → login → access protected route
   - Recipe CRUD: create → read → update → delete
   - Review flow: create review → verify rating update
   - Search: search recipes → verify results
3. Test database management:
   - Database reset before each test suite
   - Seed data loaded for consistent tests
   - Cleanup after tests
4. Tests run in CI pipeline
5. All tests passing

**Technical Notes:**

- Use Supertest for HTTP assertions
- Use test database: `recipewire_test`
- Reset database with Prisma: `prisma migrate reset --force`
- Seed test data with Prisma seed script
- Run tests in isolated environment

---

### Story 6.3: E2E Testing with Playwright

**As a** QA engineer,
**I want** end-to-end tests for critical user flows,
**so that** I can verify the entire application works from user perspective

**Acceptance Criteria:**

1. Playwright configured:
   - Playwright installed and configured
   - Test files in `e2e/` directory
   - Multiple browsers configured (Chromium, Firefox, WebKit)
   - Screenshots and videos on failure
2. Critical user flows tested:
   - **User Registration & Login:**
     - Navigate to signup → fill form → submit → verify redirect to dashboard
     - Navigate to login → fill form → submit → verify redirect to dashboard
   - **Recipe Creation:**
     - Login → navigate to create recipe → fill form → upload image → submit → verify recipe detail page
   - **Recipe Search:**
     - Navigate to search → enter query → verify results → click recipe → verify detail page
   - **Review Submission:**
     - Login → navigate to recipe → submit review → verify review appears
   - **Recipe Edit & Delete:**
     - Login → navigate to own recipe → edit → verify changes → delete → verify removal
3. Test environment:
   - Tests run against local dev environment
   - Test data seeded before tests
   - Database reset after tests
4. CI integration:
   - E2E tests run on every PR
   - Tests run in headless mode
   - Artifacts (screenshots, videos) saved on failure
5. All E2E tests passing

**Technical Notes:**

- Use Playwright Test framework
- Configure base URL: `http://localhost:3000`
- Use Page Object Model for maintainability
- Run backend and frontend in Docker for tests
- Use test user accounts (seeded)

---

### Story 6.4: Production Docker Setup

**As a** DevOps engineer,
**I want** production-ready Docker images and compose file,
**so that** the application can be deployed to production

**Acceptance Criteria:**

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

**Technical Notes:**

- Use multi-stage builds to minimize image size
- Use `.dockerignore` to exclude unnecessary files
- Set NODE_ENV=production
- Use Next.js standalone output for smaller image
- Configure proper logging (JSON format)

---

### Story 6.5: CI/CD Pipeline Setup

**As a** DevOps engineer,
**I want** a CI/CD pipeline for automated testing and deployment,
**so that** code changes are tested and deployed reliably

**Acceptance Criteria:**

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

**Technical Notes:**

- Use GitHub Actions or GitLab CI
- Cache dependencies for faster builds
- Use matrix strategy for parallel jobs
- Store secrets in CI/CD platform (GitHub Secrets, GitLab Variables)
- Consider using Docker layer caching

---

### Story 6.6: Production Deployment & Monitoring

**As a** DevOps engineer,
**I want** the application deployed to production with basic monitoring,
**so that** users can access the MVP and issues can be detected

**Acceptance Criteria:**

1. Production server setup:
   - VPS or cloud instance provisioned (e.g., DigitalOcean, AWS EC2)
   - Docker and Docker Compose installed
   - Firewall configured (ports 80, 443, 22)
   - Domain name configured and DNS pointed to server
2. Application deployed:
   - Production docker-compose running
   - Database initialized and migrated
   - SSL/TLS certificate installed (Let's Encrypt)
   - Environment variables configured
   - Uploads directory created and writable
3. Basic monitoring setup:
   - Application logs collected (stdout → file or service)
   - Health check endpoints monitored
   - Uptime monitoring (e.g., UptimeRobot, Pingdom)
   - Alerts configured for downtime
4. Backup strategy:
   - Database backup script created
   - Daily automated backups configured
   - Backup retention policy: 7 days
5. Documentation:
   - Deployment runbook created
   - Rollback procedure documented
   - Monitoring dashboard access documented
6. Application accessible at production URL
7. Smoke tests pass on production

**Technical Notes:**

- Use Let's Encrypt with Certbot for SSL
- Use logrotate for log management
- Use cron for backup automation
- Store backups off-server (S3, Backblaze, etc.)
- Document server access and credentials securely

---

### Story 6.7: Performance Testing & Optimization

**As a** developer,
**I want** to verify application performance meets targets,
**so that** users have a fast and responsive experience

**Acceptance Criteria:**

1. Performance benchmarks defined:
   - Homepage load time: < 2 seconds (First Contentful Paint)
   - Recipe detail page load: < 2 seconds
   - Search response time: < 500ms
   - API response time: < 200ms (p95)
2. Performance testing tools configured:
   - Lighthouse CI for frontend performance
   - k6 or Apache Bench for API load testing
3. Performance tests executed:
   - Lighthouse tests on key pages
   - Load tests on API endpoints (100 concurrent users)
   - Database query performance analyzed
4. Optimization implemented:
   - Frontend: image optimization, code splitting, lazy loading
   - Backend: database query optimization, indexes verified
   - Caching headers configured
5. Performance targets met:
   - Lighthouse scores: Performance > 90, Accessibility > 95
   - API load test: 95th percentile < 200ms
   - No N+1 query issues
6. Performance monitoring in production:
   - Lighthouse CI runs on every deploy
   - Performance metrics logged

**Technical Notes:**

- Use Lighthouse CI in GitHub Actions
- Use k6 for load testing (write test scripts)
- Use Prisma query logging to identify slow queries
- Optimize images with Next.js Image component
- Use React.lazy() for code splitting

---

## Epic Acceptance Criteria

- [ ] All 7 stories completed and tested
- [ ] Unit test coverage: Backend 80%+, Frontend 70%+
- [ ] Integration tests cover all API endpoints
- [ ] E2E tests cover 5 critical user flows
- [ ] Production Docker setup complete and tested
- [ ] CI/CD pipeline running successfully
- [ ] Application deployed to production with SSL
- [ ] Basic monitoring and backups configured
- [ ] Performance targets met
- [ ] Documentation complete (deployment, monitoring, rollback)

## Technical Dependencies

- All previous epics (1-5) completed
- Jest, Vitest, Playwright for testing
- Docker and Docker Compose for deployment
- CI/CD platform (GitHub Actions, GitLab CI)
- Production server (VPS or cloud)
- Domain name and DNS
- SSL certificate (Let's Encrypt)

## Quality Gates

- All tests must pass before merge to main
- Code coverage thresholds enforced
- Lighthouse performance score > 90
- No critical security vulnerabilities (npm audit)
- Manual QA approval before production deployment

## Risks & Mitigations

- **Risk:** Deployment issues on production
  - **Mitigation:** Test deployment on staging environment first, have rollback plan
- **Risk:** Performance degradation under load
  - **Mitigation:** Load testing, performance monitoring, horizontal scaling plan
- **Risk:** Data loss during deployment
  - **Mitigation:** Automated backups, test restore procedure, database migration testing

## Definition of Done

- All stories meet acceptance criteria
- Code reviewed and merged
- All tests passing (unit, integration, E2E)
- CI/CD pipeline configured and working
- Application deployed to production
- SSL certificate installed and working
- Monitoring and alerts configured
- Backups automated and tested
- Performance benchmarks met
- Documentation complete
- Beta users invited and feedback collected
- No critical bugs or security issues

---

## 🎉 MVP Launch Checklist

After Epic 6 completion, verify:

- [ ] All 6 epics completed
- [ ] All acceptance criteria met
- [ ] Production deployment successful
- [ ] SSL/HTTPS working
- [ ] All critical user flows tested
- [ ] Performance targets met
- [ ] Monitoring and alerts active
- [ ] Backups configured and tested
- [ ] Documentation complete
- [ ] Legal pages ready (Terms, Privacy Policy)
- [ ] Beta user list prepared
- [ ] Feedback collection mechanism ready
- [ ] Support channel established (email, Discord, etc.)

**Ready for Beta Launch! 🚀**
