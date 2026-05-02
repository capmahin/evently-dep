import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import { getEventById, getRelatedEventsByCategory } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { auth, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const EventDetails = async ({
  params: { id },
  searchParams
}: SearchParamProps) => {
  const event = await getEventById(id);
  const { sessionClaims } = auth();
  const user = await currentUser();
  const role = user?.unsafeMetadata?.role as string | undefined;
  const userId = sessionClaims?.userId as string;
  const isCreator = userId === event.organizer._id.toString();

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id.toString(),
    page: searchParams.page as string
  });

  const now = new Date();
  const deadline = new Date(event.endDateTime);
  const isExpired = deadline < now;
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isUrgent = !isExpired && daysLeft <= 3;

  return (
    <div className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 50%, #0f0c29 100%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/assignments" className="text-white/30 hover:text-yellow-300 text-xs transition-colors">
            ← Assignments
          </Link>
          <span className="text-white/20 text-xs">/</span>
          <span className="text-white/30 text-xs truncate max-w-[200px]">{event.title}</span>
          {role && (
            <>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-full"
                style={{
                  background: role === "teacher" ? "rgba(253,224,71,0.1)" : "rgba(99,102,241,0.1)",
                  color: role === "teacher" ? "#fde047" : "#a5b4fc",
                  border: role === "teacher" ? "1px solid rgba(253,224,71,0.2)" : "1px solid rgba(99,102,241,0.2)"
                }}>
                {role === "teacher" ? "👨‍🏫 Teacher View" : "🎓 Student View"}
              </span>
            </>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">

          {/* Left: Image */}
          <div className="lg:col-span-2">
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src={event.imageUrl} alt={event.title} fill className="object-cover" priority />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(15,12,41,0.7) 0%, transparent 60%)" }} />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black backdrop-blur-md"
                  style={{
                    background: event.isFree ? "rgba(34,197,94,0.25)" : "rgba(253,224,71,0.25)",
                    border: event.isFree ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(253,224,71,0.5)",
                    color: event.isFree ? "#86efac" : "#fde047"
                  }}>
                  {event.isFree ? "📋 No Marks" : `🎯 ${event.price} Marks`}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black backdrop-blur-md"
                  style={{ background: "rgba(253,224,71,0.15)", border: "1px solid rgba(253,224,71,0.3)", color: "#fde047" }}>
                  🏷️ {event.category.name}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black backdrop-blur-md ${isUrgent ? "animate-pulse" : ""}`}
                  style={{
                    background: isExpired ? "rgba(239,68,68,0.25)" : isUrgent ? "rgba(251,146,60,0.25)" : "rgba(99,102,241,0.25)",
                    border: isExpired ? "1px solid rgba(239,68,68,0.5)" : isUrgent ? "1px solid rgba(251,146,60,0.5)" : "1px solid rgba(99,102,241,0.5)",
                    color: isExpired ? "#fca5a5" : isUrgent ? "#fdba74" : "#a5b4fc"
                  }}>
                  {isExpired ? "⏰ Expired" : isUrgent ? `🔥 ${daysLeft}d left!` : `⏳ ${daysLeft}d left`}
                </span>
              </div>

              {/* Teacher: Edit overlay */}
              {isCreator && (
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Link href={`/events/${event._id.toString()}/update`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black backdrop-blur-md transition-all hover:scale-105"
                    style={{ background: "rgba(253,224,71,0.2)", border: "1px solid rgba(253,224,71,0.4)", color: "#fde047" }}>
                    ✏️ Edit
                  </Link>
                </div>
              )}
            </div>

            {/* Date cards */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="rounded-xl p-3"
                style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">📅 Start</p>
                <p className="text-white font-black text-xs">{formatDateTime(event.startDateTime).dateOnly}</p>
                <p className="text-white/50 text-[10px]">{formatDateTime(event.startDateTime).timeOnly}</p>
              </div>
              <div className="rounded-xl p-3"
                style={{
                  background: isExpired ? "rgba(239,68,68,0.08)" : isUrgent ? "rgba(251,146,60,0.08)" : "rgba(253,224,71,0.06)",
                  border: isExpired ? "1px solid rgba(239,68,68,0.2)" : isUrgent ? "1px solid rgba(251,146,60,0.2)" : "1px solid rgba(253,224,71,0.15)"
                }}>
                <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">⏰ Deadline</p>
                <p className="font-black text-xs" style={{ color: isExpired ? "#fca5a5" : isUrgent ? "#fdba74" : "#fde047" }}>
                  {formatDateTime(event.endDateTime).dateOnly}
                </p>
                <p className="text-white/50 text-[10px]">{formatDateTime(event.endDateTime).timeOnly}</p>
              </div>
            </div>

            {/* Teacher Stats Panel */}
            {role === "teacher" && (
              <div className="mt-3 rounded-2xl p-4"
                style={{ background: "rgba(253,224,71,0.05)", border: "1px solid rgba(253,224,71,0.12)" }}>
                <p className="text-yellow-300 text-[10px] uppercase tracking-widest font-black mb-3">
                  📊 Assignment Stats
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Submitted", value: "—", color: "#86efac", bg: "rgba(34,197,94,0.1)" },
                    { label: "Pending", value: "—", color: "#fca5a5", bg: "rgba(239,68,68,0.1)" },
                    { label: "Graded", value: "—", color: "#fde047", bg: "rgba(253,224,71,0.1)" },
                    { label: "Avg Marks", value: "—", color: "#a5b4fc", bg: "rgba(99,102,241,0.1)" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-2.5 text-center"
                      style={{ background: s.bg }}>
                      <p className="font-black text-base" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-white/30 text-[9px] uppercase tracking-wide mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Link href="/marks"
                  className="flex items-center justify-center gap-2 w-full mt-3 py-2 rounded-xl text-xs font-black transition-all hover:scale-[1.02]"
                  style={{ background: "rgba(253,224,71,0.12)", color: "#fde047", border: "1px solid rgba(253,224,71,0.2)" }}>
                  📊 View All Marks →
                </Link>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {event.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black"
                style={{ background: "rgba(253,224,71,0.1)", border: "1px solid rgba(253,224,71,0.2)", color: "#fde047" }}>
                🏷️ {event.category.name}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black"
                style={{
                  background: event.isFree ? "rgba(34,197,94,0.1)" : "rgba(253,224,71,0.1)",
                  border: event.isFree ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(253,224,71,0.25)",
                  color: event.isFree ? "#86efac" : "#fde047"
                }}>
                {event.isFree ? "📋 No Marks" : `🎯 ${event.price} Marks`}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black ${isUrgent ? "animate-pulse" : ""}`}
                style={{
                  background: isExpired ? "rgba(239,68,68,0.1)" : "rgba(99,102,241,0.1)",
                  border: isExpired ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(99,102,241,0.25)",
                  color: isExpired ? "#fca5a5" : "#a5b4fc"
                }}>
                {isExpired ? "⏰ Expired" : `⏳ ${daysLeft} days left`}
              </span>
            </div>

            {/* Teacher info */}
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(99,102,241,0.1))", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
                {event.organizer.firstName?.[0]?.toUpperCase() || "T"}
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-sm">
                  {event.organizer.firstName} {event.organizer.lastName}
                </p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">👨‍🏫 Assignment Creator</p>
              </div>
              {isCreator && (
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(253,224,71,0.12)", color: "#fde047", border: "1px solid rgba(253,224,71,0.25)" }}>
                  ✦ You
                </span>
              )}
            </div>

            {/* Description */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-yellow-300 text-[10px] tracking-[0.3em] uppercase font-black mb-3">
                📖 About This Assignment
              </p>
              <p className="text-white/70 leading-relaxed text-sm">{event.description}</p>
              {event.url && (
                <a href={event.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-bold transition-all hover:gap-3"
                  style={{ color: "#a5b4fc" }}>
                  🔗 Reference Link →
                </a>
              )}
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                <span className="text-lg">📍</span>
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest">Location / Class</p>
                  <p className="text-white/80 font-semibold text-sm">{event.location}</p>
                </div>
              </div>
            )}

            {/* ── Role-based bottom section ── */}

            {/* TEACHER: Quick actions */}
            {role === "teacher" && (
              <div className="rounded-2xl p-5"
                style={{ background: "linear-gradient(145deg, rgba(253,224,71,0.06), rgba(99,102,241,0.04))", border: "1px solid rgba(253,224,71,0.12)" }}>
                <p className="text-yellow-300 text-[10px] uppercase tracking-widest font-black mb-4">
                  👨‍🏫 Teacher Actions
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/events/${event._id.toString()}/update`}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(253,224,71,0.12)", color: "#fde047", border: "1px solid rgba(253,224,71,0.2)" }}>
                    ✏️ Edit Assignment
                  </Link>
                  <Link href="/marks"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>
                    📊 Manage Marks
                  </Link>
                  <Link href="/students"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#86efac", border: "1px solid rgba(34,197,94,0.2)" }}>
                    👥 View Students
                  </Link>
                  <Link href="/assignments"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    📚 All Assignments
                  </Link>
                </div>
              </div>
            )}

            {/* STUDENT: Submit box */}
            {role === "student" && (
              <div className="rounded-2xl p-5"
                style={{ background: "linear-gradient(145deg, rgba(99,102,241,0.07), rgba(34,197,94,0.05))", border: "1px solid rgba(99,102,241,0.15)" }}>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-black mb-1">
                  🎓 Student Panel
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white font-black text-base">Ready to submit?</p>
                  {isUrgent && !isExpired && (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full animate-pulse"
                      style={{ background: "rgba(251,146,60,0.15)", color: "#fdba74", border: "1px solid rgba(251,146,60,0.3)" }}>
                      ⚡ URGENT
                    </span>
                  )}
                </div>
                <CheckoutButton event={event} />
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Link href="/profile"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>
                    📋 My Submissions
                  </Link>
                  <Link href="/assignments"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    📚 Browse More
                  </Link>
                </div>
                <p className="text-white/20 text-[10px] text-center mt-3">
                  Submit before the deadline. Late submissions may not be accepted.
                </p>
              </div>
            )}

            {/* Not logged in */}
            {!role && (
              <div className="rounded-2xl p-5"
                style={{ background: "linear-gradient(145deg, rgba(253,224,71,0.06), rgba(99,102,241,0.06))", border: "1px solid rgba(253,224,71,0.12)" }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white font-black text-base">Want to submit?</p>
                </div>
                <CheckoutButton event={event} />
                <p className="text-white/20 text-[10px] text-center mt-3">
                  Sign in to submit your assignment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        <div className="rounded-2xl border border-yellow-300/10 p-6"
          style={{ background: "rgba(255,255,255,0.02)" }}>
          <p className="text-yellow-300 text-xs tracking-[0.4em] uppercase font-black mb-1">📚 Same Category</p>
          <h2 className="text-2xl font-black text-white mb-6">
            Related <span className="text-yellow-300">Assignments</span>
          </h2>
          <Collection
            data={relatedEvents?.data}
            emptyTitle="No Related Assignments"
            emptyStateSubtext="No other assignments in this category yet."
            collectionType="All_Events"
            limit={3}
            page={searchParams.page as string}
            totalPages={relatedEvents?.totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;