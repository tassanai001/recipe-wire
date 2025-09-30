# Story 3.5: Image Upload API Enhancement

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.5  
**Priority:** Medium  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** user,  
**I want** to upload recipe images,  
**so that** I can make my recipes visually appealing

---

## Acceptance Criteria

1. `POST /v1/uploads` endpoint enhanced (protected):
   - Accepts multipart/form-data with `file` field
   - Validates:
     - File type: image/jpeg, image/png, image/webp
     - File size: max 3 MB
     - Filename sanitization
   - Generates unique filename: `{uuid}-{timestamp}.{ext}`
   - Saves to `uploads/recipes/` directory
   - Returns:
     - File URL: `/uploads/recipes/{filename}`
     - Metadata: filename, size, mimetype
2. Multiple file upload support:
   - Accept up to 10 files per request
   - Validate total size limit: 30 MB
   - Return array of uploaded file URLs
3. Error handling:
   - 400 for invalid file type or size
   - 401 for unauthenticated
   - 500 for file system errors
4. Image optimization (optional for MVP):
   - Resize to max width 1200px
   - Compress to reduce file size
5. Unit tests verify validation logic
6. Integration test uploads actual files

---

## Technical Notes

- Use `multer` for file handling
- Use `sharp` for image optimization (optional)
- Validate MIME type and file extension
- Prevent path traversal attacks
- Set proper file permissions

---

## Dependencies

- Story 1.6 (File upload infrastructure must exist)
- Story 2.3 (Auth guard must work)

---

## Testing Requirements

- Unit tests for validation
- Integration test for single file upload
- Integration test for multiple file upload
- Integration test for invalid file type
- Integration test for file too large
- Verify file is saved correctly

---

## Definition of Done

- [ ] Upload endpoint enhanced
- [ ] Multiple file support working
- [ ] Validation working
- [ ] Error handling complete
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] API documented
- [ ] Code reviewed and merged
