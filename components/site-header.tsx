"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Megaphone, Menu, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <Link href="/" className="group flex items-center">
      <span className="font-heading text-lg font-extrabold uppercase tracking-tight text-white drop-shadow-sm">
        PAWPRINTS
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const isHome = pathname === "/";

  const links = [
    ...navLinks,
    ...(user?.role === "admin"
      ? [{ href: "/admin/communications", label: "Communications" }]
      : []),
  ];

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  React.useEffect(() => {
    const updateHeaderState = () => {
      setHasScrolled(window.scrollY > 80);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  const floating = !isHome || hasScrolled;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 overflow-hidden px-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-500 ease-out sm:px-8",
            floating
              ? "h-14 max-w-5xl rounded-[999px] bg-[oklch(0.72_0.145_62)] ring-1 ring-white/20 sm:h-16"
              : "h-14 max-w-7xl rounded-[1.25rem] bg-white/12 ring-1 ring-white/15 sm:h-16 sm:rounded-[1.5rem] lg:h-24 lg:rounded-[1.75rem]"
          )}
        >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold text-white/88 transition-colors hover:bg-white/14 hover:text-white",
                isActive(link.href) ? "bg-white/16 text-white" : "text-white/82"
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
          <Button
            nativeButton={false}
            render={<Link href="/donate" />}
            className={cn(
              "hidden rounded-[1.15rem] bg-[oklch(0.72_0.145_62)] px-6 text-white shadow-none transition-all hover:bg-[oklch(0.66_0.15_58)] lg:inline-flex",
              floating && "lg:w-0 lg:px-0 lg:opacity-0 lg:pointer-events-none"
            )}
          >
            Donate
          </Button>

          {user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Badge className="max-w-40 truncate border-white/15 bg-white/14 text-white shadow-none">
                {user.name}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                aria-label="Sign out"
                className="text-white hover:bg-white/14 hover:text-white"
              >
                <LogOut />
              </Button>
            </div>
          ) : (
            <span
              className={cn(
                "hidden overflow-hidden transition-all lg:inline-flex",
                floating && "w-0 opacity-0 pointer-events-none"
              )}
            >
              <LoginDialog
                trigger={
                  <Button
                    variant="outline"
                    className="border-white/25 bg-white/10 text-white hover:bg-white/16 hover:text-white"
                  />
                }
              />
            </span>
          )}

          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      </header>
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-30 min-h-svh origin-top overflow-hidden bg-white/12 px-6 pb-10 pt-28 text-white shadow-2xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 ease-out lg:hidden",
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-5 opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col items-start gap-5 text-base font-semibold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "transition-colors hover:text-white/75",
                isActive(link.href) ? "text-white" : "text-white/88"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-16 flex justify-center">
          <Button
            nativeButton={false}
            render={<Link href="/donate" onClick={() => setMobileOpen(false)} />}
            className="h-13 min-w-52 rounded-[1.15rem] bg-[oklch(0.72_0.145_62)] px-8 text-white shadow-lg shadow-black/10 hover:bg-[oklch(0.66_0.15_58)]"
          >
            Donate
          </Button>
        </div>
      </div>
      {!isHome ? <div className="h-24" aria-hidden="true" /> : null}
    </>
  );
}
