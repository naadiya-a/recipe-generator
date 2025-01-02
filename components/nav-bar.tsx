import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white">
      <div className="container mx-auto max-w-2xl flex justify-between items-center">
        <Link href="/" className="hover:text-gray-600 px-4">
          Generator
        </Link>
        <Link href="/recipes" className="hover:text-gray-600 px-4">
          Recipes
        </Link>
      </div>
    </nav>
  );
}
