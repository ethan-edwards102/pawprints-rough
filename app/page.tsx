import Image from "next/image";
import Link from "next/link";
import {
  Dog as DogIcon,
  HandHeart,
  Heart,
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

export default function Home() {
  return (
    <>
      {/* Hero: title + mission statement */}
      <section className="bg-[oklch(0.28_0.035_55)] text-[oklch(0.97_0.015_85)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Every stray deserves a<span className="text-[oklch(0.85_0.16_95)]"> second chance</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Paw Prints Rescue &amp; Rehoming rescues stray and abandoned dogs, restores their
              health and trust, and matches them with loving families. Our mission is simple: no
              dog left behind, no kennel a forever home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link href="/dogs" />}>
                <DogIcon data-icon="inline-start" />
                Meet our dogs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                nativeButton={false} render={<Link href="/donate" />}
              >
                <Heart data-icon="inline-start" />
                Donate
              </Button>
            </div>
          </div>
          <div className="hidden justify-center lg:flex">
            <Image
              src="/logo.png"
              alt="Paw Prints logo"
              width={331}
              height={250}
              priority
              className="w-72 drop-shadow-lg"
            />
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
