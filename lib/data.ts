export type Gender = "Male" | "Female";

export interface Dog {
  id: string;
  name: string;
  age: number; // years
  breed: string;
  gender: Gender;
  shortDescription: string;
  description: string;
  /** Hue used for the placeholder photo gradient */
  photoHue: number;
}

export const dogs: Dog[] = [
  {
    id: "biscuit",
    name: "Biscuit",
    age: 2,
    breed: "Labrador Mix",
    gender: "Male",
    shortDescription: "Bouncy ball-chaser with a heart of gold.",
    description:
      "Biscuit was found wandering near the harbour and has been with us for six months. He is endlessly playful, loves other dogs, and would thrive in a home with a garden and people who enjoy long walks. He knows sit, stay and (mostly) fetch.",
    photoHue: 35,
  },
  {
    id: "luna",
    name: "Luna",
    age: 4,
    breed: "Border Collie",
    gender: "Female",
    shortDescription: "Clever, gentle and eager to please.",
    description:
      "Luna is a sharp-minded collie who learns new tricks in an afternoon. She is calm indoors but needs daily exercise and mental stimulation. She is wonderful with children and would suit an active family.",
    photoHue: 60,
  },
  {
    id: "rocky",
    name: "Rocky",
    age: 7,
    breed: "Staffordshire Terrier",
    gender: "Male",
    shortDescription: "A gentle senior looking for a quiet couch.",
    description:
      "Rocky came to us when his previous owner passed away. He is house-trained, mellow, and happiest snoozing next to his person. He would prefer to be the only pet in an adult household.",
    photoHue: 20,
  },
  {
    id: "daisy",
    name: "Daisy",
    age: 1,
    breed: "Africanis",
    gender: "Female",
    shortDescription: "Curious puppy energy, learns fast.",
    description:
      "Daisy is a young Africanis rescued from a roadside litter. She is inquisitive, sociable and full of puppy energy. She is still learning her manners and would benefit from basic training classes with her new family.",
    photoHue: 85,
  },
  {
    id: "max",
    name: "Max",
    age: 3,
    breed: "German Shepherd",
    gender: "Male",
    shortDescription: "Loyal shadow, great watchdog.",
    description:
      "Max bonds deeply with his people and will follow you from room to room. He is protective without being aggressive and walks beautifully on lead. He needs a home with space and an experienced owner.",
    photoHue: 50,
  },
  {
    id: "pepper",
    name: "Pepper",
    age: 5,
    breed: "Jack Russell Terrier",
    gender: "Female",
    shortDescription: "Small dog, enormous personality.",
    description:
      "Pepper is a feisty little terrier who thinks she is a Great Dane. She adores people, tolerates cats, and will happily join you on any adventure. She would suit a home without very small children.",
    photoHue: 15,
  },
  {
    id: "bruno",
    name: "Bruno",
    age: 6,
    breed: "Boerboel Mix",
    gender: "Male",
    shortDescription: "Big softie who loves slow strolls.",
    description:
      "Bruno looks imposing but is a marshmallow. He enjoys gentle walks, sunny naps and having his ears scratched. He is good with other large dogs and needs a garden with sturdy fencing.",
    photoHue: 40,
  },
  {
    id: "mila",
    name: "Mila",
    age: 2,
    breed: "Greyhound",
    gender: "Female",
    shortDescription: "Retired sprinter, professional napper.",
    description:
      "Mila is an ex-racing greyhound who now races only to the couch. She is quiet, clean and surprisingly low-energy. Short bursts of zoomies aside, she is the perfect apartment companion.",
    photoHue: 70,
  },
];

export interface VolunteerEvent {
  id: string;
  title: string;
  date: string; // human-readable
  time: string;
  location: string;
  description: string;
  spotsTotal: number;
  spotsTaken: number;
}

