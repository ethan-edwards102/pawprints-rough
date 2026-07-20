import Link from "next/link";
import {
  Dog as DogIcon,
  HandHeart,
  Home as HomeIcon,
  Mail,
  MapPin,
  Phone,
  Quote,
  Stethoscope,
} from "lucide-react";

import { DogPhoto } from "@/components/dog-photo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adopterStories } from "@/lib/data";

const activities = [
  {
    icon: DogIcon,
    title: "Rescue",
    detail:
      "We respond to reports of stray, abandoned and mistreated dogs across the Cape metro, bringing them to safety at our Milnerton shelter.",
  },
  {
    icon: Stethoscope,
    title: "Rehabilitate",
    detail:
      "Every rescue is vaccinated, sterilised and given the veterinary and behavioural care they need to be ready for a new family.",
  },
  {
    icon: HomeIcon,
    title: "Rehome",
    detail:
      "We carefully match dogs with adopters — over 1,400 dogs have found their forever homes with us since 2012.",
  },
  {
    icon: HandHeart,
    title: "Reach out",
    detail:
      "We run free sterilisation drives and school programmes to tackle the stray problem at its root.",
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

      {/* Values strip */}
      <section className="border-b bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-center sm:grid-cols-3">
          <div>
            <p className="font-heading text-3xl font-bold text-primary">1,400+</p>
            <p className="text-sm text-muted-foreground">dogs rehomed since 2012</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">60</p>
            <p className="text-sm text-muted-foreground">dogs in our care right now</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground">volunteer-run, donation-funded</p>
          </div>
        </div>
      </section>

      {/* Adopter stories */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold tracking-tight">Adopter stories</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The best part of our work is the happy endings. Here are three of them.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {adopterStories.map((story) => (
            <Card key={story.id} className="overflow-hidden pt-0">
              <DogPhoto hue={story.photoHue} className="h-40 w-full" />
              <CardHeader>
                <CardTitle>
                  {story.adopter} &amp; {story.dogName}
                </CardTitle>
                <CardDescription className="flex gap-2">
                  <Quote className="size-4 shrink-0 text-primary" />
                  <span className="italic">{story.quote}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{story.detail}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What Paw Prints does */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight">What Paw Prints does</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            From the first rescue call to the final tail-wagging goodbye, we walk every step with
            our dogs.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => (
              <Card key={activity.title}>
                <CardHeader>
                  <span className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <activity.icon className="size-5" />
                  </span>
                  <CardTitle>{activity.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {activity.detail}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight">Get in touch</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Found a stray? Want to visit the shelter? Have a question about adoption? We would
              love to hear from you.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Phone className="size-4" />
                </span>
                021&nbsp;555&nbsp;0148 (emergencies: 082&nbsp;555&nbsp;0199)
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Mail className="size-4" />
                </span>
                hello@pawprints.org.za
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <MapPin className="size-4" />
                </span>
                14 Kennel Lane, Milnerton, Cape Town
              </li>
            </ul>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Ready to change a life?</CardTitle>
              <CardDescription>
                Adoption, volunteering or a donation — every bit of help finds a dog a home.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button nativeButton={false} render={<Link href="/dogs" />}>Browse dogs</Button>
              <Button variant="secondary" nativeButton={false} render={<Link href="/volunteer" />}>
                Volunteer
              </Button>
              <Button variant="outline" nativeButton={false} render={<Link href="/donate" />}>
                Donate
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
