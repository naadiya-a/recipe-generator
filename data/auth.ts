import { auth } from '@clerk/nextjs/server'

export default async function isSignedIn() {
  const { userId } = await auth()

  if (!userId) {
    return false;
  };
  return true;
}