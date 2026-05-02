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

  if (userId) {
    const user = await currentUser();
    const role = user?.unsafeMetadata?.role;
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

  return (
    <section
      className="flex flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 40%, #0f0c29 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">

        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-yellow-300 text-xs tracking-[0.4em] uppercase font-bold mb-3">
            📚 All Assignments
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Browse <span className="text-yellow-300">Assignments</span>
          </h1>
          <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
            Find your assignments, submit your work and track your progress — all in one place.
          </p>
        </div>

        {/* Stats Bar */}
        <div
          className="w-full rounded-2xl border border-yellow-300/10 mb-10"
          style={{ background: "rgba(253,224,71,0.03)" }}
        >
          <div className="py-4 grid grid-cols-3 divide-x divide-yellow-300/10">
            {[
              { icon: "📚", value: events?.totalPages ? `${events.data?.length}+` : "0", label: "Assignments" },
              { icon: "🔥", value: "Active", label: "Status" },
              { icon: "🎯", value: "Submit", label: "Your Work" }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-2 gap-0.5">
                <span className="text-xl">{stat.icon}</span>
                <span className="text-yellow-300 font-black text-lg leading-none">{stat.value}</span>
                <span className="text-white/30 text-[11px] tracking-widest uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div
          className="rounded-2xl p-5 mb-8 border border-yellow-300/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <p className="text-white/40 text-xs tracking-widest uppercase font-semibold mb-3">
            🔎 Search & Filter
          </p>
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <Search />
            <CategoryFilter />
          </div>
        </div>

        {/* Assignment Cards */}
        <div
          className="rounded-2xl border border-yellow-300/10 p-6"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/40 text-xs tracking-widest uppercase font-semibold">
              📋 All Assignments
            </p>
            {userId && (
              <Link
                href="/marks"
                className="text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: "rgba(253,224,71,0.1)",
                  color: "#fde047",
                  border: "1px solid rgba(253,224,71,0.2)"
                }}
              >
                View Marks →
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