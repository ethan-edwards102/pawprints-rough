"use client";

import * as React from "react";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_ACCOUNTS, useAuth } from "@/lib/auth";

export function LoginDialog({ trigger }: { trigger?: React.ReactElement }) {
  const { login } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(email, password)) {
      setOpen(false);
      setEmail("");
      setPassword("");
      setError(null);
    } else {
      setError("Those details don't match a mock account. Try one below.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger ?? <Button variant="outline" />}>
        <LogIn data-icon="inline-start" />
        Sign in
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            This rough draft uses mock accounts — no real login yet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            <p className="mb-1 font-medium text-foreground">Mock credentials</p>
            {MOCK_ACCOUNTS.map((a) => (
              <p key={a.email}>
                <span className="font-mono">{a.email}</span> /{" "}
                <span className="font-mono">{a.password}</span> ({a.role})
              </p>
            ))}
          </div>
          <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
            <Button type="submit" className="w-full sm:w-auto">
              Sign in
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
