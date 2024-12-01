"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function RecipeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [recipe, setRecipe] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    // Simulate AI generation with a timeout
    setTimeout(() => {
      setRecipe(`Here's a recipe for ${prompt}:\n\nIngredients:\n- 2 cups of imagination\n- 1 tablespoon of creativity\n- A pinch of AI magic\n\nInstructions:\n1. Mix imagination and creativity in a bowl.\n2. Sprinkle AI magic on top.\n3. Stir well and serve with a side of innovation.`)
      setIsGenerating(false)
    }, 2000)
  }

  const handleSave = () => {
    console.log("Saving recipe:", recipe)
    // Here you would typically implement the save functionality
    alert("Recipe saved! (Check console for details)")
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">AI Recipe Generator</h1>
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
          {isGenerating ? "Generating..." : "Generate Recipe"}
        </Button>
      </form>
      {recipe && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={recipe}
              readOnly
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Recipe</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