export const volunteerEvents: VolunteerEvent[] = [
  {
    id: "spring-fair-2026",
    title: "Spring Adoption Fair",
    date: "Saturday, 5 September 2026",
    time: "09:00 – 15:00",
    location: "Green Point Park, Cape Town",
    description:
      "Our biggest adoption event of the year. We need volunteers to handle dogs, run the info stand, manage the raffle and help visitors meet their potential new best friends.",
    spotsTotal: 20,
    spotsTaken: 12,
  },
  {
    id: "kennel-day-aug",
    title: "Kennel Clean-Up Day",
    date: "Sunday, 16 August 2026",
    time: "08:00 – 12:00",
    location: "Paw Prints Shelter, Milnerton",
    description:
      "Roll up your sleeves and help us deep-clean kennels, repair bedding and give the play yard a fresh coat of paint. Gloves and refreshments provided.",
    spotsTotal: 15,
    spotsTaken: 15,
  },
  {
    id: "fun-run-2026",
    title: "Paws & Trails Fun Run",
    date: "Saturday, 10 October 2026",
    time: "07:00 – 11:00",
    location: "Table Mountain Lower Contour Path",
    description:
      "A 5 km fundraising fun run where every runner is paired with a shelter dog. Volunteers help with registration, water points and dog handling.",
    spotsTotal: 25,
    spotsTaken: 8,
  },
  {
    id: "photo-day-sept",
    title: "Shelter Photo Day",
    date: "Sunday, 20 September 2026",
    time: "10:00 – 14:00",
    location: "Paw Prints Shelter, Milnerton",
    description:
      "Help our photographer capture adoption photos of every dog. We need dog handlers, treat-wranglers and squeaky-toy operators to get those perfect head tilts.",
    spotsTotal: 10,
    spotsTaken: 10,
  },
  {
    id: "market-stall-nov",
    title: "Weekend Market Stall",
    date: "Saturday, 7 November 2026",
    time: "08:30 – 14:00",
    location: "Oranjezicht City Farm Market",
    description:
      "Staff our merchandise and bake-sale stall at the market. Great for first-time volunteers — you'll be paired with an experienced team member.",
    spotsTotal: 6,
    spotsTaken: 3,
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  brief: string;
  date: string;
  author: string;
  photoHue: number | null;
  body: string[]; // paragraphs
}

export const blogPosts: BlogPost[] = [
  {
    slug: "rocky-finds-his-forever-couch",
    title: "Rocky Finds His Forever Couch",
    brief:
      "After eight months with us, our gentlest senior has been adopted by a retired teacher in Kalk Bay.",
    date: "12 July 2026",
    author: "Naledi M.",
    photoHue: 25,
    body: [
      "Some adoptions take a week. Rocky's took eight months — and it was worth every day of the wait.",
      "Rocky arrived at Paw Prints last November after his owner passed away. At seven years old, with grey around his muzzle, he watched younger dogs get adopted week after week. Senior dogs are consistently overlooked at shelters, and Rocky was no exception.",
      "Then Margaret visited. A retired teacher from Kalk Bay, she told us she wasn't looking for a puppy — she wanted a companion for slow mornings and sea-front strolls. We introduced her to Rocky, and he put his head on her knee within two minutes.",
      "Margaret sends us photos every week. Rocky has claimed the sunniest corner of her couch, made friends with the neighbour's dachshund, and discovered a deep love of sardines.",
      "If Rocky's story moved you, remember: senior dogs are calm, house-trained, and endlessly grateful. Ask us about our seniors-for-seniors adoption programme.",
    ],
  },
  {
    slug: "winter-blanket-drive-results",
    title: "Winter Blanket Drive: You Showed Up",
    brief:
      "Our community donated 340 blankets, 80 kg of food and countless tins. Here's where it all went.",
    date: "28 June 2026",
    author: "Sipho K.",
    photoHue: 260,
    body: [
      "When we launched this year's winter blanket drive, we hoped for 150 blankets. You brought us 340.",
      "Every kennel at the shelter now has double bedding, and we passed the surplus to two partner shelters in Khayelitsha and Atlantis. The 80 kg of donated food filled our storeroom for the first time since 2024.",
      "Special thanks to the learners of Sunridge Primary, who ran a blanket collection competition between classes, and to the anonymous donor who arrived with a bakkie full of dog food and drove off before we could say thank you.",
      "Our next drive starts in May 2027 — but donations are welcome all year round. See our donations page for what we currently need most.",
    ],
  },
  {
    slug: "five-things-before-adopting",
    title: "Five Things to Know Before You Adopt",
    brief:
      "Thinking about adopting? Our behaviourist shares the five questions every family should answer first.",
    date: "15 June 2026",
    author: "Dr. Anika P.",
    photoHue: null,
    body: [
      "Adopting a rescue dog is one of the most rewarding things you can do — and one of the biggest commitments. Before you fill in an application, our behaviourist recommends answering these five questions honestly.",
      "One: How much time is really in your day? Dogs need company, exercise and training every single day, not just on weekends.",
      "Two: Is everyone in the household on board? A dog adopted by one enthusiastic family member and tolerated by the rest rarely thrives.",
      "Three: Can your budget handle the vet? Beyond food, plan for annual vaccinations, sterilisation, and the unexpected.",
      "Four: What energy level fits your life? A border collie in a flat is a recipe for chewed furniture. Be honest about your activity level — our Dog Matcher can help.",
      "Five: Are you ready for an adjustment period? Most rescue dogs need three months to fully settle. Patience in those first weeks pays off for a decade.",
      "If you answered yes to all five — we would love to meet you. Browse our dogs or try the matcher to find your fit.",
    ],
  },
  {
    slug: "new-puppy-enclosure-open",
    title: "Our New Puppy Enclosure Is Open",
    brief:
      "Thanks to your cash donations, the puppies now have a warm, secure space with a proper play yard.",
    date: "2 June 2026",
    author: "Naledi M.",
    photoHue: 140,
    body: [
      "Eighteen months ago we set a goal: replace the draughty old puppy shed with a proper enclosure. This week, we cut the ribbon.",
      "The new enclosure has underfloor heating for winter litters, an isolation bay for new arrivals, and a grassed play yard with puppy-safe equipment. It can house four litters comfortably — something that felt impossible when three litters arrived in one week last year.",
      "This building exists because of cash donations. From the R50 monthly debit orders to the anonymous R20,000 gift in March, every rand went through our building fund, and we published the full cost breakdown in our annual report.",
      "Come and visit on our next open day — the puppies are ready to show off their new digs.",
    ],
  },
];

export interface AdopterStory {
  id: string;
  adopter: string;
  dogName: string;
  quote: string;
  detail: string;
  photoHue: number;
}

export const adopterStories: AdopterStory[] = [
  {
    id: "thandi-and-bella",
    adopter: "Thandi",
    dogName: "Bella",
    quote: "Bella went from a scared stray to my daughter's best friend in a month.",
    detail:
      "Bella was rescued from a storm drain in 2024. Today she walks Thandi's daughter to the school gate every morning and waits at the window every afternoon.",
    photoHue: 30,
  },
  {
    id: "james-and-duke",
    adopter: "James",
    dogName: "Duke",
    quote: "Everyone said a senior dog would be boring. Duke has hiked six mountains with me.",
    detail:
      "Duke was surrendered at age eight. James took a chance on him at our 2025 Spring Fair, and the pair have been inseparable trail partners ever since.",
    photoHue: 55,
  },
  {
    id: "ayesha-and-pip",
    adopter: "Ayesha",
    dogName: "Pip",
    quote: "The matcher paired us perfectly — Pip is exactly the calm flatmate I needed.",
    detail:
      "Ayesha lives in a small flat and worried adoption wasn't for her. Our team matched her with Pip, a quiet greyhound mix who now runs a strict schedule of naps.",
    photoHue: 80,
  },
];

export const physicalDonationItems = [
  { item: "Blankets & towels", note: "Our most-needed item, especially before winter" },
  { item: "Dry dog food", note: "Adult and puppy — any reputable brand" },
  { item: "Tinned food & treats", note: "Used daily for training and medication" },
  { item: "Collars, leads & harnesses", note: "All sizes, new or gently used" },
  { item: "Toys & chews", note: "Durable toys keep kennel dogs stimulated" },
  { item: "Newspaper & puppy pads", note: "We go through mountains of these" },
];

export const cashDonationUses = [
  {
    title: "Veterinary care",
    detail: "Sterilisation, vaccination and emergency treatment for every rescue.",
  },
  {
    title: "Food & shelter",
    detail: "Feeding 60+ dogs daily and maintaining safe, warm kennels.",
  },
  {
    title: "Rescue operations",
    detail: "Fuel and equipment for responding to stray and abuse reports.",
  },
  {
    title: "Community outreach",
    detail: "Free sterilisation drives and education in under-resourced areas.",
  },
];
