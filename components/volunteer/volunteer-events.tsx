"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Pencil, Plus, Tag } from "lucide-react";

import {
  EventFormDialog,
  type EventFormValues,
} from "@/components/volunteer/event-form-dialog";
import { SignupFormDialog } from "@/components/volunteer/signup-form-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { volunteerEvents as initialEvents, type VolunteerEvent } from "@/lib/data";

function eventImage(event: VolunteerEvent) {
  const index = initialEvents.findIndex((item) => item.id === event.id);
  const position = index < 0 ? 0 : index;
  return `/images/puppies/puppy${(position % 6) + 1}.jpg`;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Pull a short month + day out of a human-readable date like "Saturday, 5 September 2026". */
function eventDateParts(date: string) {
  const monthMatch = MONTHS.find((month) =>
    date.toLowerCase().includes(month.toLowerCase())
  );
  const dayMatch = date.match(/\b(\d{1,2})\b/);
  return {
    month: monthMatch ? monthMatch.slice(0, 3).toUpperCase() : "",
    day: dayMatch ? dayMatch[1] : "",
  };
}

export function VolunteerEvents() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [events, setEvents] = React.useState<VolunteerEvent[]>(initialEvents);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<VolunteerEvent | null>(null);

  const [signupOpen, setSignupOpen] = React.useState(false);
  const [signupEvent, setSignupEvent] = React.useState<VolunteerEvent | null>(null);

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(event: VolunteerEvent) {
    setEditing(event);
    setFormOpen(true);
  }

  function openSignup(event: VolunteerEvent) {
    setSignupEvent(event);
    setSignupOpen(true);
  }

  function handleFormSubmit(values: EventFormValues) {
    if (editing) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editing.id
            ? { ...e, ...values, spotsTaken: Math.min(e.spotsTaken, values.spotsTotal) }
            : e
        )
      );
    } else {
      const newEvent: VolunteerEvent = {
        id: `new-${Date.now()}`,
        spotsTaken: 0,
        ...values,
      };
      setEvents((prev) => [newEvent, ...prev]);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-5xl">
            Upcoming events
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Pick an event to lend a hand. Fully booked events are shown greyed out — new dates
            are added often, so check back soon.
          </p>
        </div>
        {isAdmin && (
          <Button onClick={openAdd} className="h-11 rounded-xl bg-[oklch(0.72_0.145_62)] px-5 text-white shadow-lg shadow-[oklch(0.72_0.145_62)]/20 hover:bg-[oklch(0.66_0.15_58)]">
            <Plus data-icon="inline-start" />
            Add event
          </Button>
        )}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const isFull = event.spotsTaken >= event.spotsTotal;
          const spotsLeft = event.spotsTotal - event.spotsTaken;

          const { month, day } = eventDateParts(event.date);

          const card = (
            <article
              className={[
                "group relative flex h-full flex-col rounded-3xl bg-white p-3 shadow-sm ring-1 ring-[oklch(0.89_0.025_80)] transition-all duration-300",
                isFull
                  ? "opacity-60 grayscale"
                  : "hover:-translate-y-1 hover:shadow-xl hover:shadow-[oklch(0.72_0.145_62)]/10",
              ].join(" ")}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                <Image
                  src={eventImage(event)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {isAdmin && (
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    className="absolute right-3 top-3 z-20 opacity-0 shadow transition-opacity group-hover:opacity-100"
                    aria-label={`Edit ${event.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openEdit(event);
                    }}
                  >
                    <Pencil />
                  </Button>
                )}
              </div>

              <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
                <div className="flex gap-4">
                  {/* Date block */}
                  <div className="shrink-0 text-center leading-none">
                    <p className="font-heading text-xs font-bold uppercase tracking-widest text-[oklch(0.72_0.145_62)]">
                      {month || "TBC"}
                    </p>
                    <p className="mt-1 font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.72_0.145_62)]">
                      {day || "—"}
                    </p>
                  </div>

                  {/* Divider */}
                  <div
                    className="w-px self-stretch bg-[oklch(0.89_0.025_80)]"
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="min-w-0 truncate">{event.location}</span>
                    </p>
                    <h3 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)]">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {event.description}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Clock className="size-3.5 shrink-0" />
                      {event.time}
                    </p>
                  </div>
                </div>

                {/* Footer tag line */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="size-4 shrink-0" />
                    {isFull ? (
                      <span className="font-semibold">Fully booked</span>
                    ) : (
                      <span>
                        <span className="font-bold text-[oklch(0.28_0.035_55)]">
                          {spotsLeft}
                        </span>{" "}
                        of {event.spotsTotal} spots left
                      </span>
                    )}
                  </span>
                  {!isFull && (
                    <span className="inline-flex items-center gap-1 text-sm font-extrabold text-[oklch(0.72_0.145_62)]">
                      Sign up
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </div>
            </article>
          );

          return isFull ? (
            <div key={event.id} aria-disabled>
              {card}
            </div>
          ) : (
            <button
              key={event.id}
              type="button"
              onClick={() => openSignup(event)}
              className="block w-full text-left"
            >
              {card}
            </button>
          );
        })}
      </div>

      <EventFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        event={editing}
        onSubmit={handleFormSubmit}
      />

      <SignupFormDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        event={signupEvent}
      />
    </div>
  );
}
