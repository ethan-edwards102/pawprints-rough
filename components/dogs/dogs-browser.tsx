"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Pencil, Plus, SearchX } from "lucide-react";

import { DogFormDialog, type DogFormValues } from "@/components/dogs/dog-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth";
import { dogs as initialDogs, type Dog } from "@/lib/data";

type AgeFilter = "all" | "puppy" | "adult" | "senior";

const ageItems: Record<AgeFilter, string> = {
  all: "Any age",
  puppy: "Puppy (under 2)",
  adult: "Adult (2 – 6)",
  senior: "Senior (7+)",
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
  const index = initialDogs.findIndex((item) => item.id === dog.id);

  if (index < 0) {
    return "/images/puppies/puppy1.jpg";
  }

  return `/images/puppies/puppy${(index % 6) + 1}.jpg`;
}

function matchesAge(dog: Dog, filter: AgeFilter) {
  switch (filter) {
    case "puppy":
      return dog.age < 2;
    case "adult":
      return dog.age >= 2 && dog.age <= 6;
    case "senior":
      return dog.age >= 7;
    default:
      return true;
  }
}

export function DogsBrowser() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [dogs, setDogs] = React.useState<Dog[]>(initialDogs);
  const [ageFilter, setAgeFilter] = React.useState<AgeFilter>("all");
  const [breedFilter, setBreedFilter] = React.useState("all");
  const [genderFilter, setGenderFilter] = React.useState("all");

  const [selected, setSelected] = React.useState<Dog | null>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Dog | null>(null);

  const breeds = React.useMemo(
    () => Array.from(new Set(dogs.map((d) => d.breed))).sort(),
    [dogs]
  );
  const breedItems = React.useMemo(
    () => ({ all: "Any breed", ...Object.fromEntries(breeds.map((b) => [b, b])) }),
    [breeds]
  );
  const genderItems = { all: "Any gender", Male: "Male", Female: "Female" };

  const filtered = dogs.filter(
    (dog) =>
      matchesAge(dog, ageFilter) &&
      (breedFilter === "all" || dog.breed === breedFilter) &&
      (genderFilter === "all" || dog.gender === genderFilter)
  );

  function openDetails(dog: Dog) {
    setSelected(dog);
    setDetailsOpen(true);
  }

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(dog: Dog) {
    setEditing(dog);
    setFormOpen(true);
  }

  function handleFormSubmit(values: DogFormValues) {
    if (editing) {
      setDogs((prev) =>
        prev.map((d) => (d.id === editing.id ? { ...d, ...values } : d))
      );
    } else {
      const newDog: Dog = {
        id: `new-${Date.now()}`,
        photoHue: Math.floor(Math.random() * 90),
        ...values,
      };
      setDogs((prev) => [newDog, ...prev]);
    }
  }

  return (
    <div>
      {/* Filters + admin controls */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="grid gap-2">
          <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Age</Label>
          <Select
            items={ageItems}
            value={ageFilter}
            onValueChange={(v) => setAgeFilter(v as AgeFilter)}
          >
            <SelectTrigger className="h-11 min-w-44 rounded-xl border-[oklch(0.89_0.025_80)] bg-white px-4 shadow-sm transition-all hover:border-[oklch(0.72_0.145_62)]/45 data-open:border-[oklch(0.72_0.145_62)] data-open:ring-3 data-open:ring-[oklch(0.72_0.145_62)]/15">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-[oklch(0.89_0.025_80)] bg-white p-1.5 shadow-xl">
              {Object.entries(ageItems).map(([value, label]) => (
                <SelectItem key={value} value={value} className="rounded-lg px-3 py-2.5">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Breed</Label>
          <Select
            items={breedItems}
            value={breedFilter}
            onValueChange={(v) => setBreedFilter(v ?? "all")}
          >
            <SelectTrigger className="h-11 min-w-52 rounded-xl border-[oklch(0.89_0.025_80)] bg-white px-4 shadow-sm transition-all hover:border-[oklch(0.72_0.145_62)]/45 data-open:border-[oklch(0.72_0.145_62)] data-open:ring-3 data-open:ring-[oklch(0.72_0.145_62)]/15">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-[oklch(0.89_0.025_80)] bg-white p-1.5 shadow-xl">
              {Object.entries(breedItems).map(([value, label]) => (
                <SelectItem key={value} value={value} className="rounded-lg px-3 py-2.5">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Gender</Label>
          <Select
            items={genderItems}
            value={genderFilter}
            onValueChange={(v) => setGenderFilter(v ?? "all")}
          >
            <SelectTrigger className="h-11 min-w-40 rounded-xl border-[oklch(0.89_0.025_80)] bg-white px-4 shadow-sm transition-all hover:border-[oklch(0.72_0.145_62)]/45 data-open:border-[oklch(0.72_0.145_62)] data-open:ring-3 data-open:ring-[oklch(0.72_0.145_62)]/15">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-[oklch(0.89_0.025_80)] bg-white p-1.5 shadow-xl">
              {Object.entries(genderItems).map(([value, label]) => (
                <SelectItem key={value} value={value} className="rounded-lg px-3 py-2.5">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="ms-auto flex items-center gap-3 self-end">
          <span className="rounded-full bg-[oklch(0.94_0.03_82)] px-3 py-2 text-sm font-semibold text-muted-foreground">
            {filtered.length} of {dogs.length} dogs
          </span>
          {isAdmin && (
            <Button onClick={openAdd} className="h-11 rounded-xl px-4">
              <Plus data-icon="inline-start" />
              Add dog
            </Button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-2 rounded-xl border border-dashed p-12 text-center text-muted-foreground">
          <SearchX className="size-8" />
          <p>No dogs match those filters — try widening your search.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dog) => (
            <button
              key={dog.id}
              type="button"
              className="group relative min-h-[29rem] overflow-hidden rounded-xl bg-[oklch(0.34_0.04_55)] text-left shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-[oklch(0.72_0.145_62)]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.145_62)]"
              onClick={() => openDetails(dog)}
            >
              <Image
                src={dogImage(dog)}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.72)_100%)]"
                aria-hidden="true"
              />
              {isAdmin && (
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="absolute right-3 top-3 z-20 opacity-0 shadow transition-opacity group-hover:opacity-100"
                  aria-label={`Edit ${dog.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(dog);
                  }}
                >
                  <Pencil />
                </Button>
              )}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-4xl font-extrabold tracking-tight">
                      {dog.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-white/82">
                      {dog.age} {dog.age === 1 ? "year" : "years"} old
                    </p>
                  </div>
                  <span className="rounded-full bg-[oklch(0.72_0.145_62)] px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-black/10">
                    {dogSizes[dog.id] ?? "Medium"}
                  </span>
                </div>
                <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100">
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
            </button>
          ))}
        </div>
      )}

      {/* Details pop-up */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-md">
          {selected && (
            <>
              <div className="relative h-64 w-full">
                <Image
                  src={dogImage(selected)}
                  alt=""
                  fill
                  sizes="448px"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 p-5 pt-0">
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl">{selected.name}</DialogTitle>
                    <Badge variant="secondary">{selected.gender}</Badge>
                  </div>
                  <DialogDescription>
                    {selected.breed} · {selected.age}{" "}
                    {selected.age === 1 ? "year" : "years"} old
                  </DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">{selected.description}</p>
                <Button size="lg" nativeButton={false} render={<Link href={`/adopt/${selected.id}`} />}>
                  <Heart data-icon="inline-start" />
                  Adopt {selected.name}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Admin add / edit */}
      <DogFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        dog={editing}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
