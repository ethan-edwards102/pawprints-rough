import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AdoptionForm } from "@/components/adoption-form";
import { Badge } from "@/components/ui/badge";
import { dogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Adopt",
  description: "Apply to adopt a Paw Prints dog.",
};

function dogImage(id: string) {
  const index = dogs.findIndex((dog) => dog.id === id);

  if (index < 0) {
    return "/images/puppies/puppy1.jpg";
  }

  return `/images/puppies/puppy${(index % 6) + 1}.jpg`;
}

export default async function AdoptPage(props: PageProps<"/adopt/[id]">) {
  const { id } = await props.params;
  // Admin-added dogs only exist in browser state in this draft, so fall back
  // to a generic application rather than a 404.
  const dog = dogs.find((d) => d.id === id) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <Link
        href="/dogs"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to all dogs
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          {dog ? (
            <>
              <div className="relative min-h-[34rem] overflow-hidden rounded-xl bg-[oklch(0.34_0.04_55)] shadow-sm">
                <Image
                  src={dogImage(dog.id)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.16)_42%,rgba(0,0,0,0.76)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h1 className="font-heading text-5xl font-extrabold tracking-tight">
                    Adopt {dog.name}
                  </h1>
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-white/82">
                    {dog.breed} / {dog.age} {dog.age === 1 ? "year" : "years"} old
                    <Badge className="bg-[oklch(0.72_0.145_62)] text-white shadow-none">
                      {dog.gender}
                    </Badge>
                  </p>
                  <p className="mt-4 max-w-md text-sm font-medium leading-6 text-white/86">
                    {dog.description}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div>
              <span className="rounded-full border border-[oklch(0.72_0.145_62)]/30 px-3 py-1 text-xs font-bold text-[oklch(0.62_0.14_58)]">
                Adoption
              </span>
              <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-[oklch(0.28_0.035_55)] sm:text-6xl">
                Adoption application
              </h1>
            </div>
          )}
        </div>

        <div>
          <AdoptionForm dogName={dog?.name ?? "your chosen dog"} />
        </div>
      </div>
    </div>
  );
}
