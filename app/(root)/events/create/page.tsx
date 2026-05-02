import OrderForm from "@/components/shared/OrderForm";
import { auth } from "@clerk/nextjs";
import { GraduationCap, Sparkles, User, Hash, Mail, Phone } from "lucide-react";
import { SearchParamProps } from "@/types";

const CreateOrder = ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const eventId = (searchParams?.eventId as string) || "";

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 50%, #0f0c29 100%)"
      }}
    >
      {/* ── Hero Section ── */}
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
            🎓 Student Portal
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Submit <span className="text-yellow-300">Assignment</span>
          </h1>

          <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Fill in your details and submit your assignment before the deadline.
            <Sparkles className="inline-block w-4 h-4 ml-2 text-yellow-300/60" />
          </p>

          {/* Quick info pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              {
                icon: <User className="w-3.5 h-3.5" />,
                text: "Your student info"
              },
              {
                icon: <Hash className="w-3.5 h-3.5" />,
                text: "Student ID required"
              },
              {
                icon: <Mail className="w-3.5 h-3.5" />,
                text: "Valid email needed"
              },
              {
                icon: <Phone className="w-3.5 h-3.5" />,
                text: "WhatsApp for updates"
              }
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

      {/* ── Form Section ── */}
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
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{
                background: "rgba(253,224,71,0.12)",
                border: "1px solid rgba(253,224,71,0.2)"
              }}
            >
              📋
            </div>
            <div>
              <h2 className="text-white font-black text-base tracking-tight">
                Submission Form
              </h2>
              <p className="text-white/30 text-xs">
                Fill in all required fields to submit your assignment
              </p>
            </div>

            {/* Student badge */}
            <div
              className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(34,197,94,0.10)",
                border: "1px solid rgba(34,197,94,0.25)"
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-xs font-semibold">
                Student
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <OrderForm userId={userId} type="Create" eventId={eventId} />
          </div>

          {/* Card Footer */}
          <div
            className="px-8 py-4 border-t border-white/5 text-center"
            style={{ background: "rgba(255,255,255,0.01)" }}
          >
            <p className="text-white/20 text-xs">
              👨‍🏫 Your teacher will be notified once you submit
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
                Student Tips
              </h3>
              <ul className="space-y-2 text-sm text-white/40">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300/40 mt-0.5">→</span>
                  Double-check your Student ID before submitting
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300/40 mt-0.5">→</span>
                  Use your institutional email address for proper identification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300/40 mt-0.5">→</span>
                  Submit before the deadline — late submissions may not be
                  accepted
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300/40 mt-0.5">→</span>
                  Add your WhatsApp number to receive grade notifications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
