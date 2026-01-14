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

  return (
    <div className="group relative flex min-h-[420px] w-full max-w-[380px] flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl hover:scale-[1.02] duration-300">
      {/* Event Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Link href={`/events/${event._id}`}>
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </Link>
        
        {/* Event Creator Actions */}
        {isEventCreator && !hidePrice && (
          <div className="absolute right-3 top-3 flex gap-2 rounded-lg bg-white/90 backdrop-blur-sm p-2 shadow-md">
            <Link 
              href={`/events/${event._id}/update`}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              title="Edit Event"
            >
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={16}
                height={16}
                className="opacity-70"
              />
            </Link>

            <DeleteConfirmation eventId={event._id} />
          </div>
        )}

        {/* Price Badge */}
        {!hidePrice && (
          <div className="absolute left-3 top-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              event.isFree 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Category and Date */}
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-2">
            {event.category?.name && (
              <span className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                {event.category.name}
              </span>
            )}
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {formatDateTime(event.startDateTime).dateOnly}
            </span>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDateTime(event.startDateTime).timeOnly}
          </p>
        </div>

        {/* Event Title */}
        <Link href={`/events/${event._id}`} className="group/title mb-4">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover/title:text-blue-600 transition-colors">
            {event.title}
          </h3>
        </Link>

        {/* Event Description (if available) */}
        {event.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-5">
            {event.description}
          </p>
        )}

        {/* Footer Section */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {event.organizer.firstName?.[0] || 'A'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {event.organizer.firstName} {event.organizer.lastName}
                </p>
                <p className="text-xs text-gray-500">Organizer</p>
              </div>
            </div>

            {/* Action Button */}
            {hasOrderLink ? (
              <Link href={`/orders?eventId=${event._id}`}>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg"
                >
                  View Details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            ) : (
              <Link href={`/events/${event._id}`}>
                <Button 
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Learn More
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;