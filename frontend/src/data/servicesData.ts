import {
  FiBriefcase,
  FiClock,
  FiCompass,
  FiHome,
  FiMap,
  FiStar,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceSection {
  title: string;
  paragraphs?: string[];
  points?: string[];
}

export interface ServiceItem {
  title: string;
  shortTitle: string;
  slug: string;
  eyebrow: string;
  heroDescription: string;
  shortDescription: string;
  image: string;
  icon: IconType;
  featured?: boolean;
  sections: ServiceSection[];
  benefits: string[];
  suitableVehicles: string[];
  faqs: ServiceFaq[];
}

export const servicesData: ServiceItem[] = [
  {
    title: "Melbourne Airport Transfers",
    shortTitle: "Airport Transfers",
    slug: "airport-transfers-melbourne",
    eyebrow: "Private Airport Chauffeur",
    heroDescription:
      "Professional airport transfers between Melbourne Airport, Avalon Airport, Melbourne CBD, surrounding suburbs and regional Victoria.",
    shortDescription:
      "Reliable airport pickups and drop-offs with flight monitoring, meet-and-greet assistance and door-to-door chauffeur travel.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85",
    icon: FiTruck,
    featured: true,
    benefits: [
      "Available for domestic and international flights",
      "Flight arrival monitoring",
      "Meet-and-greet assistance",
      "Door-to-door private transport",
      "Individual, family and corporate bookings",
      "Melbourne Airport and Avalon Airport coverage",
    ],
    suitableVehicles: [
      "Mercedes-Benz E-Class",
      "Audi A8 L",
      "BMW 7 Series",
      "Holden Caprice",
    ],
    sections: [
      {
        title: "Reliable Melbourne Airport chauffeur travel",
        paragraphs: [
          "Avoid the uncertainty of finding transport after a long flight. Your airport chauffeur journey is arranged in advance using the pickup, destination, passenger, luggage and flight information supplied during booking.",
          "The service is suitable for business travellers, families, interstate visitors, international guests and Melbourne residents requiring a professional airport transfer.",
        ],
      },
      {
        title: "Airport pickup and drop-off services",
        points: [
          "Melbourne Airport to Melbourne CBD",
          "Melbourne CBD to Melbourne Airport",
          "Avalon Airport transfers",
          "Hotel and accommodation transfers",
          "Corporate airport pickups",
          "Regional Victorian airport journeys",
        ],
      },
      {
        title: "Flight monitoring and pickup coordination",
        paragraphs: [
          "Where a valid flight number is supplied, flight information can be used to assist with pickup coordination. Customers should still provide an accessible mobile number in case the chauffeur or booking team needs to make contact.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can my flight arrival time be monitored?",
        answer:
          "Yes. Add your flight number when submitting the quote or booking request so the team can coordinate the pickup around available flight information.",
      },
      {
        question: "Can I book an early-morning airport transfer?",
        answer:
          "Yes. Airport transfers can be requested at any time, subject to confirmation and vehicle availability.",
      },
      {
        question: "Can I include luggage requirements?",
        answer:
          "Yes. Provide the number and approximate size of your bags so a suitable vehicle can be recommended.",
      },
    ],
  },
  {
    title: "Corporate Chauffeur Melbourne",
    shortTitle: "Corporate Chauffeur",
    slug: "corporate-chauffeur-melbourne",
    eyebrow: "Professional Business Travel",
    heroDescription:
      "Executive chauffeur services for airport transfers, meetings, roadshows, conferences and corporate guests across Melbourne.",
    shortDescription:
      "Professional executive transportation for meetings, airport travel, roadshows, conferences and business appointments.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85",
    icon: FiBriefcase,
    featured: true,
    benefits: [
      "Executive airport transfers",
      "Meeting and appointment travel",
      "Corporate roadshows",
      "Conference transport",
      "Multiple-stop itineraries",
      "Corporate account enquiries",
    ],
    suitableVehicles: [
      "Audi A8 L",
      "BMW 7 Series",
      "Mercedes-Benz E-Class",
      "Hyundai Genesis",
    ],
    sections: [
      {
        title: "Professional transport for Melbourne businesses",
        paragraphs: [
          "Corporate chauffeur services are designed for executives, clients, business travellers and teams who require reliable, discreet and professionally presented transport.",
          "Journeys can include airport pickups, office transfers, meetings, conferences, events and multiple scheduled stops.",
        ],
      },
      {
        title: "Corporate journeys we can arrange",
        points: [
          "Executive airport transfers",
          "Client and guest transport",
          "Meetings and office appointments",
          "Conference and event transfers",
          "Hourly chauffeur bookings",
          "Multi-stop roadshows",
        ],
      },
    ],
    faqs: [
      {
        question: "Can businesses request repeat bookings?",
        answer:
          "Yes. Businesses can enquire about recurring executive travel and corporate account arrangements.",
      },
      {
        question: "Can one booking include several meetings?",
        answer:
          "Yes. Add all planned stops and approximate waiting requirements to your quote request.",
      },
    ],
  },
  {
    title: "Wedding Chauffeur Melbourne",
    shortTitle: "Wedding Chauffeur",
    slug: "wedding-chauffeur-melbourne",
    eyebrow: "Elegant Wedding Transport",
    heroDescription:
      "Premium chauffeur-driven wedding transport planned around your ceremony, reception and photography schedule.",
    shortDescription:
      "Elegant chauffeur-driven transport for wedding ceremonies, receptions, bridal parties and special-day journeys.",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1800&q=85",
    icon: FiStar,
    featured: true,
    benefits: [
      "Bride and groom transfers",
      "Ceremony and reception travel",
      "Photography-location stops",
      "Guest and family transport",
      "Vehicle preference requests",
      "Tailored wedding itinerary",
    ],
    suitableVehicles: [
      "Chrysler 300C",
      "Audi A8 L",
      "BMW 7 Series",
      "Mercedes-Benz E-Class",
    ],
    sections: [
      {
        title: "Chauffeur transport for your wedding day",
        paragraphs: [
          "Wedding transport should fit comfortably around your ceremony, photography and reception schedule. Share your complete itinerary so adequate travel and waiting time can be planned.",
        ],
      },
      {
        title: "Wedding transport options",
        points: [
          "Home or hotel collection",
          "Ceremony arrival",
          "Photography stops",
          "Reception transfer",
          "Bride and groom departure",
          "Family and guest transfers",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I request a specific vehicle?",
        answer:
          "Yes. Vehicle preferences can be submitted, with final confirmation based on availability.",
      },
      {
        question: "Can the chauffeur wait during the ceremony?",
        answer:
          "Waiting time can be included in a tailored wedding quotation.",
      },
    ],
  },
  {
    title: "Hotel Transfers Melbourne",
    shortTitle: "Hotel Transfers",
    slug: "hotel-transfers-melbourne",
    eyebrow: "Hotel and Accommodation Travel",
    heroDescription:
      "Private chauffeur transfers between Melbourne hotels, airports, business venues, events and regional destinations.",
    shortDescription:
      "Door-to-door private transfers between Melbourne hotels, airports, events and business destinations.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85",
    icon: FiHome,
    benefits: [
      "Airport-to-hotel transfers",
      "Hotel-to-event transport",
      "Business guest pickups",
      "Private visitor travel",
      "Luggage assistance",
      "Melbourne and regional journeys",
    ],
    suitableVehicles: [
      "Mercedes-Benz E-Class",
      "Hyundai Genesis",
      "Holden Caprice",
    ],
    sections: [
      {
        title: "Private transport for Melbourne hotel guests",
        paragraphs: [
          "Arrange direct chauffeur travel between your hotel, airport, meeting, event venue or regional destination.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you collect a guest on my behalf?",
        answer:
          "Yes. Include the guest name, mobile number, hotel and journey details in the request.",
      },
    ],
  },
  {
    title: "Conference Transfers Melbourne",
    shortTitle: "Conference Transfers",
    slug: "conference-transfers-melbourne",
    eyebrow: "Delegate and Event Transport",
    heroDescription:
      "Coordinated chauffeur travel for delegates, speakers, executives and guests attending Melbourne conferences.",
    shortDescription:
      "Reliable transport for delegates, speakers, executives and guests attending conferences and corporate events.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=85",
    icon: FiUsers,
    benefits: [
      "Speaker and VIP transport",
      "Airport arrivals",
      "Hotel transfers",
      "Venue transfers",
      "Multiple booking coordination",
      "Return travel planning",
    ],
    suitableVehicles: [
      "Audi A8 L",
      "BMW 7 Series",
      "Mercedes-Benz E-Class",
      "Holden Caprice",
    ],
    sections: [
      {
        title: "Conference travel organised around the event schedule",
        paragraphs: [
          "Provide delegate names, arrival times, hotels, venues and return requirements so transport can be planned clearly.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you manage several delegate pickups?",
        answer:
          "Yes. Multiple transfers can be requested, subject to vehicle availability and itinerary confirmation.",
      },
    ],
  },
  {
    title: "Hourly Chauffeur Hire Melbourne",
    shortTitle: "Hourly Chauffeur Hire",
    slug: "hourly-chauffeur-hire-melbourne",
    eyebrow: "Flexible Chauffeur Availability",
    heroDescription:
      "Keep a professional chauffeur and executive vehicle available for meetings, events, shopping or private travel.",
    shortDescription:
      "Flexible chauffeur and vehicle availability for meetings, events, shopping and multi-stop private travel.",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1800&q=85",
    icon: FiClock,
    benefits: [
      "Flexible multiple-stop travel",
      "Business appointments",
      "Private shopping journeys",
      "Event transport",
      "Chauffeur waiting time",
      "Tailored itinerary",
    ],
    suitableVehicles: [
      "Audi A8 L",
      "BMW 7 Series",
      "Mercedes-Benz E-Class",
      "Hyundai Genesis",
    ],
    sections: [
      {
        title: "A chauffeur available around your itinerary",
        paragraphs: [
          "Hourly hire is suitable when your journey contains several stops, uncertain finish times or waiting periods.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is there a minimum hire period?",
        answer:
          "Minimum booking periods can vary. Submit your intended itinerary for a tailored quote.",
      },
    ],
  },
  {
    title: "Private Tours and Day Trips",
    shortTitle: "Private Tours",
    slug: "private-car-tours-melbourne",
    eyebrow: "Explore Melbourne and Victoria",
    heroDescription:
      "Private chauffeur-driven touring around Melbourne, the Macedon Ranges and selected Victorian destinations.",
    shortDescription:
      "Flexible chauffeur-driven tours around Melbourne and selected regional Victorian destinations.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    icon: FiMap,
    benefits: [
      "Private flexible itinerary",
      "Hotel pickup and return",
      "Regional Victorian journeys",
      "Multiple scenic stops",
      "Suitable vehicle selection",
      "Individual and family travel",
    ],
    suitableVehicles: [
      "Mercedes-Benz E-Class",
      "Holden Caprice",
      "Hyundai Genesis",
    ],
    sections: [
      {
        title: "Travel beyond Melbourne at your own pace",
        paragraphs: [
          "Private day trips can be tailored around your preferred destinations, pickup time, stops and return schedule.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I create my own itinerary?",
        answer:
          "Yes. Add your preferred locations and approximate schedule to the quote request.",
      },
    ],
  },
  {
    title: "Group and Event Transfers",
    shortTitle: "Group Transfers",
    slug: "group-transfers-melbourne",
    eyebrow: "Coordinated Private Transport",
    heroDescription:
      "Tailored chauffeur transport for families, celebrations, corporate groups and Melbourne events.",
    shortDescription:
      "Coordinated chauffeur transport for families, events, celebrations and corporate groups.",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=85",
    icon: FiUsers,
    benefits: [
      "Family and group journeys",
      "Event venue transfers",
      "Multiple vehicle coordination",
      "Return transport",
      "Luggage planning",
      "Tailored pickup arrangements",
    ],
    suitableVehicles: [
      "Holden Caprice",
      "Chrysler 300C",
      "Hyundai Genesis",
    ],
    sections: [
      {
        title: "Transport arranged for your group",
        paragraphs: [
          "Provide the passenger number, luggage requirements, pickup details and event schedule so appropriate transport can be recommended.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can several vehicles be arranged?",
        answer:
          "Yes. Multiple vehicle requests can be considered depending on availability.",
      },
    ],
  },
  {
    title: "Melbourne Event Transfers",
    shortTitle: "Event Transfers",
    slug: "event-transfers-melbourne",
    eyebrow: "Private Event Chauffeur",
    heroDescription:
      "Professional chauffeur travel for sporting events, concerts, dinners, celebrations and major Melbourne occasions.",
    shortDescription:
      "Private chauffeur transport for sporting events, concerts, dinners, celebrations and Melbourne occasions.",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1800&q=85",
    icon: FiCompass,
    benefits: [
      "Venue pickup and drop-off",
      "Return travel",
      "Waiting-time options",
      "Sporting and entertainment events",
      "Private celebrations",
      "Flexible collection points",
    ],
    suitableVehicles: [
      "Chrysler 300C",
      "BMW 7 Series",
      "Audi A8 L",
    ],
    sections: [
      {
        title: "Arrive and leave without transport uncertainty",
        paragraphs: [
          "Event chauffeur transport can be arranged around the venue, scheduled start, expected finish and preferred collection point.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can return pickup be arranged after an event?",
        answer:
          "Yes. Include an expected finish time or request flexible waiting in the quote.",
      },
    ],
  },
];