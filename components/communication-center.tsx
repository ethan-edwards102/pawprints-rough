"use client";

import * as React from "react";
import { BellRing, Lock, Megaphone, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function CommunicationCenter() {
  const { user } = useAuth();
  const [message, setMessage] = React.useState("");
  const [history, setHistory] = React.useState<SentNotification[]>(seedHistory);
  const [justSent, setJustSent] = React.useState(false);

  if (user?.role !== "admin") {
    return (
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <span className="mx-auto mb-1 flex size-12 items-center justify-center rounded-full bg-muted">
            <Lock className="size-5 text-muted-foreground" />
          </span>
          <CardTitle>Staff only</CardTitle>
          <CardDescription>
            The communication center is for Paw Prints staff. Sign in with an admin account to
            send push notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <LoginDialog />
        </CardContent>
      </Card>
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
    <div className="mx-auto grid max-w-2xl gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="size-5 text-primary" />
            Send a push notification
          </CardTitle>
          <CardDescription>
            The message goes out to everyone with the Paw Prints app installed. Keep it short
            and friendly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="grid gap-3">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={240}
              placeholder="e.g. Our Spring Adoption Fair is this Saturday at Green Point Park…"
              required
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">{message.length} / 240</span>
              <Button type="submit" disabled={!message.trim()}>
                <Send data-icon="inline-start" />
                Send notification
              </Button>
            </div>
            {justSent && (
              <p className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
                <BellRing className="size-4" />
                Notification sent! (Mock — nothing actually went out.)
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recently sent</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {history.map((item) => (
            <div key={item.id} className="rounded-xl border p-3">
              <p className="text-sm">{item.message}</p>
              <Badge variant="outline" className="mt-2 text-xs font-normal text-muted-foreground">
                {item.sentAt}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
