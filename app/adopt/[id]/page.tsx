import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AdoptionForm } from "@/components/adoption-form";
import { DogPhoto } from "@/components/dog-photo";
import { Badge } from "@/components/ui/badge";
import { dogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Adopt",
  description: "Apply to adopt a Paw Prints dog.",
};

export default async function AdoptPage(props: PageProps<"/adopt/[id]">) {
  const { id } = await props.params;
  // Admin-added dogs only exist in browser state in this draft, so fall back
  // to a generic application rather than a 404.
  const dog = dogs.find((d) => d.id === id) ?? null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/dogs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to all dogs
      </Link>

      {dog ? (
        <div className="mt-4 flex items-center gap-4">
          <DogPhoto hue={dog.photoHue} className="size-20 rounded-2xl" iconClassName="size-9" />
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">Adopt {dog.name}</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              {dog.breed} · {dog.age} {dog.age === 1 ? "year" : "years"} old
              <Badge variant="secondary">{dog.gender}</Badge>
            </p>
          </div>
        </div>
      ) : (
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight">
          Adoption application
        </h1>
      )}

      <div className="mt-8">
        <AdoptionForm dogName={dog?.name ?? "your chosen dog"} />
      </div>
    </div>
  );
}
