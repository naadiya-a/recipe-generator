"use server";
import postgres from "postgres";
import { Recipe } from "../lib/types";
import isSignedIn, { getCurrentUser } from "./auth";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
});

export async function getUsers() {
  const signedIn = await isSignedIn();
  if (!signedIn) return;

  const users = await sql`
    select
      name
    from users
  `;
  return users;
}

export async function insertUser(name: string) {
  const signedIn = await isSignedIn();
  if (!signedIn) return;

  await sql`
    insert into users (name)
    values (${name})
  `;
}

export async function insertRecipe(recipe: Recipe) {
  const signedIn = await isSignedIn();
  const user = await getCurrentUser();

  if (!signedIn || !user) return;

  const result = await sql`
    insert into recipes (name, ingredients, steps, user_id)
    values (
      ${recipe.name},
      ${recipe.ingredients},
      ${recipe.steps},
      ${user.id}
    )
    returning id
  `;
  return result[0].id;
}

export async function getRecipes() {
  const signedIn = await isSignedIn();
  const user = await getCurrentUser();

  if (!signedIn || !user) return [];

  const result = await sql`
  select id, name
  from recipes
  where user_id = ${user.id}
  `;

  const recipes = result.map(({ id, name }) => ({
    id,
    name,
  }));
  return recipes;
}

export async function getRecipe(id: number) {
  const signedIn = await isSignedIn();
  const user = await getCurrentUser();

  if (!signedIn || !user) return;

  const result = await sql`
  select id, name, ingredients, steps
  from recipes
  where id = ${id} and user_id = ${user.id};
  `;
  const recipe = {
    id: result[0].id,
    name: result[0].name,
    ingredients: result[0].ingredients,
    steps: result[0].steps,
  };
  return recipe;
}

export default sql;
