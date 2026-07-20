import Link from "next/link";

const exploreLinks = [
  { href: "/dogs", label: "Available dogs" },
  { href: "/#adoption-process", label: "Adoption process" },
  { href: "/", label: "About us" },
  { href: "/#success-stories", label: "Success stories" },
];

const involvementLinks = [
  { href: "/volunteer", label: "Foster" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/donate", label: "Donate" },
  { href: "/donate", label: "Sponsor" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.72_0.145_62)] px-4 pb-4 text-white">
      <div className="mx-auto max-w-6xl rounded-t-xl px-2 py-10 sm:px-0">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight">Paw Prints</h2>
            <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-white/78">
              Rescuing, rehabilitating and rehoming dogs across Cape Town. Every second chance
              starts with someone choosing to help.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm font-medium text-white/78">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold">Get involved</h3>
            <ul className="mt-3 space-y-2 text-sm font-medium text-white/78">
              {involvementLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm font-medium text-white/78">
              <li>hello@pawprints.org.za</li>
              <li>021 555 0148</li>
              <li>Emergency: 082 555 0199</li>
              <li>14 Kennel Lane, Milnerton</li>
              <li>Mon-Fri 09:00-17:00</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 font-heading text-[22vw] font-extrabold leading-[0.75] tracking-tight text-white sm:text-[9rem] lg:text-[12rem]">
          PAW PRINTS
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/18 pt-5 text-xs font-semibold text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>Registered NPO 123-456 | © 2026 Paw Prints Rescue &amp; Rehoming NPC.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-white">
              Privacy policy
            </Link>
            <Link href="/" className="hover:text-white">
              Instagram
            </Link>
            <Link href="/" className="hover:text-white">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
