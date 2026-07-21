import type { Metadata } from "next";
import { Bone } from "lucide-react";

import { MuttMotelBookingForm } from "@/components/mutt-motel-booking-form";
import { MuttMotelFaq } from "@/components/mutt-motel-faq";
import { MuttMotelSlider } from "@/components/mutt-motel-slider";
import { MuttMotelTestimonials } from "@/components/mutt-motel-testimonials";

export const metadata: Metadata = {
  title: "Mutt Motel",
  description:
    "Mutt Motel is Paw Prints' home-away-from-home dog boarding. Safe, supervised care while you're away — book a stay online.",
};

export default function MuttMotelPage() {
  return (
    <div className="bg-[oklch(0.985_0.012_85)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {/* Hero */}
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.72_0.145_62)]/12 px-3 py-1 text-sm font-bold text-[oklch(0.72_0.145_62)]">
              <Bone className="size-4" /> Dog boarding by Paw Prints
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[0.98] tracking-tight text-[oklch(0.28_0.035_55)] sm:text-5xl lg:text-6xl">
              The Mutt Motel
            </h1>
            <p className="mt-5 text-base font-medium leading-7 text-muted-foreground sm:text-lg">
              Going away? Give your best friend a holiday of their own. The Mutt Motel is our
              home-away-from-home boarding service — safe, supervised, and full of play — so
              you can travel knowing your dog is in loving hands. Every booking helps fund our
              rescue work.
            </p>
            <div className="mt-8">
              <a
                href="#book"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[oklch(0.72_0.145_62)] px-7 font-heading text-base font-bold text-white shadow-lg shadow-[oklch(0.72_0.145_62)]/25 transition-all hover:-translate-y-0.5 hover:bg-[oklch(0.66_0.15_58)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[oklch(0.72_0.145_62)]/40"
              >
                <Bone className="size-5" />
                Book a stay
              </a>
            </div>
          </div>

          <MuttMotelSlider />
        </section>

        <MuttMotelTestimonials />

        <MuttMotelFaq />

        {/* Booking */}
        <section id="book" className="mt-20 scroll-mt-24">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-4xl">
              Book a stay
            </h2>
            <p className="mt-3 text-base font-medium leading-7 text-muted-foreground sm:text-lg">
              Start with the dates and how many dogs are coming — you&apos;ll see the price
              straight away, then add the finishing details.
            </p>
          </div>

          <div className="mt-8">
            <MuttMotelBookingForm />
          </div>
        </section>
      </div>
    </div>
  );
}
