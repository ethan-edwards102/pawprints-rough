"use client";

import * as React from "react";
import { ArrowRight, Minus, PawPrint, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MuttMotelDetailsDialog } from "@/components/mutt-motel-details-dialog";

const PRICE_PER_NIGHT = 220;
const MAX_DOGS = 4;

function nightsBetween(start: string, end: string) {
  if (!start || !end) return 0;
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (Number.isNaN(ms)) return 0;
  const nights = Math.round(ms / 86_400_000);
  return nights > 0 ? nights : 0;
}

function formatRand(amount: number) {
  return `R${amount.toLocaleString("en-ZA")}`;
}

const fieldLabel =
  "text-xs font-bold uppercase tracking-wide text-[oklch(0.28_0.035_55)]";
// A full circle whose visible half traces the border around a mask-cut notch.
// Positioned on the seam (18rem from the right — matches --mm-stub in globals.css).
const notchArc =
  "pointer-events-none absolute z-10 hidden size-[26px] rounded-full border border-[oklch(0.89_0.025_80)] lg:block left-[calc(100%-18rem)]";

export function MuttMotelBookingForm() {
  const [dogs, setDogs] = React.useState(1);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const nights = nightsBetween(startDate, endDate);
  const total = nights * dogs * PRICE_PER_NIGHT;
  const stayReady = nights > 0 && dogs >= 1;
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="relative">
        <div className="mm-ticket-shadow">
          <div className="mm-ticket relative rounded-[1.75rem] border border-[oklch(0.89_0.025_80)] bg-white">
            <div className="flex flex-col lg:flex-row">
          {/* LHS — the stub */}
          <div className="flex-1 p-7 sm:p-9">
            {/* Dog counter */}
            <div className="grid gap-2.5">
              <Label className={fieldLabel}>Number of dogs</Label>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center rounded-xl border border-[oklch(0.89_0.025_80)]">
                  <button
                    type="button"
                    onClick={() => setDogs((d) => Math.max(1, d - 1))}
                    disabled={dogs <= 1}
                    aria-label="Fewer dogs"
                    className="flex size-11 items-center justify-center rounded-l-xl text-[oklch(0.28_0.035_55)] transition-colors hover:bg-[oklch(0.985_0.012_85)] disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-12 text-center font-heading text-xl font-extrabold text-[oklch(0.28_0.035_55)]">
                    {dogs}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDogs((d) => Math.min(MAX_DOGS, d + 1))}
                    disabled={dogs >= MAX_DOGS}
                    aria-label="More dogs"
                    className="flex size-11 items-center justify-center rounded-r-xl text-[oklch(0.28_0.035_55)] transition-colors hover:bg-[oklch(0.985_0.012_85)] disabled:opacity-40"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Up to {MAX_DOGS} dogs per booking
                </span>
              </div>
            </div>

            {/* From — To dates with connector line */}
            <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div className="grid gap-2.5">
                <Label htmlFor="from-date" className={fieldLabel}>
                  From
                </Label>
                <Input
                  id="from-date"
                  type="date"
                  min={today}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>
              <div className="hidden gap-2.5 sm:grid">
                <span aria-hidden className="text-xs opacity-0">
                  .
                </span>
                <div className="flex h-11 items-center justify-center gap-1.5 text-[oklch(0.72_0.145_62)]">
                  <span className="h-px w-6 bg-[oklch(0.85_0.03_75)]" />
                  <PawPrint className="size-4" />
                  <span className="h-px w-6 bg-[oklch(0.85_0.03_75)]" />
                </div>
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="to-date" className={fieldLabel}>
                  To
                </Label>
                <Input
                  id="to-date"
                  type="date"
                  min={startDate || today}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>
            </div>
            {startDate && endDate && nights === 0 ? (
              <p className="mt-3 text-sm font-semibold text-destructive">
                Pick-up needs to be after drop-off.
              </p>
            ) : null}
          </div>

          {/* RHS — the tear-off with price + booking */}
          <div className="relative border-t border-dashed border-[oklch(0.82_0.03_75)] p-7 sm:p-9 lg:w-72 lg:border-l lg:border-t-0">
            <div className="flex h-full flex-col">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Total
              </p>
              <p className="mt-1 font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)]">
                {formatRand(total)}
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {formatRand(PRICE_PER_NIGHT)} / night per dog
              </p>

              <Button
                className="mt-6 h-12 rounded-xl bg-[oklch(0.72_0.145_62)] px-6 text-base text-white shadow-lg shadow-[oklch(0.72_0.145_62)]/20 hover:bg-[oklch(0.66_0.15_58)] disabled:opacity-40 lg:mt-auto"
                disabled={!stayReady}
                onClick={() => setDialogOpen(true)}
              >
                Book now <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
            </div>
          </div>
        </div>

        {/* Border arcs tracing the two mask-cut notches (desktop only). */}
        <span
          aria-hidden
          className={`${notchArc} top-0 -translate-x-1/2 -translate-y-1/2 [clip-path:inset(50%_0_0_0)]`}
        />
        <span
          aria-hidden
          className={`${notchArc} bottom-0 -translate-x-1/2 translate-y-1/2 [clip-path:inset(0_0_50%_0)]`}
        />
      </div>

      <MuttMotelDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dogs={dogs}
        nights={nights}
        total={total}
      />
    </>
  );
}
