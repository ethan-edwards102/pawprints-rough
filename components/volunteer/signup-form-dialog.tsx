"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

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
import type { VolunteerEvent } from "@/lib/data";

export function SignupFormDialog({
  open,
  onOpenChange,
  event,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: VolunteerEvent | null;
}) {
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setSubmitted(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-primary" />
                You&apos;re signed up!
              </DialogTitle>
              <DialogDescription>
                Thanks for volunteering for {event?.title}. We&apos;ll send the details and a
                reminder closer to the day. (Mock submission — nothing was sent.)
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
              <Button type="button" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Sign up{event ? ` — ${event.title}` : ""}</DialogTitle>
              <DialogDescription>
                We keep it short — just enough to save your spot and reach you before the event.
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
                  <Label htmlFor="vol-name">Name</Label>
                  <Input id="vol-name" placeholder="Jane" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vol-surname">Surname</Label>
                  <Input id="vol-surname" placeholder="Doe" required />
                </div>
              </div>
              {/* Placeholder contact fields — final field list to be confirmed with Paw Prints */}
              <div className="grid gap-2">
                <Label htmlFor="vol-phone">Phone number</Label>
                <Input id="vol-phone" type="tel" placeholder="082 555 0100" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vol-email">
                  Email <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input id="vol-email" type="email" placeholder="jane@example.com" />
              </div>
              <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save my spot</Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
