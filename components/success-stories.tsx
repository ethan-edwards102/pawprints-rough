"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { adopterStories } from "@/lib/data";
import { cn } from "@/lib/utils";

const storyImages = [
  "/images/puppies/puppy1.jpg",
  "/images/puppies/puppy3.jpg",
  "/images/puppies/puppy5.jpg",
];

export function SuccessStories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const activeStory = adopterStories[activeIndex];

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? adopterStories.length - 1 : current - 1
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === adopterStories.length - 1 ? 0 : current + 1
    );
  }

  return (
    <section className="bg-[oklch(0.985_0.012_85)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <div>
            <span className="rounded-full border border-[oklch(0.72_0.145_62)]/30 px-3 py-1 text-xs font-bold text-[oklch(0.62_0.14_58)]">
              Stories
            </span>
            <h2 className="mt-5 max-w-xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[oklch(0.28_0.035_55)] sm:text-5xl">
              Real rescues. Real families. Real second chances.
            </h2>
          </div>
          <p className="max-w-md text-base font-medium leading-7 text-muted-foreground lg:justify-self-end">
            Photo updates, calm routines and honest words from families who already trust us with
            their dogs.
          </p>
        </div>

        <div className="mt-10 perspective-dramatic">
          <div className="relative min-h-[39rem] overflow-hidden rounded-xl border border-[oklch(0.89_0.025_80)] bg-white/70 p-3 shadow-sm md:min-h-[25.5rem]">
            {adopterStories.map((story, index) => {
              const position = index - activeIndex;
              const isActive = position === 0;

              return (
              <article
                key={story.id}
                className={cn(
                  "absolute inset-3 grid gap-3 transition-all duration-700 ease-out md:grid-cols-[0.78fr_1.22fr]",
                  isActive
                    ? "translate-x-0 rotate-0 scale-100 opacity-100 shadow-2xl shadow-black/10"
                    : position < 0
                      ? "pointer-events-none -translate-x-[9%] -rotate-2 scale-[0.92] opacity-0"
                      : "pointer-events-none translate-x-[9%] rotate-2 scale-[0.92] opacity-0"
                )}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: position < 0 ? "left center" : "right center",
                }}
                aria-hidden={!isActive}
              >
                <div className="relative min-h-[18rem] overflow-hidden rounded-lg md:min-h-[24rem]">
                  <Image
                    src={storyImages[index % storyImages.length]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-h-[18rem] flex-col justify-between rounded-lg bg-[oklch(0.72_0.145_62)] p-6 text-white md:min-h-[24rem] sm:p-8">
                  <div>
                    <p className="max-w-2xl font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                      “{story.quote}”
                    </p>
                    <p className="mt-5 max-w-xl text-sm font-semibold leading-6 text-white/82">
                      {story.detail}
                    </p>
                  </div>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-heading text-2xl font-extrabold">
                        {story.adopter} &amp; {story.dogName}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white/72">
                        Adopted through Paw Prints
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={showPrevious}
                        aria-label="Previous story"
                        className="text-white hover:bg-white/16 hover:text-white"
                      >
                        <ChevronLeft />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={showNext}
                        aria-label="Next story"
                        className="text-white hover:bg-white/16 hover:text-white"
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
