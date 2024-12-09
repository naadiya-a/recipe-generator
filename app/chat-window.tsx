'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAnswer } from './actions/ai';
import { Recipe } from '@/lib/types';

export default function RecipeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [recipe, setRecipe] = useState<Recipe>();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const response = await getAnswer(prompt);
    setRecipe(response.object.recipe);
    setIsGenerating(false);
  };

  const handleSave = () => {
    console.log("Saving recipe:", recipe)
    alert("Recipe saved! (Check console for details)")
  }

  return (
    <div className="min-h-screen flex flex-col p-4 items-center font-sans">
      <h1 className="text-2xl font-bold mb-4">AI Recipe Generator</h1>
      <div className="container mx-auto max-w-2xl flex-grow flex flex-col w-full">
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <Label htmlFor="prompt">What would you like to cook?</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a dish or ingredients..."
              required
            />
          </div>
          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Recipe'}
          </Button>
        </form>
        {recipe && (
          <Card className="flex-grow flex flex-col">
            <CardHeader>
              <CardTitle>Generated Recipe</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">{recipe.name}</h2>
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
            <CardFooter>
              <Button onClick={handleSave}>Save Recipe</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
