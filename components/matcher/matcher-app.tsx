"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, RotateCcw, Sparkles, X } from "lucide-react";

import { DogPhoto } from "@/components/dog-photo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { dogs, type Dog } from "@/lib/data";

const PROFILE_KEY = "pawprints-matcher-profile";

interface MatcherProfile {
  homeType: string;
  activity: string;
  experience: string;
  hasKids: boolean;
  hasOtherPets: boolean;
}

/*
 * Placeholder profile questions — the final list of what the matching AI
 * needs will be refined with Paw Prints. In production these answers are
 * sent to an LLM that ranks dogs from the database; in this draft the deck
 * is simply shuffled.
 */
const homeItems = {
  house: "House with a garden",
  townhouse: "Townhouse / small garden",
  flat: "Flat / apartment",
};
const activityItems = {
  low: "Mostly relaxed — short walks",
  medium: "Moderately active — daily walks",
  high: "Very active — runs, hikes, adventures",
};
const experienceItems = {
  first: "First-time dog owner",
  some: "Had dogs before",
  pro: "Experienced with difficult breeds",
};

const dogSizes: Record<string, string> = {
  biscuit: "Medium",
  luna: "Medium",
  rocky: "Medium",
  daisy: "Small",
  max: "Large",
  pepper: "Small",
  bruno: "Large",
  mila: "Medium",
};

function dogImage(dog: Dog) {
  const index = dogs.findIndex((item) => item.id === dog.id);

  if (index < 0) {
    return "/images/puppies/puppy1.jpg";
  }

  return `/images/puppies/puppy${(index % 6) + 1}.jpg`;
}

