import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FeaturedDogs } from "@/components/featured-dogs";
import { SuccessStories } from "@/components/success-stories";

const waysToHelp = [
  {
    title: "Foster",
    href: "/volunteer",
    image: "/images/puppies/puppy2.jpg",
    detail:
      "Open your home temporarily and give a dog the calm, everyday care they need while they wait.",
  },
  {
    title: "Volunteer",
    href: "/volunteer",
    image: "/images/puppies/puppy4.jpg",
    detail:
      "Help with walks, enrichment, events, transport and the behind-the-scenes work that keeps rescue moving.",
  },
  {
    title: "Donate",
    href: "/donate",
    image: "/images/puppies/puppy6.jpg",
    detail:
      "Fund food, veterinary care, safe shelter and second chances for the dogs who need us most.",
  },
];

const heroMarqueeItems = [
  "Rescue and rehabilitation",
  "Adoption support",
  "Volunteer powered",
  "Dogs currently in care",
  "Rehomed since 2012",
  "Donation funded",
];

const adoptionSteps = [
  {
    number: "01",
    title: "Explore",
    icon: "/images/icons/magnifying-glass.png",
    detail:
      "Browse the dogs currently available and learn about their personalities, needs and ideal homes.",
  },
  {
    number: "02",
    title: "Apply",
    icon: "/images/icons/document.png",
    detail:
      "Complete a short application so the team can understand your household, lifestyle and experience with dogs.",
  },
  {
    number: "03",
    title: "Meet",
    icon: "/images/icons/handshake.png",
    detail:
      "Meet the dog, spend time together and complete the home and compatibility assessment.",
  },
  {
    number: "04",
    title: "Take them home",
    icon: "/images/icons/dog-paw.png",
    detail:
      "Once the match is approved, complete the adoption and welcome your new companion home.",
  },
];

const rescueJourneyCards = [
  {
    number: "01",
    title: "Rescue",
    image: "/images/puppies/puppy2.jpg",
    cardClassName: "bg-[oklch(0.72_0.145_62)] text-white",
    copyClassName: "text-white/88",
    detail:
      "We respond to reports of abandoned, neglected and stray dogs, bringing them into safety and assessing their immediate needs.",
  },
  {
    number: "02",
    title: "Recover",
    image: "/images/puppies/puppy4.jpg",
    cardClassName: "bg-[oklch(0.28_0.035_55)] text-white",
    copyClassName: "text-white/86",
    detail:
      "Each dog receives veterinary care, nutrition, sterilisation and the time needed to regain their physical strength.",
  },
  {
    number: "03",
    title: "Rebuild trust",
    image: "/images/puppies/puppy5.jpg",
    cardClassName: "bg-[oklch(0.94_0.03_82)] text-[oklch(0.28_0.035_55)]",
    copyClassName: "text-[oklch(0.36_0.045_55)]",
    detail:
      "Patient handling, enrichment and behavioural support help dogs feel safe around people and prepare for family life.",
  },
  {
    number: "04",
    title: "Rehome",
    image: "/images/puppies/puppy6.jpg",
    cardClassName: "bg-white text-[oklch(0.28_0.035_55)] ring-1 ring-[oklch(0.89_0.025_80)]",
    copyClassName: "text-muted-foreground",
    detail:
      "Once a dog is ready, Paw Prints carefully matches them with a household suited to their temperament, needs and energy level.",
  },
];

