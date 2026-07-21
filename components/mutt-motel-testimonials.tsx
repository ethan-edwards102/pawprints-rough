import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Testimonial = {
  quote: string;
  owner: string;
  dog: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We were nervous leaving Biscuit for a whole week, but the daily photos put us completely at ease. He came home happy, tired, and clearly spoiled rotten.",
    owner: "Thandeka M.",
    dog: "with Biscuit",
    initials: "TM",
  },
  {
    quote:
      "Our old girl needs medication twice a day and the team handled it without a fuss. It's the only place I trust with a senior dog — it really is a home, not a kennel.",
    owner: "James & Priya R.",
    dog: "with Nala",
    initials: "JR",
  },
  {
    quote:
      "Rocky is shy around other dogs, so the one-on-one play sessions were perfect. Knowing our booking also helps rescue dogs made the whole thing feel even better.",
    owner: "Sipho D.",
    dog: "with Rocky",
    initials: "SD",
  },
];

export function MuttMotelTestimonials() {
  return (
    <section className="mt-20">
      <div className="max-w-2xl">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-4xl">
          Tails of happy guests
        </h2>
        <p className="mt-3 text-base font-medium leading-7 text-muted-foreground sm:text-lg">
          Don&apos;t just take our word for it — here&apos;s what pet parents say after their dogs
          check out of the Mutt Motel.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.owner}
            className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[oklch(0.89_0.025_80)]"
          >
            <div className="flex gap-1 text-[oklch(0.72_0.145_62)]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-base leading-7 text-[oklch(0.28_0.035_55)]">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[oklch(0.72_0.145_62)]/15 font-bold text-[oklch(0.72_0.145_62)]">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <p className="font-heading font-bold text-[oklch(0.28_0.035_55)]">
                  {testimonial.owner}
                </p>
                <p className="text-sm text-muted-foreground">{testimonial.dog}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
