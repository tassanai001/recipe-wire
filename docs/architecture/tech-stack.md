# 🛠️ Tech Stack – RecipeWire MVP

> เอกสารนี้รายละเอียดเทคโนโลยีทั้งหมดที่ใช้ในโปรเจกต์ รวมถึง versions, rationale, และ alternatives ที่พิจารณา

## 📋 สรุป Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | Next.js | 14+ | React framework with App Router |
| **UI Framework** | React | 18+ | Component-based UI library |
| **Language** | TypeScript | 5+ | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3+ | Utility-first CSS framework |
| **UI Components** | shadcn/ui | Latest | Pre-built accessible components |
| **State Management** | React Query | 5+ | Server state management |
| **State Management** | Zustand | 4+ | Client state management |
| **Backend** | NestJS | 10+ | Node.js framework with TypeScript |
| **Runtime** | Node.js | 18 LTS / 20 LTS | JavaScript runtime |
| **Database** | PostgreSQL | 15+ | Relational database |
| **ORM** | Prisma | 5+ | Type-safe database client |
| **Validation** | Zod | 3+ | Schema validation library |
| **Authentication** | JWT | - | JSON Web Tokens (RS256) |
| **Password Hashing** | bcrypt | 5+ | Password hashing library |
| **File Upload** | Multer | 1.4+ | Multipart/form-data handling |
| **Logging** | Pino | 8+ | Fast JSON logger |
| **Testing (Backend)** | Jest | 29+ | Testing framework |
| **Testing (Frontend)** | Vitest | 1+ | Fast unit test framework |
| **Testing (E2E)** | Playwright | 1.40+ | End-to-end testing |
| **Package Manager** | pnpm | 8+ | Fast, disk space efficient |
| **Containerization** | Docker | 24+ | Application containerization |
| **Orchestration** | Docker Compose | 2+ | Multi-container orchestration |
| **Reverse Proxy** | Nginx | 1.24+ | Production reverse proxy |

---

## 🎨 Frontend Stack

### Next.js 14+ (App Router)
**Version:** 14.0.0 or later  
**Purpose:** React framework with server-side rendering, routing, and optimization

**Why Next.js:**
- Built-in SSR/SSG for better SEO and performance
- App Router for modern React patterns (Server Components, Streaming)
- Image optimization out of the box
- API routes for BFF pattern (if needed)
- Great developer experience with Fast Refresh

**Configuration:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

**Alternatives Considered:**
- Vite + React Router: Faster dev server but no SSR out of the box
- Remix: Great SSR but smaller ecosystem

---

### TypeScript 5+
**Version:** 5.0.0 or later  
**Purpose:** Type-safe JavaScript with static type checking

**Why TypeScript:**
- Catch errors at compile time
- Better IDE support and autocomplete
- Improved code maintainability
- Shared types between frontend and backend

**Configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"],
      "@recipe-wire/types": ["../../packages/types/src"],
      "@recipe-wire/utils": ["../../packages/utils/src"]
    }
  }
}
```

---

### Tailwind CSS 3+
**Version:** 3.4.0 or later  
**Purpose:** Utility-first CSS framework for rapid UI development

**Why Tailwind:**
- Rapid prototyping with utility classes
- Consistent design system
- Small production bundle (purges unused CSS)
- Great with component libraries like shadcn/ui

**Configuration:**
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
      }
    }
  },
  plugins: []
}
```

---

### shadcn/ui (Latest)
**Version:** Latest (component library, not npm package)  
**Purpose:** Pre-built, accessible, customizable UI components

**Why shadcn/ui:**
- Copy-paste components (no dependency bloat)
- Built on Radix UI (accessibility built-in)
- Fully customizable with Tailwind
- TypeScript support

**Installation:** App-local in `apps/frontend`

**Components Used:**
- Button, Card, Input, Label, Textarea
- Form, Dialog, AlertDialog, Sheet
- Select, Checkbox, Slider
- Avatar, Badge, Skeleton

---

### React Query 5+
**Version:** 5.0.0 or later  
**Purpose:** Server state management, caching, and synchronization

**Why React Query:**
- Automatic caching and background refetching
- Optimistic updates
- Request deduplication
- Built-in loading and error states

