# 📐 Coding Standards – RecipeWire

> เอกสารนี้กำหนดมาตรฐานการเขียนโค้ดสำหรับโปรเจกต์ RecipeWire เพื่อให้โค้ดมีความสม่ำเสมอ อ่านง่าย และบำรุงรักษาได้

## 🎯 Core Principles

1. **Consistency** - โค้ดทุกส่วนควรมีรูปแบบเดียวกัน
2. **Readability** - โค้ดควรอ่านง่ายและเข้าใจได้ทันที
3. **Maintainability** - โค้ดควรแก้ไขและขยายได้ง่าย
4. **Type Safety** - ใช้ TypeScript อย่างเต็มที่ หลีกเลี่ยง `any`
5. **DRY (Don't Repeat Yourself)** - หลีกเลี่ยงการเขียนโค้ดซ้ำ
6. **KISS (Keep It Simple, Stupid)** - เขียนโค้ดให้เรียบง่าย
7. **YAGNI (You Aren't Gonna Need It)** - อย่าเขียนโค้ดที่ยังไม่ต้องใช้

---

## 📁 File Naming Conventions

### General Rules

- ใช้ **kebab-case** สำหรับไฟล์และโฟลเดอร์
- ใช้ **PascalCase** สำหรับ React components และ classes
- ใช้ **camelCase** สำหรับ functions และ variables

### Examples

```
✅ Good
components/recipe-card.tsx
utils/format-date.ts
hooks/use-auth.ts
services/recipe.service.ts

❌ Bad
components/RecipeCard.tsx (ใช้ PascalCase ในชื่อไฟล์)
utils/formatDate.ts (ควรใช้ kebab-case)
hooks/UseAuth.ts (ควรใช้ kebab-case)
```

### File Suffixes

| Type                    | Suffix                 | Example                      |
| ----------------------- | ---------------------- | ---------------------------- |
| React Component         | `.tsx`                 | `recipe-card.tsx`            |
| TypeScript File         | `.ts`                  | `format-date.ts`             |
| Test File (Unit)        | `.test.ts(x)`          | `recipe-card.test.tsx`       |
| Test File (Integration) | `.integration.spec.ts` | `recipe.integration.spec.ts` |
| Type Definitions        | `.types.ts`            | `recipe.types.ts`            |
| Constants               | `.constants.ts`        | `api.constants.ts`           |
| Config                  | `.config.ts`           | `database.config.ts`         |

---

## 🏗️ Code Structure

### TypeScript

#### Imports Order

```typescript
// 1. External dependencies
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@nestjs/prisma'

// 2. Internal absolute imports (from packages)
import { CreateRecipeDto } from '@recipe-wire/types'
import { formatDate } from '@recipe-wire/utils'

// 3. Relative imports
import { RecipeRepository } from './recipe.repository'
import { RecipeMapper } from './recipe.mapper'

// 4. Types
import type { Recipe } from '@prisma/client'
```

#### Export Order

```typescript
// 1. Types and interfaces
export type RecipeStatus = 'draft' | 'published'
export interface RecipeFilters { ... }

// 2. Constants
export const MAX_RECIPE_IMAGES = 10

// 3. Functions
export function formatRecipe(recipe: Recipe) { ... }

// 4. Classes (default export last)
export class RecipeService { ... }
```

---

## 🎨 Naming Conventions

### Variables and Functions

```typescript
// ✅ Good - camelCase
const userId = '123'
const isAuthenticated = true
const recipeCount = 10

function getUserById(id: string) { ... }
async function fetchRecipes() { ... }

// ❌ Bad
const UserID = '123'  // Should be camelCase
const is_authenticated = true  // Should be camelCase
function GetUserById(id: string) { ... }  // Should be camelCase
```

### Constants

```typescript
// ✅ Good - UPPER_SNAKE_CASE for true constants
const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3 MB
const API_BASE_URL = '/api/v1'
const DEFAULT_PAGE_SIZE = 20

// ✅ Good - camelCase for config objects
const apiConfig = {
  baseUrl: '/api/v1',
  timeout: 5000,
}

// ❌ Bad
const maxFileSize = 3 * 1024 * 1024 // Should be UPPER_SNAKE_CASE
const Max_File_Size = 3 * 1024 * 1024 // Inconsistent
```

### Classes and Interfaces

```typescript
// ✅ Good - PascalCase
class RecipeService { ... }
interface CreateRecipeDto { ... }
type RecipeStatus = 'draft' | 'published'

// ❌ Bad
class recipeService { ... }  // Should be PascalCase
interface createRecipeDto { ... }  // Should be PascalCase
```

### React Components

```typescript
// ✅ Good - PascalCase
export function RecipeCard({ recipe }: RecipeCardProps) { ... }
export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => { ... }

// ❌ Bad
export function recipeCard({ recipe }: RecipeCardProps) { ... }
export const recipe_list = ({ recipes }) => { ... }
```

### Boolean Variables

```typescript
// ✅ Good - Use is/has/can prefix
const isLoading = true
const hasPermission = false
const canEdit = true
const shouldRefetch = false

// ❌ Bad
const loading = true // Ambiguous
const permission = false // Not clear it's boolean
const edit = true // Not descriptive
```

---

## 🔤 TypeScript Best Practices

### Strict Mode

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Avoid `any`

```typescript
// ❌ Bad
function processData(data: any) {
  return data.value
}

// ✅ Good
interface DataInput {
  value: string
}

function processData(data: DataInput) {
  return data.value
}

// ✅ Good - Use unknown for truly unknown types
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as DataInput).value
  }
  throw new Error('Invalid data')
}
```

### Use Type Inference

```typescript
// ✅ Good - Let TypeScript infer
const count = 10 // inferred as number
const name = 'John' // inferred as string
const recipe = await getRecipe(id) // inferred from return type

// ❌ Bad - Unnecessary type annotation
const count: number = 10
const name: string = 'John'
```

### Prefer Interfaces for Objects

```typescript
// ✅ Good - Use interface for object shapes
interface User {
  id: string
  email: string
  displayName: string
}

// ✅ Good - Use type for unions, intersections, primitives
type RecipeStatus = 'draft' | 'published'
type UserId = string
type RecipeWithOwner = Recipe & { owner: User }

// ❌ Bad - Don't use type for simple object shapes
type User = {
  id: string
  email: string
}
```

### Use Enums Sparingly

```typescript
// ✅ Good - Use string literal unions instead of enums
type RecipeStatus = 'draft' | 'published' | 'archived'

// ❌ Bad - Enums add runtime overhead
enum RecipeStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

// ✅ OK - Use const enums if you must
const enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
}
```

---

## ⚛️ React Best Practices

### Component Structure

```tsx
// ✅ Good - Clear structure
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Recipe } from '@recipe-wire/types'

interface RecipeCardProps {
  recipe: Recipe
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleEdit = () => {
    onEdit?.(recipe.id)
  }

  return (
    <div onMouseEnter={() => setIsHovered(true)}>
      <h3>{recipe.title}</h3>
      {isHovered && <Button onClick={handleEdit}>Edit</Button>}
    </div>
  )
}
```

### Props Naming

```tsx
// ✅ Good - Use on* for event handlers
interface RecipeFormProps {
  onSubmit: (data: CreateRecipeDto) => void
  onCancel: () => void
  onChange?: (field: string, value: any) => void
}

// ❌ Bad
interface RecipeFormProps {
  submit: (data: CreateRecipeDto) => void // Not clear it's a handler
  handleCancel: () => void // Redundant "handle"
}
```

### Conditional Rendering

```tsx
// ✅ Good - Use && for simple conditions
{
  isLoading && <Spinner />
}
{
  error && <ErrorMessage error={error} />
}

// ✅ Good - Use ternary for if-else
{
  isAuthenticated ? <Dashboard /> : <Login />
}

// ❌ Bad - Don't use ternary for single condition
{
  isLoading ? <Spinner /> : null
} // Use && instead

// ✅ Good - Use early return for complex conditions
if (!recipe) {
  return <NotFound />
}

return <RecipeDetail recipe={recipe} />
```

### Hooks Rules

```tsx
// ✅ Good - Hooks at top level
function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const { data, isLoading } = useQuery('recipes', fetchRecipes)

  useEffect(() => {
    // Effect logic
  }, [])

  return <div>...</div>
}

// ❌ Bad - Hooks in conditions
function RecipeList() {
  if (someCondition) {
    const [recipes, setRecipes] = useState<Recipe[]>([]) // ❌ Wrong!
  }
}

// ✅ Good - Custom hooks start with "use"
function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  // ...
  return { user, login, logout }
}
```

---

## 🏛️ NestJS Best Practices

### Module Structure

```typescript
// ✅ Good - Clear separation of concerns
@Module({
  imports: [PrismaModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [RecipeService],
})
export class RecipeModule {}
```

### Controller

```typescript
// ✅ Good - RESTful routes, DTO validation
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: CreateRecipeDto,
    @CurrentUser() user: User
  ): Promise<RecipeResponseDto> {
    return this.recipeService.create(dto, user.id)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeResponseDto> {
    return this.recipeService.findOne(id)
  }
}
```

### Service

```typescript
// ✅ Good - Business logic in service
@Injectable()
export class RecipeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger
  ) {}

  async create(dto: CreateRecipeDto, ownerId: string): Promise<Recipe> {
    this.logger.log(`Creating recipe: ${dto.title}`)

    return this.prisma.recipe.create({
      data: {
        ...dto,
        ownerId,
        ingredients: {
          create: dto.ingredients.map(label => ({ label })),
        },
      },
      include: {
        ingredients: true,
        steps: true,
      },
    })
  }

  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        owner: true,
        ingredients: true,
        steps: true,
      },
    })

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`)
    }

    return recipe
  }
}
```

### Error Handling

```typescript
// ✅ Good - Use NestJS exceptions
throw new NotFoundException('Recipe not found')
throw new BadRequestException('Invalid recipe data')
throw new UnauthorizedException('Not authenticated')
throw new ForbiddenException('Not authorized to edit this recipe')

