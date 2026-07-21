import type { Metadata } from "next";
import Link from "next/link";
import {
  Bath,
  Bone,
  Clock,
  HeartPulse,
  Home,
  PawPrint,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { MuttMotelBookingForm } from "@/components/mutt-motel-booking-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Mutt Motel",
  description:
    "Mutt Motel is Paw Prints' home-away-from-home dog boarding. Safe, supervised care while you're away — book a stay online.",
};

const features = [
  {
    icon: Home,
    title: "Comfortable rooms",
    description:
      "Clean, climate-controlled kennels and suites with soft bedding, so your dog rests easy every night.",
  },
  {
    icon: PawPrint,
    title: "Daily play & walks",
    description:
      "Supervised group play, individual attention, and at least two walks a day in our secure garden.",
  },
  {
    icon: HeartPulse,
    title: "Trained carers",
    description:
      "Our team are experienced dog handlers who can manage feeding schedules, medication, and special diets.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & secure",
    description:
      "Fully fenced grounds, 24/7 on-site supervision, and a vet on call for total peace of mind.",
  },
  {
    icon: Bath,
    title: "Grooming add-ons",
    description:
      "Send your pup home fresh with an optional bath and brush-out before pick-up.",
  },
  {
    icon: Sparkles,
    title: "Daily updates",
    description:
      "Get a photo and a short note each day so you can see just how much fun they're having.",
  },
];

const rooms = [
  {
    name: "Cosy Kennel",
    price: "R220",
    blurb: "A snug indoor kennel with bedding, daily walks, and group play. Perfect for easy-going dogs.",
  },
  {
    name: "Deluxe Suite",
    price: "R340",
    blurb: "A roomy private suite with a raised bed, extra playtime, and a bedtime treat.",
    featured: true,
  },
  {
    name: "Luxury Play Loft",
    price: "R480",
    blurb: "Our largest space with a window view, premium bedding, one-on-one enrichment, and a daily photo update.",
  },
];

const steps = [
  {
    title: "Book online",
    description: "Fill in the booking form with your dates and your dog's details.",
  },
  {
    title: "We confirm",
    description: "Our team checks availability and emails you drop-off details within a day.",
  },
  {
    title: "Drop off & relax",
    description: "Bring your pup in, and we'll take it from there — updates included.",
  },
];

export default function MuttMotelPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          <Bone className="size-4" /> Dog boarding by Paw Prints
        </span>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          The Mutt Motel
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Going away? Give your best friend a holiday of their own. The Mutt Motel is our
          home-away-from-home boarding service — safe, supervised, and full of play — so you
          can travel knowing your dog is in loving hands. Every booking helps fund our rescue
          work.
        </p>
        <div className="mt-6">
          <a
            href="#book"
            className="inline-flex h-11 items-center justify-center rounded-[1.15rem] bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-[oklch(0.66_0.15_58)]"
          >
            Book a stay
          </a>
        </div>
      </section>

      {/* What's included */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          What&apos;s included
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardHeader>
                <feature.icon className="size-6 text-primary" />
                <CardTitle className="pt-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Rooms & pricing */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold tracking-tight">Rooms &amp; rates</h2>
        <p className="mt-2 text-muted-foreground">
          Prices are per night and include meals, walks, and playtime.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {rooms.map((room) => (
            <Card
              key={room.name}
              className={
                room.featured
                  ? "h-full ring-2 ring-primary"
                  : "h-full"
              }
            >
              <CardHeader>
                {room.featured ? (
                  <span className="mb-1 inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Most popular
                  </span>
                ) : null}
                <CardTitle>{room.name}</CardTitle>
                <p className="pt-1">
                  <span className="text-3xl font-bold">{room.price}</span>
                  <span className="text-sm text-muted-foreground"> / night</span>
                </p>
                <CardDescription className="pt-1">{room.blurb}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold tracking-tight">How it works</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border bg-card p-5">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary">
                {index + 1}
              </div>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Booking form */}
      <section className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <MuttMotelBookingForm />

        <aside className="space-y-4">
          <div className="rounded-xl border bg-muted/40 p-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <Clock className="size-4 text-primary" /> Good to know
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Drop-off and pick-up daily between 8am and 6pm.</li>
              <li>• Bring your dog&apos;s usual food to avoid an upset tummy.</li>
              <li>• Proof of up-to-date vaccinations is required at drop-off.</li>
              <li>• A 50% deposit secures your booking once confirmed.</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5 text-sm text-muted-foreground">
            Questions about a stay?{" "}
            <Link
              href="/"
              className="font-medium text-primary underline underline-offset-2"
            >
              Get in touch
            </Link>{" "}
            and our team will happily help.
          </div>
        </aside>
      </section>
    </div>
  );
}
