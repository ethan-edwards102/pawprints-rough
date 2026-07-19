import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { volunteerEvents } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Sign up for upcoming Paw Prints volunteer events.",
};

export default function VolunteerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Volunteer with us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Paw Prints runs on volunteers. Whether you can spare a single Saturday for a
          fundraiser or a few hours every week at the shelter, your time directly changes dogs'
          lives. Pick an upcoming event below to get started.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-2xl font-bold tracking-tight">Upcoming events</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {volunteerEvents.map((event) => {
            const isFull = event.spotsTaken >= event.spotsTotal;
            const spotsLeft = event.spotsTotal - event.spotsTaken;

            const card = (
              <Card
                className={cn(
                  "h-full transition-shadow",
                  isFull
                    ? "opacity-55 grayscale"
                    : "cursor-pointer hover:shadow-md hover:ring-1 hover:ring-primary/40"
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle>{event.title}</CardTitle>
                    <Badge variant={isFull ? "outline" : "secondary"} className="shrink-0">
                      {isFull ? "Fully booked" : `${spotsLeft} spots left`}
                    </Badge>
                  </div>
                  <CardDescription className="space-y-1.5 pt-1">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 shrink-0" /> {event.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="size-4 shrink-0" /> {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 shrink-0" /> {event.location}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {event.description}
                </CardContent>
                <CardFooter className="mt-auto text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="size-4" />
                    {event.spotsTaken} / {event.spotsTotal} volunteers signed up
                  </span>
                </CardFooter>
              </Card>
            );

            return isFull ? (
              <div key={event.id} aria-disabled>
                {card}
              </div>
            ) : (
              <Link key={event.id} href={`/volunteer/${event.id}`} className="block">
                {card}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
