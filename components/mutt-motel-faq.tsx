import { ChevronDown } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "What should I bring for my dog's stay?",
    answer:
      "Just their own food (we'll keep to their usual diet), any medication with dosage notes, and a favourite toy or blanket for comfort. Bowls, bedding, and treats are provided, so there's no need to pack the whole house.",
  },
  {
    question: "Are the dogs kept in kennels?",
    answer:
      "No — the Mutt Motel is a home-away-from-home, not a kennel. Dogs share supervised indoor and garden spaces during the day and have their own quiet, comfortable sleeping spot at night.",
  },
  {
    question: "What vaccinations does my dog need?",
    answer:
      "All guests must be up to date on their core vaccinations (rabies, and the 5-in-1 / DHPP) and on regular flea and tick prevention. Please bring your vaccination card at drop-off.",
  },
  {
    question: "Can you give medication?",
    answer:
      "Yes. Our carers are happy to administer tablets, drops, and other routine medication at no extra charge — just leave clear instructions in the care notes when you book.",
  },
  {
    question: "What if my dog doesn't get along with others?",
    answer:
      "Every dog is assessed on arrival and playtime is always supervised. Dogs who prefer their own company are given one-on-one attention and separate play sessions, so nervous or reactive pups are just as welcome.",
  },
  {
    question: "Will I get updates while I'm away?",
    answer:
      "Absolutely. We send photo and video updates so you can see your best friend settling in, playing, and getting plenty of cuddles while you travel.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Plans change — let us know at least 48 hours before drop-off and you can reschedule or cancel free of charge. Because every booking helps fund our rescue work, we appreciate as much notice as you can give.",
  },
];

export function MuttMotelFaq() {
  return (
    <section className="mt-20">
      <div className="max-w-2xl">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[oklch(0.28_0.035_55)] sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-base font-medium leading-7 text-muted-foreground sm:text-lg">
          Everything you need to know before your dog checks in. Still curious? Get in touch and
          we&apos;ll happily talk you through it.
        </p>
      </div>

      <div className="mt-8 grid gap-3">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl bg-white p-1 shadow-sm ring-1 ring-[oklch(0.89_0.025_80)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-heading text-lg font-bold text-[oklch(0.28_0.035_55)] outline-none transition-colors hover:bg-[oklch(0.72_0.145_62)]/6 focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.145_62)]/40">
              {faq.question}
              <ChevronDown
                className="size-5 shrink-0 text-[oklch(0.72_0.145_62)] transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="px-5 pb-5 pt-1 text-base leading-7 text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
