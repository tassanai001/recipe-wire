# Story 1.6: Setup Local File Upload Infrastructure

**Epic:** Epic 1 - Project Setup & Infrastructure  
**Story ID:** 1.6  
**Priority:** Medium  
**Estimate:** 3 Story Points  
**Sprint:** Sprint 1 (Week 1-2)

---

## User Story

**As a** developer,  
**I want** a local file upload system configured,  
**so that** users can upload recipe and profile images

---

## Acceptance Criteria

1. Upload directory created: `/var/app/uploads` (or `./uploads` in dev)
2. Directory structure organized by type:
   - `uploads/recipes/` - Recipe images
   - `uploads/profiles/` - Profile images
3. Upload directory mounted in Docker Compose
4. File upload middleware configured in NestJS
5. File validation implemented:
   - Allowed types: `image/jpeg`, `image/png`, `image/webp`
   - Max size: 3 MB per file
   - Filename sanitization (prevent path traversal)
6. Static file serving configured for uploads
7. Environment variable for upload path configured

---

## Technical Notes

- Use `multer` for file uploads in NestJS
- Generate unique filenames: `{uuid}-{timestamp}.{ext}`
- Serve uploads via `/uploads/*` route
- Validate MIME type and file extension

---

## Dependencies

- Story 1.4 (NestJS backend must exist)

---

## Testing Requirements

- Verify upload directory is created
- Verify file upload works
- Verify file validation works (type, size)
- Verify uploaded files are accessible via URL
- Verify filename sanitization prevents path traversal

---

## Definition of Done

- [ ] Upload directory structure created
- [ ] File upload middleware configured
- [ ] File validation implemented
- [ ] Static file serving working
- [ ] Documentation updated
- [ ] Code reviewed and merged
