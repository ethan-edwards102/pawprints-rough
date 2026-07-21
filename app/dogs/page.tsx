import type { Metadata } from "next";

import { DogsBrowser } from "@/components/dogs/dogs-browser";

export const metadata: Metadata = {
  title: "Our Dogs",
  description: "Browse the dogs currently looking for a home at Paw Prints.",
};

export default function DogsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <section className="max-w-4xl">
        <span className="rounded-full border border-[oklch(0.72_0.145_62)]/30 px-3 py-1 text-xs font-bold text-[oklch(0.62_0.14_58)]">
          Available dogs
        </span>
        <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-[oklch(0.28_0.035_55)] sm:text-6xl lg:text-7xl">
          Meet the dogs waiting for their person.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Every dog below is vaccinated, sterilised and ready for a new family. Click a card to
          learn more, or use the filters to narrow your search. Not sure who suits you? Try the{" "}
          <a href="/matcher" className="font-medium text-primary underline underline-offset-2">
            Dog Matcher
          </a>
          .
        </p>
      </section>

      <section className="mt-10">
        <DogsBrowser />
      </section>
    </div>
  );
}