// ❌ Bad - Don't throw generic errors
throw new Error('Recipe not found') // Use NotFoundException
```

---

## 🧪 Testing Standards

### Test File Structure

```typescript
// recipe.service.spec.ts
describe('RecipeService', () => {
  let service: RecipeService
  let prisma: PrismaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RecipeService, PrismaService]
    }).compile()

    service = module.get<RecipeService>(RecipeService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  describe('create', () => {
    it('should create a recipe', async () => {
      const dto = { title: 'Test Recipe', ... }
      const result = await service.create(dto, 'user-id')

      expect(result).toBeDefined()
      expect(result.title).toBe('Test Recipe')
    })

    it('should throw BadRequestException for invalid data', async () => {
      const dto = { title: '', ... }

      await expect(service.create(dto, 'user-id'))
        .rejects.toThrow(BadRequestException)
    })
  })
})
```

### Test Naming

```typescript
// ✅ Good - Descriptive test names
it('should return 404 when recipe not found')
it('should create recipe with ingredients and steps')
it('should not allow user to review their own recipe')

// ❌ Bad - Vague test names
it('works')
it('test recipe')
it('should pass')
```

---

## 💅 Code Formatting

### Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

### ESLint Rules

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  }
}
```

---

## 📝 Comments and Documentation

### When to Comment

