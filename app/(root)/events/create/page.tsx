import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Clock,
  Link2,
  Tag
} from "lucide-react";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 50%, #0f0c29 100%)"
      }}
    >
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-10 md:py-14"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
        }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-400/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-purple-500/8 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300/0 via-yellow-300 to-yellow-300/0" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 shadow-lg"
            style={{
              background: "rgba(253,224,71,0.12)",
              border: "1px solid rgba(253,224,71,0.25)"
            }}
          >
            <GraduationCap className="w-8 h-8 text-yellow-300" />
          </div>

          {/* Badge */}
          <p className="text-yellow-300 text-xs tracking-[0.4em] uppercase font-bold mb-3">
            👨‍🏫 Teacher Portal
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Post an <span className="text-yellow-300">Assignment</span>
          </h1>

          <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Create a new assignment for your students. Fill in the details below
            and publish instantly.
            <Sparkles className="inline-block w-4 h-4 ml-2 text-yellow-300/60" />
          </p>

          {/* Quick info pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              {
                icon: <BookOpen className="w-3.5 h-3.5" />,
                text: "Add course details"
              },
              {
                icon: <Clock className="w-3.5 h-3.5" />,
                text: "Set submission deadline"
              },
              {
                icon: <Link2 className="w-3.5 h-3.5" />,
                text: "Attach resources"
              },
              { icon: <Tag className="w-3.5 h-3.5" />, text: "Tag by category" }
            ].map((pill) => (
              <div
                key={pill.text}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/50"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <span className="text-yellow-300/60">{pill.icon}</span>
                {pill.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Form Card */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-yellow-300/10"
          style={{
            background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
          }}
        >
          {/* Card Header */}
          <div
            className="px-6 py-4 border-b border-white/5 flex items-center gap-3"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(253,224,71,0.12)",
                border: "1px solid rgba(253,224,71,0.2)"
              }}
            >
              <BookOpen className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-white font-black text-base tracking-tight">
                Assignment Details
              </h2>
              <p className="text-white/30 text-xs">
                Fill in all required fields to publish the assignment
              </p>
            </div>

            {/* Teacher badge */}
            <div
              className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.25)"
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-indigo-300 text-xs font-semibold">
                Teacher
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <EventForm userId={userId} type="Create" />
          </div>

          {/* Card Footer */}
          <div
            className="px-8 py-4 border-t border-white/5 text-center"
            style={{ background: "rgba(255,255,255,0.01)" }}
          >
            <p className="text-white/20 text-xs">
              🎓 Students will be notified once the assignment is published
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div
          className="mt-6 p-6 rounded-2xl border border-yellow-300/10"
          style={{ background: "rgba(253,224,71,0.04)" }}
        >
          <div className="flex items-start gap-3">
            <div className="text-xl mt-0.5">💡</div>
            <div>
              <h3 className="text-yellow-300 font-black text-sm mb-3 tracking-wide">
                Teacher Tips
              </h3>
              <ul className="space-y-2 text-sm text-white/40">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300/40 mt-0.5">→</span>
                  Write a clear title so students can identify the assignment
                  easily
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300/40 mt-0.5">→</span>
                  Set a realistic deadline — students need enough time to submit
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300/40 mt-0.5">→</span>
                  Add a reference link or resource URL to help students get
                  started
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300/40 mt-0.5">→</span>
                  Choose the correct category so it appears under the right
                  subject
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
