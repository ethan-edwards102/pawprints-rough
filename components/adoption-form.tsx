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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const homeItems = {
  house: "House with garden",
  townhouse: "Townhouse / small garden",
  flat: "Flat / apartment",
  other: "Other",
};

export function AdoptionForm({ dogName }: { dogName: string }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [homeType, setHomeType] = React.useState("house");

  if (submitted) {
    return (
      <Card className="border-primary/40 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            Application received!
          </CardTitle>
          <CardDescription>
            Thank you for applying to adopt {dogName}. Our adoption team will call you within
            two working days to arrange a meet-and-greet. (Mock submission — nothing was sent.)
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adoption application</CardTitle>
        <CardDescription>
          A few quick questions to get things started — the full home check happens later, in
          person.
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
              <Label htmlFor="adopt-name">Name</Label>
              <Input id="adopt-name" required placeholder="Jane" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adopt-surname">Surname</Label>
              <Input id="adopt-surname" required placeholder="Doe" />
            </div>
          </div>
          {/* Placeholder fields — final (shortened) question list to be agreed with Paw Prints */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="adopt-phone">Phone number</Label>
              <Input id="adopt-phone" type="tel" required placeholder="082 555 0100" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adopt-email">Email</Label>
              <Input id="adopt-email" type="email" required placeholder="jane@example.com" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Type of home</Label>
            <Select
              items={homeItems}
              value={homeType}
              onValueChange={(v) => setHomeType(v ?? "house")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(homeItems).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="adopt-message">
              Tell us about your household{" "}
              <span className="text-muted-foreground">(other pets, children, lifestyle)</span>
            </Label>
            <Textarea id="adopt-message" rows={4} placeholder="We have two kids and a cat…" />
          </div>
          <Button type="submit" size="lg" className="mt-2">
            Submit application
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No fees are due now. The adoption fee of R950 covers sterilisation, vaccinations and
            microchipping.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
