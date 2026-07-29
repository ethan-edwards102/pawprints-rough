import type { Metadata } from "next";

import { MatcherApp } from "@/components/matcher/matcher-app";

export const metadata: Metadata = {
  title: "Dog Matcher",
  description: "Answer a few questions and swipe through dogs matched to your lifestyle.",
};

export default function MatcherPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      {/* The about copy is the matcher's first stage, so it lives in the app and
          gives its space back once the flow moves on. */}
      <MatcherApp />
    </div>
  );
}
