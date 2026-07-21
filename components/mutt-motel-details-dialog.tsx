"use client";

import * as React from "react";
import { CheckCircle2, Dog } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const goldButton =
  "bg-[oklch(0.72_0.145_62)] text-white hover:bg-[oklch(0.66_0.15_58)]";

function formatRand(amount: number) {
  return `R${amount.toLocaleString("en-ZA")}`;
}

export function MuttMotelDetailsDialog({
  open,
  onOpenChange,
  dogs,
  nights,
  total,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dogs: number;
  nights: number;
  total: number;
}) {
  const [submitted, setSubmitted] = React.useState(false);
  const [ownerName, setOwnerName] = React.useState("");
  const [dogNames, setDogNames] = React.useState<Record<number, string>>({});

  // Reset to the form view each time the dialog opens (render-phase, no flicker on close).
  const [wasOpen, setWasOpen] = React.useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setSubmitted(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-[oklch(0.72_0.145_62)]" />
                Booking request received!
              </DialogTitle>
              <DialogDescription>
                Thanks {ownerName || "there"} — we&apos;ve pencilled in a {nights}-night stay
                for {dogs} {dogs === 1 ? "dog" : "dogs"} at {formatRand(total)}. Our team will
                confirm availability and payment details by email within one business day.
                (Mock submission — nothing was sent.)
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className={goldButton}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Dog className="size-5 text-[oklch(0.72_0.145_62)]" />
                Almost there
              </DialogTitle>
              <DialogDescription>
                {dogs} {dogs === 1 ? "dog" : "dogs"} · {nights} nights ·{" "}
                <span className="font-bold text-[oklch(0.28_0.035_55)]">
                  {formatRand(total)}
                </span>
                . A few last details and we&apos;ll confirm your pup&apos;s stay by email.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="grid gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="mm-name">Full name</Label>
                  <Input
                    id="mm-name"
                    required
                    placeholder="Jane Doe"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mm-phone">Phone number</Label>
                  <Input id="mm-phone" type="tel" required placeholder="082 555 0100" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mm-email">Email</Label>
                <Input id="mm-email" type="email" required placeholder="jane@example.com" />
              </div>
              <div className="grid gap-2">
                <Label>{dogs === 1 ? "Your dog's name" : "Your dogs' names"}</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: dogs }).map((_, index) => (
                    <Input
                      key={index}
                      required
                      placeholder={`Dog ${index + 1} name`}
                      value={dogNames[index] ?? ""}
                      onChange={(e) =>
                        setDogNames((prev) => ({ ...prev, [index]: e.target.value }))
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mm-notes">
                  Care notes{" "}
                  <span className="text-muted-foreground">
                    (feeding, medication, temperament)
                  </span>
                </Label>
                <Textarea
                  id="mm-notes"
                  rows={3}
                  placeholder="Rex eats twice a day, is friendly with other dogs, and needs a tablet with breakfast."
                />
              </div>
              <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className={goldButton}>
                  Request booking
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
