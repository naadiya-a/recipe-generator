import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecipes } from "@/data/db";
import Link from "next/link";

export default async function RecipeCards() {
  const recipes = await getRecipes();

  if (recipes.length == 0) {
    return (
      <div className="container mx-auto max-w-2xl min-h-screen flex flex-col">
        <h1 className="text-3xl font-bold text-center mt-8">Recipes</h1>
        <div className="flex-grow flex items-center justify-center -mt-20">
          <div className="text-center text-lg">
            No recipes saved. Generate one now! 👩‍🍳
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipes</h1>
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