```typescript
// ✅ Good - Explain WHY, not WHAT
// Use bcrypt cost factor 10 for balance between security and performance
const saltRounds = 10

// Calculate average rating using database trigger for better performance
// instead of computing on every request
const avgRating = recipe.avgRating

// ❌ Bad - Obvious comments
// Set user id to 123
const userId = '123'

// Loop through recipes
for (const recipe of recipes) { ... }
```

### JSDoc for Public APIs

```typescript
/**
 * Creates a new recipe with ingredients and steps
 *
 * @param dto - Recipe creation data
 * @param ownerId - ID of the user creating the recipe
 * @returns Created recipe with all relations
 * @throws BadRequestException if validation fails
 * @throws UnauthorizedException if user not authenticated
 */
async create(dto: CreateRecipeDto, ownerId: string): Promise<Recipe> {
  // Implementation
}
```

### TODO Comments

```typescript
// TODO: Implement caching for popular recipes
// TODO(username): Add pagination support
// FIXME: Race condition when updating rating
// HACK: Temporary workaround for Prisma bug #1234
```

---

## 🚫 Anti-Patterns to Avoid

### Magic Numbers

```typescript
// ❌ Bad
if (user.age > 18) { ... }
setTimeout(callback, 300000)

// ✅ Good
const MINIMUM_AGE = 18
if (user.age > MINIMUM_AGE) { ... }

const FIVE_MINUTES_MS = 5 * 60 * 1000
setTimeout(callback, FIVE_MINUTES_MS)
```

### Deep Nesting

```typescript
// ❌ Bad
if (user) {
  if (user.isAuthenticated) {
    if (user.hasPermission('edit')) {
      if (recipe.ownerId === user.id) {
        // Do something
      }
    }
  }
}

// ✅ Good - Early returns
if (!user) return
if (!user.isAuthenticated) return
if (!user.hasPermission('edit')) return
if (recipe.ownerId !== user.id) return

// Do something
```

### Large Functions

```typescript
// ❌ Bad - Function does too much
async function handleRecipeSubmit(data: any) {
  // 100+ lines of validation, transformation, API calls, error handling
}

// ✅ Good - Break into smaller functions
async function handleRecipeSubmit(data: FormData) {
  const validatedData = validateRecipeData(data)
  const transformedData = transformRecipeData(validatedData)
  const recipe = await createRecipe(transformedData)
  return recipe
}
```

---

## 🔒 Security Best Practices

### Input Validation

```typescript
// ✅ Good - Validate all inputs
const CreateRecipeSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  cookTimeMinutes: z.number().int().positive()
})

// Validate in controller
@Post()
async create(@Body(new ZodValidationPipe(CreateRecipeSchema)) dto: CreateRecipeDto) {
  return this.recipeService.create(dto)
}
```

### SQL Injection Prevention

```typescript
// ✅ Good - Use Prisma (parameterized queries)
const recipe = await prisma.recipe.findUnique({
  where: { id: recipeId },
})

// ❌ Bad - Never use raw SQL with user input
const recipe = await prisma.$queryRaw`SELECT * FROM recipes WHERE id = ${recipeId}`
```

### XSS Prevention

```typescript
// ✅ Good - Sanitize HTML content
import DOMPurify from 'dompurify'

const sanitizedDescription = DOMPurify.sanitize(recipe.description)
```

### Secrets Management

```typescript
// ✅ Good - Use environment variables
const jwtSecret = process.env.JWT_SECRET

// ❌ Bad - Never hardcode secrets
const jwtSecret = 'my-secret-key-123' // ❌ NEVER DO THIS!
```

---

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Best Practices](https://react.dev/learn)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)

---

**Last Updated:** 2025-09-30  
**Maintained By:** Development Team
