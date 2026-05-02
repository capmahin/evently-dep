"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Dhaka",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: "Asia/Dhaka",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="w-full z-50 border-b border-white/8 flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
      }}
    >
      <div className="flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-yellow-300 flex items-center justify-center shadow-md">
            <GraduationCap className="w-4 h-4 text-black" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-yellow-300 font-black text-[13px] tracking-tight">
              EduAssign
            </span>
            <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase">
              Portal
            </span>
          </div>
        </Link>

        {/* Timezone Clock */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
          <div className="flex flex-col items-end leading-none gap-0.5">
            <span className="text-white/90 text-sm font-mono font-semibold tracking-wider">
              {time}
            </span>
            <span className="text-white/35 text-[10px] tracking-wide">
              {date} · BST
            </span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
        </div>
      </div>
    </header>
  );
};

export default Header;