**Configuration:**
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false
    }
  }
})
```

---

### Zustand 4+
**Version:** 4.0.0 or later  
**Purpose:** Lightweight client state management

**Why Zustand:**
- Simple API (less boilerplate than Redux)
- TypeScript support
- Middleware for persistence
- Small bundle size

**Use Cases:**
- Auth state (user, token, isAuthenticated)
- UI state (modals, sidebars)
- Form state (if not using React Hook Form)

---

## 🔧 Backend Stack

### NestJS 10+
**Version:** 10.0.0 or later  
**Purpose:** Progressive Node.js framework with TypeScript

**Why NestJS:**
- Built-in TypeScript support
- Modular architecture (modules, controllers, services)
- Dependency injection
- Built-in validation, guards, interceptors
- Great for REST APIs

**Configuration:**
```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/config": "^3.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0"
  }
}
```

**Alternatives Considered:**
- Express: More flexible but less structure
- Fastify: Faster but smaller ecosystem

---

### Node.js 18 LTS / 20 LTS
**Version:** 18.x or 20.x (LTS versions)  
**Purpose:** JavaScript runtime for backend

**Why Node.js LTS:**
- Long-term support and stability
- Large ecosystem (npm packages)
- Good performance for I/O-bound operations
- Same language as frontend (code sharing)

---

### PostgreSQL 15+
**Version:** 15.0 or later  
**Purpose:** Primary relational database

**Why PostgreSQL:**
- ACID compliance
- Full-text search built-in (pg_trgm, tsvector)
- JSON support for flexible data
- Excellent performance and reliability
- Open source

**Extensions Used:**
- `uuid-ossp`: UUID generation
- `pg_trgm`: Trigram similarity for fuzzy search

**Alternatives Considered:**
- MySQL: Less advanced full-text search
- MongoDB: NoSQL, less suitable for relational data

---

### Prisma 5+
**Version:** 5.0.0 or later  
**Purpose:** Type-safe ORM and database toolkit

**Why Prisma:**
- Type-safe database queries
- Auto-generated TypeScript types
- Migration system
- Prisma Studio for database GUI
- Great DX with autocomplete

**Configuration:**
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

**Alternatives Considered:**
- TypeORM: More mature but less type-safe
- Drizzle: Newer, lighter but smaller community

---

### Zod 3+
**Version:** 3.22.0 or later  
**Purpose:** Schema validation for TypeScript

**Why Zod:**
- TypeScript-first validation
- Infer types from schemas
- Composable schemas
- Great error messages

**Usage:**
- API request/response validation
- Shared schemas in `packages/types`
- Frontend form validation

**Example:**
```typescript
import { z } from 'zod'

export const CreateRecipeSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  cookTimeMinutes: z.number().int().positive(),
  ingredients: z.array(z.string()).min(1),
  steps: z.array(z.string()).min(1)
})

export type CreateRecipeDto = z.infer<typeof CreateRecipeSchema>
```

---

### JWT (JSON Web Tokens)
**Algorithm:** RS256 (RSA Signature with SHA-256)  
**Purpose:** Stateless authentication

**Why JWT:**
- Stateless (no session storage needed)
- Can include user claims
- Works well with microservices

**Token Strategy:**
- Access Token: 15 minutes TTL
- Refresh Token: 7 days TTL

**Libraries:**
- `@nestjs/jwt`: NestJS JWT module
- `passport-jwt`: Passport strategy for JWT

---

### bcrypt 5+
**Version:** 5.1.0 or later  
**Purpose:** Password hashing

**Why bcrypt:**
- Industry standard for password hashing
- Configurable cost factor (salt rounds)
- Resistant to rainbow table attacks

**Configuration:**
```typescript
const saltRounds = 10
const hashedPassword = await bcrypt.hash(password, saltRounds)
```

**Alternatives Considered:**
- argon2: More secure but less widely adopted

---

### Multer 1.4+
**Version:** 1.4.5 or later  
**Purpose:** File upload handling (multipart/form-data)

**Why Multer:**
- De facto standard for Express/NestJS file uploads
- Flexible storage options (disk, memory)
- File filtering and size limits

**Configuration:**
```typescript
import { diskStorage } from 'multer'

