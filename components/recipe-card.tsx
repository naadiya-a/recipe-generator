import { Card, CardContent } from "@/components/ui/card";
import { Recipe } from "@/lib/types";

interface RecipeCardProps {
  recipe: Recipe;
  children?: React.ReactNode;
}

export default function RecipeCard({ recipe, children }: RecipeCardProps) {
  return (
    <Card className="flex-grow flex flex-col">
      <CardContent className="flex-grow">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold my-4">{recipe.name}</h2>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-3 [&>li::marker]:text-foreground [&>li::marker]:font-normal">
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
      {children}
    </Card>
  );
}
