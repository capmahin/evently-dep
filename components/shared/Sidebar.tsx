"use client";

import { useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import { LogIn, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();

  const role = user?.unsafeMetadata?.role as string | undefined;
  const roleLabel = role === "teacher" ? "Teacher" : role === "student" ? "Student" : null;
  const roleDotColor = role === "teacher" ? "bg-yellow-400" : "bg-green-400";

  return (
    <aside
      className={`relative flex flex-col flex-shrink-0 z-40 transition-all duration-300 ease-in-out ${
        collapsed ? "w-[56px]" : "w-[210px]"
      }`}
      style={{
        background: "linear-gradient(180deg, #0f0c29 0%, #1a1640 50%, #24243e 100%)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        minHeight: "100vh"
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 z-50 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: "#1a1640",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
        }}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3 text-white/50" />
          : <ChevronLeft className="w-3 h-3 text-white/50" />}
      </button>

      {/* Logo */}
      <Link
        href="/"
        className={`flex items-center gap-2.5 px-3 py-4 flex-shrink-0 hover:opacity-90 transition-opacity ${
          collapsed ? "justify-center" : ""
        }`}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="w-8 h-8 rounded-lg bg-yellow-300 flex items-center justify-center shadow-lg flex-shrink-0">
          <GraduationCap className="w-4 h-4 text-black" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-none overflow-hidden">
            <span className="text-yellow-300 font-black text-[13px] tracking-tight whitespace-nowrap">
              EduAssign
            </span>
            <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase">
              Portal
            </span>
          </div>
        )}
      </Link>

      {/* Navigation */}
      <nav
        className="flex-1 px-2 py-3 overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {!collapsed && (
          <p className="text-white/20 text-[9px] font-black tracking-[0.3em] uppercase px-2 mb-2">
            Menu
          </p>
        )}
        <NavItems collapsed={collapsed} onItemClick={() => {}} />
      </nav>

      {/* Bottom: Role + UserButton */}
      <div
        className="px-2 pb-4 pt-2 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <SignedIn>
          <div
            className={`flex items-center rounded-xl transition-all duration-300 ${
              collapsed ? "justify-center py-2" : "gap-2.5 px-2.5 py-2"
            }`}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)"
            }}
          >
            {!collapsed && (
              <>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0 ${roleDotColor}`} />
                <span className="text-white/40 text-[11px] font-medium flex-1 truncate">
                  {roleLabel ?? "Logged in"}
                </span>
              </>
            )}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7",
                  userButtonPopoverCard: "bg-[#1a1a2e] border border-white/10 shadow-2xl",
                  userButtonPopoverActions: "bg-[#1a1a2e]",
                  userButtonPopoverActionButton: "text-white/70 hover:text-white hover:bg-white/5",
                  userButtonPopoverActionButtonText: "text-white/70",
                  userButtonPopoverFooter: "hidden",
                  rootBox: "flex items-center justify-center"
                }
              }}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <Button
            asChild
            className={`rounded-xl bg-yellow-300 hover:bg-yellow-400 text-black font-bold border-0 transition-all duration-200 ${
              collapsed
                ? "w-10 h-10 p-0 mx-auto flex items-center justify-center"
                : "w-full"
            }`}
          >
            <Link href="/sign-in" className="flex items-center justify-center gap-2">
              <LogIn className="h-3.5 w-3.5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">Get Started</span>}
            </Link>
          </Button>
        </SignedOut>
      </div>
    </aside>
  );
};

export default Sidebar;