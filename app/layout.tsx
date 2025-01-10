import NavBar from "@/components/nav-bar";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import LandingPage from "./landing-page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-slate-50`}>
          <SignedOut>
            <LandingPage />
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-between px-4 py-2">
              <NavBar />
              <UserButton />
            </div>
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
