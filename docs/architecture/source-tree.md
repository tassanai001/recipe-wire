# 🌳 Source Tree Structure – RecipeWire

> เอกสารนี้อธิบายโครงสร้างโฟลเดอร์และไฟล์ของโปรเจกต์ RecipeWire แบบ monorepo

## 📁 Root Structure

```
recipe-wire/
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       └── ci-cd.yml          # CI/CD pipeline
├── .husky/                     # Git hooks
│   ├── pre-commit             # Run linting before commit
│   └── pre-push               # Run tests before push
├── apps/                       # Applications
│   ├── backend/               # NestJS API
│   └── frontend/              # Next.js web app
├── packages/                   # Shared packages
│   ├── types/                 # Shared TypeScript types
│   ├── utils/                 # Shared utilities
│   └── ui/                    # Shared UI components (future)
├── e2e/                        # End-to-end tests (Playwright)
├── docs/                       # Documentation
│   ├── architecture/          # Architecture documents
│   ├── prd/                   # Product requirements & epics
│   ├── stories/               # User stories
│   └── qa/                    # QA documentation
├── .bmad-core/                 # BMAD framework files
├── .dockerignore              # Docker ignore file
├── .eslintrc.js               # ESLint configuration
├── .gitignore                 # Git ignore file
├── .prettierrc                # Prettier configuration
├── docker-compose.yml         # Development Docker Compose
├── docker-compose.prod.yml    # Production Docker Compose
├── package.json               # Root package.json (workspaces)
├── pnpm-workspace.yaml        # pnpm workspace configuration
├── README.md                  # Project README
└── tsconfig.json              # Root TypeScript config
```

---

## 🔧 Backend Structure (`apps/backend/`)

```
apps/backend/
├── prisma/                     # Prisma ORM files
│   ├── migrations/            # Database migrations
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── decorators/        # Custom decorators (e.g., @CurrentUser)
│   │   ├── guards/            # Auth guards (e.g., JwtAuthGuard)
│   │   ├── strategies/        # Passport strategies (e.g., JwtStrategy)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── dto/               # Data Transfer Objects
│   │       ├── signup.dto.ts
│   │       ├── login.dto.ts
│   │       └── refresh.dto.ts
│   ├── users/                 # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.repository.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   │       └── update-user.dto.ts
│   ├── recipes/               # Recipes module
│   │   ├── recipes.controller.ts
│   │   ├── recipes.service.ts
│   │   ├── recipes.repository.ts
│   │   ├── recipes.module.ts
│   │   └── dto/
│   │       ├── create-recipe.dto.ts
│   │       ├── update-recipe.dto.ts
│   │       └── recipe-query.dto.ts
│   ├── reviews/               # Reviews module
│   │   ├── reviews.controller.ts
│   │   ├── reviews.service.ts
│   │   ├── reviews.repository.ts
│   │   ├── reviews.module.ts
│   │   └── dto/
│   │       ├── create-review.dto.ts
│   │       └── update-review.dto.ts
│   ├── search/                # Search module
│   │   ├── search.controller.ts
│   │   ├── search.service.ts
│   │   └── search.module.ts
│   ├── uploads/               # File upload module
│   │   ├── uploads.controller.ts
│   │   ├── uploads.service.ts
│   │   ├── uploads.module.ts
│   │   └── interceptors/
│   │       └── file-validation.interceptor.ts
│   ├── common/                # Shared code
│   │   ├── decorators/        # Custom decorators
│   │   ├── filters/           # Exception filters
│   │   ├── guards/            # Global guards
│   │   ├── interceptors/      # Global interceptors
│   │   ├── pipes/             # Validation pipes
│   │   └── middleware/        # Middleware (e.g., logging)
│   ├── config/                # Configuration
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── app.config.ts
│   ├── app.controller.ts      # Root controller (health check)
│   ├── app.service.ts         # Root service
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry point
├── test/                       # Integration tests
│   ├── auth.integration.spec.ts
│   ├── recipes.integration.spec.ts
│   └── setup.ts               # Test setup
├── uploads/                    # Local file uploads (dev)
├── .env                        # Environment variables (not in git)
├── .env.example               # Environment variables template
├── .eslintrc.js               # ESLint config
├── .prettierrc                # Prettier config
├── Dockerfile                 # Development Dockerfile
├── Dockerfile.prod            # Production Dockerfile
├── jest.config.js             # Jest configuration
├── nest-cli.json              # NestJS CLI config
├── package.json               # Backend dependencies
├── tsconfig.json              # TypeScript config
└── tsconfig.build.json        # Build TypeScript config
```

### Backend Module Pattern

Each module follows this structure:
```
module-name/
├── module-name.controller.ts   # HTTP endpoints
├── module-name.service.ts      # Business logic
├── module-name.repository.ts   # Database operations (optional)
├── module-name.module.ts       # Module definition
├── dto/                        # Data Transfer Objects
│   ├── create-*.dto.ts
│   ├── update-*.dto.ts
│   └── query-*.dto.ts
├── entities/                   # Domain entities (optional)
├── interfaces/                 # TypeScript interfaces (optional)
└── *.spec.ts                  # Unit tests
```

