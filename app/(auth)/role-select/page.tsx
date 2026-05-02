"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function RoleSelectPage() {
  const { user, isLoaded } = useUser();
  const [selected, setSelected] = useState<"teacher" | "student" | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // যদি আগে থেকেই role থাকে তাহলে home এ পাঠাও
    if (isLoaded && user) {
      const role = user.unsafeMetadata?.role;
      if (role) {
        window.location.href = "/";
      }
    }
  }, [isLoaded, user]);

  const handleSelect = async (role: "teacher" | "student") => {
    setSelected(role);
    setLoading(true);
    try {
      await user?.update({
        unsafeMetadata: { role }
      });
      await user?.reload();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSelected(null);
    }
  };

  if (!isLoaded) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)"
        }}
      >
        <p className="text-white/40 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)"
      }}
    >
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-300 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Who are <span className="text-yellow-300">you?</span>
          </h1>
          <p className="text-white/40 text-sm">Select your role to continue.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSelect("teacher")}
            disabled={loading}
            className="rounded-2xl p-8 border text-left transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:
                selected === "teacher"
                  ? "rgba(253,224,71,0.12)"
                  : "rgba(255,255,255,0.03)",
              borderColor:
                selected === "teacher"
                  ? "rgba(253,224,71,0.5)"
                  : "rgba(255,255,255,0.1)"
            }}
          >
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h2 className="text-white font-black text-xl mb-2">Teacher</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Create assignments, review submissions & give marks
            </p>
            <div className="mt-4 flex flex-wrap gap-1">
              {["Create", "Review", "Grade"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{
                    background: "rgba(253,224,71,0.15)",
                    color: "#fde047"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>

          <button
            onClick={() => handleSelect("student")}
            disabled={loading}
            className="rounded-2xl p-8 border text-left transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:
                selected === "student"
                  ? "rgba(99,102,241,0.12)"
                  : "rgba(255,255,255,0.03)",
              borderColor:
                selected === "student"
                  ? "rgba(99,102,241,0.5)"
                  : "rgba(255,255,255,0.1)"
            }}
          >
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="text-white font-black text-xl mb-2">Student</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              View assignments, submit work & check your results
            </p>
            <div className="mt-4 flex flex-wrap gap-1">
              {["Submit", "Results", "Track"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    color: "#a5b4fc"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        </div>

        {loading && (
          <div className="text-center mt-6">
            <p className="text-white/40 text-sm animate-pulse">
              ⏳ Setting up your account...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
