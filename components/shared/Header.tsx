'use client'

import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import { LogIn, Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-100 shadow-sm bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="wrapper flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/assets/images/logo.svg"
            alt="Evently Logo"
            width={52}
            height={8}
            className="object-contain"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="md:flex-between hidden flex-1 mx-8">
          <NavItems />
        </nav>
        
        <div className="flex items-center justify-end gap-6 flex-shrink-0">
          <SignedIn>
            <div className="hidden md:flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          
          <SignedOut>
            <div className="hidden md:flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative p-2 rounded-lg hover:bg-gray-50/50 transition-all duration-200 group"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu 
                className={`absolute transition-all duration-300 ease-out ${
                  mobileMenuOpen 
                    ? 'opacity-0 rotate-90 scale-0' 
                    : 'opacity-100 rotate-0 scale-100'
                }`}
                size={24}
              />
              <X 
                className={`absolute transition-all duration-300 ease-out ${
                  mobileMenuOpen 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 -rotate-90 scale-0'
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
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Glassmorphism Menu Panel */}
        <div 
          className={`absolute right-4 top-2 w-[calc(100%-2rem)] max-w-sm ml-auto transition-all duration-300 ease-out ${
            mobileMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-4 scale-95'
          }`}
        >
          <div className="relative">
            {/* Glassmorphism Container */}
            <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
              {/* Glossy Top Border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
              
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100/50 transition-all duration-200 group"
                  aria-label="Close menu"
                >
                  <X 
                    className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors"
                    size={20}
                  />
                </button>
              </div>
              
              {/* Menu Content */}
              <div className="p-6 space-y-6 pt-12">
                {/* Navigation Items */}
                <nav className="space-y-1">
                  <NavItems onItemClick={() => setMobileMenuOpen(false)} />
                </nav>
                
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                
                {/* Authentication Section */}
                <div className="space-y-4">
                  <SignedIn>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50">
                      <span className="text-sm font-medium text-gray-700">Account</span>
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10 border-2 border-white/50 shadow-sm"
                          }
                        }}
                      />
                    </div>
                  </SignedIn>
                  
                  <SignedOut>
                    <div className="space-y-3">
                      <Button
                        asChild
                        size="lg"
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
                      >
                        <Link 
                          href="/sign-in" 
                          className="flex items-center justify-center gap-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <LogIn className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          <span className="whitespace-nowrap">Get Started</span>
                        </Link>
                      </Button>
                      
                      <p className="text-xs text-center text-gray-500 px-4">
                        Join thousands of users managing their events with Evently
                      </p>
                    </div>
                  </SignedOut>
                </div>
              </div>
              
              {/* Bottom Glossy Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400/20 via-transparent to-indigo-400/20" />
            </div>
            
            {/* Reflection Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 blur-xl -z-10 rounded-2xl" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;