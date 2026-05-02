"use client";

import { useState } from "react";
import { updateOrderMark } from "@/lib/actions/order.actions";

export default function MarksClient({ orders }: { orders: any[] }) {
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const handleSave = async (orderId: string) => {
    const mark = marks[orderId];
    if (!mark) return;
    setSaving((prev) => ({ ...prev, [orderId]: true }));
    await updateOrderMark({ orderId, mark });
    setSaving((prev) => ({ ...prev, [orderId]: false }));
    setSaved((prev) => ({ ...prev, [orderId]: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, [orderId]: false })), 2000);
  };

  if (orders.length === 0) {
    return (
      <div
        className="rounded-2xl border border-yellow-300/10 py-20 text-center"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <p className="text-5xl mb-4">📭</p>
        <p className="text-white/30 text-lg font-bold">No submissions yet</p>
        <p className="text-white/20 text-sm mt-2">
          Students have not submitted any assignments yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden border border-yellow-300/10"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-white/10"
        style={{ background: "rgba(255,255,255,0.03)" }}>
        {["Student", "Assignment", "Roll / ID", "Submitted", "Marks"].map((h) => (
          <p key={h} className="text-white/30 text-[11px] uppercase tracking-widest font-bold">
            {h}
          </p>
        ))}
      </div>

      {/* Rows */}
      {orders.map((order) => {
        const hasMarks = order.totalAmount && order.totalAmount !== "0";
        return (
          <div
            key={order._id}
            className="grid grid-cols-5 gap-4 px-6 py-5 border-b border-white/5 hover:bg-white/5 transition-all items-center"
          >
            {/* Student */}
            <div>
              <p className="text-white font-semibold text-sm">
                {order.buyer?.name ?? "—"}
              </p>
              <p className="text-white/30 text-xs mt-0.5">
                {order.buyer?.email ?? "—"}
              </p>
            </div>

            {/* Assignment */}
            <p className="text-white/70 text-sm leading-snug">
              {order.event?.title ?? "—"}
            </p>

            {/* Roll */}
            <p className="text-white/50 text-sm">
              {order.buyer?.number ?? "—"}
            </p>

            {/* Date */}
            <div>
              <p className="text-white/40 text-xs">
                {order.createdAt?.slice(0, 10) ?? "—"}
              </p>
              {hasMarks && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 inline-block"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#86efac" }}>
                  ✓ Marked
                </span>
              )}
            </div>

            {/* Marks Input */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={100}
                placeholder={hasMarks ? order.totalAmount : "0–100"}
                value={marks[order._id] ?? ""}
                onChange={(e) =>
                  setMarks((prev) => ({ ...prev, [order._id]: e.target.value }))
                }
                className="w-20 px-3 py-1.5 rounded-lg text-sm text-white font-bold outline-none border border-white/10 bg-white/5 focus:border-yellow-300/50 transition-all"
              />
              <button
                onClick={() => handleSave(order._id)}
                disabled={saving[order._id] || !marks[order._id]}
                className="px-3 py-1.5 rounded-lg text-xs font-black transition-all disabled:opacity-30"
                style={{
                  background: saved[order._id]
                    ? "rgba(34,197,94,0.2)"
                    : "rgba(253,224,71,0.15)",
                  color: saved[order._id] ? "#86efac" : "#fde047",
                  border: `1px solid ${
                    saved[order._id]
                      ? "rgba(34,197,94,0.3)"
                      : "rgba(253,224,71,0.2)"
                  }`
                }}
              >
                {saving[order._id] ? "..." : saved[order._id] ? "✓ Saved" : "Save"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}