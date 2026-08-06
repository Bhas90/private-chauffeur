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
  passengers: number;
  largeBags: number;
  cabinBags: number;
  featured?: boolean;
  suitableFor: string[];
  features: FleetFeature[];
}

export const fleetData: FleetVehicle[] = [
  {
    name: "Mercedes-Benz E-Class",
    slug: "mercedes-benz-e-class",
    category: "Executive Sedan",
    heroDescription:
      "A refined executive chauffeur vehicle for Melbourne Airport transfers, corporate travel and private journeys.",
    description:
      "The Mercedes-Benz E-Class combines elegant styling, a comfortable cabin and a professional executive presence. It is well suited to airport transfers, business appointments and private chauffeur travel across Melbourne.",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1616788494672-ec7ca25b98c8?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1500&q=85",
    ],
    passengers: 4,
    largeBags: 2,
    cabinBags: 2,
    featured: true,
    suitableFor: [
      "Melbourne Airport transfers",
      "Corporate travel",
      "Hotel transfers",
      "Private chauffeur hire",
      "Business appointments",
    ],
    features: [
      {
        title: "Executive comfort",
        description:
          "A refined passenger cabin suitable for professional and private journeys.",
      },
      {
        title: "Professional presentation",
        description:
          "An elegant vehicle choice for business travellers and corporate guests.",
      },
      {
        title: "Airport suitability",
        description:
          "Suitable for individuals or small groups travelling with moderate luggage.",
      },
      {
        title: "Smooth Melbourne travel",
        description:
          "Well suited to Melbourne CBD, airport and suburban chauffeur journeys.",
      },
    ],
  },
  {
    name: "Audi A8 L",
    slug: "audi-a8-l",
    category: "Luxury Sedan",
    heroDescription:
      "Flagship luxury chauffeur travel offering generous space, privacy and executive comfort.",
    description:
      "The Audi A8 L is designed for passengers who prefer a spacious and discreet luxury experience. Its long-wheelbase cabin makes it a premium option for executives, corporate guests and special private journeys.",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1500&q=85",
    ],
    passengers: 4,
    largeBags: 2,
    cabinBags: 2,
    featured: true,
    suitableFor: [
      "Executive airport transfers",
      "Corporate roadshows",
      "VIP transport",
      "Wedding chauffeur service",
      "Special events",
    ],
    features: [
      {
        title: "Long-wheelbase comfort",
        description:
          "Additional rear passenger space for a relaxed luxury journey.",
      },
      {
        title: "Discreet executive travel",
        description:
          "Ideal for senior executives, business guests and private clients.",
      },
      {
        title: "Premium interior",
        description:
          "A refined cabin designed around comfort and quiet travel.",
      },
      {
        title: "Luxury presentation",
        description:
          "Suitable for corporate, wedding and special-event chauffeur bookings.",
      },
    ],
  },
  {
    name: "BMW 7 Series",
    slug: "bmw-7-series",
    category: "Luxury Sedan",
    heroDescription:
      "A flagship chauffeur sedan combining sophisticated design, comfort and premium road presence.",
    description:
      "The BMW 7 Series offers a polished luxury experience for airport travel, executive appointments, weddings and private Melbourne journeys.",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1500&q=85",
    ],
    passengers: 4,
    largeBags: 2,
    cabinBags: 2,
    featured: true,
    suitableFor: [
      "Luxury airport transfers",
      "Corporate chauffeur service",
      "Wedding transport",
      "Event transfers",
      "Private travel",
    ],
    features: [
      {
        title: "Flagship luxury",
        description:
          "Premium styling and passenger comfort for important journeys.",
      },
      {
        title: "Executive suitability",
        description:
          "A professional option for meetings, airport travel and corporate events.",
      },
      {
        title: "Special-event appeal",
        description:
          "An elegant choice for weddings, celebrations and private occasions.",
      },
      {
        title: "Comfortable cabin",
        description:
          "Designed for relaxed travel across Melbourne and surrounding areas.",
      },
    ],
  },
  {
    name: "Holden Caprice",
    slug: "holden-caprice",
    category: "Executive Sedan",
    heroDescription:
      "A spacious long-wheelbase chauffeur vehicle for comfortable airport, business and private travel.",
    description:
      "The Holden Caprice provides generous passenger space and practical luggage capacity, making it suitable for airport transfers and longer Melbourne or regional journeys.",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1500&q=85",
    ],
    passengers: 4,
    largeBags: 3,
    cabinBags: 2,
    suitableFor: [
      "Airport transfers",
      "Regional journeys",
      "Hotel transfers",
      "Group travel",
      "Private chauffeur bookings",
    ],
    features: [
      {
        title: "Generous passenger space",
        description:
          "Long-wheelbase seating suitable for comfortable longer journeys.",
      },
      {
        title: "Practical luggage room",
        description:
          "Useful for airport transfers with multiple bags.",
      },
      {
        title: "Regional suitability",
        description:
          "A comfortable choice for travel beyond Melbourne.",
      },
      {
        title: "Flexible use",
        description:
          "Suitable for airport, private and business chauffeur requirements.",
      },
    ],
  },
  {
    name: "Chrysler 300C",
    slug: "chrysler-300c",
    category: "Premium Sedan",
    heroDescription:
      "Distinctive premium chauffeur travel for weddings, events and private Melbourne journeys.",
    description:
      "The Chrysler 300C offers a bold road presence and spacious interior, making it a popular vehicle choice for weddings, special events and premium private travel.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1500&q=85",
    ],
    passengers: 4,
    largeBags: 2,
    cabinBags: 2,
    suitableFor: [
      "Wedding chauffeur service",
      "Event transfers",
      "Private celebrations",
      "Hotel transfers",
      "Premium chauffeur hire",
    ],
    features: [
      {
        title: "Distinctive styling",
        description:
          "A strong visual presence for weddings and special occasions.",
      },
      {
        title: "Comfortable interior",
        description:
          "Spacious seating for relaxed chauffeur-driven travel.",
      },
      {
        title: "Event suitability",
        description:
          "A popular option for ceremonies, receptions and private events.",
      },
      {
        title: "Premium travel",
        description:
          "Suitable for customers seeking a distinctive chauffeur experience.",
      },
    ],
  },
  {
    name: "Hyundai Genesis",
    slug: "hyundai-genesis",
    category: "Executive Sedan",
    heroDescription:
      "Smooth and comfortable executive chauffeur travel for business, airport and private journeys.",
    description:
      "The Hyundai Genesis provides a refined and comfortable chauffeur experience for airport transfers, business travel and private journeys throughout Melbourne.",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1500&q=85",
    ],
    passengers: 4,
    largeBags: 2,
    cabinBags: 2,
    suitableFor: [
      "Airport transfers",
      "Corporate travel",
      "Hourly chauffeur hire",
      "Hotel transfers",
      "Private journeys",
    ],
    features: [
      {
        title: "Smooth passenger experience",
        description:
          "Comfortable ride quality for city and regional chauffeur travel.",
      },
      {
        title: "Executive presentation",
        description:
          "Suitable for corporate appointments and business airport transfers.",
      },
      {
        title: "Flexible chauffeur use",
        description:
          "A practical choice for airport, hotel and private journeys.",
      },
      {
        title: "Comfort-focused cabin",
        description:
          "Designed to provide relaxed travel for up to four passengers.",
      },
    ],
  },
];