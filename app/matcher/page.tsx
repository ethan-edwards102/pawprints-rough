import type { Metadata } from "next";

import { MatcherApp } from "@/components/matcher/matcher-app";

export const metadata: Metadata = {
  title: "Dog Matcher",
  description: "Answer a few questions and swipe through dogs matched to your lifestyle.",
};

export default function MatcherPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <section className="mx-auto max-w-4xl text-center">
        <span className="rounded-full border border-[oklch(0.72_0.145_62)]/30 px-3 py-1 text-xs font-bold text-[oklch(0.62_0.14_58)]">
          Dog Matcher
        </span>
        <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-[oklch(0.28_0.035_55)] sm:text-6xl lg:text-7xl">
          Find a dog that fits your life.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Not sure which dog is right for you? Tell us a little about your life, and we&apos;ll
          deal you a deck of dogs picked for your situation. Swipe right on the ones that steal
          your heart.
        </p>
      </section>

      <section className="mt-12">
        <MatcherApp />
      </section>
    </div>
  );
}
