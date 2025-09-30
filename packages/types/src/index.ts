// Placeholder export for @recipe-wire/types
// This package will contain shared TypeScript types and Zod schemas

// Example type - will be replaced with actual types in later stories
export interface Recipe {
  id: string
  title: string
  description?: string
  ingredients: string[]
  steps: string[]
  cookingTime: number
  difficulty: 'easy' | 'medium' | 'hard'
  createdAt: Date
  updatedAt: Date
}

// Example Zod schema - will be replaced with actual schemas in later stories
import { z } from 'zod'

export const RecipeSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  cookingTime: z.number().int().positive(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type RecipeType = z.infer<typeof RecipeSchema>

// Additional exports will be added in later stories based on requirements
