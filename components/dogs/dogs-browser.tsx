"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Pencil, Plus, SearchX } from "lucide-react";

import { DogPhoto } from "@/components/dog-photo";
import { DogFormDialog, type DogFormValues } from "@/components/dogs/dog-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <div className="flex flex-wrap items-end gap-3">
        <div className="grid gap-1.5">
          <Label className="text-xs text-muted-foreground">Age</Label>
          <Select
            items={ageItems}
            value={ageFilter}
            onValueChange={(v) => setAgeFilter(v as AgeFilter)}
          >
            <SelectTrigger className="min-w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ageItems).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label className="text-xs text-muted-foreground">Breed</Label>
          <Select
            items={breedItems}
            value={breedFilter}
            onValueChange={(v) => setBreedFilter(v ?? "all")}
          >
            <SelectTrigger className="min-w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(breedItems).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label className="text-xs text-muted-foreground">Gender</Label>
          <Select
            items={genderItems}
            value={genderFilter}
            onValueChange={(v) => setGenderFilter(v ?? "all")}
          >
            <SelectTrigger className="min-w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(genderItems).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="ms-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filtered.length} of {dogs.length} dogs
          </span>
          {isAdmin && (
            <Button onClick={openAdd}>
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
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((dog) => (
            <Card
              key={dog.id}
              className="group cursor-pointer overflow-hidden pt-0 transition-shadow hover:shadow-md hover:ring-1 hover:ring-primary/40"
              onClick={() => openDetails(dog)}
            >
              <div className="relative">
                <DogPhoto hue={dog.photoHue} className="h-44 w-full" />
                {isAdmin && (
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    className="absolute top-2 right-2 opacity-0 shadow transition-opacity group-hover:opacity-100"
                    aria-label={`Edit ${dog.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(dog);
                    }}
                  >
                    <Pencil />
                  </Button>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{dog.name}</CardTitle>
                  <Badge variant="secondary">{dog.gender}</Badge>
                </div>
                <CardDescription>
                  {dog.breed} · {dog.age} {dog.age === 1 ? "year" : "years"} old
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {dog.shortDescription}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Details pop-up */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-md">
          {selected && (
            <>
              <DogPhoto hue={selected.photoHue} className="h-52 w-full" iconClassName="size-20" />
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
