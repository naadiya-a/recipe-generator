import RecipeCard from "@/components/recipe-card";
import { getRecipe } from "@/data/db";

export default async function Page({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const slug = (await params).recipeId;
  const recipe = await getRecipe(Number(slug));

  return (
    <div className="flex flex-col p-4 items-center font-sans max-w-2xl mx-auto flex-grow">
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  );
}
