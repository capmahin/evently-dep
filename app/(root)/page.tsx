import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Hero from "@/components/shared/Hero";
import Search from "@/components/shared/Search";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const { userId } = auth();

  if (userId) {
    const user = await currentUser();
    const role = user?.unsafeMetadata?.role;

    if (!role) {
      redirect("/role-select");
    }
  }

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  });

  return (
    <>
      <section
        id="events"
        className="flex flex-col min-h-screen"
        style={{
          background:
            "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 40%, #0f0c29 100%)"
        }}
      >
        <Hero />

        <div
          className="w-full border-y border-yellow-300/10"
          style={{ background: "rgba(253,224,71,0.03)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-3 divide-x divide-yellow-300/10">
            {[
              { icon: "📚", value: "150+", label: "Assignments" },
              { icon: "👨‍🏫", value: "40+", label: "Teachers" },
              { icon: "🎓", value: "1200+", label: "Students" }
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-2 gap-0.5"
              >
                <span className="text-xl">{stat.icon}</span>
                <span className="text-yellow-300 font-black text-lg leading-none">
                  {stat.value}
                </span>
                <span className="text-white/30 text-[11px] tracking-widest uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
          <div className="text-center mb-10">
            <p className="text-yellow-300 text-xs tracking-[0.4em] uppercase font-bold mb-3">
              📖 Student &amp; Teacher Portal
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Browse <span className="text-yellow-300">Assignments</span>
            </h2>
            <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
              Teachers post assignments, students submit their work — all in one
              place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                step: "01",
                icon: "👨‍🏫",
                title: "Teacher Posts",
                desc: "Teachers create and publish assignments for their class.",
                color: "rgba(99,102,241,0.12)",
                border: "rgba(99,102,241,0.25)",
                text: "#a5b4fc"
              },
              {
                step: "02",
                icon: "🔍",
                title: "Student Finds",
                desc: "Students browse and search for their assigned tasks.",
                color: "rgba(253,224,71,0.08)",
                border: "rgba(253,224,71,0.2)",
                text: "#fde047"
              },
              {
                step: "03",
                icon: "✅",
                title: "Submit & Done",
                desc: "Students submit their work and track their progress.",
                color: "rgba(34,197,94,0.1)",
                border: "rgba(34,197,94,0.25)",
                text: "#86efac"
              }
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-5 flex flex-col gap-2 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: item.color, borderColor: item.border }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="text-xs font-black tracking-widest uppercase"
                    style={{ color: item.text }}
                  >
                    Step {item.step}
                  </span>
                </div>
                <h3 className="text-white font-black text-base">
                  {item.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-5 mb-8 border border-yellow-300/10"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <p className="text-white/40 text-xs tracking-widest uppercase font-semibold mb-3">
              🔎 Search Assignments
            </p>
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <Search />
              <CategoryFilter />
            </div>
          </div>

          <div
            className="rounded-2xl border border-yellow-300/10 p-6"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <Collection
              data={events?.data}
              emptyTitle="No Assignments Found"
              emptyStateSubtext="No assignments have been posted yet. Check back later!"
              collectionType="All_Events"
              limit={6}
              page={page}
              totalPages={events?.totalPages}
            />
          </div>
        </div>

        <div className="text-center pb-10 mt-auto">
          <p className="text-white/20 text-xs tracking-widest">
            EduAssign Portal · Teachers & Students · {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </>
  );
}