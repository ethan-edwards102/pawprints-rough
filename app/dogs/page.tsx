import type { Metadata } from "next";

import { DogsBrowser } from "@/components/dogs/dogs-browser";

export const metadata: Metadata = {
  title: "Our Dogs",
  description: "Browse the dogs currently looking for a home at Paw Prints.",
};

export default function DogsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Meet our dogs</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Every dog below is vaccinated, sterilised and ready for a new family. Click a card to
          learn more, or use the filters to narrow your search. Not sure who suits you? Try the{" "}
          <a href="/matcher" className="font-medium text-primary underline underline-offset-2">
            Dog Matcher
          </a>
          .
        </p>
      </section>

      <section className="mt-8">
        <DogsBrowser />
      </section>
    </div>
  );
}
