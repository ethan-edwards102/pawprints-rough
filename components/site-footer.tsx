import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-auto bg-[oklch(0.28_0.035_55)] text-[oklch(0.96_0.015_85)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo.png"
            alt="Paw Prints Rescue & Rehoming"
            width={331}
            height={250}
            className="h-24 w-auto"
          />
          <p className="mt-3 max-w-60 text-sm text-white/70">
            Rescuing and rehoming stray dogs since 2012. Every dog deserves a second chance.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-white/50">
            Visit us
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              14 Kennel Lane, Milnerton, Cape Town, 7441
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              021&nbsp;555&nbsp;0148
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              hello@pawprints.org.za
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-white/50">
            Get involved
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/dogs" className="text-white/80 hover:text-white">
                Adopt a dog
              </Link>
            </li>
            <li>
              <Link href="/matcher" className="text-white/80 hover:text-white">
                Find your match
              </Link>
            </li>
            <li>
              <Link href="/volunteer" className="text-white/80 hover:text-white">
                Volunteer with us
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-white/80 hover:text-white">
                Make a donation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-white/50">
            Hours
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Mon – Fri: 09:00 – 17:00</li>
            <li>Sat – Sun: 09:00 – 14:00</li>
            <li>Public holidays: 10:00 – 13:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/50 sm:flex-row">
          <p>© 2026 Paw Prints Rescue &amp; Rehoming NPC. Registered NPO 123-456.</p>
          <p>This is a rough draft for review — content is placeholder.</p>
        </div>
      </div>
    </footer>
  );
}
