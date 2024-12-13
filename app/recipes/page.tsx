"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecipes } from "@/lib/db";

type Recipe = {
  id: number;
  name: string;
};

export default function RecipeCards() {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  const handleCardClick = (title: string) => {
    setSelectedRecipe(title);
    alert(`You clicked on: ${title}`);
  };

  useEffect(() => {
    getRecipes().then((res) => {
      setRecipes(res);
    });
  }, []);

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipe Collection</h1>
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(recipe.name)}
          >
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      {selectedRecipe && (
        <p className="mt-6 text-center text-lg">
          Last selected recipe:{" "}
          <span className="font-semibold">{selectedRecipe}</span>
        </p>
      )}
    </div>
  );
}
