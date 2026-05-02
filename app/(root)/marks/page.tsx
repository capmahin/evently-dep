import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MarksClient from "@/components/shared/MarksClient";
import { getAllOrders } from "@/lib/actions/order.actions";

export default async function MarksPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const role = user?.unsafeMetadata?.role;
  if (role !== "teacher") redirect("/");

  const result = await getAllOrders();
  const orders = result?.data ?? [];

  return (
    <section
      className="min-h-screen py-10 px-4"
      style={{
        background:
          "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 40%, #0f0c29 100%)"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-yellow-300 text-xs tracking-[0.4em] uppercase font-bold mb-3">
            👨‍🏫 Teacher Panel
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Assignment <span className="text-yellow-300">Marks</span>
          </h1>
          <p className="text-white/40 text-sm max-w-xl leading-relaxed">
            Review student submissions and assign marks. Changes are saved instantly to the database.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Submissions", value: orders.length, color: "rgba(253,224,71,0.1)", border: "rgba(253,224,71,0.2)", text: "#fde047" },
            { label: "Pending Review", value: orders.filter((o: any) => !o.totalAmount || o.totalAmount === "0").length, color: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", text: "#fca5a5" },
            { label: "Marked", value: orders.filter((o: any) => o.totalAmount && o.totalAmount !== "0").length, color: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)", text: "#86efac" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 border"
              style={{ background: stat.color, borderColor: stat.border }}
            >
              <p className="text-2xl font-black" style={{ color: stat.text }}>
                {stat.value}
              </p>
              <p className="text-white/40 text-xs mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <MarksClient orders={orders} />
      </div>
    </section>
  );
}