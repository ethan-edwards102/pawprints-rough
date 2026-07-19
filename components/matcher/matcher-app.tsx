"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, RotateCcw, Sparkles, X } from "lucide-react";

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

function ProfileForm({ onDone }: { onDone: (profile: MatcherProfile) => void }) {
  const [homeType, setHomeType] = React.useState("house");
  const [activity, setActivity] = React.useState("medium");
  const [experience, setExperience] = React.useState("some");
  const [hasKids, setHasKids] = React.useState(false);
  const [hasOtherPets, setHasOtherPets] = React.useState(false);

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Tell us about yourself
        </CardTitle>
        <CardDescription>
          Our matcher uses your answers to find dogs that fit your lifestyle. It only takes a
          minute — you can redo it any time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            onDone({ homeType, activity, experience, hasKids, hasOtherPets });
          }}
        >
          <div className="grid gap-2">
            <Label>Where do you live?</Label>
            <Select
              items={homeItems}
              value={homeType}
              onValueChange={(v) => setHomeType(v ?? "house")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(homeItems).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>How active is your lifestyle?</Label>
            <Select
              items={activityItems}
              value={activity}
              onValueChange={(v) => setActivity(v ?? "medium")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(activityItems).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Your experience with dogs</Label>
            <Select
              items={experienceItems}
              value={experience}
              onValueChange={(v) => setExperience(v ?? "some")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(experienceItems).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <Label htmlFor="matcher-kids" className="cursor-pointer">
              Children in the household?
            </Label>
            <Switch id="matcher-kids" checked={hasKids} onCheckedChange={setHasKids} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <Label htmlFor="matcher-pets" className="cursor-pointer">
              Other pets at home?
            </Label>
            <Switch id="matcher-pets" checked={hasOtherPets} onCheckedChange={setHasOtherPets} />
          </div>
          <Button type="submit" size="lg">
            <Sparkles data-icon="inline-start" />
            Find my matches
          </Button>
        </form>
      </CardContent>
    </Card>
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

  const offset = leaving === "right" ? 480 : leaving === "left" ? -480 : dx;

  return (
    <div className="relative mx-auto w-full max-w-sm select-none">
      <div
        className="relative touch-none"
        style={{
          transform: `translateX(${offset}px) rotate(${offset / 18}deg)`,
          opacity: leaving ? 0 : 1,
          transition: dragging ? "none" : "transform 0.22s ease, opacity 0.22s ease",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Card className="cursor-grab gap-0 overflow-hidden py-0 active:cursor-grabbing">
          <DogPhoto hue={dog.photoHue} className="h-72 w-full" iconClassName="size-24" />
          <div className="grid gap-2 p-5">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-2xl font-bold">{dog.name}</h2>
              <span className="text-lg text-muted-foreground">{dog.age}</span>
              <Badge variant="secondary" className="ms-auto">
                {dog.gender}
              </Badge>
            </div>
            <p className="text-sm font-medium text-primary">{dog.breed}</p>
            <p className="text-sm text-muted-foreground">{dog.description}</p>
          </div>
        </Card>

        {/* Swipe hint overlays */}
        <div
          className="pointer-events-none absolute top-6 left-6 rotate-[-12deg] rounded-lg border-2 border-emerald-500 px-3 py-1 font-heading text-xl font-bold text-emerald-500"
          style={{ opacity: Math.max(0, Math.min(1, offset / 90)) }}
        >
          ADOPT
        </div>
        <div
          className="pointer-events-none absolute top-6 right-6 rotate-[12deg] rounded-lg border-2 border-destructive px-3 py-1 font-heading text-xl font-bold text-destructive"
          style={{ opacity: Math.max(0, Math.min(1, -offset / 90)) }}
        >
          PASS
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-6">
        <Button
          variant="outline"
          size="icon-lg"
          className="size-14 rounded-full border-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Pass on ${dog.name}`}
          onClick={() => decide(false)}
        >
          <X className="size-6" />
        </Button>
        <Button
          size="icon-lg"
          className="size-14 rounded-full"
          aria-label={`Like ${dog.name}`}
          onClick={() => decide(true)}
        >
          <Heart className="size-6" />
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Swipe right to like, left to pass — or use the buttons.
      </p>
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
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle>
              {liked.length > 0 ? `You liked ${liked.length} ${liked.length === 1 ? "dog" : "dogs"}!` : "No likes this round"}
            </CardTitle>
            <CardDescription>
              {liked.length > 0
                ? "Start an adoption application, or redo your profile for a fresh deck."
                : "Redo your profile to shuffle a fresh deck, or browse all dogs instead."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {liked.map((dog) => (
              <div key={dog.id} className="flex items-center gap-3 rounded-xl border p-3">
                <DogPhoto hue={dog.photoHue} className="size-14 rounded-lg" iconClassName="size-7" />
                <div className="min-w-0">
                  <p className="font-medium">{dog.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {dog.breed} · {dog.age} {dog.age === 1 ? "year" : "years"}
                  </p>
                </div>
                <Button size="sm" className="ms-auto" nativeButton={false} render={<Link href={`/adopt/${dog.id}`} />}>
                  <Heart data-icon="inline-start" />
                  Adopt
                </Button>
              </div>
            ))}
            {liked.length === 0 && (
              <Button variant="outline" nativeButton={false} render={<Link href="/dogs" />}>
                Browse all dogs
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
