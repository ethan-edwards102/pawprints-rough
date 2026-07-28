import type { Metadata } from "next";
import { Megaphone } from "lucide-react";

import { CommunicationCenter } from "@/components/communication-center";

export const metadata: Metadata = {
  title: "Communication Center",
  description: "Send push notifications to Paw Prints supporters (staff only).",
};

export default function CommunicationsPage() {
  return (
    <div className="bg-[oklch(0.985_0.012_85)]">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {/* Hero */}
        <section>
          <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.72_0.145_62)]/12 px-3.5 py-1.5 text-sm font-bold text-[oklch(0.55_0.14_55)]">
            <Megaphone className="size-4" /> Staff tools
          </span>
          <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-[oklch(0.28_0.035_55)] sm:text-6xl lg:text-7xl">
            Communication center
          </h1>
          <p className="mt-6 max-w-xl text-base font-medium leading-7 text-muted-foreground sm:text-lg">
            Reach every supporter instantly with a push notification — new arrivals, event
            reminders, or an urgent call for foster homes.
          </p>
        </section>

        <section className="mt-12">
          <CommunicationCenter />
        </section>
      </div>
    </div>
  );
}
