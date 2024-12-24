import { getRecipe } from '@/data/db';

export default async function Page({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const slug = (await params).recipeId;
  const recipe = await getRecipe(Number(slug));

  return <div>My Post: {JSON.stringify(recipe)}</div>;
}
