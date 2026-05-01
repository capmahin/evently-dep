"use client";

import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import { LogIn, Menu, X, GraduationCap } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="w-full border-b border-indigo-100 shadow-sm sticky top-0 z-50"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
      }}
    >
      <div className="wrapper flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-lg bg-yellow-300 flex items-center justify-center shadow-lg">
            <GraduationCap className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-yellow-300 font-black text-sm tracking-tight">
              EduAssign
            </span>
            <span className="text-white/40 text-[10px] tracking-widest uppercase">
              Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="md:flex hidden flex-1 mx-8">
          <NavItems />
        </nav>

        <div className="flex items-center justify-end gap-4 flex-shrink-0">
          <SignedIn>
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-xs font-medium">
                  Student
                </span>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-yellow-300 hover:bg-yellow-400 text-black font-bold shadow-lg hover:shadow-yellow-300/30 hover:scale-105 transition-all duration-200 group px-6 py-2.5 border-0"
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  <span className="whitespace-nowrap">Get Started</span>
                </Link>
              </Button>
            </div>
          </SignedOut>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu
                className={`absolute text-white transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
                size={24}
              />
              <X
                className={`absolute text-white transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
                size={24}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[73px] z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(15,12,41,0.85)" }}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute right-4 top-2 w-[calc(100%-2rem)] max-w-sm ml-auto transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95"
          }`}
        >
          <div className="relative">
            <div
              className="rounded-2xl shadow-2xl overflow-hidden border border-yellow-300/20"
              style={{
                background:
                  "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
              }}
            >
              {/* Top accent line */}
              <div className="h-0.5 bg-gradient-to-r from-yellow-300/0 via-yellow-300 to-yellow-300/0" />

              {/* Header inside mobile menu */}
              <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-yellow-300" />
                  <span className="text-yellow-300 font-black text-sm tracking-tight">
                    EduAssign Portal
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <X
                    className="h-5 w-5 text-white/60 hover:text-white"
                    size={20}
                  />
                </button>
              </div>

              <div className="px-5 pb-6 space-y-5">
                {/* Nav */}
                <nav className="space-y-1">
                  <NavItems onItemClick={() => setMobileMenuOpen(false)} />
                </nav>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Auth Section */}
                <div className="space-y-3">
                  <SignedIn>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm font-medium text-white/70">
                          Logged in
                        </span>
                      </div>
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-9 h-9 border-2 border-yellow-300/30"
                          }
                        }}
                      />
                    </div>
                  </SignedIn>

                  <SignedOut>
                    <Button
                      asChild
                      size="lg"
                      className="w-full rounded-xl bg-yellow-300 hover:bg-yellow-400 text-black font-bold shadow-lg transition-all duration-200 group border-0"
                    >
                      <Link
                        href="/sign-in"
                        className="flex items-center justify-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        <span>Get Started</span>
                      </Link>
                    </Button>
                    <p className="text-xs text-center text-white/30 pt-1">
                      Submit & track your assignments easily
                    </p>
                  </SignedOut>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-0.5 bg-gradient-to-r from-yellow-300/0 via-yellow-300/30 to-yellow-300/0" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
