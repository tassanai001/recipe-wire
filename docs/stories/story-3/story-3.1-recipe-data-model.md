# Story 3.1: Recipe Data Model & Database Schema

**Epic:** Epic 3 - Recipe Management  
**Story ID:** 3.1  
**Priority:** High  
**Estimate:** 5 Story Points  
**Sprint:** Sprint 4-6 (Week 5-8)

---

## User Story

**As a** developer,  
**I want** a complete recipe data model with all relationships,  
**so that** I can store and query recipe data efficiently

---

## Acceptance Criteria

1. Prisma schema updated with recipe-related models:
   - `Recipe` model with fields:
     - id (UUID, PK)
     - ownerId (UUID, FK to User)
     - title (string, required)
     - description (text, optional)
     - coverImageUrl (string, optional)
     - cookTimeMinutes (integer, required)
     - avgRating (decimal, default 0)
     - ratingsCount (integer, default 0)
     - isPublished (boolean, default true)
     - createdAt, updatedAt (timestamps)
   - `RecipeStep` model:
     - id (UUID, PK)
     - recipeId (UUID, FK to Recipe)
     - stepNumber (integer, required)
     - instruction (text, required)
   - `RecipeIngredient` model:
     - id (UUID, PK)
     - recipeId (UUID, FK to Recipe)
     - label (string, required) - e.g., "ไข่ 2 ฟอง"
   - `Category` model:
     - id (smallint, PK)
     - name (string, unique) - e.g., "ของหวาน", "อาหารเช้า"
   - `RecipeCategory` junction table:
     - id (UUID, PK)
     - recipeId (UUID, FK)
     - categoryId (smallint, FK)
     - Unique constraint on (recipeId, categoryId)
2. Database relationships configured:
   - User → Recipes (one-to-many)
   - Recipe → Steps (one-to-many, cascade delete)
   - Recipe → Ingredients (one-to-many, cascade delete)
   - Recipe ↔ Categories (many-to-many via RecipeCategory)
3. Database indexes created:
   - Recipe.title (for search)
   - Recipe.ownerId (for user's recipes)
   - Recipe.avgRating (for sorting)
   - Recipe.createdAt (for sorting)
4. Full-text search index on Recipe (title, description)
5. Migration created and applied successfully
6. Seed data script with sample categories

---

## Technical Notes

- Use UUID v4 for all primary keys
- Cascade delete for dependent records (steps, ingredients)
- Index strategy optimized for common queries
- Seed categories: ของหวาน, อาหารเช้า, อาหารกลางวัน, อาหารเย็น, ของว่าง, เครื่องดื่ม

---

## Dependencies

- Epic 1 completed (Database setup)
- Epic 2 completed (User model exists)

---

## Testing Requirements

- Verify schema compiles
- Verify migrations apply successfully
- Verify relationships work correctly
- Verify cascade delete works
- Verify indexes are created
- Test seed script

---

## Definition of Done

- [ ] Prisma schema updated
- [ ] Migrations created and applied
- [ ] Indexes created
- [ ] Seed script created
- [ ] Relationships tested
- [ ] Documentation updated
- [ ] Code reviewed and merged
