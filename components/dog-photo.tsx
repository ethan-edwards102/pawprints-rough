import { PawPrint } from "lucide-react";

import { cn } from "@/lib/utils";

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
