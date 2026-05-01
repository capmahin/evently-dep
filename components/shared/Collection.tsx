import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string | React.ReactNode;
  emptyStateSubtext?: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName
}: CollectionProps) => {
  // Label based on collection type
  const collectionLabel =
    collectionType === "Events_Organized"
      ? { icon: "👨‍🏫", badge: "Teacher View", sub: "Assignments you created" }
      : collectionType === "My_Tickets"
        ? {
            icon: "🎓",
            badge: "Student View",
            sub: "Your submitted assignments"
          }
        : {
            icon: "📚",
            badge: "All Assignments",
            sub: "Browse all assignments"
          };

  return (
    <>
      {/* Collection Header Badge */}
      <div className="flex items-center gap-3 mb-6 px-1">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{
            background: "rgba(253,224,71,0.12)",
            border: "1px solid rgba(253,224,71,0.2)"
          }}
        >
          {collectionLabel.icon}
        </div>
        <div>
          <p className="text-yellow-300 text-xs tracking-widest uppercase font-bold">
            {collectionLabel.badge}
          </p>
          <p className="text-white/40 text-xs">{collectionLabel.sub}</p>
        </div>
        {data.length > 0 && (
          <div className="ml-auto px-3 py-1 rounded-full text-xs font-bold text-black bg-yellow-300">
            {data.length} {data.length === 1 ? "item" : "items"}
          </div>
        )}
      </div>

      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={String(event._id)} className="flex justify-center">
                  <div
                    className="w-full rounded-2xl overflow-hidden border border-yellow-300/10 hover:border-yellow-300/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-300/5 hover:-translate-y-1 group"
                    style={{
                      background:
                        "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
                    }}
                  >
                    {/* Role tag on each card */}
                    <div className="px-4 pt-3 pb-0 flex items-center gap-2">
                      <span
                        className="text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background:
                            collectionType === "Events_Organized"
                              ? "rgba(99,102,241,0.15)"
                              : collectionType === "My_Tickets"
                                ? "rgba(34,197,94,0.15)"
                                : "rgba(253,224,71,0.12)",
                          color:
                            collectionType === "Events_Organized"
                              ? "#a5b4fc"
                              : collectionType === "My_Tickets"
                                ? "#86efac"
                                : "#fde047",
                          border:
                            collectionType === "Events_Organized"
                              ? "1px solid rgba(99,102,241,0.3)"
                              : collectionType === "My_Tickets"
                                ? "1px solid rgba(34,197,94,0.3)"
                                : "1px solid rgba(253,224,71,0.2)"
                        }}
                      >
                        {collectionType === "Events_Organized"
                          ? "👨‍🏫 Created by you"
                          : collectionType === "My_Tickets"
                            ? "🎓 Submitted"
                            : "📖 Assignment"}
                      </span>
                    </div>

                    <Card
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div
          className="flex flex-col items-center justify-center w-full min-h-[320px] rounded-2xl py-16 text-center border border-yellow-300/10 gap-4"
          style={{
            background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
          }}
        >
          {/* Big icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-2"
            style={{
              background: "rgba(253,224,71,0.08)",
              border: "1px solid rgba(253,224,71,0.15)"
            }}
          >
            {collectionType === "Events_Organized"
              ? "👨‍🏫"
              : collectionType === "My_Tickets"
                ? "🎓"
                : "📚"}
          </div>

          {typeof emptyTitle === "string" ? (
            <>
              <h3 className="text-white font-black text-xl tracking-tight">
                {emptyTitle}
              </h3>
              {emptyStateSubtext && (
                <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                  {emptyStateSubtext}
                </p>
              )}
            </>
          ) : (
            emptyTitle
          )}

          {/* Helpful tip based on role */}
          <div
            className="mt-2 px-5 py-3 rounded-xl text-xs text-white/40 max-w-xs"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)"
            }}
          >
            {collectionType === "Events_Organized"
              ? "💡 As a teacher, create a new assignment to get started."
              : collectionType === "My_Tickets"
                ? "💡 You haven't submitted any assignments yet. Browse available ones!"
                : "💡 No assignments found. Check back later or adjust your filters."}
          </div>

          {/* Decorative dots */}
          <div className="flex gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/10" />
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
