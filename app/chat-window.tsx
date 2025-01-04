"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAnswer } from "@/data/ai";
import { Recipe } from "@/lib/types";
import { insertRecipe } from "@/data/db";
import RecipeCard from "@/components/recipe-card";

export default function RecipeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [recipe, setRecipe] = useState<Recipe>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const response = await getAnswer(prompt);
    setRecipe(response.object.recipe);
    setIsGenerating(false);
    setIsSaved(false);
  };

  const handleSave = async () => {
    if (!recipe) {
      throw new Error("Cannot save recipe: recipe is undefined");
    }
    setIsSaving(true);
    await insertRecipe(recipe);
    setIsSaving(false);
    setIsSaved(true);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 items-center font-sans">
      <h1 className="text-2xl font-bold mb-4">AI Recipe Generator</h1>
      <div className="container mx-auto max-w-2xl flex-grow flex flex-col w-full">
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <Label htmlFor="prompt">What would you like to cook?</Label>
            <Input
              className="bg-white"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a dish or ingredients..."
              required
            />
          </div>
          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Recipe"}
          </Button>
        </form>
        {recipe && (
          <RecipeCard recipe={recipe}>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaved || isSaving}>
                {isSaved ? "Saved!" : isSaving ? "Saving..." : "Save Recipe"}
              </Button>
            </CardFooter>
          </RecipeCard>
        )}
      </div>
    </div>
  );
}