const storage = diskStorage({
  destination: './uploads/recipes',
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${extname(file.originalname)}`
    cb(null, uniqueName)
  }
})
```

---

### Pino 8+
**Version:** 8.0.0 or later  
**Purpose:** Fast JSON logger for Node.js

**Why Pino:**
- Extremely fast (low overhead)
- JSON output (structured logging)
- Works well with log aggregation tools
- Built-in request ID support

**Configuration:**
```typescript
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' 
    ? { target: 'pino-pretty' } 
    : undefined
})
```

---

## 🧪 Testing Stack

### Jest 29+ (Backend)
**Version:** 29.0.0 or later  
**Purpose:** Testing framework for NestJS

**Why Jest:**
- Default testing framework for NestJS
- Great mocking capabilities
- Snapshot testing
- Coverage reporting

**Configuration:**
```json
{
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

---

### Vitest 1+ (Frontend)
**Version:** 1.0.0 or later  
**Purpose:** Fast unit testing for frontend

**Why Vitest:**
- Much faster than Jest
- Compatible with Vite (used by Next.js)
- Jest-compatible API
- Native ESM support

**Configuration:**
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
})
```

---

### Playwright 1.40+
**Version:** 1.40.0 or later  
**Purpose:** End-to-end testing

**Why Playwright:**
- Cross-browser testing (Chromium, Firefox, WebKit)
- Auto-wait (no flaky tests)
- Screenshots and videos on failure
- Parallel execution

**Configuration:**
```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
})
```

---

## 📦 Package Management

### pnpm 8+
**Version:** 8.0.0 or later  
**Purpose:** Fast, disk space efficient package manager

**Why pnpm:**
- Faster than npm/yarn (symlinks instead of copying)
- Saves disk space (global content-addressable store)
- Strict dependency resolution (no phantom dependencies)
- Great monorepo support (workspaces)

**Configuration:**
```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**Alternatives Considered:**
- npm: Slower, more disk space
- yarn: Good but pnpm is faster

---

## 🐳 Infrastructure Stack

### Docker 24+
**Version:** 24.0.0 or later  
**Purpose:** Application containerization

**Why Docker:**
- Consistent environments (dev/staging/prod)
- Easy deployment
- Isolation and security
- Large ecosystem

**Images Used:**
- `node:18-alpine` or `node:20-alpine`: Lightweight Node.js
- `postgres:15-alpine`: Lightweight PostgreSQL
- `nginx:alpine`: Lightweight Nginx

---

### Docker Compose 2+
**Version:** 2.0.0 or later  
**Purpose:** Multi-container orchestration

**Why Docker Compose:**
- Simple YAML configuration
- Easy local development setup
- Suitable for MVP single-host deployment

**Services:**
- `db`: PostgreSQL database
- `api`: NestJS backend
- `frontend`: Next.js frontend
- `nginx`: Reverse proxy (production)

---

### Nginx 1.24+
**Version:** 1.24.0 or later  
**Purpose:** Reverse proxy and static file server

**Why Nginx:**
- High performance
- SSL/TLS termination
- Load balancing (future)
- Static file serving

**Configuration:**
```nginx
server {
  listen 80;
  server_name recipewire.com;

  location /api/ {
    proxy_pass http://api:3001/;
  }

  location / {
    proxy_pass http://frontend:3000/;
  }

  location /uploads/ {
    alias /var/app/uploads/;
  }
}
```

---

## 🔐 Security Stack

### OWASP Top 10 Compliance
- **Injection:** Prisma (parameterized queries), Zod validation
- **Broken Authentication:** JWT with short TTL, bcrypt hashing
- **Sensitive Data Exposure:** HTTPS, no secrets in code
- **XML External Entities:** N/A (no XML parsing)
- **Broken Access Control:** NestJS Guards, ownership checks
- **Security Misconfiguration:** Environment variables, secure defaults
- **XSS:** HTML sanitization (DOMPurify on frontend)
- **Insecure Deserialization:** N/A (JSON only)
- **Using Components with Known Vulnerabilities:** `npm audit`, Dependabot
- **Insufficient Logging & Monitoring:** Pino logging, health checks

---

## 📊 Version Matrix

| Component | Minimum Version | Recommended Version | Notes |
|-----------|----------------|---------------------|-------|
| Node.js | 18.0.0 | 20.x LTS | Use LTS versions |
| pnpm | 8.0.0 | 8.15.0+ | Latest stable |
| PostgreSQL | 15.0 | 15.5+ | Latest 15.x |
| Docker | 24.0.0 | 24.0.7+ | Latest stable |
| TypeScript | 5.0.0 | 5.3.0+ | Latest stable |

---

## 🚀 Development Tools

### Recommended IDE
- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Prisma
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Code Quality Tools
- **ESLint**: Linting for TypeScript/JavaScript
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files

---

## 📝 Notes

### Not Included in MVP
- Redis (caching, sessions) - Phase 2
- Elasticsearch/Meilisearch (advanced search) - Phase 2
- CDN (Cloudflare, CloudFront) - Phase 2
- Monitoring (Prometheus, Grafana) - Phase 2
- APM (New Relic, Datadog) - Phase 2

### Future Considerations
- Horizontal scaling with Kubernetes
- Microservices architecture
- Event-driven architecture with message queues
- GraphQL API (alternative to REST)

---

**Last Updated:** 2025-09-30  
**Maintained By:** Development Team
