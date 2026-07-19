import type { Metadata } from "next";
import { Gift, HeartHandshake, PiggyBank } from "lucide-react";

import { DonationGateway } from "@/components/donation-gateway";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cashDonationUses, physicalDonationItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Paw Prints with a cash or physical donation.",
};

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Motivation */}
      <section className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Help us help them</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Paw Prints receives no government funding. Every kennel, every vaccination and every
          bag of food is paid for by people like you. Right now we are caring for 60 dogs, and
          winter is our hardest season — your support keeps them warm, fed and healthy until
          they find a home.
        </p>
      </section>

      {/* Ways to donate */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold tracking-tight">Ways to donate</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <span className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Gift className="size-5" />
              </span>
              <CardTitle>Physical donations</CardTitle>
              <CardDescription>
                Drop items off at the shelter during opening hours — no appointment needed. We
                currently need these most:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {physicalDonationItems.map((entry) => (
                  <li key={entry.item} className="text-sm">
                    <span className="font-medium">{entry.item}</span>
                    <span className="block text-muted-foreground">{entry.note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <span className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <PiggyBank className="size-5" />
              </span>
              <CardTitle>Cash donations</CardTitle>
              <CardDescription>
                Once-off or monthly — every rand is accounted for in our published annual
                report. Here is where your money goes:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cashDonationUses.map((use) => (
                  <li key={use.title} className="text-sm">
                    <span className="font-medium">{use.title}</span>
                    <span className="block text-muted-foreground">{use.detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="lg:row-span-1">
            <DonationGateway />
          </div>
        </div>
      </section>

      {/* Other ways */}
      <section className="mt-12">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartHandshake className="size-5 text-primary" />
              Prefer to give your time?
            </CardTitle>
            <CardDescription>
              Volunteers are the backbone of Paw Prints. From event days to weekly kennel
              shifts, there is a role for everyone —{" "}
              <a href="/volunteer" className="font-medium text-primary underline underline-offset-2">
                see upcoming volunteer events
              </a>
              .
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
