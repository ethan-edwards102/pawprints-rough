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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Dog, Gender } from "@/lib/data";

export interface DogFormValues {
  name: string;
  age: number;
  breed: string;
  gender: Gender;
  shortDescription: string;
  description: string;
}

const genderItems = { Male: "Male", Female: "Female" };

export function DogFormDialog({
  open,
  onOpenChange,
  dog,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the dialog edits this dog; otherwise it creates a new one. */
  dog: Dog | null;
  onSubmit: (values: DogFormValues) => void;
}) {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("Male");
  const [shortDescription, setShortDescription] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setName(dog?.name ?? "");
      setAge(dog ? String(dog.age) : "");
      setBreed(dog?.breed ?? "");
      setGender(dog?.gender ?? "Male");
      setShortDescription(dog?.shortDescription ?? "");
      setDescription(dog?.description ?? "");
    }
  }, [open, dog]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      age: Math.max(0, Number(age) || 0),
      breed: breed.trim(),
      gender,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dog ? `Edit ${dog.name}` : "Add a dog"}</DialogTitle>
          <DialogDescription>
            {dog
              ? "Update this dog's profile. Changes are local to this draft."
              : "Add a new arrival to the adoption list. Data is local to this draft."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="dog-name">Name</Label>
              <Input id="dog-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dog-age">Age (years)</Label>
              <Input
                id="dog-age"
                type="number"
                min={0}
                max={25}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="dog-breed">Breed</Label>
              <Input
                id="dog-breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Gender</Label>
              <Select
                items={genderItems}
                value={gender}
                onValueChange={(value) => setGender(value as Gender)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dog-short">Short description (card)</Label>
            <Input
              id="dog-short"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              maxLength={60}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dog-desc">Full description</Label>
            <Textarea
              id="dog-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{dog ? "Save changes" : "Add dog"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
