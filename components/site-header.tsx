"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, LogOut, Megaphone, Menu } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoginDialog } from "@/components/login-dialog";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dogs", label: "Our Dogs" },
  { href: "/matcher", label: "Dog Matcher" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/blog", label: "Blog" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-[oklch(0.32_0.045_55)] p-1">
        <Image src="/logo.png" alt="Paw Prints logo" width={331} height={250} className="h-full w-auto" />
      </span>
      <span className="font-heading text-lg font-bold tracking-tight">
        Paw Prints
        <span className="block text-[0.65rem] font-medium leading-none text-muted-foreground">
          Rescue &amp; Rehoming
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const links = [
    ...navLinks,
    ...(user?.role === "admin"
      ? [{ href: "/admin/communications", label: "Communications" }]
      : []),
  ];

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive(link.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              {link.label === "Communications" ? (
                <span className="flex items-center gap-1.5">
                  <Megaphone className="size-4" /> {link.label}
                </span>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button nativeButton={false} render={<Link href="/donate" />} className="hidden sm:inline-flex">
            <Heart data-icon="inline-start" />
            Donate
          </Button>

          {user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Badge variant="secondary" className="max-w-40 truncate">
                {user.name}
              </Badge>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Sign out">
                <LogOut />
              </Button>
            </div>
          ) : (
            <span className="hidden lg:inline-flex">
              <LoginDialog />
            </span>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent",
                      isActive(link.href) ? "bg-accent" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary hover:bg-accent"
                >
                  Donate
                </Link>
              </nav>
              <div className="mt-auto border-t p-4">
                {user ? (
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm">{user.name}</span>
                    <Button variant="outline" size="sm" onClick={logout}>
                      <LogOut data-icon="inline-start" /> Sign out
                    </Button>
                  </div>
                ) : (
                  <LoginDialog trigger={<Button variant="outline" className="w-full" />} />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
