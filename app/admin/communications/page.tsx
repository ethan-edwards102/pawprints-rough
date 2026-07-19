import type { Metadata } from "next";

import { CommunicationCenter } from "@/components/communication-center";

export const metadata: Metadata = {
  title: "Communication Center",
  description: "Send push notifications to Paw Prints supporters (staff only).",
};

export default function CommunicationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <section className="mx-auto max-w-2xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Communication center</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Reach every supporter instantly with a push notification.
        </p>
      </section>
      <section className="mt-8">
        <CommunicationCenter />
      </section>
    </div>
  );
}
