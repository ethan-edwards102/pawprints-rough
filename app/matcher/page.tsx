import type { Metadata } from "next";

import { MatcherApp } from "@/components/matcher/matcher-app";

export const metadata: Metadata = {
  title: "Dog Matcher",
  description: "Answer a few questions and swipe through dogs matched to your lifestyle.",
};

export default function MatcherPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Dog Matcher</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Not sure which dog is right for you? Tell us a little about your life, and we&apos;ll
          deal you a deck of dogs picked for your situation. Swipe right on the ones that steal
          your heart.
        </p>
      </section>

      <section className="mt-10">
        <MatcherApp />
      </section>
    </div>
  );
}
