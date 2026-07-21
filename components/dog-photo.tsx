import { PawPrint } from "lucide-react";

import { cn } from "@/lib/utils";

/** Placeholder Hues (taken from dogs, adopter stories, blog posts). */
const PLACEHOLDER_HUES = [15, 20, 25, 30, 35, 40, 50, 55, 60, 70, 80, 85, 140, 260];

/**
 * Deterministically picks one of the app's existing placeholder hues from a
 * seed (e.g. a slug or id), so items without a photo still get a stable,
 * on-theme colour instead of always the same one.
 */
export function placeholderHue(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0; // turn the string into a number
  }
  return PLACEHOLDER_HUES[Math.abs(hash) % PLACEHOLDER_HUES.length]; // use it as an index into the placeholder hues array
}

/**
 * Placeholder "photo" used until real photography is supplied.
 * Renders a warm gradient tinted per-dog so cards are distinguishable.
 */
export function DogPhoto({
  hue,
  className,
  iconClassName,
}: {
  hue: number;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center overflow-hidden", className)}
      style={{
        background: `linear-gradient(135deg, oklch(0.9 0.07 ${hue}), oklch(0.75 0.11 ${hue + 25}))`,
      }}
    >
      <PawPrint
        className={cn("size-16 text-white/70 drop-shadow-sm", iconClassName)}
        strokeWidth={1.5}
      />
    </div>
  );
}