---

## 🎨 Frontend Structure (`apps/frontend/`)

```
apps/frontend/
├── public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/       # Dashboard route group (protected)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── recipes/           # Recipe routes
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx   # Recipe detail
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx   # Create recipe
│   │   ├── search/
│   │   │   └── page.tsx       # Search page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── loading.tsx        # Loading UI
│   │   ├── error.tsx          # Error UI
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components (app-local)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   └── ...
│   │   ├── layout/            # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── sidebar.tsx
│   │   ├── recipe/            # Recipe-specific components
│   │   │   ├── recipe-card.tsx
│   │   │   ├── recipe-form.tsx
│   │   │   ├── recipe-list.tsx
│   │   │   ├── ingredient-list.tsx
│   │   │   └── step-list.tsx
│   │   ├── review/            # Review components
│   │   │   ├── review-form.tsx
│   │   │   ├── review-list.tsx
│   │   │   ├── review-item.tsx
│   │   │   └── rating-widget.tsx
│   │   ├── search/            # Search components
│   │   │   ├── search-bar.tsx
│   │   │   ├── search-filters.tsx
│   │   │   └── filter-chip.tsx
│   │   └── common/            # Common components
│   │       ├── loading-spinner.tsx
│   │       ├── error-message.tsx
│   │       ├── empty-state.tsx
│   │       └── confirmation-dialog.tsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-auth.ts        # Auth hook
│   │   ├── use-recipes.ts     # Recipe queries
│   │   ├── use-reviews.ts     # Review queries
│   │   ├── use-search.ts      # Search hook
│   │   └── use-debounce.ts    # Utility hook
│   ├── lib/                   # Utilities and configurations
│   │   ├── api/               # API client
│   │   │   ├── client.ts      # Axios/Fetch client
│   │   │   ├── auth.api.ts    # Auth API calls
│   │   │   ├── recipes.api.ts # Recipe API calls
│   │   │   └── reviews.api.ts # Review API calls
│   │   ├── utils/             # Utility functions
│   │   │   ├── format-date.ts
│   │   │   ├── format-time.ts
│   │   │   └── cn.ts          # Class name utility
│   │   ├── validations/       # Zod schemas
│   │   │   ├── recipe.schema.ts
│   │   │   ├── review.schema.ts
│   │   │   └── auth.schema.ts
│   │   └── constants/         # Constants
│   │       ├── api.constants.ts
│   │       └── app.constants.ts
│   ├── store/                 # Zustand stores
│   │   ├── auth.store.ts      # Auth state
│   │   └── ui.store.ts        # UI state
│   ├── styles/                # Global styles
│   │   └── globals.css        # Global CSS with Tailwind
│   └── types/                 # Frontend-specific types
│       └── index.ts
├── .env.local                 # Local environment variables (not in git)
├── .env.example               # Environment variables template
├── .eslintrc.js               # ESLint config
├── .prettierrc                # Prettier config
├── components.json            # shadcn/ui config
├── Dockerfile                 # Development Dockerfile
├── Dockerfile.prod            # Production Dockerfile
├── next.config.js             # Next.js configuration
├── package.json               # Frontend dependencies
├── postcss.config.js          # PostCSS config (for Tailwind)
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript config
└── vitest.config.ts           # Vitest configuration
```

### Frontend Component Pattern

```
components/
├── ui/                        # Primitive UI components (shadcn/ui)
├── layout/                    # Layout components (Header, Footer, etc.)
├── [feature]/                 # Feature-specific components
│   ├── [feature]-card.tsx     # Display component
│   ├── [feature]-form.tsx     # Form component
│   ├── [feature]-list.tsx     # List component
│   └── [feature]-item.tsx     # List item component
└── common/                    # Shared components
```

---

## 📦 Shared Packages

### `packages/types/`
```
packages/types/
├── src/
│   ├── auth/
│   │   ├── user.types.ts
│   │   └── auth.schemas.ts    # Zod schemas
│   ├── recipe/
│   │   ├── recipe.types.ts
│   │   └── recipe.schemas.ts
│   ├── review/
│   │   ├── review.types.ts
│   │   └── review.schemas.ts
│   └── index.ts               # Re-export all types
├── package.json
└── tsconfig.json
```

### `packages/utils/`
```
packages/utils/
├── src/
│   ├── date/
│   │   ├── format-date.ts
│   │   └── parse-date.ts
│   ├── string/
│   │   ├── slugify.ts
│   │   └── truncate.ts
│   ├── validation/
│   │   └── validators.ts
│   └── index.ts               # Re-export all utils
├── package.json
└── tsconfig.json
```

