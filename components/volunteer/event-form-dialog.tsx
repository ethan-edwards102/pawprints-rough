"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import type { VolunteerEvent } from "@/lib/data";

export interface EventFormValues {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  spotsTotal: number;
}

export function EventFormDialog({
  open,
  onOpenChange,
  event,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the dialog edits this event; otherwise it creates a new one. */
  event: VolunteerEvent | null;
  onSubmit: (values: EventFormValues) => void;
}) {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [spotsTotal, setSpotsTotal] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setTitle(event?.title ?? "");
      setDate(event?.date ?? "");
      setTime(event?.time ?? "");
      setLocation(event?.location ?? "");
      setDescription(event?.description ?? "");
      setSpotsTotal(event ? String(event.spotsTotal) : "");
    }
  }, [open, event]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      description: description.trim(),
      spotsTotal: Math.max(1, Number(spotsTotal) || 1),
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{event ? `Edit ${event.title}` : "Add an event"}</DialogTitle>
          <DialogDescription>
            {event
              ? "Update this event's details. Changes are local to this draft."
              : "Create a new volunteer event. Data is local to this draft."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="event-title">Title</Label>
            <Input
              id="event-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Spring Adoption Fair"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="event-date">Date</Label>
              <Input
                id="event-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Saturday, 5 September 2026"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-time">Time</Label>
              <Input
                id="event-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="09:00 – 15:00"
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="grid gap-2">
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Green Point Park, Cape Town"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-spots">Volunteer spots</Label>
              <Input
                id="event-spots"
                type="number"
                min={1}
                max={200}
                value={spotsTotal}
                onChange={(e) => setSpotsTotal(e.target.value)}
                className="sm:w-32"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="event-desc">Description</Label>
            <Textarea
              id="event-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What volunteers will be doing and what to expect."
              required
            />
          </div>
          <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{event ? "Save changes" : "Add event"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