const galleryColumns = [
  [
    "/images/puppies/puppy1.jpg",
    "/images/puppies/puppy4.jpg",
    "/images/heroImg.jpg",
    "/images/puppies/puppy2.jpg",
  ],
  [
    "/images/heroImg.jpg",
    "/images/puppies/puppy3.jpg",
    "/images/puppies/puppy6.jpg",
    "/images/puppies/puppy5.jpg",
  ],
  [
    "/images/puppies/puppy2.jpg",
    "/images/puppies/puppy5.jpg",
    "/images/puppies/puppy1.jpg",
    "/images/heroImg.jpg",
  ],
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-svh overflow-hidden bg-[oklch(0.32_0.05_55)] text-white">
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.16)_42%,rgba(0,0,0,0.36)_100%),linear-gradient(135deg,rgba(59,112,168,0.85)_0%,rgba(196,143,87,0.72)_48%,rgba(41,67,53,0.82)_100%)] bg-cover bg-[position:center_78%] sm:bg-[position:center_80%] lg:bg-[position:center_76%]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.16) 42%, rgba(0,0,0,0.38) 100%), url('/images/heroImg.jpg')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.32)_100%)]" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 pb-28 pt-32 text-center sm:pb-32 sm:pt-40">
          <h1 className="max-w-4xl font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-md sm:text-6xl lg:text-7xl">
            Every dog deserves somewhere to belong.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/86 drop-shadow sm:text-lg">
            We rescue, rehabilitate and rehome abandoned dogs, giving each one the care and time
            they need to begin again.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/dogs" />}
              className="h-11 min-w-40 rounded-xl bg-[oklch(0.72_0.145_62)] px-6 text-white shadow-lg shadow-black/15 hover:bg-[oklch(0.66_0.15_58)]"
            >
              Meet the dogs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 min-w-40 rounded-xl border-white/35 bg-black/10 px-6 text-white shadow-lg shadow-black/10 backdrop-blur-md hover:bg-white/14 hover:text-white"
              nativeButton={false}
              render={<Link href="/donate" />}
            >
              Support Paw Prints
            </Button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden bg-[oklch(0.72_0.145_62)] py-4 text-white">
          <div className="hero-marquee flex w-max items-center gap-9 whitespace-nowrap">
            {[...heroMarqueeItems, ...heroMarqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-9 font-heading text-lg font-extrabold tracking-tight sm:text-xl"
              >
                {item}
                <span className="size-2 rounded-full bg-white/80" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <FeaturedDogs />

      {/* Adoption process */}
      <section id="adoption-process" className="bg-[oklch(0.985_0.012_85)]">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
          <div className="max-w-3xl">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-5xl">
              Finding the right home, not just the first home.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Our adoption process is designed to make sure every dog is matched with a home suited
              to their personality, needs and energy level.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {adoptionSteps.map((step) => (
              <article
                key={step.number}
                className="group relative overflow-hidden rounded-xl bg-white p-6 text-[oklch(0.28_0.035_55)] shadow-sm ring-1 ring-[oklch(0.89_0.025_80)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[oklch(0.72_0.145_62)]/10 sm:p-8"
              >
                <div className="flex min-h-64 flex-col justify-between gap-10">
                  <div className="flex items-start justify-between gap-6">
                    <span className="rounded-full bg-[oklch(0.72_0.145_62)] px-3 py-1 text-sm font-extrabold text-white">
                      {step.number}
                    </span>
                    <div className="flex size-24 items-center justify-center rounded-2xl bg-[oklch(0.72_0.145_62)] shadow-lg shadow-[oklch(0.72_0.145_62)]/20 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-3 group-hover:scale-105">
                      <Image
                        src={step.icon}
                        alt=""
                        width={72}
                        height={72}
                        className="size-16 object-contain drop-shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl font-extrabold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/dogs" />}
              className="h-11 rounded-xl bg-[oklch(0.72_0.145_62)] px-6 text-white shadow-lg shadow-[oklch(0.72_0.145_62)]/20 hover:bg-[oklch(0.66_0.15_58)]"
            >
              View dogs available for adoption
            </Button>
          </div>
        </div>
      </section>

      {/* Rescue journey */}
      <section className="bg-[oklch(0.985_0.012_85)]">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
          <div className="max-w-3xl">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-5xl">
              What a second chance looks like.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Every dog follows a different path, but the goal remains the same: safety, recovery
              and the right home.
            </p>
          </div>

          <div className="mt-10 space-y-6 lg:space-y-10">
            {rescueJourneyCards.map((step, index) => (
              <article
                key={step.number}
                className={[
                  "adoption-story-card group sticky overflow-hidden rounded-[1.4rem] p-6 shadow-2xl shadow-black/10 sm:p-8 lg:min-h-[32rem] lg:p-10",
                  step.cardClassName,
                ].join(" ")}
                style={{ top: `${7 + index * 1.25}rem`, zIndex: 10 + index }}
              >
                <div className="grid min-h-[30rem] gap-8 lg:grid-cols-[0.7fr_1.3fr]">
                  <div className="relative z-10">
                    <span className="font-heading text-7xl font-extrabold leading-none tracking-tight text-current sm:text-8xl">
                      {step.number}
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col">
                    <div className="max-w-xl lg:ml-auto lg:w-full">
                      <h3 className="font-heading text-4xl font-extrabold leading-none tracking-tight sm:text-5xl">
                        {step.title}
                      </h3>
                      <p
                        className={[
                          "mt-5 text-base font-semibold leading-7 sm:text-lg",
                          step.copyClassName,
                        ].join(" ")}
                      >
                        {step.detail}
                      </p>
                    </div>

                    <div className="relative mt-10 min-h-[16rem] overflow-hidden rounded-xl shadow-2xl shadow-black/20 lg:ml-auto lg:mt-auto lg:h-72 lg:w-[88%]">
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/dogs" />}
              className="h-11 rounded-xl bg-[oklch(0.72_0.145_62)] px-6 text-white shadow-lg shadow-[oklch(0.72_0.145_62)]/20 hover:bg-[oklch(0.66_0.15_58)]"
            >
              View dogs available for adoption
            </Button>
          </div>
        </div>
      </section>

      <SuccessStories />

      {/* Ways to help */}
      <section className="bg-[oklch(0.985_0.012_85)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-5xl">
              You do not have to adopt to change a life.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {waysToHelp.map((way) => (
              <Link
                href={way.href}
                key={way.title}
                className="group relative min-h-[26rem] overflow-hidden rounded-xl bg-[oklch(0.28_0.035_55)] text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[oklch(0.72_0.145_62)]/15"
              >
                <Image
                  src={way.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.22)_48%,rgba(0,0,0,0.76)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-heading text-4xl font-extrabold tracking-tight">
                    {way.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/84">
                    {way.detail}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[oklch(0.985_0.012_85)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-5xl">
              Get in touch
            </h2>
            <p className="max-w-md text-base font-medium leading-7 text-muted-foreground lg:justify-self-end">
              Found a stray? Want to visit the shelter? Have a question about adoption? We would
              love to hear from you.
            </p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-[0.95fr_1fr]">
            <div className="relative min-h-[26rem] overflow-hidden rounded-xl bg-[oklch(0.28_0.035_55)] p-8 text-center text-white">
              <Image
                src="/images/heroImg.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover blur-[1px]"
              />
              <div className="absolute inset-0 bg-[oklch(0.28_0.035_55)]/50" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center">
                <p className="max-w-xs font-heading text-4xl font-extrabold leading-tight">
                  Ready to change a life?
                </p>
              </div>
            </div>

            <form className="rounded-xl border border-[oklch(0.89_0.025_80)] bg-white/70 p-6 shadow-sm sm:p-8">
              <div className="grid gap-4">
                <label className="grid gap-2 text-xs font-bold text-[oklch(0.28_0.035_55)]">
                  Name
                  <input className="h-11 rounded-lg border border-[oklch(0.89_0.025_80)] bg-white px-3 text-sm font-medium outline-none focus:border-[oklch(0.72_0.145_62)]" placeholder="Jane Smith" />
                </label>
                <label className="grid gap-2 text-xs font-bold text-[oklch(0.28_0.035_55)]">
                  Email
                  <input className="h-11 rounded-lg border border-[oklch(0.89_0.025_80)] bg-white px-3 text-sm font-medium outline-none focus:border-[oklch(0.72_0.145_62)]" placeholder="jane@example.com" />
                </label>
                <label className="grid gap-2 text-xs font-bold text-[oklch(0.28_0.035_55)]">
                  How can we help?
                  <textarea className="min-h-28 rounded-lg border border-[oklch(0.89_0.025_80)] bg-white px-3 py-3 text-sm font-medium outline-none focus:border-[oklch(0.72_0.145_62)]" placeholder="Tell us what you need..." />
                </label>
                <Button className="mt-2 h-11 rounded-xl bg-[oklch(0.72_0.145_62)] text-white hover:bg-[oklch(0.66_0.15_58)]">
                  Send message
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              { icon: Phone, title: "Call us", detail: "021 555 0148 / 082 555 0199" },
              { icon: Mail, title: "Email us", detail: "hello@pawprints.org.za" },
              { icon: MapPin, title: "Find us", detail: "14 Kennel Lane, Milnerton, Cape Town" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[oklch(0.89_0.025_80)] bg-white/70 p-5 shadow-sm"
              >
                <item.icon className="size-5 text-[oklch(0.72_0.145_62)]" />
                <p className="mt-3 font-heading text-lg font-extrabold">{item.title}</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling dog gallery */}
      <section className="overflow-hidden bg-[oklch(0.985_0.012_85)] px-4 pb-10">
        <div className="mx-auto grid max-w-6xl gap-1 sm:grid-cols-3">
          {galleryColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={[
                "gallery-column hidden gap-1 sm:flex sm:flex-col",
                columnIndex === 1 ? "gallery-column-down" : "gallery-column-up",
              ].join(" ")}
            >
              {[...column, ...column].map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className={[
                    "relative overflow-hidden rounded-lg",
                    index % 3 === 0 ? "h-64" : index % 3 === 1 ? "h-80" : "h-56",
                  ].join(" ")}
                >
                  <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          ))}
          <div className="grid gap-1 sm:hidden">
            {galleryColumns.flat().slice(0, 6).map((src, index) => (
              <div key={`${src}-${index}`} className="relative h-64 overflow-hidden rounded-lg">
                <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[oklch(0.985_0.012_85)] px-4 pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-xl bg-[oklch(0.72_0.145_62)] p-8 text-white sm:p-10 lg:flex-row lg:items-center">
          <h2 className="max-w-2xl font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Their next chapter could begin with you.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button nativeButton={false} render={<Link href="/dogs" />} className="bg-white text-[oklch(0.72_0.145_62)] hover:bg-white/90">
              Meet the dogs
            </Button>
            <Button nativeButton={false} render={<Link href="/donate" />} variant="outline" className="border-white/35 bg-transparent text-white hover:bg-white/14 hover:text-white">
              Donate
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
