import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecipes } from '@/data/db';
import Link from 'next/link';

export default async function RecipeCards() {
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipe Collection</h1>
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
