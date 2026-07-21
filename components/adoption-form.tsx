"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  const inputClass =
    "h-11 rounded-xl border-[oklch(0.89_0.025_80)] bg-white px-4 shadow-sm focus-visible:border-[oklch(0.72_0.145_62)] focus-visible:ring-[oklch(0.72_0.145_62)]/15";
  const labelClass = "text-xs font-bold uppercase tracking-wide text-muted-foreground";
  const selectTriggerClass =
    "h-11 w-full rounded-xl border-[oklch(0.89_0.025_80)] bg-white px-4 shadow-sm transition-all hover:border-[oklch(0.72_0.145_62)]/45 data-open:border-[oklch(0.72_0.145_62)] data-open:ring-3 data-open:ring-[oklch(0.72_0.145_62)]/15";
  const selectContentClass =
    "rounded-xl border border-[oklch(0.89_0.025_80)] bg-white p-1.5 shadow-xl";

  if (submitted) {
    return (
      <div className="rounded-xl bg-[oklch(0.72_0.145_62)] p-8 text-white">
        <CheckCircle2 className="size-8" />
        <h2 className="mt-5 font-heading text-4xl font-extrabold tracking-tight">
          Application received.
        </h2>
        <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-white/84">
          Thank you for applying to adopt {dogName}. Our adoption team will call you within two
          working days to arrange a meet-and-greet. Mock submission, nothing was sent.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <span className="rounded-full border border-[oklch(0.72_0.145_62)]/30 px-3 py-1 text-xs font-bold text-[oklch(0.62_0.14_58)]">
          Application
        </span>
        <h2 className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)]">
          Tell us about your home.
        </h2>
        <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-muted-foreground">
          A few quick questions to get things started. The full home check happens later, in person.
        </p>
      </div>
        <form
          className="mt-8 grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="adopt-name" className={labelClass}>Name</Label>
              <Input id="adopt-name" required placeholder="Jane" className={inputClass} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adopt-surname" className={labelClass}>Surname</Label>
              <Input id="adopt-surname" required placeholder="Doe" className={inputClass} />
            </div>
          </div>
          {/* Placeholder fields — final (shortened) question list to be agreed with Paw Prints */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="adopt-phone" className={labelClass}>Phone number</Label>
              <Input id="adopt-phone" type="tel" required placeholder="082 555 0100" className={inputClass} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adopt-email" className={labelClass}>Email</Label>
              <Input id="adopt-email" type="email" required placeholder="jane@example.com" className={inputClass} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label className={labelClass}>Type of home</Label>
            <Select
              items={homeItems}
              value={homeType}
              onValueChange={(v) => setHomeType(v ?? "house")}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {Object.entries(homeItems).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="rounded-lg px-3 py-2.5">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="adopt-message" className={labelClass}>
              Tell us about your household{" "}
              <span className="text-muted-foreground">(other pets, children, lifestyle)</span>
            </Label>
            <Textarea
              id="adopt-message"
              rows={5}
              placeholder="We have two kids and a cat..."
              className="rounded-xl border-[oklch(0.89_0.025_80)] bg-white px-4 py-3 shadow-sm focus-visible:border-[oklch(0.72_0.145_62)] focus-visible:ring-[oklch(0.72_0.145_62)]/15"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-2 h-11 rounded-xl bg-[oklch(0.72_0.145_62)] text-white hover:bg-[oklch(0.66_0.15_58)]"
          >
            Submit application
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No fees are due now. The adoption fee of R950 covers sterilisation, vaccinations and
            microchipping.
          </p>
        </form>
    </div>
  );
}
