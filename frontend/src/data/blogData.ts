export interface BlogSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
  faqs?: BlogFaq[];
  relatedServiceSlugs: string[];
  relatedFleetSlugs: string[];
  relatedAreaSlugs: string[];
}

export const blogData: BlogPost[] = [
  {
    id: 1,
    title: "The Complete Melbourne Airport Chauffeur Guide",
    slug: "melbourne-airport-chauffeur-guide",
    excerpt:
      "Plan a smoother Melbourne Airport journey with practical advice about pickup timing, flight information, luggage and chauffeur vehicle selection.",
    category: "Airport Transfers",
    author: "Private Chauffeur Melbourne",
    publishedAt: "2026-08-01",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85",
    featured: true,
    tags: [
      "Melbourne Airport",
      "Airport Transfers",
      "Chauffeur Melbourne",
    ],
    seoTitle:
      "Melbourne Airport Chauffeur Guide | Private Transfers",
    seoDescription:
      "Plan your Melbourne Airport chauffeur transfer with guidance about pickup timing, luggage, flight details and vehicle selection.",
    sections: [
      {
        heading: "Why pre-book a Melbourne Airport chauffeur?",
        paragraphs: [
          "A pre-arranged chauffeur service helps passengers plan their airport journey around a confirmed pickup time, passenger number, luggage requirements and flight schedule.",
          "Unlike an on-demand transport request, a chauffeur booking can be prepared in advance with the most suitable vehicle and complete journey information.",
        ],
      },
      {
        heading: "Information to provide when booking",
        paragraphs: [
          "Providing accurate journey information allows the booking team to review the request and recommend the most appropriate travel arrangement.",
        ],
        points: [
          "Flight number and airline",
          "Scheduled arrival or departure time",
          "Pickup address and destination",
          "Number of passengers",
          "Large and cabin luggage requirements",
          "Preferred chauffeur vehicle",
          "Child-seat or special-access requirements",
        ],
      },
      {
        heading: "Choosing the right airport vehicle",
        paragraphs: [
          "Executive sedans can suit individuals, couples and small groups carrying moderate luggage. Passengers with additional bags or specific comfort requirements should include those details in the quote request.",
          "Vehicle availability and suitability are confirmed after the booking team reviews the passenger and luggage information.",
        ],
      },
      {
        heading: "Allowing enough time for departure travel",
        paragraphs: [
          "Pickup timing should consider the expected journey duration, traffic conditions, airline check-in requirements and whether the flight is domestic or international.",
          "The booking team can review the requested pickup time, but passengers remain responsible for meeting airline and airport requirements.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Can I provide my flight number when requesting an airport transfer?",
        answer:
          "Yes. Include the airline and flight number so the booking team has the relevant journey information.",
      },
      {
        question:
          "Can I request a return Melbourne Airport transfer?",
        answer:
          "Yes. Include both outbound and return dates, times, addresses and flight details.",
      },
    ],
    relatedServiceSlugs: [
      "airport-transfers-melbourne",
      "hotel-transfers-melbourne",
    ],
    relatedFleetSlugs: [
      "mercedes-benz-e-class",
      "audi-a8-l",
      "bmw-7-series",
    ],
    relatedAreaSlugs: [
      "melbourne-cbd",
      "south-yarra",
      "richmond",
    ],
  },
  {
    id: 2,
    title: "Why Melbourne Businesses Use Corporate Chauffeur Services",
    slug: "corporate-chauffeur-travel-melbourne",
    excerpt:
      "Discover how pre-arranged chauffeur travel can support airport pickups, meetings, roadshows, conferences and executive visitors.",
    category: "Corporate Travel",
    author: "Private Chauffeur Melbourne",
    publishedAt: "2026-07-25",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85",
    featured: true,
    tags: [
      "Corporate Chauffeur",
      "Business Travel",
      "Melbourne",
    ],
    seoTitle:
      "Corporate Chauffeur Services Melbourne | Business Travel",
    seoDescription:
      "Learn how Melbourne corporate chauffeur services support meetings, airport pickups, conferences, roadshows and executive travel.",
    sections: [
      {
        heading: "Professional transport for important schedules",
        paragraphs: [
          "Corporate travel frequently involves multiple appointments, airport pickups, conference venues and time-sensitive movements.",
          "A pre-arranged chauffeur booking allows the journey requirements to be reviewed before travel begins.",
        ],
      },
      {
        heading: "Common corporate chauffeur bookings",
        paragraphs: [
          "Businesses can request chauffeur services for individual executives, visiting clients and organised event movements.",
        ],
        points: [
          "Executive airport transfers",
          "Corporate meetings",
          "Conference transfers",
          "Business roadshows",
          "Hotel and office transfers",
          "Hourly chauffeur hire",
          "Client and guest transportation",
        ],
      },
      {
        heading: "Hourly and multi-stop journeys",
        paragraphs: [
          "Hourly chauffeur hire may be suitable when passengers have several appointments or require flexible waiting time between destinations.",
          "The full proposed itinerary should be included so the booking team can assess timing and vehicle availability.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Can corporate chauffeur travel include several stops?",
        answer:
          "Yes. Include every proposed stop and the expected waiting time when requesting the quotation.",
      },
      {
        question:
          "Can a business arrange recurring chauffeur bookings?",
        answer:
          "Recurring requirements can be discussed with the booking team and remain subject to confirmation and availability.",
      },
    ],
    relatedServiceSlugs: [
      "corporate-chauffeur-melbourne",
      "conference-transfers-melbourne",
      "hourly-chauffeur-hire-melbourne",
    ],
    relatedFleetSlugs: [
      "audi-a8-l",
      "bmw-7-series",
      "mercedes-benz-e-class",
    ],
    relatedAreaSlugs: [
      "melbourne-cbd",
      "south-melbourne",
      "east-melbourne",
    ],
  },
  {
    id: 3,
    title: "How to Choose the Right Chauffeur Vehicle",
    slug: "choosing-the-right-chauffeur-vehicle",
    excerpt:
      "Compare passenger capacity, luggage requirements, journey type and vehicle presentation before requesting your chauffeur quote.",
    category: "Fleet Advice",
    author: "Private Chauffeur Melbourne",
    publishedAt: "2026-07-18",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85",
    tags: [
      "Luxury Fleet",
      "Chauffeur Vehicles",
      "Travel Advice",
    ],
    seoTitle:
      "Choosing a Chauffeur Vehicle in Melbourne | Fleet Guide",
    seoDescription:
      "Compare passenger, luggage and journey requirements when choosing a Melbourne chauffeur vehicle.",
    sections: [
      {
        heading: "Start with passenger and luggage requirements",
        paragraphs: [
          "The number of passengers alone does not always determine the most suitable vehicle. Luggage size and quantity must also be considered.",
          "Airport customers should provide separate information for large suitcases, cabin bags and any additional equipment.",
        ],
      },
      {
        heading: "Consider the type of journey",
        paragraphs: [
          "Different journeys may have different priorities. Corporate customers may prefer discreet executive presentation, while wedding customers may prioritise appearance and photography.",
        ],
        points: [
          "Airport transfers",
          "Corporate appointments",
          "Wedding transportation",
          "Private events",
          "Hotel transfers",
          "Regional journeys",
        ],
      },
      {
        heading: "Vehicle requests and availability",
        paragraphs: [
          "Customers can include a preferred vehicle in the quote request. Final vehicle confirmation depends on availability and suitability for the proposed journey.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Can I select a specific chauffeur vehicle?",
        answer:
          "Yes. Preferred vehicles can be requested, but confirmation depends on availability and journey suitability.",
      },
      {
        question:
          "Which vehicle is suitable for airport luggage?",
        answer:
          "Suitability depends on the passenger count, number and size of bags and any additional equipment.",
      },
    ],
    relatedServiceSlugs: [
      "airport-transfers-melbourne",
      "corporate-chauffeur-melbourne",
      "wedding-chauffeur-melbourne",
    ],
    relatedFleetSlugs: [
      "mercedes-benz-e-class",
      "audi-a8-l",
      "bmw-7-series",
      "holden-caprice",
    ],
    relatedAreaSlugs: [
      "melbourne-cbd",
      "toorak",
      "camberwell",
    ],
  },
  {
    id: 4,
    title: "Planning Wedding Chauffeur Transport in Melbourne",
    slug: "planning-wedding-chauffeur-transport-melbourne",
    excerpt:
      "Prepare your wedding chauffeur itinerary around ceremony times, photography locations, passenger movements and reception travel.",
    category: "Wedding Travel",
    author: "Private Chauffeur Melbourne",
    publishedAt: "2026-07-10",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
    tags: [
      "Wedding Chauffeur",
      "Melbourne Weddings",
      "Luxury Cars",
    ],
    seoTitle:
      "Wedding Chauffeur Melbourne | Transport Planning Guide",
    seoDescription:
      "Plan wedding chauffeur transport in Melbourne around ceremonies, photography, passenger movements and receptions.",
    sections: [
      {
        heading: "Prepare a complete wedding itinerary",
        paragraphs: [
          "Wedding chauffeur transport often involves more than one pickup, photography location and final venue.",
          "A complete itinerary helps the booking team understand vehicle timing and passenger movements.",
        ],
        points: [
          "Preparation address",
          "Ceremony location",
          "Ceremony arrival time",
          "Photography locations",
          "Reception venue",
          "Passenger numbers",
          "Return travel requirements",
        ],
      },
      {
        heading: "Allow time between each movement",
        paragraphs: [
          "Wedding schedules should allow reasonable travel and loading time between each location.",
          "Additional waiting or itinerary changes should be communicated as early as possible.",
        ],
      },
      {
        heading: "Selecting a wedding chauffeur vehicle",
        paragraphs: [
          "Vehicle choice may depend on passenger capacity, wedding style, photography preferences and availability.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Can wedding transport include several pickup locations?",
        answer:
          "Yes. Include every proposed pickup, destination and timing requirement in the quote request.",
      },
      {
        question:
          "Can I request a specific wedding vehicle?",
        answer:
          "Yes. Vehicle preferences can be submitted and are confirmed subject to availability.",
      },
    ],
    relatedServiceSlugs: [
      "wedding-chauffeur-melbourne",
      "group-transfers-melbourne",
    ],
    relatedFleetSlugs: [
      "audi-a8-l",
      "bmw-7-series",
      "chrysler-300c",
    ],
    relatedAreaSlugs: [
      "toorak",
      "south-yarra",
      "gisborne",
    ],
  },
];

export const getBlogBySlug = (
  slug?: string,
): BlogPost | undefined =>
  blogData.find((post) => post.slug === slug);

export const getFeaturedBlogs = (): BlogPost[] =>
  blogData.filter((post) => post.featured);

export const getRelatedBlogs = (
  currentSlug: string,
  category: string,
  limit = 3,
): BlogPost[] =>
  blogData
    .filter(
      (post) =>
        post.slug !== currentSlug &&
        post.category === category,
    )
    .slice(0, limit);