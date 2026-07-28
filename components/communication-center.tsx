"use client";

import * as React from "react";
import { BellRing, Clock, Lock, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoginDialog } from "@/components/login-dialog";
import { useAuth } from "@/lib/auth";

interface SentNotification {
  id: number;
  message: string;
  sentAt: string;
}

const seedHistory: SentNotification[] = [
  {
    id: 2,
    message: "Reminder: Kennel Clean-Up Day is this Sunday. Gloves and snacks provided!",
    sentAt: "14 July 2026, 09:12",
  },
  {
    id: 1,
    message: "Three new puppies just arrived and are looking for homes — meet them on the site!",
    sentAt: "8 July 2026, 15:40",
  },
];

const cardShell =
  "rounded-[1.75rem] border border-[oklch(0.89_0.025_80)] bg-white shadow-sm";

export function CommunicationCenter() {
  const { user } = useAuth();
  const [message, setMessage] = React.useState("");
  const [history, setHistory] = React.useState<SentNotification[]>(seedHistory);
  const [justSent, setJustSent] = React.useState(false);

  if (user?.role !== "admin") {
    return (
      <div className={`${cardShell} mx-auto max-w-md p-8 text-center sm:p-10`}>
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[oklch(0.72_0.145_62)]/12">
          <Lock className="size-6 text-[oklch(0.72_0.145_62)]" />
        </span>
        <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)]">
          Staff only
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          The communication center is for Paw Prints staff. Sign in with an admin account to
          send push notifications.
        </p>
        <div className="mt-7 flex justify-center">
          <LoginDialog />
        </div>
      </div>
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    setHistory((prev) => [
      {
        id: (prev[0]?.id ?? 0) + 1,
        message: trimmed,
        sentAt: "Just now (mock)",
      },
      ...prev,
    ]);
    setMessage("");
    setJustSent(true);
    window.setTimeout(() => setJustSent(false), 3000);
  }

  return (
    <div>
      {/* Compose */}
      <section>
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-4xl">
            Send a push notification
          </h2>
          <p className="mt-3 text-base font-medium leading-7 text-muted-foreground sm:text-lg">
            The message goes out to everyone with the Paw Prints app installed. Keep it short
            and friendly.
          </p>
        </div>

        <form onSubmit={handleSend} className={`${cardShell} mt-8 p-7 sm:p-9`}>
          <label
            htmlFor="notification-message"
            className="text-xs font-bold uppercase tracking-wide text-[oklch(0.28_0.035_55)]"
          >
            Message
          </label>
          <Textarea
            id="notification-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={240}
            placeholder="e.g. Our Spring Adoption Fair is this Saturday at Green Point Park…"
            required
            className="mt-2.5 rounded-xl border-[oklch(0.89_0.025_80)] text-base leading-7 focus-visible:border-[oklch(0.72_0.145_62)] focus-visible:ring-[oklch(0.72_0.145_62)]/25"
          />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm font-semibold text-muted-foreground">
              {message.length} / 240
            </span>
            <Button
              type="submit"
              disabled={!message.trim()}
              className="h-12 rounded-xl bg-[oklch(0.72_0.145_62)] px-7 font-heading text-base font-bold text-white shadow-lg shadow-[oklch(0.72_0.145_62)]/25 transition-all hover:bg-[oklch(0.66_0.15_58)] disabled:shadow-none"
            >
              <Send data-icon="inline-start" />
              Send notification
            </Button>
          </div>
          {justSent && (
            <p className="mt-5 flex items-center gap-2.5 rounded-xl bg-[oklch(0.72_0.145_62)]/10 px-4 py-3.5 text-sm font-semibold text-[oklch(0.55_0.14_55)]">
              <BellRing className="size-4 shrink-0" />
              Notification sent! (Mock — nothing actually went out.)
            </p>
          )}
        </form>
      </section>

      {/* History — deliberately not wrapped in a card; each entry is its own card. */}
      <section className="mt-16">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-4xl">
            Recently sent
          </h2>
          <p className="mt-3 text-base font-medium leading-7 text-muted-foreground sm:text-lg">
            The last few notifications that went out to supporters.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {history.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[oklch(0.89_0.025_80)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-base leading-7 text-[oklch(0.28_0.035_55)]">{item.message}</p>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                {item.sentAt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
