import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";

import { VolunteerSignupForm } from "@/components/volunteer-signup-form";
import { Badge } from "@/components/ui/badge";
import { volunteerEvents } from "@/lib/data";

export function generateStaticParams() {
  return volunteerEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata(props: PageProps<"/volunteer/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const event = volunteerEvents.find((e) => e.id === id);
  return { title: event ? `${event.title} — Volunteer` : "Event not found" };
}

export default async function VolunteerEventPage(props: PageProps<"/volunteer/[id]">) {
  const { id } = await props.params;
  const event = volunteerEvents.find((e) => e.id === id);
  if (!event) notFound();

  const isFull = event.spotsTaken >= event.spotsTotal;
  const spotsLeft = event.spotsTotal - event.spotsTaken;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/volunteer"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All events
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{event.title}</h1>
        <Badge variant={isFull ? "outline" : "secondary"}>
          {isFull ? "Fully booked" : `${spotsLeft} spots left`}
        </Badge>
      </div>

      <dl className="mt-6 grid gap-3 rounded-xl border bg-card p-5 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2.5">
          <CalendarDays className="size-4 text-primary" />
          <div>
            <dt className="text-xs text-muted-foreground">When</dt>
            <dd className="font-medium">{event.date}</dd>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="size-4 text-primary" />
          <div>
            <dt className="text-xs text-muted-foreground">Time</dt>
            <dd className="font-medium">{event.time}</dd>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin className="size-4 text-primary" />
          <div>
            <dt className="text-xs text-muted-foreground">Where</dt>
            <dd className="font-medium">{event.location}</dd>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Users className="size-4 text-primary" />
          <div>
            <dt className="text-xs text-muted-foreground">Volunteers</dt>
            <dd className="font-medium">
              {event.spotsTaken} / {event.spotsTotal} signed up
            </dd>
          </div>
        </div>
      </dl>

      <p className="mt-6 text-muted-foreground">{event.description}</p>

      <div className="mt-8">
        {isFull ? (
          <p className="rounded-xl border bg-muted p-5 text-sm text-muted-foreground">
            This event is fully booked. Check the{" "}
            <Link href="/volunteer" className="font-medium text-primary underline underline-offset-2">
              events page
            </Link>{" "}
            for other ways to help.
          </p>
        ) : (
          <VolunteerSignupForm eventTitle={event.title} />
        )}
      </div>
    </div>
  );
}
