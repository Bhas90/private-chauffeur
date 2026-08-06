export interface ServiceAreaFaq {
  question: string;
  answer: string;
}

export interface ServiceAreaItem {
  name: string;
  slug: string;
  region: string;
  heroDescription: string;
  introduction: string;
  image: string;
  services: string[];
  highlights: string[];
  nearbyAreas: string[];
  faqs: ServiceAreaFaq[];
}

const commonAirportServices = [
  "Melbourne Airport transfers",
  "Corporate chauffeur travel",
  "Private chauffeur hire",
  "Wedding and event transport",
  "Hourly chauffeur hire",
  "Return journey bookings",
];

export const serviceAreasData: ServiceAreaItem[] = [
  {
    name: "Melbourne CBD",
    slug: "melbourne-cbd",
    region: "Central Melbourne",
    heroDescription:
      "Private chauffeur services for Melbourne CBD airport transfers, corporate travel, hotels, events and private journeys.",
    introduction:
      "Travel throughout Melbourne CBD with a professional chauffeur service tailored to airport transfers, business appointments, hotels, events and private travel.",
    image:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Melbourne Airport transfers",
      "Corporate chauffeur travel",
      "Hotel transfers",
      "Conference transfers",
      "Event transport",
      "Hourly chauffeur hire",
    ],
    highlights: [
      "Door-to-door CBD travel",
      "Airport and hotel pickups",
      "Business and executive transport",
      "Available for early and late journeys",
      "Suitable for private and corporate customers",
      "Regional travel from Melbourne CBD",
    ],
    nearbyAreas: [
      "South Melbourne",
      "North Melbourne",
      "East Melbourne",
      "West Melbourne",
      "Richmond",
      "South Yarra",
    ],
    faqs: [
      {
        question: "Can I book a chauffeur from Melbourne CBD to the airport?",
        answer:
          "Yes. Melbourne CBD airport transfers can be requested for domestic and international flights.",
      },
      {
        question: "Do you provide hotel pickups in Melbourne CBD?",
        answer:
          "Yes. Add the hotel name, pickup time and destination when requesting your quote.",
      },
    ],
  },

  {
    name: "Lancefield",
    slug: "lancefield",
    region: "Macedon Ranges",
    heroDescription:
      "Private chauffeur transfers between Lancefield, Melbourne Airport, Melbourne CBD and surrounding Victorian destinations.",
    introduction:
      "Arrange professional chauffeur travel from Lancefield for airport journeys, private appointments, weddings, events and Melbourne transfers.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Melbourne CBD transfers",
      "Private day travel",
      "Wedding chauffeur service",
      "Event transfers",
      "Regional journeys",
    ],
    highlights: [
      "Direct travel to Melbourne Airport",
      "Regional pickup and drop-off",
      "Private and family travel",
      "Flexible vehicle selection",
      "Return journey requests",
      "Pre-arranged chauffeur service",
    ],
    nearbyAreas: [
      "Romsey",
      "Kilmore",
      "Woodend",
      "Wandong",
      "Wallan",
      "Gisborne",
    ],
    faqs: [
      {
        question: "Can I book a Lancefield to Melbourne Airport transfer?",
        answer:
          "Yes. Provide your flight number, pickup time, passenger count and luggage details.",
      },
      {
        question: "Can I arrange a return journey to Lancefield?",
        answer:
          "Yes. Add both outbound and return travel information to your quote request.",
      },
    ],
  },

  {
    name: "Camberwell",
    slug: "camberwell",
    region: "Eastern Melbourne",
    heroDescription:
      "Professional chauffeur travel in Camberwell for airports, corporate appointments, hotels and private journeys.",
    introduction:
      "Book reliable chauffeur travel in Camberwell for Melbourne Airport transfers, corporate travel, weddings, events and private transport.",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Corporate chauffeur travel",
      "Hourly chauffeur hire",
      "Wedding transport",
      "Private events",
      "Hotel transfers",
    ],
    highlights: [
      "Camberwell door-to-door pickup",
      "Airport and CBD travel",
      "Corporate appointments",
      "Private events",
      "Return bookings",
      "Professional chauffeur service",
    ],
    nearbyAreas: [
      "Kew",
      "Richmond",
      "Toorak",
      "South Yarra",
      "Melbourne CBD",
    ],
    faqs: [
      {
        question: "Do you provide Camberwell airport transfers?",
        answer:
          "Yes. Airport transfers can be requested from Camberwell to Melbourne Airport or Avalon Airport.",
      },
      {
        question: "Can I book an hourly chauffeur in Camberwell?",
        answer:
          "Yes. Hourly chauffeur hire can be requested for meetings, events and multiple-stop journeys.",
      },
    ],
  },

  {
    name: "South Melbourne",
    slug: "south-melbourne",
    region: "Inner Melbourne",
    heroDescription:
      "Private chauffeur services for South Melbourne airport transfers, business travel, events and hotel journeys.",
    introduction:
      "Arrange professional chauffeur travel from South Melbourne to airports, Melbourne CBD, hotels, meetings and event venues.",
    image:
      "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Corporate chauffeur travel",
      "Hotel transfers",
      "Event transfers",
      "Hourly hire",
      "Private journeys",
    ],
    highlights: [
      "South Melbourne pickup",
      "Melbourne Airport transfers",
      "CBD and hotel travel",
      "Business appointments",
      "Private event transport",
      "Flexible booking options",
    ],
    nearbyAreas: [
      "Melbourne CBD",
      "South Yarra",
      "Richmond",
      "West Melbourne",
    ],
    faqs: [
      {
        question: "Can I arrange a South Melbourne hotel transfer?",
        answer:
          "Yes. Provide your hotel or accommodation details when requesting a quote.",
      },
      {
        question: "Do you provide corporate travel from South Melbourne?",
        answer:
          "Yes. Executive transport can be requested for offices, meetings, conferences and airports.",
      },
    ],
  },

  {
    name: "North Melbourne",
    slug: "north-melbourne",
    region: "Inner Melbourne",
    heroDescription:
      "Professional chauffeur transfers from North Melbourne to airports, Melbourne CBD and surrounding destinations.",
    introduction:
      "Book chauffeur travel in North Melbourne for airport pickups, corporate appointments, events and private journeys.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=85",
    services: commonAirportServices,
    highlights: [
      "North Melbourne pickup",
      "Airport travel",
      "CBD appointments",
      "Corporate bookings",
      "Return journeys",
      "Private travel",
    ],
    nearbyAreas: [
      "Melbourne CBD",
      "West Melbourne",
      "East Melbourne",
      "Richmond",
    ],
    faqs: [
      {
        question: "Are early-morning airport pickups available?",
        answer:
          "Yes. Early journeys may be requested, subject to confirmation and vehicle availability.",
      },
      {
        question: "Can I book a chauffeur for several appointments?",
        answer:
          "Yes. Add all intended stops and expected waiting time to the quote request.",
      },
    ],
  },

  {
    name: "Richmond",
    slug: "richmond",
    region: "Inner East",
    heroDescription:
      "Private chauffeur services in Richmond for airports, events, corporate travel and Melbourne journeys.",
    introduction:
      "Travel from Richmond with a professional chauffeur for airport transfers, events, business appointments and private bookings.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Corporate chauffeur travel",
      "Event transfers",
      "Hotel transfers",
      "Hourly chauffeur hire",
      "Private travel",
    ],
    highlights: [
      "Richmond pickup",
      "Airport transfers",
      "Sporting event transport",
      "Corporate appointments",
      "Hotel travel",
      "Private journeys",
    ],
    nearbyAreas: [
      "Melbourne CBD",
      "Kew",
      "South Yarra",
      "Toorak",
      "Camberwell",
    ],
    faqs: [
      {
        question: "Can I book chauffeur travel for a Richmond event?",
        answer:
          "Yes. Add the venue, event time and return requirements to your quote request.",
      },
      {
        question: "Can you collect passengers after a sporting event?",
        answer:
          "Yes. Include the venue, expected finish time and preferred collection point.",
      },
    ],
  },

  {
    name: "Mickleham",
    slug: "mickleham",
    region: "Northern Melbourne",
    heroDescription:
      "Private chauffeur transfers from Mickleham to Melbourne Airport, Melbourne CBD and regional destinations.",
    introduction:
      "Arrange chauffeur travel from Mickleham for airport transfers, private journeys, weddings, events and Melbourne appointments.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Melbourne CBD travel",
      "Private journeys",
      "Event transfers",
      "Wedding transport",
      "Regional transfers",
    ],
    highlights: [
      "Mickleham pickup",
      "Airport transfers",
      "CBD travel",
      "Private bookings",
      "Regional journeys",
      "Return transport",
    ],
    nearbyAreas: ["Wallan", "Wandong", "Kilmore", "Melbourne CBD"],
    faqs: [
      {
        question: "Can I arrange a Mickleham airport transfer?",
        answer:
          "Yes. Include your flight and luggage information when requesting the booking.",
      },
      {
        question: "Can I book transport from Mickleham to Melbourne CBD?",
        answer:
          "Yes. Private and corporate Melbourne CBD transfers can be arranged.",
      },
    ],
  },

  {
    name: "South Yarra",
    slug: "south-yarra",
    region: "Inner South-East",
    heroDescription:
      "Premium chauffeur services in South Yarra for airport, hotel, corporate and private Melbourne travel.",
    introduction:
      "Book chauffeur travel in South Yarra for airports, hotels, corporate appointments, weddings, events and private journeys.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Hotel chauffeur service",
      "Corporate travel",
      "Private events",
      "Hourly chauffeur hire",
      "Wedding transport",
    ],
    highlights: [
      "South Yarra pickup",
      "Premium hotel transfers",
      "Airport travel",
      "Corporate appointments",
      "Private events",
      "Flexible chauffeur hire",
    ],
    nearbyAreas: [
      "Toorak",
      "Richmond",
      "Melbourne CBD",
      "South Melbourne",
    ],
    faqs: [
      {
        question: "Can I book a hotel transfer from South Yarra?",
        answer:
          "Yes. Hotel, airport and event transfers can be requested from South Yarra.",
      },
      {
        question: "Can I request a premium vehicle?",
        answer:
          "Yes. Add your preferred vehicle when requesting the quote. Confirmation depends on availability.",
      },
    ],
  },

  {
    name: "Toorak",
    slug: "toorak",
    region: "Inner South-East",
    heroDescription:
      "Premium private chauffeur services for Toorak airport transfers, corporate appointments and special events.",
    introduction:
      "Arrange discreet and professional chauffeur travel in Toorak for airports, business travel, weddings and private events.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Corporate chauffeur service",
      "Wedding transport",
      "Private events",
      "Hourly chauffeur hire",
      "Hotel transfers",
    ],
    highlights: [
      "Private Toorak pickup",
      "Luxury airport travel",
      "Corporate journeys",
      "Wedding bookings",
      "Event chauffeur service",
      "Vehicle preference requests",
    ],
    nearbyAreas: ["South Yarra", "Richmond", "Camberwell", "Kew"],
    faqs: [
      {
        question: "Can I request a luxury vehicle in Toorak?",
        answer:
          "Yes. Add your preferred vehicle to the quote form. Confirmation depends on availability.",
      },
      {
        question: "Do you provide wedding chauffeur services in Toorak?",
        answer:
          "Yes. Wedding transport can be planned around the ceremony, photography and reception schedule.",
      },
    ],
  },

  {
    name: "Gisborne",
    slug: "gisborne",
    region: "Macedon Ranges",
    heroDescription:
      "Private chauffeur transfers from Gisborne to Melbourne Airport, Melbourne CBD and regional destinations.",
    introduction:
      "Book professional chauffeur travel in Gisborne for airports, weddings, private events and Melbourne appointments.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Wedding chauffeur service",
      "Melbourne CBD travel",
      "Private tours",
      "Event transfers",
      "Regional journeys",
    ],
    highlights: [
      "Gisborne pickup",
      "Airport travel",
      "Macedon Ranges journeys",
      "Wedding transport",
      "Private bookings",
      "Return transfers",
    ],
    nearbyAreas: ["Woodend", "Kyneton", "Romsey", "Lancefield"],
    faqs: [
      {
        question: "Can you provide Gisborne to Melbourne Airport transfers?",
        answer:
          "Yes. Submit your pickup time, flight details, passenger count and luggage requirements.",
      },
      {
        question: "Can I arrange a private day trip from Gisborne?",
        answer:
          "Yes. Share your planned destinations and timing for a tailored quotation.",
      },
    ],
  },

  {
    name: "Kyneton",
    slug: "kyneton",
    region: "Macedon Ranges",
    heroDescription:
      "Private chauffeur travel from Kyneton to Melbourne Airport, Melbourne CBD and Victorian destinations.",
    introduction:
      "Arrange chauffeur travel in Kyneton for airports, events, private tours, weddings and Melbourne journeys.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Private tours",
      "Wedding transport",
      "Event transfers",
      "Melbourne CBD transfers",
      "Regional travel",
    ],
    highlights: [
      "Kyneton pickup",
      "Airport transfers",
      "Regional travel",
      "Private day journeys",
      "Event transport",
      "Return bookings",
    ],
    nearbyAreas: ["Woodend", "Gisborne", "Lancefield", "Romsey"],
    faqs: [
      {
        question: "Can I arrange a private journey from Kyneton?",
        answer:
          "Yes. Provide the pickup, destination and travel schedule for a tailored quote.",
      },
      {
        question: "Can I book Kyneton to Melbourne Airport?",
        answer:
          "Yes. Include your flight time, passenger number and luggage information.",
      },
    ],
  },

  {
    name: "East Melbourne",
    slug: "east-melbourne",
    region: "Inner Melbourne",
    heroDescription:
      "Professional chauffeur services in East Melbourne for airports, hotels, hospitals, events and corporate travel.",
    introduction:
      "Book chauffeur travel in East Melbourne for airport transfers, hotels, events, medical appointments and private journeys.",
    image:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Hotel transfers",
      "Corporate travel",
      "Event transport",
      "Private chauffeur hire",
      "Hourly travel",
    ],
    highlights: [
      "East Melbourne pickup",
      "Airport travel",
      "Hotel and venue transfers",
      "Corporate appointments",
      "Private bookings",
      "Return journeys",
    ],
    nearbyAreas: [
      "Melbourne CBD",
      "Richmond",
      "North Melbourne",
      "Kew",
    ],
    faqs: [
      {
        question: "Can I book a chauffeur for an East Melbourne appointment?",
        answer:
          "Yes. Add your pickup location, appointment address and preferred collection time.",
      },
      {
        question: "Do you provide hotel pickups in East Melbourne?",
        answer:
          "Yes. Hotel, airport and event transfers can be arranged.",
      },
    ],
  },

  {
    name: "West Melbourne",
    slug: "west-melbourne",
    region: "Inner Melbourne",
    heroDescription:
      "Private chauffeur transfers from West Melbourne to airports, hotels, business venues and surrounding suburbs.",
    introduction:
      "Arrange professional chauffeur travel in West Melbourne for airport transfers, corporate travel, events and private journeys.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1800&q=85",
    services: commonAirportServices,
    highlights: [
      "West Melbourne pickup",
      "Airport transfers",
      "CBD and Docklands travel",
      "Corporate appointments",
      "Hotel transfers",
      "Private chauffeur bookings",
    ],
    nearbyAreas: [
      "Melbourne CBD",
      "North Melbourne",
      "South Melbourne",
      "East Melbourne",
    ],
    faqs: [
      {
        question: "Can I book an airport transfer from West Melbourne?",
        answer:
          "Yes. Airport pickups and drop-offs can be arranged for domestic and international flights.",
      },
      {
        question: "Can I request a return transfer?",
        answer:
          "Yes. Add your return date and pickup time when submitting the request.",
      },
    ],
  },

  {
    name: "Kilmore",
    slug: "kilmore",
    region: "Northern Victoria",
    heroDescription:
      "Professional chauffeur transfers from Kilmore to Melbourne Airport, Melbourne CBD and regional destinations.",
    introduction:
      "Book chauffeur travel from Kilmore for airport transfers, private appointments, weddings, events and Melbourne journeys.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Melbourne CBD travel",
      "Wedding transport",
      "Private journeys",
      "Event transfers",
      "Regional travel",
    ],
    highlights: [
      "Kilmore pickup",
      "Melbourne Airport travel",
      "Regional transfers",
      "Private and family bookings",
      "Return travel",
      "Pre-arranged chauffeur service",
    ],
    nearbyAreas: ["Wallan", "Wandong", "Lancefield", "Romsey"],
    faqs: [
      {
        question: "Can I book Kilmore to Melbourne Airport?",
        answer:
          "Yes. Provide the flight time, luggage details and preferred pickup time.",
      },
      {
        question: "Do you provide wedding transport in Kilmore?",
        answer:
          "Yes. Wedding journeys can be tailored around the ceremony and reception itinerary.",
      },
    ],
  },

  {
    name: "Woodend",
    slug: "woodend",
    region: "Macedon Ranges",
    heroDescription:
      "Private chauffeur services from Woodend to Melbourne Airport, Melbourne CBD and Macedon Ranges destinations.",
    introduction:
      "Arrange chauffeur travel from Woodend for airport transfers, weddings, private tours, events and Melbourne appointments.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Private tours",
      "Wedding chauffeur service",
      "Event transport",
      "Melbourne CBD travel",
      "Regional journeys",
    ],
    highlights: [
      "Woodend pickup",
      "Airport transfers",
      "Macedon Ranges travel",
      "Wedding and event transport",
      "Private day trips",
      "Return journey requests",
    ],
    nearbyAreas: ["Gisborne", "Kyneton", "Lancefield", "Romsey"],
    faqs: [
      {
        question: "Can I arrange a Woodend airport transfer?",
        answer:
          "Yes. Melbourne Airport transfers can be requested from Woodend.",
      },
      {
        question: "Can I book a private chauffeur tour from Woodend?",
        answer:
          "Yes. Provide the destinations, stops and expected journey duration.",
      },
    ],
  },

  {
    name: "Wallan",
    slug: "wallan",
    region: "Northern Victoria",
    heroDescription:
      "Private chauffeur transfers from Wallan to Melbourne Airport, Melbourne CBD and surrounding Victorian destinations.",
    introduction:
      "Book professional chauffeur travel in Wallan for airport journeys, private appointments, events and Melbourne transfers.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Melbourne CBD transfers",
      "Corporate travel",
      "Wedding transport",
      "Private journeys",
      "Regional transfers",
    ],
    highlights: [
      "Wallan pickup",
      "Airport transfers",
      "Melbourne CBD travel",
      "Private and business bookings",
      "Return journeys",
      "Regional chauffeur travel",
    ],
    nearbyAreas: ["Wandong", "Kilmore", "Mickleham", "Lancefield"],
    faqs: [
      {
        question: "Can you provide Wallan to Melbourne Airport transfers?",
        answer:
          "Yes. Submit your flight, pickup and luggage details for a tailored quote.",
      },
      {
        question: "Can I book a chauffeur from Wallan to Melbourne CBD?",
        answer:
          "Yes. One-way, return and hourly bookings can be requested.",
      },
    ],
  },

  {
    name: "Kew",
    slug: "kew",
    region: "Eastern Melbourne",
    heroDescription:
      "Premium chauffeur services in Kew for Melbourne Airport, corporate appointments, weddings and private travel.",
    introduction:
      "Travel from Kew with a professional chauffeur for airport transfers, business appointments, weddings, events and private journeys.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Corporate chauffeur travel",
      "Wedding transport",
      "Hotel transfers",
      "Event transfers",
      "Hourly chauffeur hire",
    ],
    highlights: [
      "Kew door-to-door pickup",
      "Airport and CBD travel",
      "Corporate appointments",
      "Wedding transport",
      "Private events",
      "Premium vehicle requests",
    ],
    nearbyAreas: ["Richmond", "Camberwell", "Toorak", "East Melbourne"],
    faqs: [
      {
        question: "Do you provide airport transfers from Kew?",
        answer:
          "Yes. Melbourne Airport and Avalon Airport transfers can be requested.",
      },
      {
        question: "Can I request a premium vehicle in Kew?",
        answer:
          "Yes. Select your preferred vehicle in the quote form, subject to availability.",
      },
    ],
  },

  {
    name: "Wandong",
    slug: "wandong",
    region: "Northern Victoria",
    heroDescription:
      "Private chauffeur transfers from Wandong to Melbourne Airport, Melbourne CBD and northern Victorian destinations.",
    introduction:
      "Arrange chauffeur travel from Wandong for airport transfers, Melbourne appointments, events and private journeys.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Melbourne CBD travel",
      "Wedding chauffeur service",
      "Private journeys",
      "Event transfers",
      "Regional travel",
    ],
    highlights: [
      "Wandong pickup",
      "Airport travel",
      "Regional transfers",
      "Private bookings",
      "Wedding and event transport",
      "Return journey requests",
    ],
    nearbyAreas: ["Kilmore", "Wallan", "Lancefield", "Mickleham"],
    faqs: [
      {
        question: "Can I arrange a Wandong airport transfer?",
        answer:
          "Yes. Provide your flight information, passenger count and luggage requirements.",
      },
      {
        question: "Can I book a return trip from Melbourne to Wandong?",
        answer:
          "Yes. Add the return date, time and pickup address to the quote request.",
      },
    ],
  },

  {
    name: "Romsey",
    slug: "romsey",
    region: "Macedon Ranges",
    heroDescription:
      "Professional chauffeur travel from Romsey to Melbourne Airport, Melbourne CBD and Macedon Ranges destinations.",
    introduction:
      "Book chauffeur transport from Romsey for airport transfers, weddings, private travel, events and Melbourne appointments.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    services: [
      "Airport transfers",
      "Melbourne CBD transfers",
      "Wedding transport",
      "Private tours",
      "Event transfers",
      "Regional journeys",
    ],
    highlights: [
      "Romsey pickup",
      "Airport transfers",
      "Macedon Ranges travel",
      "Wedding and event journeys",
      "Private day trips",
      "Return bookings",
    ],
    nearbyAreas: ["Lancefield", "Gisborne", "Woodend", "Kyneton"],
    faqs: [
      {
        question: "Can you provide Romsey to Melbourne Airport transfers?",
        answer:
          "Yes. Submit your preferred pickup time, flight details and luggage requirements.",
      },
      {
        question: "Can I arrange wedding chauffeur travel in Romsey?",
        answer:
          "Yes. Provide the complete wedding itinerary for a tailored quotation.",
      },
    ],
  },
];

export const serviceAreaSlugs = serviceAreasData.map(
  (area) => area.slug,
);

export const getServiceAreaBySlug = (
  slug?: string,
): ServiceAreaItem | undefined =>
  serviceAreasData.find((area) => area.slug === slug);

export const getServiceAreaSlugByName = (
  name: string,
): string | undefined =>
  serviceAreasData.find(
    (area) => area.name.toLowerCase() === name.toLowerCase(),
  )?.slug;

export const getNearbyServiceAreas = (
  nearbyAreaNames: string[],
): ServiceAreaItem[] =>
  nearbyAreaNames
    .map((name) =>
      serviceAreasData.find(
        (area) =>
          area.name.toLowerCase() === name.toLowerCase(),
      ),
    )
    .filter(
      (area): area is ServiceAreaItem => Boolean(area),
    );