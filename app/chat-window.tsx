"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getAnswer } from "./actions/ai"

export default function RecipeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [recipe, setRecipe] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true)
    const response = await getAnswer(prompt);
    setRecipe(response.text);
    setIsGenerating(false);
  }

  const handleSave = () => {
    console.log("Saving recipe:", recipe)
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
