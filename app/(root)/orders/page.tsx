import Search from "@/components/shared/Search";
import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import Link from "next/link";

interface AggregatedOrderResult {
  _id: string;
  totalAmount: string | number;
  createdAt: string;
  eventTitle: string;
  eventId: string;
  buyer: string;
}

const Orders = async ({
  searchParams
}: {
  searchParams: { eventId?: string; query?: string };
}) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  if (!eventId) {
    return (
      <>
        <section
          className="py-8 md:py-12"
          style={{
            background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 100%)"
          }}
        >
          <div className="wrapper max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-yellow-300 text-xs tracking-[0.4em] uppercase font-bold mb-2">
                🎓 Teacher Panel
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                Submission <span className="text-yellow-300">Orders</span>
              </h1>
              <p className="text-white/40 max-w-2xl mx-auto text-sm">
                Select an assignment from the event page to view its submissions
                here.
              </p>
            </div>
          </div>
        </section>

        <section
          className="wrapper max-w-6xl mx-auto px-4 pb-12 pt-10"
          style={{ minHeight: "40vh" }}
        >
          <div
            className="rounded-2xl p-12 text-center border border-yellow-300/10"
            style={{
              background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
            }}
          >
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-white font-black text-xl mb-2">
              No Assignment Selected
            </h3>
            <p className="text-white/40 text-sm max-w-md mx-auto mb-6">
              Go to an assignment and click "View Orders" to see student
              submissions here.
            </p>
            <Link href="/events">
              <button
                className="px-6 py-2.5 rounded-xl font-black text-black text-sm"
                style={{ background: "#fde047" }}
              >
                📚 Browse Assignments
              </button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <>
      <section
        className="py-8 md:py-12"
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 100%)"
        }}
      >
        <div className="wrapper max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-yellow-300 text-xs tracking-[0.4em] uppercase font-bold mb-2">
              🎓 Teacher Panel
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Submission <span className="text-yellow-300">Orders</span>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto text-sm">
              Review and manage all student submissions for this assignment
            </p>
          </div>
          <div
            className="rounded-2xl p-4 border border-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <Search placeholder="Search by student name..." />
          </div>
        </div>
      </section>

      <section className="wrapper max-w-6xl mx-auto px-4 pb-12 pt-8">
        {orders && orders.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center border border-white/10"
            style={{
              background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
            }}
          >
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-white font-black text-xl mb-2">
              No Submissions Yet
            </h3>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              No students have submitted this assignment yet. Check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders &&
              orders.map((row: AggregatedOrderResult) => (
                <div
                  key={row._id}
                  className="rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-300/20 transition-all"
                  style={{
                    background:
                      "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-black font-black text-lg"
                            style={{ background: "#fde047" }}
                          >
                            {row.buyer.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-white font-black text-base">
                              {row.eventTitle}
                            </h3>
                            <p className="text-white/40 text-xs font-mono">
                              ID: #{row._id.substring(0, 8).toUpperCase()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">
                              Student
                            </p>
                            <p className="text-white/80 text-sm font-semibold">
                              {row.buyer}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">
                              Submitted On
                            </p>
                            <p className="text-white/80 text-sm font-semibold">
                              {formatDateTime(new Date(row.createdAt)).dateOnly}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">
                              Marks Obtained
                            </p>
                            <p className="text-yellow-300 text-sm font-black">
                              {formatPrice(row.totalAmount.toString())}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: "rgba(34,197,94,0.12)",
                            border: "1px solid rgba(34,197,94,0.3)",
                            color: "#86efac"
                          }}
                        >
                          ✅ Submitted
                        </span>
                        <Link href={`/orders/${row._id}`}>
                          <button
                            className="px-5 py-2 rounded-xl font-black text-black text-sm hover:scale-[1.02] transition-all"
                            style={{ background: "#fde047" }}
                          >
                            View Details →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Orders;
