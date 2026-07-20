"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { dogs } from "@/lib/data";
import { cn } from "@/lib/utils";

const dogSizes: Record<string, string> = {
  biscuit: "Medium",
  luna: "Medium",
  rocky: "Medium",
  daisy: "Small",
  max: "Large",
  pepper: "Small",
};

const featuredDogs = dogs.slice(0, 6).map((dog, index) => ({
  ...dog,
  image: `/images/puppies/puppy${index + 1}.jpg`,
  size: dogSizes[dog.id] ?? "Medium",
}));

export function FeaturedDogs() {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [activeDog, setActiveDog] = React.useState(featuredDogs[0]?.id);

  React.useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    let animationFrame = 0;

    const updateActiveDog = () => {
      const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-dog-id]"));
      const scrollerRect = scroller.getBoundingClientRect();
      const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
      const closestCard = cards.reduce<HTMLElement | null>((closest, card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        if (!closest) {
          return card;
        }

        const closestRect = closest.getBoundingClientRect();
        const closestCenter = closestRect.left + closestRect.width / 2;

        return Math.abs(cardCenter - scrollerCenter) < Math.abs(closestCenter - scrollerCenter)
          ? card
          : closest;
      }, null);
      const dogId = closestCard?.dataset.dogId;

      if (dogId) {
        setActiveDog(dogId);
      }
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveDog);
    };

    updateActiveDog();
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="bg-[oklch(0.985_0.012_85)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-2xl font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-5xl">
              Ready to meet their person.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Every dog has a different personality, story and ideal home. Meet some of the dogs
              currently waiting for adoption.
            </p>
          </div>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/dogs" />}
            className="w-fit rounded-xl border-[oklch(0.72_0.145_62)]/40 bg-white/70 text-[oklch(0.42_0.07_50)] hover:bg-[oklch(0.92_0.045_80)]"
          >
            View all dogs
          </Button>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 -mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max snap-x snap-mandatory gap-5">
            {featuredDogs.map((dog) => {
              const isActive = activeDog === dog.id;

              return (
                <Link
                  key={dog.id}
                  href={`/adopt/${dog.id}`}
                  data-dog-id={dog.id}
                  className="group relative min-h-[27rem] w-[calc(100vw-2rem)] snap-start overflow-hidden rounded-xl bg-[oklch(0.34_0.04_55)] shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-[oklch(0.72_0.145_62)]/15 sm:min-h-[31rem] sm:w-[22rem]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${dog.image}')` }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.72)_100%)]"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-heading text-4xl font-extrabold tracking-tight">
                          {dog.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-white/82">
                          {dog.age} years old
                        </p>
                      </div>
                      <span className="rounded-full bg-[oklch(0.72_0.145_62)] px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-black/10">
                        {dog.size}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100",
                        isActive && "max-h-40 opacity-100 sm:max-h-0 sm:opacity-0"
                      )}
                    >
                      <p className="max-w-xs text-sm font-medium leading-6 text-white/88">
                        {dog.shortDescription}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-white/88">
                        <span>{dog.gender}</span>
                        <span aria-hidden="true">/</span>
                        <span>{dog.breed}</span>
                      </div>
                      <span className="mt-3 inline-flex text-sm font-extrabold text-[oklch(0.84_0.14_75)]">
                        View full profile
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
