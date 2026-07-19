"use client";

import * as React from "react";
import { CheckCircle2, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const presetAmounts = [50, 100, 250, 500];

export function DonationGateway() {
  const [amount, setAmount] = React.useState<number | "">(100);
  const [frequency, setFrequency] = React.useState<"once" | "monthly">("once");
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const validAmount = typeof amount === "number" && amount >= 10;

  return (
    <Card id="donate-now">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="size-5 text-primary" />
          Donate now
        </CardTitle>
        <CardDescription>
          Secure card, EFT and SnapScan payments processed by PayFast.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={frequency === "once" ? "default" : "outline"}
            onClick={() => setFrequency("once")}
          >
            Once-off
          </Button>
          <Button
            type="button"
            variant={frequency === "monthly" ? "default" : "outline"}
            onClick={() => setFrequency("monthly")}
          >
            Monthly
          </Button>
        </div>

        <div className="grid gap-2">
          <Label>Amount (ZAR)</Label>
          <div className="grid grid-cols-4 gap-2">
            {presetAmounts.map((preset) => (
              <Button
                key={preset}
                type="button"
                variant={amount === preset ? "default" : "outline"}
                onClick={() => setAmount(preset)}
              >
                R{preset}
              </Button>
            ))}
          </div>
          <Input
            type="number"
            min={10}
            placeholder="Custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            className={cn(!validAmount && amount !== "" && "border-destructive")}
          />
          {!validAmount && amount !== "" && (
            <p className="text-xs text-destructive">Minimum donation is R10.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button size="lg" disabled={!validAmount} onClick={() => setConfirmOpen(true)}>
          Donate R{validAmount ? amount : "—"}
          {frequency === "monthly" ? " / month" : ""} via PayFast
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          You will be redirected to PayFast to complete your donation securely.
        </p>
      </CardFooter>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary" />
              PayFast checkout (mock)
            </DialogTitle>
            <DialogDescription>
              In the final site, this is where you would be redirected to the PayFast payment
              page to complete your{" "}
              {frequency === "monthly" ? "monthly debit order" : "once-off donation"} of{" "}
              <strong>R{validAmount ? amount : 0}</strong>. Payment integration is not part of
              this rough draft.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
