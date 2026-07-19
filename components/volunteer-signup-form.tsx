"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VolunteerSignupForm({ eventTitle }: { eventTitle: string }) {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <Card className="border-primary/40 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            You&apos;re signed up!
          </CardTitle>
          <CardDescription>
            Thanks for volunteering for {eventTitle}. We&apos;ll send the details and a reminder
            closer to the day. (Mock submission — nothing was sent.)
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          We keep it short — just enough to save your spot and reach you before the event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="vol-name">Name</Label>
              <Input id="vol-name" required placeholder="Jane" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vol-surname">Surname</Label>
              <Input id="vol-surname" required placeholder="Doe" />
            </div>
          </div>
          {/* Placeholder contact fields — final field list to be confirmed with Paw Prints */}
          <div className="grid gap-2">
            <Label htmlFor="vol-phone">Phone number</Label>
            <Input id="vol-phone" type="tel" required placeholder="082 555 0100" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="vol-email">
              Email <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input id="vol-email" type="email" placeholder="jane@example.com" />
          </div>
          <Button type="submit" size="lg" className="mt-2">
            Save my spot
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
