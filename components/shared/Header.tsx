import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { LogIn } from "lucide-react"; // Install lucide-react: npm install lucide-react

const Header = () => {
  return (
    <header className="w-full border-b border-gray-100 shadow-sm bg-white/80 backdrop-blur-sm">
      <div className="wrapper flex items-center justify-between py-4">
        <Link href="/" className="flex  items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/assets/images/logo.svg"
            alt="Evently Logo"
            width={128}
            height={38}
            className="object-contain"
          />
        </Link>
        
        <nav className="md:flex-between hidden flex-1 mx-8">
          <NavItems />
        </nav>
        
        <div className="flex items-center justify-end gap-6 flex-shrink-0">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          
          <SignedOut>
            <div className="flex items-center gap-4">
              {/* <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Link href="/sign-up">
                  Sign Up
                </Link>
              </Button> */}
              
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group px-6 py-2.5"
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  <span className="whitespace-nowrap">Get Started</span>
                </Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;