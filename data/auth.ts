import { auth, currentUser } from "@clerk/nextjs/server";

export default async function isSignedIn() {
  const { userId } = await auth();

  return !!userId;
}

export async function getCurrentUser() {
  return await currentUser();
}
