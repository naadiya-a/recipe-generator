import { SignIn } from "@clerk/nextjs";
import { ChefHat, Book } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8">
            <h1 className="md:text-3xl font-semibold text-gray-900 leading-tight text-center py-2">
              Want a recipe crafted just for you? <br />
              Is good!
            </h1>
            <div className="w-full flex justify-center">
              <SignIn />
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/squirrel-with-hat.jpeg"
              alt="Squirrel with an outreached arm"
              width={450}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>

        <section className="grid md:grid-cols-2 gap-8 text-center">
          <FeatureCard
            icon={<ChefHat className="w-12 h-12 mb-4 text-blue-500" />}
            title="AI-Generated Recipes"
            description="Get unique recipe ideas tailored to your preferences and dietary needs. Our AI considers your taste profile and available ingredients."
          />
          <FeatureCard
            icon={<Book className="w-12 h-12 mb-4 text-green-500" />}
            title="Personal Recipe Collection"
            description="Save and organize your favorite recipes in your personal digital cookbook. Access your culinary creations anytime, anywhere."
          />
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-row mb-2">
        {icon}
        <h2 className="flex items-center text-xl font-semibold pl-2">
          {title}
        </h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
