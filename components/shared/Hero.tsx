"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    email: "",
    course: "",
    assignmentTitle: "",
    description: "",
    file: null as File | null
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, file: e.target.files?.[0] ?? null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setFormData({
        studentName: "",
        studentId: "",
        email: "",
        course: "",
        assignmentTitle: "",
        description: "",
        file: null
      });
    }, 2500);
  };

  useGSAP(() => {
    gsap.from(".hero-title", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15
    });
    gsap.from(".hero-badge", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3
    });
    gsap.from(".hero-btn", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6,
      stagger: 0.15
    });
    gsap.from(".hero-stat", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.9,
      stagger: 0.1
    });
  });

  return (
    <>
      {/* ── Hero Section ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "88vh",
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #24243e 100%)"
        }}
      >
        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #fde047, transparent 70%)" }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
          <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center"
          style={{ minHeight: "88vh" }}>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">

            {/* Left */}
            <div>
              {/* Badge */}
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: "rgba(253,224,71,0.1)",
                  border: "1px solid rgba(253,224,71,0.25)"
                }}>
                <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                <span className="text-yellow-300 text-xs font-black tracking-[0.3em] uppercase">
                  Student & Teacher Portal
                </span>
              </div>

              {/* Title */}
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-3">
                Manage
              </h1>
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
                style={{
                  background: "linear-gradient(135deg, #fde047 0%, #facc15 50%, #fb923c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                Assignments
              </h1>
              <p className="hero-title text-white/50 text-base sm:text-lg leading-relaxed max-w-md mb-10">
                Teachers post assignments, students submit work — track deadlines, get marks, all in one place.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/assignments">
                  <button className="hero-btn flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm text-black tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{
                      background: "linear-gradient(135deg, #fde047, #facc15)",
                      boxShadow: "0 8px 30px rgba(253,224,71,0.25)"
                    }}>
                    📚 Browse Assignments
                  </button>
                </Link>
                <button
                  onClick={() => setShowForm(true)}
                  className="hero-btn flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm text-white tracking-wide transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)"
                  }}
                >
                  📋 Quick Submit
                </button>
              </div>
            </div>

            {/* Right — Floating Cards */}
            <div className="hidden lg:flex flex-col gap-4 relative">

              {/* Main card */}
              <div
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, rgba(253,224,71,0.07), rgba(99,102,241,0.07))",
                  border: "1px solid rgba(253,224,71,0.12)",
                  backdropFilter: "blur(20px)"
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-300 flex items-center justify-center">
                    <span className="text-lg">🎓</span>
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">AssignHub</p>
                    <p className="text-white/30 text-xs">Academic Portal</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full"
                    style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-[10px] font-bold">LIVE</span>
                  </div>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { icon: "📋", val: "24", label: "Active" },
                    { icon: "✅", val: "189", label: "Submitted" },
                    { icon: "🏆", val: "97%", label: "On Time" }
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl p-3 text-center"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-lg mb-1">{s.icon}</p>
                      <p className="text-white font-black text-base leading-none">{s.val}</p>
                      <p className="text-white/30 text-[10px] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Fake deadline bar */}
                <div className="rounded-2xl p-4"
                  style={{ background: "rgba(253,224,71,0.05)", border: "1px solid rgba(253,224,71,0.1)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/60 text-xs font-semibold">📅 Next Deadline</p>
                    <span className="text-yellow-300 text-xs font-black animate-pulse">2 days left</span>
                  </div>
                  <p className="text-white font-black text-sm mb-3">Data Structures Assignment #4</p>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full w-[72%] transition-all duration-1000"
                      style={{ background: "linear-gradient(90deg, #fde047, #fb923c)" }} />
                  </div>
                  <p className="text-white/30 text-[10px] mt-1.5">72% submitted</p>
                </div>
              </div>

              {/* Bottom small cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: "👨‍🏫",
                    title: "40+ Teachers",
                    sub: "Posting assignments",
                    color: "rgba(99,102,241,0.1)",
                    border: "rgba(99,102,241,0.2)"
                  },
                  {
                    icon: "🎓",
                    title: "1200+ Students",
                    sub: "Submitting work",
                    color: "rgba(34,197,94,0.08)",
                    border: "rgba(34,197,94,0.18)"
                  }
                ].map((c) => (
                  <div key={c.title} className="rounded-2xl p-4"
                    style={{ background: c.color, border: `1px solid ${c.border}` }}>
                    <p className="text-2xl mb-2">{c.icon}</p>
                    <p className="text-white font-black text-sm">{c.title}</p>
                    <p className="text-white/30 text-xs mt-0.5">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="pb-10">
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "📚", value: "150+", label: "Assignments Posted" },
                { icon: "⏰", value: "97%", label: "On-Time Submissions" },
                { icon: "🏆", value: "4.9★", label: "Student Rating" }
              ].map((stat) => (
                <div key={stat.label} className="hero-stat rounded-2xl px-4 py-4 flex items-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)"
                  }}>
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-yellow-300 font-black text-lg leading-none">{stat.value}</p>
                    <p className="text-white/30 text-[11px] mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="absolute inset-0" onClick={() => setShowForm(false)} />

          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              border: "1px solid rgba(253,224,71,0.2)"
            }}>

            {/* Modal Header */}
            <div className="sticky top-0 z-10 px-6 pt-6 pb-4 border-b border-white/10"
              style={{ background: "linear-gradient(145deg, #1a1a2e, #16213e)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-xs tracking-widest uppercase font-black mb-1">
                    Quick Submission
                  </p>
                  <h2 className="text-2xl font-black text-white">Submit Assignment</h2>
                </div>
                <button onClick={() => setShowForm(false)}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-yellow-300 transition-all">
                  ✕
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="text-6xl mb-4 animate-bounce">✅</div>
                <h3 className="text-2xl font-black text-white mb-2">Submitted!</h3>
                <p className="text-white/50 text-sm">Your assignment has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                <div>
                  <label className="block text-white/50 text-[10px] tracking-widest uppercase mb-1.5 font-bold">Student Name</label>
                  <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required
                    placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-widest uppercase mb-1.5 font-bold">Student ID</label>
                    <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required
                      placeholder="2021-CS-001"
                      className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-widest uppercase mb-1.5 font-bold">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      placeholder="you@email.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-[10px] tracking-widest uppercase mb-1.5 font-bold">Course</label>
                  <select name="course" value={formData.course} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
                    style={{ backgroundColor: "#1a1a2e" }}>
                    <option value="" disabled>Select course</option>
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="eee">Electrical & Electronic Eng.</option>
                    <option value="bba">Business Administration</option>
                    <option value="english">English Literature</option>
                    <option value="math">Mathematics</option>
                    <option value="physics">Physics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 text-[10px] tracking-widest uppercase mb-1.5 font-bold">Assignment Title</label>
                  <input type="text" name="assignmentTitle" value={formData.assignmentTitle} onChange={handleChange} required
                    placeholder="Assignment title"
                    className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-white/50 text-[10px] tracking-widest uppercase mb-1.5 font-bold">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                    placeholder="Brief description..."
                    className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all resize-none" />
                </div>

                <div>
                  <label className="block text-white/50 text-[10px] tracking-widest uppercase mb-1.5 font-bold">Upload File</label>
                  <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-white/15 hover:border-yellow-300/40 rounded-xl cursor-pointer transition-all group">
                    <span className="text-xl mb-1 group-hover:scale-110 transition-transform">📎</span>
                    <span className="text-white/30 text-xs">
                      {formData.file ? formData.file.name : "PDF, DOC, ZIP"}
                    </span>
                    <input type="file" accept=".pdf,.doc,.docx,.zip" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                <button type="submit"
                  className="w-full font-black text-sm text-black tracking-wide py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl mt-2"
                  style={{
                    background: "linear-gradient(135deg, #fde047, #facc15)",
                    boxShadow: "0 8px 25px rgba(253,224,71,0.2)"
                  }}>
                  Submit Assignment →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;