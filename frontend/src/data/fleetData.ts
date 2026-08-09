export interface FleetFeature {
  title: string;
  description: string;
}

export interface FleetVehicle {
  name: string;
  slug: string;
  category: string;

  heroDescription: string;
  description: string;

  image: string;
  gallery: string[];

  imageCredit?: string;
  imageSource?: string;
  imageLicense?: string;

  passengers: number;
  largeBags: number;
  cabinBags: number;

  featured?: boolean;

  suitableFor: string[];
  features: FleetFeature[];
}

/* =========================================================
   PRIVATE CHAUFFEUR MELBOURNE — APPROVED FLEET
   Only executive/luxury chauffeur vehicles.
   No sports cars.
========================================================= */

export const fleetData: FleetVehicle[] = [
  /* =======================================================
     BMW 7 SERIES
  ======================================================= */

  {
    name: "BMW 7 Series",
    slug: "bmw-7-series",

    category: "Luxury Executive Sedan",

    heroDescription:
      "Premium BMW chauffeur travel for executive appointments, Melbourne Airport transfers, VIP guests and private journeys.",

    description:
      "The BMW 7 Series combines refined luxury, spacious rear-seat comfort and a polished executive presence. It is an excellent chauffeur vehicle for airport transfers, corporate travel, VIP guests, hotel transfers and premium private journeys throughout Melbourne.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW%207%20Series%20G12%20LCI%20black%20(1).jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW%207%20Series%20G12%20LCI%20black%20(1).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW%207%20Series%20G12%20black%20(2).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW%207%20Series%20G12%20black%20(1).jpg",
    ],

    imageCredit: "Damian B Oh / Wikimedia Commons",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:BMW_7_Series_G12_LCI_black_(1).jpg",
    imageLicense: "CC BY-SA 4.0",

    passengers: 4,
    largeBags: 2,
    cabinBags: 2,

    featured: true,

    suitableFor: [
      "Melbourne Airport transfers",
      "Corporate chauffeur travel",
      "Executive meetings",
      "VIP guest transport",
      "Hotel transfers",
      "Wedding chauffeur service",
      "Private Melbourne journeys",
    ],

    features: [
      {
        title: "Flagship executive comfort",
        description:
          "A spacious premium cabin designed for relaxed chauffeur-driven travel.",
      },
      {
        title: "Professional presentation",
        description:
          "A polished luxury sedan for executives, VIP guests and corporate clients.",
      },
      {
        title: "Premium rear-seat experience",
        description:
          "Comfort-focused passenger seating suited to business and private journeys.",
      },
      {
        title: "Versatile chauffeur use",
        description:
          "Suitable for airport, hotel, corporate, wedding and private transport.",
      },
    ],
  },

  /* =======================================================
     MERCEDES-BENZ S-CLASS
  ======================================================= */

  {
    name: "Mercedes-Benz S-Class",
    slug: "mercedes-benz-s-class",

    category: "Flagship Luxury Sedan",

    heroDescription:
      "Flagship Mercedes-Benz chauffeur travel offering exceptional comfort, privacy and refined executive presentation.",

    description:
      "The Mercedes-Benz S-Class is a premium chauffeur sedan designed for passengers who value comfort, discretion and sophisticated presentation. It is especially suited to VIP transfers, executive travel, Melbourne Airport journeys, weddings and luxury hotel transfers.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes-Benz%20S-Class%20W223%20black.jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes-Benz%20S-Class%20W223%20black.jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes%20s-class%20w223%20black%20(1).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes%20s-class%20w223%20black%20(2).jpg",
    ],

    imageCredit: "Damian B Oh / Wikimedia Commons",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Mercedes-Benz_S-Class_W223_black.jpg",
    imageLicense: "Creative Commons Attribution-ShareAlike",

    passengers: 4,
    largeBags: 2,
    cabinBags: 2,

    featured: true,

    suitableFor: [
      "VIP airport transfers",
      "Senior executive travel",
      "Corporate chauffeur service",
      "Wedding chauffeur transport",
      "Luxury hotel transfers",
      "Special events",
      "Private chauffeur journeys",
    ],

    features: [
      {
        title: "Flagship Mercedes-Benz luxury",
        description:
          "Premium chauffeur presentation for executive and VIP passengers.",
      },
      {
        title: "Exceptional passenger comfort",
        description:
          "A refined rear cabin suited to important and longer chauffeur journeys.",
      },
      {
        title: "Discreet executive travel",
        description:
          "Ideal for senior executives, corporate guests and private clients.",
      },
      {
        title: "Premium special-event choice",
        description:
          "A sophisticated option for weddings, formal events and luxury transfers.",
      },
    ],
  },

  /* =======================================================
     MERCEDES-BENZ E-CLASS
  ======================================================= */

  {
    name: "Mercedes-Benz E-Class",
    slug: "mercedes-benz-e-class",

    category: "Executive Sedan",

    heroDescription:
      "Refined executive chauffeur travel for Melbourne Airport transfers, business appointments, hotels and private journeys.",

    description:
      "The Mercedes-Benz E-Class offers a balanced combination of executive comfort, elegant presentation and practical luxury. It is a strong choice for airport transfers, business travel, hotel transfers and private chauffeur bookings throughout Melbourne.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes%20E%20class%20W213%20Exclusive%20black%20(1).jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes%20E%20class%20W213%20Exclusive%20black%20(1).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes%20E%20class%20W213%20Exclusive%20black%20(2).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes-Benz-E-Class-Black.JPG",
    ],

    imageCredit: "Damian B Oh / Wikimedia Commons",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Mercedes_E_class_W213_Exclusive_black_(1).jpg",
    imageLicense: "Creative Commons Attribution-ShareAlike",

    passengers: 4,
    largeBags: 2,
    cabinBags: 2,

    featured: true,

    suitableFor: [
      "Melbourne Airport transfers",
      "Corporate travel",
      "Business appointments",
      "Hotel transfers",
      "Conference transfers",
      "Hourly chauffeur hire",
      "Private journeys",
    ],

    features: [
      {
        title: "Executive comfort",
        description:
          "A refined passenger cabin suitable for business and private travel.",
      },
      {
        title: "Professional presentation",
        description:
          "Elegant styling suited to corporate clients and visiting executives.",
      },
      {
        title: "Airport suitability",
        description:
          "Well suited to individuals and small groups with moderate luggage.",
      },
      {
        title: "Everyday premium travel",
        description:
          "Ideal for CBD, airport, suburban and hotel chauffeur journeys.",
      },
    ],
  },

  /* =======================================================
     MERCEDES-BENZ GLE
  ======================================================= */

  {
    name: "Mercedes-Benz GLE",
    slug: "mercedes-benz-gle",

    category: "Luxury SUV",

    heroDescription:
      "Premium Mercedes-Benz SUV travel with additional passenger comfort and luggage flexibility for Melbourne chauffeur journeys.",

    description:
      "The Mercedes-Benz GLE provides spacious luxury SUV comfort with excellent passenger access and useful luggage capacity. It is suited to airport transfers, family travel, executive journeys, private tours and regional chauffeur bookings.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes%20gle%20w167%20black%20(1).jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes%20gle%20w167%20black%20(1).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercedes%20gle%20w167%20black%20(2).jpg",
      "https://images.unsplash.com/photo-1732347700493-44e8e1e79c9a?auto=format&fit=crop&w=1600&q=85",
    ],

    imageCredit: "Damian B Oh / Wikimedia Commons",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Mercedes_gle_w167_black_(1).jpg",
    imageLicense: "Creative Commons Attribution-ShareAlike",

    passengers: 4,
    largeBags: 3,
    cabinBags: 2,

    featured: true,

    suitableFor: [
      "Melbourne Airport transfers",
      "Family chauffeur travel",
      "Corporate travel",
      "Private touring",
      "Regional Victoria travel",
      "Hotel transfers",
      "Long-distance transfers",
    ],

    features: [
      {
        title: "Luxury SUV comfort",
        description:
          "A spacious premium cabin with elevated seating and easy passenger access.",
      },
      {
        title: "Additional luggage room",
        description:
          "Useful for airport passengers carrying larger or multiple bags.",
      },
      {
        title: "Flexible passenger experience",
        description:
          "Suitable for families, executives and private travellers.",
      },
      {
        title: "Regional journey comfort",
        description:
          "Well suited to longer chauffeur journeys beyond Melbourne CBD.",
      },
    ],
  },

  /* =======================================================
     MERCEDES-BENZ GL
  ======================================================= */

  {
    name: "Mercedes-Benz GL",
    slug: "mercedes-benz-gl",

    category: "Large Luxury SUV",

    heroDescription:
      "Spacious Mercedes-Benz luxury SUV chauffeur travel for airport transfers, families, groups and longer journeys.",

    description:
      "The Mercedes-Benz GL offers generous interior space, premium SUV comfort and practical versatility for passengers requiring additional room. It is suited to family airport transfers, small groups, private travel and regional chauffeur journeys.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moscow,%20Mercedes-Benz%20X164%20(GL-class)%20black,%20Mar%202026%2002.jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moscow,%20Mercedes-Benz%20X164%20(GL-class)%20black,%20Mar%202026%2002.jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moscow,%20Mercedes-Benz%20X164%20(GL-class)%20black,%20Mar%202026%2002.jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Black%20mercedes%20benz%20steering%20wheel-Uxc9SiOB7U8.jpg",
    ],

    imageCredit: "Wikimedia Commons contributors",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Moscow,_Mercedes-Benz_X164_(GL-class)_black,_Mar_2026_02.jpg",
    imageLicense: "See Wikimedia Commons file page for licence details",

    passengers: 6,
    largeBags: 3,
    cabinBags: 3,

    featured: false,

    suitableFor: [
      "Family airport transfers",
      "Small group travel",
      "Private chauffeur journeys",
      "Regional Victoria travel",
      "Hotel transfers",
      "Event transportation",
      "Long-distance transfers",
    ],

    features: [
      {
        title: "Large SUV cabin",
        description:
          "Additional passenger space for families and small groups.",
      },
      {
        title: "Flexible passenger capacity",
        description:
          "A useful option when greater interior room is required.",
      },
      {
        title: "Practical luggage space",
        description:
          "Suitable for airport and longer journeys with additional baggage.",
      },
      {
        title: "Comfortable regional travel",
        description:
          "Designed for relaxed chauffeur journeys across Melbourne and Victoria.",
      },
    ],
  },

  /* =======================================================
     BMW X7
  ======================================================= */

  {
    name: "BMW X7",
    slug: "bmw-x7",

    category: "Luxury Large SUV",

    heroDescription:
      "Spacious BMW luxury SUV chauffeur travel for airport transfers, families, executives, groups and regional journeys.",

    description:
      "The BMW X7 combines generous passenger space, premium comfort and strong luxury presentation. It is ideal for Melbourne Airport transfers, family chauffeur travel, executive groups, private touring and longer regional journeys.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW%20X7%20G07%20black%20(1).jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW%20X7%20G07%20black%20(1).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW%20X7%20G07%20black%20(2).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW%20X7%20Xdrive%2040i%20G07%20Black%20Diplomatic%20(1).jpg",
    ],

    imageCredit: "Damian B Oh / Wikimedia Commons",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:BMW_X7_G07_black_(1).jpg",
    imageLicense: "CC BY-SA",

    passengers: 6,
    largeBags: 3,
    cabinBags: 3,

    featured: true,

    suitableFor: [
      "Melbourne Airport transfers",
      "Family chauffeur travel",
      "Executive group travel",
      "Private tours",
      "Regional Victoria transfers",
      "Hotel transfers",
      "Premium event transport",
    ],

    features: [
      {
        title: "Spacious luxury cabin",
        description:
          "Generous passenger room for executive, family and private group travel.",
      },
      {
        title: "Premium SUV presentation",
        description:
          "A refined and commanding vehicle suited to luxury chauffeur service.",
      },
      {
        title: "Flexible luggage capacity",
        description:
          "Useful for airport and longer journeys requiring additional baggage room.",
      },
      {
        title: "Regional travel comfort",
        description:
          "Well suited to longer journeys throughout Melbourne and Victoria.",
      },
    ],
  },

  /* =======================================================
     AUDI Q7
  ======================================================= */

  {
    name: "Audi Q7",
    slug: "audi-q7",

    category: "Executive Luxury SUV",

    heroDescription:
      "Refined Audi SUV chauffeur travel offering premium passenger comfort, space and luggage flexibility.",

    description:
      "The Audi Q7 combines understated executive styling with versatile SUV space. It is suitable for Melbourne Airport transfers, corporate journeys, family travel, hotel transfers, private tours and regional chauffeur bookings.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audi%20Q7%204M%20black%20(2).jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audi%20Q7%204M%20black%20(2).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audi%20Q7%204L%20Brilliant%20Black%20(2).jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audi%20Q7%204L%20Brilliant%20Black%20(4).jpg",
    ],

    imageCredit: "Damian B Oh / Wikimedia Commons",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Audi_Q7_4M_black_(2).jpg",
    imageLicense: "Creative Commons Attribution-ShareAlike",

    passengers: 6,
    largeBags: 3,
    cabinBags: 3,

    featured: false,

    suitableFor: [
      "Melbourne Airport transfers",
      "Corporate chauffeur travel",
      "Family journeys",
      "Hotel transfers",
      "Private Melbourne tours",
      "Regional transfers",
      "Conference travel",
    ],

    features: [
      {
        title: "Executive SUV comfort",
        description:
          "A refined cabin suitable for corporate, airport and private travel.",
      },
      {
        title: "Flexible passenger space",
        description:
          "Well suited to families and small groups requiring additional room.",
      },
      {
        title: "Practical luggage capacity",
        description:
          "A useful choice for airport transfers and longer journeys.",
      },
      {
        title: "Professional presentation",
        description:
          "Understated premium styling appropriate for chauffeur service.",
      },
    ],
  },
];

/* =========================================================
   FLEET HELPERS
========================================================= */

export const getFleetVehicleBySlug = (
  slug?: string,
): FleetVehicle | undefined =>
  fleetData.find((vehicle) => vehicle.slug === slug);

export const getFeaturedFleet = (): FleetVehicle[] =>
  fleetData.filter((vehicle) => vehicle.featured);

export const getFleetBySlugs = (
  slugs: string[],
): FleetVehicle[] =>
  fleetData.filter((vehicle) =>
    slugs.includes(vehicle.slug),
  );