### `packages/ui/` (Future)
```
packages/ui/
├── src/
│   ├── components/            # Generic UI components
│   ├── hooks/                 # Shared hooks
│   └── index.ts
├── package.json
└── tsconfig.json
```

---

## 🧪 E2E Tests Structure

```
e2e/
├── fixtures/                  # Test data
│   ├── users.json
│   └── recipes.json
├── pages/                     # Page Object Models
│   ├── login.page.ts
│   ├── signup.page.ts
│   ├── recipe-create.page.ts
│   └── recipe-detail.page.ts
├── tests/                     # Test specs
│   ├── auth.spec.ts
│   ├── recipe-crud.spec.ts
│   ├── search.spec.ts
│   └── review.spec.ts
├── utils/                     # Test utilities
│   ├── test-helpers.ts
│   └── setup.ts
└── playwright.config.ts       # Playwright config
```

---

## 📄 Documentation Structure

```
docs/
├── architecture/              # Architecture documents
│   ├── architecture.md        # Main architecture doc
│   ├── tech-stack.md          # Technology stack details
│   ├── coding-standards.md    # Coding standards
│   ├── source-tree.md         # This file
│   ├── data-models.md         # Database models (future)
│   └── api-spec.md            # API specification (future)
├── prd/                       # Product requirements
│   ├── prd.md                 # Main PRD
│   ├── epic-1-*.md            # Epic files
│   ├── epic-2-*.md
│   └── ...
├── stories/                   # User stories
│   ├── 1.1.*.md               # Story files
│   ├── 1.2.*.md
│   └── ...
├── qa/                        # QA documentation
│   ├── test-strategy.md       # Test strategy (future)
│   └── test-cases.md          # Test cases (future)
├── project-brief-recipe-wire.md
├── roadmap.md
└── spec-user-journey-flow.md
```

---

## 🐳 Docker Structure

### Development
```
docker-compose.yml             # Development setup
├── db (PostgreSQL)
├── api (NestJS with hot reload)
└── frontend (Next.js with hot reload)
```

### Production
```
docker-compose.prod.yml        # Production setup
├── db (PostgreSQL)
├── api (NestJS optimized)
├── frontend (Next.js standalone)
└── nginx (Reverse proxy)
```

---

## 🔧 Configuration Files

### Root Level
- `package.json` - Workspace configuration
- `pnpm-workspace.yaml` - pnpm workspace definition
- `tsconfig.json` - Base TypeScript config
- `.eslintrc.js` - Base ESLint config
- `.prettierrc` - Prettier config
- `.gitignore` - Git ignore rules
- `.dockerignore` - Docker ignore rules

### App Level
- `apps/*/package.json` - App-specific dependencies
- `apps/*/tsconfig.json` - App-specific TypeScript config
- `apps/*/.env.example` - Environment variables template

---

## 📝 Naming Conventions

### Files
- **Components:** `kebab-case.tsx` (e.g., `recipe-card.tsx`)
- **Utilities:** `kebab-case.ts` (e.g., `format-date.ts`)
- **Tests:** `*.test.ts` or `*.spec.ts`
- **Types:** `*.types.ts` or `*.schemas.ts`

### Folders
- **Modules:** `kebab-case` (e.g., `auth/`, `recipes/`)
- **Route Groups:** `(group-name)` in Next.js App Router

---

## 🚀 Import Path Aliases

### Backend (`apps/backend/`)
```typescript
import { User } from '@prisma/client'
import { CreateRecipeDto } from '@recipe-wire/types'
import { formatDate } from '@recipe-wire/utils'
import { RecipeService } from './recipe.service'
```

### Frontend (`apps/frontend/`)
```typescript
import { Button } from '@/components/ui/button'
import { RecipeCard } from '@/components/recipe/recipe-card'
import { useAuth } from '@/hooks/use-auth'
import { CreateRecipeDto } from '@recipe-wire/types'
import { formatDate } from '@recipe-wire/utils'
```

### Path Alias Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@recipe-wire/types": ["../../packages/types/src"],
      "@recipe-wire/utils": ["../../packages/utils/src"]
    }
  }
}
```

---

## 📊 File Size Guidelines

- **Components:** < 300 lines (split if larger)
- **Services:** < 500 lines (split into multiple services)
- **Utilities:** < 100 lines per function file
- **Tests:** < 500 lines (split into multiple test files)

---

## 🔍 Finding Files

### By Feature
```bash
# Auth-related files
apps/backend/src/auth/
apps/frontend/src/app/(auth)/
packages/types/src/auth/

# Recipe-related files
apps/backend/src/recipes/
apps/frontend/src/app/recipes/
apps/frontend/src/components/recipe/
packages/types/src/recipe/
```

### By Type
```bash
# All controllers
find apps/backend/src -name "*.controller.ts"

# All components
find apps/frontend/src/components -name "*.tsx"

# All tests
find . -name "*.spec.ts" -o -name "*.test.ts"
```

---

**Last Updated:** 2025-09-30  
**Maintained By:** Development Team
