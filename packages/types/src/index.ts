// Shared types and Zod schemas for the RecipeWire application
import { z } from 'zod'

// Recipe types (existing)
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

// Auth types and schemas (new)
export * from './auth/user.types'
export * from './auth/auth.schemas'

// Additional exports will be added in later stories based on requirements
