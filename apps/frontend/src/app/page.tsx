import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome to RecipeWire</CardTitle>
          <CardDescription>
            The platform for sharing and discovering amazing recipes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg">
            Share your favorite recipes with the world, or discover new dishes from talented cooks everywhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/recipes">Browse Recipes</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/create-recipe">Create Recipe</Link>
            </Button>
          </div>
          
          <div className="pt-6 border-t">
            <p className="text-muted-foreground">
              Join thousands of food enthusiasts sharing their culinary creations
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
