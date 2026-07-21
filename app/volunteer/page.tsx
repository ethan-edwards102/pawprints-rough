import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";

import { VolunteerEvents } from "@/components/volunteer/volunteer-events";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Sign up for upcoming Paw Prints volunteer events.",
};

const bentoImages = [
  { src: "/images/heroImg.jpg", className: "col-span-2 row-span-2" },
  {
    src: "/images/puppies/puppy2.jpg",
    className: "col-span-1 row-span-2 sm:col-span-2 sm:row-span-1",
  },
  {
    src: "/images/puppies/puppy3.jpg",
    className: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-1",
  },
  { src: "/images/puppies/puppy4.jpg", className: "col-span-1 row-span-1" },
  {
    src: "/images/puppies/puppy5.jpg",
    className: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/puppies/puppy6.jpg",
    className: "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2",
  },
];

export default function VolunteerPage() {
  return (
    <div className="bg-[oklch(0.985_0.012_85)]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:pb-20 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* LHS: heading + subtext */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.72_0.145_62)]/12 px-3.5 py-1.5 text-sm font-bold text-[oklch(0.55_0.14_55)]">
              <HeartHandshake className="size-4" /> Volunteer with Paw Prints
            </span>
            <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-[oklch(0.28_0.035_55)] sm:text-6xl lg:text-7xl">
              Give a few hours, change a life.
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-muted-foreground sm:text-lg">
              Paw Prints runs on volunteers. Whether you can spare a single Saturday for a
              fundraiser or a few hours every week at the shelter, your time directly shapes a
              dog&apos;s recovery — from walks and enrichment to the events that find them
              homes. No experience needed, just a love of dogs.
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.72_0.145_62)]">
                  120+
                </p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  active volunteers
                </p>
              </div>
              <div>
                <p className="font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.72_0.145_62)]">
                  2,400
                </p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  hours given last year
                </p>
              </div>
              <div>
                <p className="font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.72_0.145_62)]">
                  310
                </p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  dogs rehomed since 2012
                </p>
              </div>
            </div>
          </div>

          {/* RHS: bento grid of dog photos */}
          <div className="grid auto-rows-[7.5rem] grid-cols-2 gap-3 sm:grid-cols-4 lg:auto-rows-[8.5rem]">
            {bentoImages.map((image, index) => (
              <div
                key={image.src}
                className={[
                  "group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-[oklch(0.89_0.025_80)]",
                  image.className,
                ].join(" ")}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:pb-24">
        <VolunteerEvents />
      </section>
    </div>
  );
}
