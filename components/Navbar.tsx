import { Map, MessageSquare, Sparkle } from "lucide-react";
import Link from "next/link"; // الاستيراد الصحيح من نكست
import React from "react";
import ThemeToggle from "./ui/themeTooglg";
import {
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-16">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-b-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkle className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">Feedback Fusion</span>
            </div>
          </Link>

          <Link
            href="/roodmap"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <Map className="h-4 w-4" />
            RoodMAp
          </Link>
          <Link
            href="/feedback"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            FeedBack
          </Link>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            Admin
          </Link>
          
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <ThemeToggle />
          <Link href="/sign-in">
  <Button>Sign In</Button>
</Link>

              <UserButton/>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
