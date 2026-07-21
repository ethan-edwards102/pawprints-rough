"use client";

import * as React from "react";
import Image from "next/image";
import { Bath, ChevronLeft, ChevronRight, Home, PawPrint } from "lucide-react";

const slides = [
  {
    image: "/images/puppies/puppy2.jpg",
    icon: Home,
    title: "Comfortable rooms",
    description:
      "Clean, climate-controlled kennels and suites with soft bedding, so your dog rests easy every night.",
  },
  {
    image: "/images/puppies/puppy4.jpg",
    icon: PawPrint,
    title: "Daily play & walks",
    description:
      "Supervised group play, individual attention, and at least two walks a day in our secure garden.",
  },
  {
    image: "/images/puppies/puppy5.jpg",
    icon: Bath,
    title: "Trained carers",
    description:
      "Experienced dog handlers who manage feeding schedules, medication, and special diets with care.",
  },
];

export function MuttMotelSlider() {
  const [active, setActive] = React.useState(0);

  const go = React.useCallback((next: number) => {
    setActive((next + slides.length) % slides.length);
  }, []);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <div className="relative h-[26rem] overflow-hidden rounded-[1.4rem] shadow-2xl shadow-black/10 ring-1 ring-[oklch(0.89_0.025_80)] sm:h-[32rem]">
      {slides.map((slide, index) => {
        const Icon = slide.icon;
        return (
          <div
            key={slide.title}
            className={[
              "absolute inset-0 transition-opacity duration-700",
              index === active ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            aria-hidden={index === active ? undefined : true}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.18)_46%,rgba(0,0,0,0.78)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                <Icon className="size-4" /> What&apos;s included
              </span>
              <h3 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white drop-shadow sm:text-4xl">
                {slide.title}
              </h3>
              <p className="mt-2 max-w-md text-sm font-medium leading-6 text-white/85">
                {slide.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(active - 1)}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[oklch(0.28_0.035_55)] shadow-lg backdrop-blur transition-colors hover:bg-white"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => go(active + 1)}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[oklch(0.28_0.035_55)] shadow-lg backdrop-blur transition-colors hover:bg-white"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => go(index)}
            aria-label={`Show ${slide.title}`}
            aria-current={index === active}
            className={[
              "h-2 rounded-full transition-all",
              index === active ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
