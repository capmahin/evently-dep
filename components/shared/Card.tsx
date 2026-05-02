import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Button } from "../ui/button";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  const now = new Date();
  const deadline = new Date(event.endDateTime);
  const isExpired = deadline < now;
  const daysLeft = Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isUrgent = !isExpired && daysLeft <= 3;

  return (
    <div
      className="group relative flex min-h-[440px] w-full max-w-[380px] flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        background: "linear-gradient(160deg, #1e1b4b 0%, #1a1a2e 40%, #0f172a 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
      }}
    >
      {/* Animated glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(253,224,71,0.04), transparent 40%)",
          border: "1px solid rgba(253,224,71,0.15)"
        }}
      />

      {/* ── Cover Image ── */}
      <div className="relative h-52 w-full overflow-hidden rounded-t-3xl">
        <Link href={`/events/${event._id.toString()}`}>
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Multi-layer gradient */}
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #1a1a2e 0%, rgba(26,26,46,0.6) 40%, rgba(0,0,0,0.2) 100%)"
            }}
          />
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
              backgroundSize: "200% 100%"
            }}
          />
        </Link>

        {/* Teacher actions */}
        {isEventCreator && !hidePrice && (
          <div
            className="absolute right-3 top-3 flex gap-1.5 rounded-2xl p-1.5 backdrop-blur-md transition-all duration-300"
            style={{
              background: "rgba(15,12,41,0.8)",
              border: "1px solid rgba(253,224,71,0.2)"
            }}
          >
            <Link
              href={`/events/${event._id.toString()}/update`}
              className="flex items-center justify-center w-7 h-7 rounded-xl hover:bg-yellow-300/15 transition-all duration-200"
              title="Edit"
            >
              <Image src="/assets/icons/edit.svg" alt="edit" width={13} height={13} className="opacity-60 hover:opacity-100" />
            </Link>
            <DeleteConfirmation eventId={event._id.toString()} />
          </div>
        )}

        {/* Marks badge */}
        {!hidePrice && (
          <div className="absolute left-3 top-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black backdrop-blur-sm"
              style={{
                background: event.isFree ? "rgba(34,197,94,0.2)" : "rgba(253,224,71,0.2)",
                border: event.isFree ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(253,224,71,0.4)",
                color: event.isFree ? "#86efac" : "#fde047"
              }}
            >
              {event.isFree ? "📋 No Marks" : `🎯 ${event.price} Marks`}
            </span>
          </div>
        )}

        {/* Deadline badge */}
        <div className="absolute right-3 bottom-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${isUrgent ? "animate-pulse" : ""}`}
            style={{
              background: isExpired
                ? "rgba(239,68,68,0.2)"
                : isUrgent
                ? "rgba(251,146,60,0.2)"
                : "rgba(99,102,241,0.2)",
              border: isExpired
                ? "1px solid rgba(239,68,68,0.4)"
                : isUrgent
                ? "1px solid rgba(251,146,60,0.4)"
                : "1px solid rgba(99,102,241,0.4)",
              color: isExpired ? "#fca5a5" : isUrgent ? "#fdba74" : "#a5b4fc"
            }}
          >
            {isExpired ? "⏰ Expired" : isUrgent ? `🔥 ${daysLeft}d left!` : `⏳ ${daysLeft}d left`}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-5">

        {/* Category + Date row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {event.category?.name && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
              style={{
                background: "rgba(253,224,71,0.08)",
                border: "1px solid rgba(253,224,71,0.12)",
                color: "#fde047"
              }}
            >
              🏷️ {event.category.name}
            </span>
          )}
          <span className="text-white/25 text-[11px] ml-auto">
            {formatDateTime(event.startDateTime).dateOnly}
          </span>
        </div>

        {/* Title */}
        <Link href={`/events/${event._id.toString()}`}>
          <h3 className="text-white font-black text-lg leading-snug line-clamp-2 mb-2 group-hover:text-yellow-300 transition-colors duration-300">
            {event.title}
          </h3>
        </Link>

        {/* Description */}
        {event.description && (
          <p className="text-white/35 text-sm line-clamp-2 mb-4 leading-relaxed">
            {event.description}
          </p>
        )}

        {/* Deadline info box */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl mb-4 transition-all duration-300 group-hover:border-white/10"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)"
          }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <span className="text-sm">📅</span>
          </div>
          <div>
            <p className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5">Deadline</p>
            <p className="text-white/70 text-xs font-bold">
              {formatDateTime(event.endDateTime).dateOnly} · {formatDateTime(event.endDateTime).timeOnly}
            </p>
          </div>
          {isUrgent && !isExpired && (
            <span
              className="ml-auto text-[10px] font-black px-2 py-1 rounded-full animate-pulse"
              style={{ background: "rgba(251,146,60,0.15)", color: "#fdba74", border: "1px solid rgba(251,146,60,0.3)" }}
            >
              URGENT
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />

        {/* Actions */}
        <div className="mt-auto">
          {hasOrderLink ? (
            <Link href={`/orders/create?eventId=${event._id.toString()}`}>
              <button
                className="w-full mb-3 py-3 rounded-2xl font-black text-black text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #fde047 0%, #facc15 100%)",
                  boxShadow: "0 4px 15px rgba(253,224,71,0.2)"
                }}
              >
                📋 Submit Assignment →
              </button>
            </Link>
          ) : (
            <div className="flex gap-2 mb-3">
              <Link href={`/events/${event._id.toString()}`} className="flex-1">
                <button
                  className="w-full py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.6)"
                  }}
                >
                  Details
                </button>
              </Link>
              <Link href={`/orders/create?eventId=${event._id.toString()}`} className="flex-1">
                <button
                  className="w-full py-2.5 rounded-2xl font-black text-black text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #fde047 0%, #facc15 100%)",
                    boxShadow: "0 4px 15px rgba(253,224,71,0.15)"
                  }}
                >
                  Submit →
                </button>
              </Link>
            </div>
          )}

          {/* Teacher info */}
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)"
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-sm"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1))",
                border: "1px solid rgba(99,102,241,0.3)",
                color: "#a5b4fc"
              }}
            >
              {event.organizer.firstName?.[0]?.toUpperCase() || "T"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/70 text-sm font-bold truncate">
                {event.organizer.firstName} {event.organizer.lastName}
              </p>
              <p className="text-white/25 text-[10px] uppercase tracking-widest">
                👨‍🏫 Teacher
              </p>
            </div>
            {isEventCreator && (
              <span
                className="text-[10px] font-black px-2.5 py-1 rounded-full shrink-0"
                style={{
                  background: "rgba(253,224,71,0.12)",
                  border: "1px solid rgba(253,224,71,0.25)",
                  color: "#fde047"
                }}
              >
                ✦ You
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;