function ProfileForm({ onDone }: { onDone: (profile: MatcherProfile) => void }) {
  const [homeType, setHomeType] = React.useState("house");
  const [activity, setActivity] = React.useState("medium");
  const [experience, setExperience] = React.useState("some");
  const [hasKids, setHasKids] = React.useState(false);
  const [hasOtherPets, setHasOtherPets] = React.useState(false);

  const selectTriggerClass =
    "h-11 w-full rounded-xl border-[oklch(0.89_0.025_80)] bg-white px-4 shadow-sm transition-all hover:border-[oklch(0.72_0.145_62)]/45 data-open:border-[oklch(0.72_0.145_62)] data-open:ring-3 data-open:ring-[oklch(0.72_0.145_62)]/15";
  const selectContentClass =
    "rounded-xl border border-[oklch(0.89_0.025_80)] bg-white p-1.5 shadow-xl";
  const selectItemClass = "rounded-lg px-3 py-2.5";

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-stretch">
      <div className="relative min-h-72 overflow-hidden rounded-xl bg-[oklch(0.28_0.035_55)] p-8 text-white lg:min-h-full">
        <Image
          src="/images/dogmacherImg.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.24)_48%,rgba(0,0,0,0.68)_100%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-10">
          <Sparkles className="size-8" />
          <div>
            <h2 className="font-heading text-4xl font-extrabold leading-tight tracking-tight">
              Tell us about yourself.
            </h2>
            <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-white/82">
              Our matcher uses your answers to find dogs that fit your lifestyle. It only takes a
              minute and you can redo it any time.
            </p>
          </div>
        </div>
      </div>
      <div className="py-2 lg:py-0">
        <form
          className="grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            onDone({ homeType, activity, experience, hasKids, hasOtherPets });
          }}
        >
          <div className="grid gap-2">
            <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Where do you live?
            </Label>
            <Select
              items={homeItems}
              value={homeType}
              onValueChange={(v) => setHomeType(v ?? "house")}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {Object.entries(homeItems).map(([value, label]) => (
                  <SelectItem key={value} value={value} className={selectItemClass}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              How active is your lifestyle?
            </Label>
            <Select
              items={activityItems}
              value={activity}
              onValueChange={(v) => setActivity(v ?? "medium")}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {Object.entries(activityItems).map(([value, label]) => (
                  <SelectItem key={value} value={value} className={selectItemClass}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Your experience with dogs
            </Label>
            <Select
              items={experienceItems}
              value={experience}
              onValueChange={(v) => setExperience(v ?? "some")}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {Object.entries(experienceItems).map(([value, label]) => (
                  <SelectItem key={value} value={value} className={selectItemClass}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[oklch(0.89_0.025_80)] bg-[oklch(0.985_0.012_85)] p-4">
            <Label htmlFor="matcher-kids" className="cursor-pointer font-semibold">
              Children in the household?
            </Label>
            <Switch id="matcher-kids" checked={hasKids} onCheckedChange={setHasKids} />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[oklch(0.89_0.025_80)] bg-[oklch(0.985_0.012_85)] p-4">
            <Label htmlFor="matcher-pets" className="cursor-pointer font-semibold">
              Other pets at home?
            </Label>
            <Switch id="matcher-pets" checked={hasOtherPets} onCheckedChange={setHasOtherPets} />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-11 rounded-xl bg-[oklch(0.72_0.145_62)] text-white hover:bg-[oklch(0.66_0.15_58)]"
          >
            <Sparkles data-icon="inline-start" />
            Find my matches
          </Button>
        </form>
      </div>
    </div>
  );
}

function SwipeCard({
  dog,
  onDecision,
}: {
  dog: Dog;
  onDecision: (liked: boolean) => void;
}) {
  const [dx, setDx] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [leaving, setLeaving] = React.useState<null | "left" | "right">(null);
  const startX = React.useRef(0);

  function decide(liked: boolean) {
    setLeaving(liked ? "right" : "left");
    window.setTimeout(() => onDecision(liked), 220);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (leaving) return;
    setDragging(true);
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || leaving) return;
    setDx(e.clientX - startX.current);
  }

  function onPointerUp() {
    if (!dragging || leaving) return;
    setDragging(false);
    if (dx > 90) decide(true);
    else if (dx < -90) decide(false);
    else setDx(0);
  }

  const offset = leaving === "right" ? 720 : leaving === "left" ? -720 : dx;
  const swipeIntensity = Math.min(1, Math.abs(offset) / 140);
  const swipeGlow =
    offset > 8
      ? `0 0 ${24 + swipeIntensity * 34}px rgba(16, 185, 129, ${0.2 + swipeIntensity * 0.32})`
      : offset < -8
        ? `0 0 ${24 + swipeIntensity * 34}px rgba(239, 68, 68, ${0.2 + swipeIntensity * 0.32})`
        : "0 24px 48px rgba(0, 0, 0, 0.10)";
  const swipeRing =
    offset > 8
      ? `0 0 0 ${1 + swipeIntensity * 2}px rgba(16, 185, 129, ${0.3 + swipeIntensity * 0.34})`
      : offset < -8
        ? `0 0 0 ${1 + swipeIntensity * 2}px rgba(239, 68, 68, ${0.3 + swipeIntensity * 0.34})`
        : "0 0 0 0 rgba(0, 0, 0, 0)";

  return (
    <div className="relative mx-auto w-full max-w-3xl select-none">
      <div className="pointer-events-none absolute left-0 top-1/2 z-0 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-extrabold text-red-500 lg:flex">
        <ArrowLeft className="size-4" />
        NO
      </div>
      <div className="pointer-events-none absolute right-0 top-1/2 z-0 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-extrabold text-emerald-600 lg:flex">
        YES
        <ArrowRight className="size-4" />
      </div>
      <div className="mb-4 flex items-center justify-center gap-3 lg:hidden">
        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-extrabold text-red-500">
          <ArrowLeft className="size-3.5" />
          NO
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-600">
          YES
          <ArrowRight className="size-3.5" />
        </span>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-md">
      <div
        className="relative touch-none"
        style={{
          transform: `translateX(${offset}px) rotate(${offset / 18}deg)`,
          opacity: leaving ? 0 : 1,
          transition: dragging
            ? "none"
            : "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="group relative min-h-[34rem] cursor-grab overflow-hidden rounded-xl bg-[oklch(0.34_0.04_55)] active:cursor-grabbing"
          style={{ boxShadow: `${swipeGlow}, ${swipeRing}` }}
        >
          <Image
            src={dogImage(dog)}
            alt=""
            fill
            sizes="448px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.2)_42%,rgba(0,0,0,0.78)_100%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="font-heading text-5xl font-extrabold tracking-tight">
                  {dog.name}
                </h2>
                <p className="mt-1 text-sm font-semibold text-white/82">
                  {dog.age} {dog.age === 1 ? "year" : "years"} old
                </p>
              </div>
              <span className="rounded-full bg-[oklch(0.72_0.145_62)] px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-black/10">
                {dogSizes[dog.id] ?? "Medium"}
              </span>
            </div>
            <div className="mt-4">
              <p className="max-w-sm text-sm font-medium leading-6 text-white/88">
                {dog.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-white/88">
                <span>{dog.gender}</span>
                <span aria-hidden="true">/</span>
                <span>{dog.breed}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe hint overlays */}
        <div
          className="pointer-events-none absolute top-6 left-6 rotate-[-12deg] rounded-lg border-2 border-emerald-400 bg-emerald-400/10 px-3 py-1 font-heading text-xl font-extrabold text-emerald-300 backdrop-blur"
          style={{ opacity: Math.max(0, Math.min(1, offset / 90)) }}
        >
          MATCH
        </div>
        <div
          className="pointer-events-none absolute top-6 right-6 rotate-[12deg] rounded-lg border-2 border-red-400 bg-red-500/10 px-3 py-1 font-heading text-xl font-extrabold text-red-300 backdrop-blur"
          style={{ opacity: Math.max(0, Math.min(1, -offset / 90)) }}
        >
          PASS
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-6">
        <Button
          size="icon-lg"
          className="size-14 rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
          aria-label={`Match with ${dog.name}`}
          onClick={() => decide(true)}
        >
          <Heart className="size-6" />
        </Button>
        <Button
          variant="outline"
          size="icon-lg"
          className="size-14 rounded-full border-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
          aria-label={`Pass on ${dog.name}`}
          onClick={() => decide(false)}
        >
          <X className="size-6" />
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Swipe right to match, left to pass — or use the buttons.
      </p>
      </div>
    </div>
  );
}

export function MatcherApp() {
  const [loaded, setLoaded] = React.useState(false);
  const [profile, setProfile] = React.useState<MatcherProfile | null>(null);
  const [queue, setQueue] = React.useState<Dog[]>(dogs);
  const [liked, setLiked] = React.useState<Dog[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (stored) setProfile(JSON.parse(stored));
    } catch {
      // corrupted mock storage — start fresh
    }
    setLoaded(true);
  }, []);

  function saveProfile(p: MatcherProfile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    setProfile(p);
    // In production the profile is sent to the matching LLM here; the draft
    // just shuffles the deck to simulate a personalised order.
    setQueue([...dogs].sort(() => Math.random() - 0.5));
    setLiked([]);
  }

  function resetProfile() {
    localStorage.removeItem(PROFILE_KEY);
    setProfile(null);
    setQueue(dogs);
    setLiked([]);
  }

  function handleDecision(likedIt: boolean) {
    const current = queue[0];
    if (!current) return;
    if (likedIt) setLiked((prev) => [...prev, current]);
    setQueue((prev) => prev.slice(1));
  }

  if (!loaded) return null;

  if (!profile) {
    return <ProfileForm onDone={saveProfile} />;
  }

  const current = queue[0];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {current
            ? `${queue.length} ${queue.length === 1 ? "dog" : "dogs"} left in your matched deck`
            : "You've seen every match!"}
        </p>
        <Button variant="ghost" size="sm" onClick={resetProfile}>
          <RotateCcw data-icon="inline-start" />
          Redo my profile
        </Button>
      </div>

      {current ? (
        <SwipeCard key={current.id} dog={current} onDecision={handleDecision} />
      ) : (
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl bg-[oklch(0.72_0.145_62)] p-6 text-white sm:p-8">
            <span className="rounded-full bg-white/16 px-3 py-1 text-xs font-extrabold">
              Match summary
            </span>
            <h2 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {liked.length > 0
                ? `You matched with ${liked.length} ${liked.length === 1 ? "dog" : "dogs"}.`
                : "No matches this round."}
            </h2>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/84 sm:text-base">
              {liked.length > 0
                ? "These are the dogs you said yes to. Open a profile to take the next step, or redo your profile for a fresh deck."
                : "That is completely okay. Try a new profile mix, or browse every dog waiting for a home."}
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {liked.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {liked.map((dog) => (
                  <Link
                    key={dog.id}
                    href={`/adopt/${dog.id}`}
                    className="group relative min-h-72 overflow-hidden rounded-xl bg-[oklch(0.34_0.04_55)] shadow-sm transition-shadow hover:shadow-xl hover:shadow-[oklch(0.72_0.145_62)]/15"
                  >
                    <Image
                      src={dogImage(dog)}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.18)_44%,rgba(0,0,0,0.76)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <h3 className="font-heading text-3xl font-extrabold tracking-tight">
                            {dog.name}
                          </h3>
                          <p className="mt-1 text-xs font-bold text-white/76">
                            {dog.breed} / {dog.age} {dog.age === 1 ? "year" : "years"}
                          </p>
                        </div>
                        <span className="rounded-full bg-[oklch(0.72_0.145_62)] px-3 py-1.5 text-xs font-bold text-white">
                          View profile
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[oklch(0.985_0.012_85)] p-6 text-center">
                <p className="font-heading text-2xl font-extrabold text-[oklch(0.28_0.035_55)]">
                  Let&apos;s try another mix.
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Small changes to home type, activity level or experience can reveal a very
                  different set of dogs.
                </p>
              </div>
            )}

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={resetProfile}
                variant="outline"
                className="h-11 rounded-xl border-[oklch(0.72_0.145_62)]/40 bg-white"
              >
                <RotateCcw data-icon="inline-start" />
                Redo my profile
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/dogs" />}
                className="h-11 rounded-xl bg-[oklch(0.72_0.145_62)] text-white hover:bg-[oklch(0.66_0.15_58)]"
              >
                Browse all dogs
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
