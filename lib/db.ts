'use server';
import postgres from 'postgres';
import { Recipe } from './types';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
});

export async function getUsers() {
  const users = await sql`
    select
      name
    from users
  `;
  return users;
}

export async function insertUser(name: string) {
  await sql`
    insert into users (name)
    values (${name})
  `;
}

export async function insertRecipe(recipe: Recipe) {
  const result = await sql`
    insert into recipes (name, ingredients, steps)
    values (
      ${recipe.name},
      ${recipe.ingredients},
      ${recipe.steps}
    )
    returning id
  `;
  return result[0].id;
}

export default sql;
