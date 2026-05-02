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

  // Deadline check
  const now = new Date();
  const deadline = new Date(event.endDateTime);
  const isExpired = deadline < now;
  const daysLeft = Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      className="group relative flex min-h-[420px] w-full max-w-[380px] flex-col overflow-hidden rounded-2xl border border-yellow-300/10 hover:border-yellow-300/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-300/5"
      style={{
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
      }}
    >
      {/* ── Cover Image ── */}
      <div className="relative h-48 w-full overflow-hidden">
        <Link href={`/events/${event._id.toString()}`}>
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-black/20 to-transparent" />
        </Link>

        {/* Teacher edit/delete actions */}
        {isEventCreator && !hidePrice && (
          <div
            className="absolute right-3 top-3 flex gap-2 rounded-xl p-1.5 backdrop-blur-sm"
            style={{
              background: "rgba(26,26,46,0.85)",
              border: "1px solid rgba(253,224,71,0.2)"
            }}
          >
            <Link
              href={`/events/${event._id.toString()}/update`}
              className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-yellow-300/10 transition-colors"
              title="Edit Assignment"
            >
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={14}
                height={14}
                className="opacity-60 hover:opacity-100"
              />
            </Link>
            <DeleteConfirmation eventId={event._id.toString()} />
          </div>
        )}

        {/* Marks / Free badge */}
        {!hidePrice && (
          <div className="absolute left-3 top-3">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black"
              style={{
                background: event.isFree
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(253,224,71,0.15)",
                border: event.isFree
                  ? "1px solid rgba(34,197,94,0.3)"
                  : "1px solid rgba(253,224,71,0.3)",
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
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: isExpired
                ? "rgba(239,68,68,0.15)"
                : "rgba(99,102,241,0.15)",
              border: isExpired
                ? "1px solid rgba(239,68,68,0.3)"
                : "1px solid rgba(99,102,241,0.3)",
              color: isExpired ? "#fca5a5" : "#a5b4fc"
            }}
          >
            {isExpired ? "⏰ Expired" : `⏳ ${daysLeft}d left`}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-5">
        {/* Category + Date */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {event.category?.name && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{
                background: "rgba(253,224,71,0.08)",
                border: "1px solid rgba(253,224,71,0.15)",
                color: "#fde047"
              }}
            >
              🏷️ {event.category.name}
            </span>
          )}
          <span className="text-white/30 text-xs">
            {formatDateTime(event.startDateTime).dateOnly}
          </span>
        </div>

        {/* Title */}
        <Link href={`/events/${event._id.toString()}`}>
          <h3 className="text-white font-black text-lg leading-tight line-clamp-2 mb-2 hover:text-yellow-300 transition-colors duration-200">
            {event.title}
          </h3>
        </Link>

        {/* Description */}
        {event.description && (
          <p className="text-white/40 text-sm line-clamp-2 mb-4 leading-relaxed">
            {event.description}
          </p>
        )}

        {/* Deadline row */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)"
          }}
        >
          <span className="text-sm">📅</span>
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest">
              Deadline
            </p>
            <p className="text-white/70 text-xs font-semibold">
              {formatDateTime(event.endDateTime).dateOnly} ·{" "}
              {formatDateTime(event.endDateTime).timeOnly}
            </p>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="mt-auto pt-4 border-t border-white/5">
          {hasOrderLink ? (
            <Link href={`/orders/create?eventId=${event._id.toString()}`}>
              <Button
                className="w-full mb-3 rounded-xl font-black text-black text-sm tracking-wide border-0 hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-yellow-300/20"
                style={{ background: "#fde047" }}
              >
                📋 Submit Assignment →
              </Button>
            </Link>
          ) : (
            <div className="flex gap-2 mb-3">
              <Link href={`/events/${event._id.toString()}`} className="flex-1">
                <Button
                  className="w-full rounded-xl text-sm font-bold border-0 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)"
                  }}
                >
                  View Details
                </Button>
              </Link>
              <Link
                href={`/orders/create?eventId=${event._id.toString()}`}
                className="flex-1"
              >
                <Button
                  className="w-full rounded-xl font-black text-black text-sm border-0 transition-all duration-200 hover:scale-[1.02] shadow-lg"
                  style={{ background: "#fde047" }}
                >
                  Submit →
                </Button>
              </Link>
            </div>
          )}

          {/* Teacher info */}
          <div className="flex items-center gap-3 mt-1">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-sm"
              style={{
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(99,102,241,0.3)",
                color: "#a5b4fc"
              }}
            >
              {event.organizer.firstName?.[0] || "T"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/70 text-sm font-semibold truncate">
                {event.organizer.firstName} {event.organizer.lastName}
              </p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest flex items-center gap-1">
                <span>👨‍🏫</span> Teacher
              </p>
            </div>

            {/* Creator badge */}
            {isEventCreator && (
              <span
                className="text-[10px] font-bold px-2 py-1 rounded-full shrink-0"
                style={{
                  background: "rgba(253,224,71,0.1)",
                  border: "1px solid rgba(253,224,71,0.2)",
                  color: "#fde047"
                }}
              >
                You
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
