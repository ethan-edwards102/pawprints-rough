"use client";

import * as React from "react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roomItems = {
  cosy: "Cosy Kennel — R220 / night",
  suite: "Deluxe Suite — R340 / night",
  luxury: "Luxury Play Loft — R480 / night",
};

type RoomTier = keyof typeof roomItems;

export function MuttMotelBookingForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [ownerName, setOwnerName] = React.useState("");
  const [dogName, setDogName] = React.useState("");
  const [room, setRoom] = React.useState<RoomTier>("cosy");

  if (submitted) {
    return (
      <Card className="border-primary/40 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            Booking request received!
          </CardTitle>
          <CardDescription>
            Thanks {ownerName || "there"} — we&apos;ve pencilled in a stay for{" "}
            {dogName || "your pup"} in our {roomItems[room].split(" —")[0]}. Our team will
            confirm availability and payment details by email within one business day.
            (Mock submission — nothing was sent.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Make another booking
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="book">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="size-5 text-primary" />
          Book a stay
        </CardTitle>
        <CardDescription>
          Tell us about your dog and when you&apos;ll be away. We&apos;ll confirm the
          booking and share drop-off details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          {/* Owner details */}
          <fieldset className="grid gap-4">
            <legend className="text-sm font-semibold text-muted-foreground">
              Your details
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="owner-name">Full name</Label>
                <Input
                  id="owner-name"
                  required
                  placeholder="Jane Doe"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="owner-phone">Phone number</Label>
                <Input id="owner-phone" type="tel" required placeholder="082 555 0100" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="owner-email">Email</Label>
              <Input
                id="owner-email"
                type="email"
                required
                placeholder="jane@example.com"
              />
            </div>
          </fieldset>

          {/* Dog details */}
          <fieldset className="grid gap-4">
            <legend className="text-sm font-semibold text-muted-foreground">
              Your dog
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="dog-name">Dog&apos;s name</Label>
                <Input
                  id="dog-name"
                  required
                  placeholder="Rex"
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dog-breed">Breed</Label>
                <Input id="dog-breed" placeholder="Labrador mix" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dog-notes">
                Care notes{" "}
                <span className="text-muted-foreground">
                  (feeding, medication, temperament)
                </span>
              </Label>
              <Textarea
                id="dog-notes"
                rows={3}
                placeholder="Rex eats twice a day, is friendly with other dogs, and needs a tablet with breakfast."
              />
            </div>
          </fieldset>

          {/* Stay details */}
          <fieldset className="grid gap-4">
            <legend className="text-sm font-semibold text-muted-foreground">
              The stay
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="check-in">Drop-off date</Label>
                <Input id="check-in" type="date" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="check-out">Pick-up date</Label>
                <Input id="check-out" type="date" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room">Room type</Label>
              <Select
                items={roomItems}
                value={room}
                onValueChange={(value) => setRoom(value as RoomTier)}
              >
                <SelectTrigger id="room" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roomItems).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </fieldset>

          <Button type="submit" size="lg">
            Request booking
          </Button>
          <p className="text-xs text-muted-foreground">
            This is a draft form — submitting won&apos;t reserve a real stay or take payment.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
