import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Link from "next/link";

export default async function AssignmentsPage({ searchParams }: SearchParamProps) {
  const { userId } = auth();
  let role: string | undefined;

  if (userId) {
    const user = await currentUser();
    role = user?.unsafeMetadata?.role as string;
    if (!role) redirect("/role-select");
  }

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 9
  });

  const totalAssignments = events?.data?.length ?? 0;

  return (
    <section
      className="flex flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 50%, #0f0c29 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Hero Banner */}
        <div
          className="relative mt-10 mb-10 rounded-3xl overflow-hidden border border-yellow-300/10 px-8 py-12 text-center"
          style={{ background: "linear-gradient(135deg, rgba(253,224,71,0.07) 0%, rgba(99,102,241,0.08) 100%)" }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #fde047, transparent)" }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

          <div className="relative z-10">
            <span
              className="inline-block text-xs font-black tracking-[0.4em] uppercase px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(253,224,71,0.12)", color: "#fde047", border: "1px solid rgba(253,224,71,0.2)" }}
            >
              📚 Assignment Portal
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              All <span className="text-yellow-300">Assignments</span>
            </h1>
            <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed mb-8">
              Browse, search and submit your assignments. Teachers post tasks, students deliver results.
            </p>

            {/* Quick action buttons */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {role === "teacher" && (
                <Link
                  href="/events/create"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-sm transition-all hover:scale-105"
                  style={{ background: "#fde047", color: "#0f0c29" }}
                >
                  ✏️ Post Assignment
                </Link>
              )}
              {role === "teacher" && (
                <Link
                  href="/marks"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-sm transition-all hover:scale-105"
                  style={{ background: "rgba(253,224,71,0.1)", color: "#fde047", border: "1px solid rgba(253,224,71,0.25)" }}
                >
                  📊 View Marks
                </Link>
              )}
              {role === "student" && (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-sm transition-all hover:scale-105"
                  style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                  📝 My Submissions
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              icon: "📋",
              value: `${totalAssignments}`,
              label: "Total Assignments",
              color: "rgba(253,224,71,0.08)",
              border: "rgba(253,224,71,0.15)",
              text: "#fde047"
            },
            {
              icon: "🔥",
              value: "Active",
              label: "Current Status",
              color: "rgba(239,68,68,0.08)",
              border: "rgba(239,68,68,0.15)",
              text: "#fca5a5"
            },
            {
              icon: "🎯",
              value: "Submit",
              label: "Your Work",
              color: "rgba(99,102,241,0.08)",
              border: "rgba(99,102,241,0.15)",
              text: "#a5b4fc"
            },
            {
              icon: "✅",
              value: "Track",
              label: "Your Progress",
              color: "rgba(34,197,94,0.08)",
              border: "rgba(34,197,94,0.15)",
              text: "#86efac"
            }
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 border flex flex-col gap-1"
              style={{ background: stat.color, borderColor: stat.border }}
            >
              <span className="text-2xl">{stat.icon}</span>
              <span className="font-black text-xl" style={{ color: stat.text }}>
                {stat.value}
              </span>
              <span className="text-white/30 text-xs tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* How it works — only for non-logged in or students */}
        {role !== "teacher" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                step: "01",
                icon: "👨‍🏫",
                title: "Teacher Posts",
                desc: "Teachers create and publish assignments for their class.",
                color: "rgba(99,102,241,0.10)",
                border: "rgba(99,102,241,0.2)",
                text: "#a5b4fc"
              },
              {
                step: "02",
                icon: "🔍",
                title: "Student Finds",
                desc: "Students browse and search for their assigned tasks.",
                color: "rgba(253,224,71,0.07)",
                border: "rgba(253,224,71,0.15)",
                text: "#fde047"
              },
              {
                step: "03",
                icon: "✅",
                title: "Submit & Done",
                desc: "Students submit work and track their progress easily.",
                color: "rgba(34,197,94,0.08)",
                border: "rgba(34,197,94,0.2)",
                text: "#86efac"
              }
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-5 flex flex-col gap-2 border transition-all duration-300 hover:-translate-y-1"
                style={{ background: item.color, borderColor: item.border }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-black tracking-widest uppercase"
                    style={{ color: item.text }}>
                    Step {item.step}
                  </span>
                </div>
                <h3 className="text-white font-black text-base">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Search & Filter */}
        <div
          className="rounded-2xl p-5 mb-8 border border-yellow-300/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/40 text-xs tracking-widest uppercase font-semibold">
              🔎 Search & Filter Assignments
            </p>
            <span className="text-white/20 text-xs">
              {totalAssignments} result{totalAssignments !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <Search />
            <CategoryFilter />
          </div>
        </div>

        {/* Collection */}
        <div
          className="rounded-2xl border border-yellow-300/10 p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white font-black text-lg">
                📋 All Assignments
              </p>
              <p className="text-white/30 text-xs mt-0.5">
                Click on any assignment to view details & submit
              </p>
            </div>
            {role === "teacher" && (
              <Link
                href="/events/create"
                className="text-xs font-black px-4 py-2 rounded-full transition-all hover:scale-105"
                style={{ background: "#fde047", color: "#0f0c29" }}
              >
                + New Assignment
              </Link>
            )}
          </div>

          <Collection
            data={events?.data}
            emptyTitle="No Assignments Found"
            emptyStateSubtext="No assignments have been posted yet. Check back later!"
            collectionType="All_Events"
            limit={9}
            page={page}
            totalPages={events?.totalPages}
          />
        </div>

      </div>

      {/* Footer */}
      <div className="text-center pb-10 mt-auto">
        <p className="text-white/20 text-xs tracking-widest">
          EduAssign Portal · Teachers & Students · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}