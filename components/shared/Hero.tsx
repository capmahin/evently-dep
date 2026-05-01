"use client";

import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%"
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom top",
        scrub: true
      }
    });
  });

  return (
    <div className="relative w-screen overflow-x-hidden h-dvh">
      {/* ── Hero Section ── */}
      <div
        id="video-frame"
        className="relative z-10 w-screen overflow-hidden rounded-lg h-dvh"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
        }}
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none" />

        {/* Bottom-right Gaming label */}
        <h1 className="absolute z-20 bottom-5 right-5 text-5xl md:text-7xl font-black tracking-tight text-white/5 select-none pointer-events-none">
          G<b className="text-yellow-300/10">a</b>ming
        </h1>

        {/* Hero Text Content */}
        <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col justify-end pb-24 px-6 sm:px-12">
          <p className="text-yellow-300 text-xs tracking-[0.4em] uppercase font-semibold mb-3">
            Student Portal
          </p>
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-white leading-none mb-4 drop-shadow-2xl">
            redefi<span className="text-yellow-300">n</span>e
          </h1>
          <p className="mb-8 text-white/70 text-sm sm:text-base max-w-sm font-light tracking-wide leading-relaxed">
            Enter the Metagame Layer <br /> Unleash the Play Economy
          </p>

          <div className="flex flex-wrap gap-4">
            {/* Watch Trailer Button */}
            <button className="group flex items-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-300/40">
              <TiLocationArrow className="text-lg group-hover:rotate-45 transition-transform duration-300" />
              Watch Trailer
            </button>

            {/* Open Assignment Form Button */}
            <button
              onClick={() => setShowForm(true)}
              className="group flex items-center gap-2 border-2 border-white/30 hover:border-yellow-300 text-white hover:text-yellow-300 font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <span className="text-lg">📋</span>
              Open Assignment Form
            </button>
          </div>
        </div>
      </div>

      {/* Shadow Gaming label */}
      <h1 className="absolute bottom-5 right-5 text-5xl md:text-7xl font-black tracking-tight text-black/10 select-none pointer-events-none">
        G<b>a</b>ming
      </h1>

      {/* ── Assignment Form Modal ── */}
      {showForm && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
        >
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setShowForm(false)}
          />

          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{
              background:
                "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              border: "1px solid rgba(253,224,71,0.2)"
            }}
          >
            {/* Form Header */}
            <div
              className="sticky top-0 z-10 px-6 pt-6 pb-4 border-b border-white/10"
              style={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)"
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-xs tracking-widest uppercase font-semibold mb-1">
                    Student Portal
                  </p>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Assignment Submission
                  </h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-yellow-300 transition-all duration-200 text-lg font-light"
                >
                  ✕
                </button>
              </div>
            </div>

            {submitted ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="text-6xl mb-4 animate-bounce">✅</div>
                <h3 className="text-2xl font-black text-white mb-2">
                  Submitted!
                </h3>
                <p className="text-white/60 text-sm">
                  Your assignment has been received successfully.
                </p>
              </div>
            ) : (
              /* Form Fields */
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                {/* Student Name */}
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-1.5 font-medium">
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200"
                  />
                </div>

                {/* Student ID & Email — side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 text-xs tracking-widest uppercase mb-1.5 font-medium">
                      Student ID
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 2021-CS-001"
                      className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs tracking-widest uppercase mb-1.5 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Course */}
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-1.5 font-medium">
                    Course
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors duration-200"
                    style={{ backgroundColor: "#1a1a2e" }}
                  >
                    <option value="" disabled>
                      Select your course
                    </option>
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="eee">Electrical & Electronic Eng.</option>
                    <option value="bba">Business Administration</option>
                    <option value="english">English Literature</option>
                    <option value="math">Mathematics</option>
                    <option value="physics">Physics</option>
                  </select>
                </div>

                {/* Assignment Title */}
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-1.5 font-medium">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    name="assignmentTitle"
                    value={formData.assignmentTitle}
                    onChange={handleChange}
                    required
                    placeholder="Enter assignment title"
                    className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-1.5 font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Brief description of your assignment..."
                    className="w-full bg-white/5 border border-white/10 focus:border-yellow-300/50 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200 resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-1.5 font-medium">
                    Upload File
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 hover:border-yellow-300/50 rounded-lg cursor-pointer transition-colors duration-200 group">
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                      📎
                    </span>
                    <span className="text-white/40 text-xs">
                      {formData.file
                        ? formData.file.name
                        : "Click to upload PDF, DOC, ZIP"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-black text-sm tracking-widest uppercase py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-yellow-300/30 mt-2"
                >
                  Submit Assignment →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
