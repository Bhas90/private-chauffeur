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

import type {
  IconType,
} from "react-icons";

/* =========================================================
   TYPES
========================================================= */

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

/* =========================================================
   CURRENT APPROVED FLEET

   BMW 7 Series
   Mercedes-Benz S-Class
   Mercedes-Benz V-Class
   Mercedes-Benz GLE
   Mercedes-Benz GLS
   BMW X7
   Audi Q7
   Mercedes People Mover
========================================================= */

/* =========================================================
   SERVICES
========================================================= */

export const servicesData:
  ServiceItem[] = [
  /* =======================================================
     1. AIRPORT TRANSFERS
  ======================================================= */

  {
    title:
      "Melbourne Airport Transfers",

    shortTitle:
      "Airport Transfers",

    slug:
      "airport-transfers-melbourne",

    eyebrow:
      "Private Airport Chauffeur",

    heroDescription:
  "Professional airport transfers between Melbourne Airport, Avalon Airport, Melbourne CBD, surrounding suburbs and regional Victoria, with Booster Seat and Child Safety Seat requests available for younger passengers.",

    shortDescription:
      "Reliable airport pickups and drop-offs with flight monitoring, meet-and-greet assistance and door-to-door chauffeur travel.",

    image:
      "https://res.cloudinary.com/vbr0vyzb/image/upload/v1788008696/Melbourne_Airport_Transfers.png",

    icon:
      FiTruck,

    featured:
      true,

    benefits: [
      "Available for domestic and international flights",
      "Flight arrival monitoring",
      "Meet-and-greet assistance",
      "Door-to-door private transport",
      "Individual, family and corporate bookings",
      "Booster Seat or Child Safety Seat requests available",
      "Melbourne Airport and Avalon Airport coverage",
    ],

    suitableVehicles: [
      "BMW 7 Series",
      "Mercedes-Benz S-Class",
      "Mercedes-Benz V-Class",
      "Mercedes-Benz GLE",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes People Mover",
    ],

    sections: [
      {
        title:
          "Reliable Melbourne Airport chauffeur travel",

        paragraphs: [
          "Avoid the uncertainty of finding transport after a long flight. Your airport chauffeur journey is arranged in advance using the pickup, destination, passenger, luggage and flight information supplied during booking.",

          "The service is suitable for business travellers, families, interstate visitors, international guests and Melbourne residents requiring professional airport transport.",
        ],
      },

      {
        title:
          "Airport pickup and drop-off services",

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
        title:
          "Travelling with babies and children",

        paragraphs: [
          "Young passengers deserve the same care and attention as every other traveller. When completing your quote request, you can request a Booster Seat or Child Safety Seat so our booking team can consider the appropriate vehicle and seating arrangement for your journey.",

          "Please provide relevant child age or seating information in the special requirements field. Child-seat requests remain subject to availability and suitability.",
        ],

        points: [
          "Booster Seat requests",
          "Child Safety Seat requests",
          "Family-friendly vehicle options",
          "Luggage and pram planning",
          "Comfortable airport transfers for parents and children",
        ],
      },

      {
        title:
          "Flight monitoring and pickup coordination",

        paragraphs: [
          "Where a valid flight number is supplied, available flight information can assist with pickup coordination. Customers should still provide an accessible mobile number in case the chauffeur or booking team needs to make contact.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Can my flight arrival time be monitored?",

        answer:
          "Yes. Add your flight number when submitting the quote or booking request so the team can coordinate the pickup around available flight information.",
      },

      {
        question:
          "Can I book an early-morning airport transfer?",

        answer:
          "Yes. Airport transfers can be requested at any time, subject to confirmation and vehicle availability.",
      },

      {
        question:
          "Can I include luggage requirements?",

        answer:
          "Yes. Provide the number and approximate size of your bags so a suitable vehicle can be recommended.",
      },

      {
        question:
          "Can I request a child seat for an airport transfer?",

        answer:
          "Yes. You can request either a Booster Seat or Child Safety Seat when submitting your enquiry. Please include relevant child information so the booking team can review suitability and availability.",
      },
    ],
  },

  /* =======================================================
     2. CORPORATE CHAUFFEUR
  ======================================================= */

  {
    title:
      "Corporate Chauffeur Melbourne",

    shortTitle:
      "Corporate Chauffeur",

    slug:
      "corporate-chauffeur-melbourne",

    eyebrow:
      "Professional Business Travel",

    heroDescription:
  "Executive chauffeur services for airport transfers, meetings, roadshows, conferences and corporate guests across Melbourne, with Booster Seat and Child Safety Seat requests available when travelling with children.",

    shortDescription:
      "Professional executive transportation for meetings, airport travel, roadshows, conferences and business appointments.",

    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85",

    icon:
      FiBriefcase,

    featured:
      true,

    benefits: [
      "Executive airport transfers",
      "Meeting and appointment travel",
      "Corporate roadshows",
      "Conference transport",
      "Multiple-stop itineraries",
      "Corporate account enquiries",
      "Child-seat requests for executives travelling with children",
    ],

    suitableVehicles: [
      "BMW 7 Series",
      "Mercedes-Benz S-Class",
      "Mercedes-Benz GLE",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes-Benz V-Class",
    ],

    sections: [
      {
        title:
          "Professional transport for Melbourne businesses",

        paragraphs: [
          "Corporate chauffeur services are designed for executives, clients, business travellers and teams who require reliable, discreet and professionally presented transport.",

          "Journeys can include airport pickups, office transfers, meetings, conferences, events and multiple scheduled stops.",
        ],
      },

      {
        title:
          "Corporate journeys we can arrange",

        points: [
          "Executive airport transfers",
          "Client and guest transport",
          "Meetings and office appointments",
          "Conference and event transfers",
          "Hourly chauffeur bookings",
          "Multi-stop roadshows",
        ],
      },

      {
        title:
          "Business travel with children",

        paragraphs: [
          "Corporate travel is not always limited to travelling alone. Executives and business guests travelling with babies or children can request a Booster Seat or Child Safety Seat when submitting the journey details.",

          "Our team can also consider passenger numbers, luggage, prams and seating requirements when recommending a suitable vehicle.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Can businesses request repeat bookings?",

        answer:
          "Yes. Businesses can enquire about recurring executive travel and corporate account arrangements.",
      },

      {
        question:
          "Can one booking include several meetings?",

        answer:
          "Yes. Add all planned stops and approximate waiting requirements to your quote request.",
      },

      {
        question:
          "Can a child seat be requested for corporate travel?",

        answer:
          "Yes. Booster Seat and Child Safety Seat requests can be included when an executive, client or guest is travelling with a child, subject to availability.",
      },
    ],
  },

  /* =======================================================
     3. WEDDING CHAUFFEUR
  ======================================================= */

  {
    title:
      "Wedding Chauffeur Melbourne",

    shortTitle:
      "Wedding Chauffeur",

    slug:
      "wedding-chauffeur-melbourne",

    eyebrow:
      "Elegant Wedding Transport",

    heroDescription:
  "Premium chauffeur-driven wedding transport planned around your ceremony, reception and photography schedule, with Booster Seat and Child Safety Seat requests available for younger wedding guests.",

    shortDescription:
      "Elegant chauffeur-driven transport for wedding ceremonies, receptions, bridal parties, families and special-day journeys.",

    image:
      "https://res.cloudinary.com/vbr0vyzb/image/upload/v1788010062/wedding-chauffeur-melbourne.png",

    icon:
      FiStar,

    featured:
      true,

    benefits: [
      "Bride and groom transfers",
      "Ceremony and reception travel",
      "Photography-location stops",
      "Guest and family transport",
      "Vehicle preference requests",
      "Booster Seat and Child Safety Seat requests",
      "Tailored wedding itinerary",
    ],

    suitableVehicles: [
      "BMW 7 Series",
      "Mercedes-Benz S-Class",
      "Mercedes-Benz V-Class",
      "Mercedes-Benz GLE",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes People Mover",
    ],

    sections: [
      {
        title:
          "Chauffeur transport for your wedding day",

        paragraphs: [
          "Wedding transport should fit comfortably around your ceremony, photography and reception schedule. Share your complete itinerary so adequate travel and waiting time can be considered.",
        ],
      },

      {
        title:
          "Wedding transport options",

        points: [
          "Home or hotel collection",
          "Ceremony arrival",
          "Photography stops",
          "Reception transfer",
          "Bride and groom departure",
          "Family and guest transfers",
        ],
      },

      {
        title:
          "Safe and comfortable journeys for younger wedding guests",

        paragraphs: [
          "Wedding-day transport can include children as well as the bridal party and adult guests. Where required, families can request a Booster Seat or Child Safety Seat for younger passengers.",

          "For larger family groups, our booking team can also consider V-Class, GLS, BMW X7 and People Mover options depending on passenger and luggage requirements.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Can I request a specific vehicle?",

        answer:
          "Yes. Vehicle preferences can be submitted, with final confirmation based on availability.",
      },

      {
        question:
          "Can the chauffeur wait during the ceremony?",

        answer:
          "Waiting time can be included in a tailored wedding quotation.",
      },

      {
        question:
          "Can child seats be included for wedding guests?",

        answer:
          "Yes. Booster Seat or Child Safety Seat requests can be added to the booking enquiry for children travelling as part of the wedding party or family.",
      },
    ],
  },

  /* =======================================================
     4. HOTEL TRANSFERS
  ======================================================= */

  {
    title:
      "Hotel Transfers Melbourne",

    shortTitle:
      "Hotel Transfers",

    slug:
      "hotel-transfers-melbourne",

    eyebrow:
      "Hotel and Accommodation Travel",

    heroDescription:
  "Private chauffeur transfers between Melbourne hotels, airports, business venues, events and regional destinations, with child-seat options available for families travelling with babies or children.",

    shortDescription:
      "Door-to-door private transfers between Melbourne hotels, airports, events and business destinations.",

    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85",

    icon:
      FiHome,

    benefits: [
      "Airport-to-hotel transfers",
      "Hotel-to-event transport",
      "Business guest pickups",
      "Private visitor travel",
      "Luggage assistance",
      "Family and child-seat requests",
      "Melbourne and regional journeys",
    ],

    suitableVehicles: [
      "BMW 7 Series",
      "Mercedes-Benz S-Class",
      "Mercedes-Benz V-Class",
      "Mercedes-Benz GLE",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes People Mover",
    ],

    sections: [
      {
        title:
          "Private transport for Melbourne hotel guests",

        paragraphs: [
          "Arrange direct chauffeur travel between your hotel, airport, meeting, event venue or regional destination.",

          "The service can be arranged for individual travellers, couples, executives, visiting families and larger groups.",
        ],
      },

      {
        title:
          "Hotel travel for families with children",

        paragraphs: [
          "Families arriving at or departing from Melbourne accommodation can request a Booster Seat or Child Safety Seat when submitting the booking enquiry.",

          "Tell us about children, luggage, prams and passenger numbers so the booking team can consider an appropriate vehicle and travel arrangement.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Can you collect a guest on my behalf?",

        answer:
          "Yes. Include the guest name, mobile number, hotel and journey details in the request.",
      },

      {
        question:
          "Can a family request a child seat for a hotel transfer?",

        answer:
          "Yes. Booster Seat and Child Safety Seat requests can be submitted with the journey details, subject to availability and suitability.",
      },
    ],
  },

  /* =======================================================
     5. CONFERENCE TRANSFERS
  ======================================================= */

  {
    title:
      "Conference Transfers Melbourne",

    shortTitle:
      "Conference Transfers",

    slug:
      "conference-transfers-melbourne",

    eyebrow:
      "Delegate and Event Transport",

    heroDescription:
  "Coordinated chauffeur travel for delegates, speakers, executives and guests attending Melbourne conferences, including Booster Seat and Child Safety Seat requests for family travel.",

    shortDescription:
      "Reliable transport for delegates, speakers, executives and guests attending conferences and corporate events.",

    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=85",

    icon:
      FiUsers,

    benefits: [
      "Speaker and VIP transport",
      "Airport arrivals",
      "Hotel transfers",
      "Venue transfers",
      "Multiple booking coordination",
      "Return travel planning",
      "Child-seat requests where delegates travel with family",
    ],

    suitableVehicles: [
      "BMW 7 Series",
      "Mercedes-Benz S-Class",
      "Mercedes-Benz V-Class",
      "Mercedes-Benz GLE",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes People Mover",
    ],

    sections: [
      {
        title:
          "Conference travel organised around the event schedule",

        paragraphs: [
          "Provide delegate names, arrival times, hotels, venues and return requirements so transport can be planned clearly.",

          "Individual executive vehicles and larger-capacity options can be considered depending on the number of passengers travelling.",
        ],
      },

      {
        title:
          "Delegates travelling with families",

        paragraphs: [
          "Some conference guests travel with partners, babies or children. Where needed, Booster Seat and Child Safety Seat requests can be included with the transfer details.",

          "Our team can consider family passenger numbers, luggage and suitable larger vehicles while arranging the journey.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Can you manage several delegate pickups?",

        answer:
          "Yes. Multiple transfers can be requested, subject to vehicle availability and itinerary confirmation.",
      },

      {
        question:
          "Can a delegate request a child seat?",

        answer:
          "Yes. If a delegate is travelling with a child, a Booster Seat or Child Safety Seat request can be added to the booking details.",
      },
    ],
  },

  /* =======================================================
     6. HOURLY CHAUFFEUR HIRE
  ======================================================= */

  {
    title:
      "Hourly Chauffeur Hire Melbourne",

    shortTitle:
      "Hourly Chauffeur Hire",

    slug:
      "hourly-chauffeur-hire-melbourne",

    eyebrow:
      "Flexible Chauffeur Availability",

    heroDescription:
  "Keep a professional chauffeur and luxury vehicle available for meetings, events, shopping or private travel, with Booster Seat and Child Safety Seat requests available for journeys with children.",

    shortDescription:
      "Flexible chauffeur and vehicle availability for meetings, events, shopping and multi-stop private travel.",

    image:
      "https://res.cloudinary.com/vbr0vyzb/image/upload/v1788010363/hourly-chauffeur-hire-melbourne.png",

    icon:
      FiClock,

    benefits: [
      "Flexible multiple-stop travel",
      "Business appointments",
      "Private shopping journeys",
      "Event transport",
      "Chauffeur waiting time",
      "Tailored itinerary",
      "Child-seat requests for journeys with children",
    ],

    suitableVehicles: [
      "BMW 7 Series",
      "Mercedes-Benz S-Class",
      "Mercedes-Benz V-Class",
      "Mercedes-Benz GLE",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes People Mover",
    ],

    sections: [
      {
        title:
          "A chauffeur available around your itinerary",

        paragraphs: [
          "Hourly hire is suitable when your journey contains several stops, uncertain finish times or waiting periods.",

          "The service can suit business travellers, couples, families and private groups who prefer to keep the same chauffeur and vehicle available for a planned period.",
        ],
      },

      {
        title:
          "Flexible hourly travel with babies and children",

        paragraphs: [
          "If children will travel during your hourly booking, request a Booster Seat or Child Safety Seat when submitting the enquiry.",

          "This is particularly useful for shopping trips, family appointments, events and multi-stop journeys where children remain with the travelling party throughout the booking.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Is there a minimum hire period?",

        answer:
          "Minimum booking periods can vary. Submit your intended itinerary for a tailored quote.",
      },

      {
        question:
          "Can a child seat remain in the vehicle throughout hourly hire?",

        answer:
          "A child-seat request can be included in your enquiry so the team can review the requirement for the planned booking, subject to availability.",
      },
    ],
  },

  /* =======================================================
     7. PRIVATE TOURS
  ======================================================= */

  {
    title:
      "Private Tours and Day Trips",

    shortTitle:
      "Private Tours",

    slug:
      "private-car-tours-melbourne",

    eyebrow:
      "Explore Melbourne and Victoria",

    heroDescription:
  "Private chauffeur-driven touring around Melbourne, the Macedon Ranges and selected Victorian destinations, with Booster Seat and Child Safety Seat requests available for family-friendly travel.",

    shortDescription:
      "Flexible chauffeur-driven tours around Melbourne and selected regional Victorian destinations.",

    image:
      "https://res.cloudinary.com/vbr0vyzb/image/upload/v1788010198/private-car-tours-melbourne.png",

    icon:
      FiMap,

    benefits: [
      "Private flexible itinerary",
      "Hotel pickup and return",
      "Regional Victorian journeys",
      "Multiple scenic stops",
      "Suitable vehicle selection",
      "Individual and family travel",
      "Booster Seat and Child Safety Seat requests",
    ],

    suitableVehicles: [
      "BMW 7 Series",
      "Mercedes-Benz S-Class",
      "Mercedes-Benz V-Class",
      "Mercedes-Benz GLE",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes People Mover",
    ],

    sections: [
      {
        title:
          "Travel beyond Melbourne at your own pace",

        paragraphs: [
          "Private day trips can be tailored around your preferred destinations, pickup time, stops and return schedule.",

          "Your itinerary can be designed around couples, families, international guests or private groups.",
        ],
      },

      {
        title:
          "Family-friendly private touring",

        paragraphs: [
          "Private tours can be particularly convenient for families travelling with babies and young children because the itinerary can include planned breaks, flexible stops and additional luggage requirements.",

          "You can request a Booster Seat or Child Safety Seat as part of your enquiry. Prams and additional family luggage should also be mentioned so the booking team can recommend a suitable vehicle.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Can I create my own itinerary?",

        answer:
          "Yes. Add your preferred locations and approximate schedule to the quote request.",
      },

      {
        question:
          "Are private tours suitable for families with young children?",

        answer:
          "Yes. Families can request a tailored itinerary and may also request a Booster Seat or Child Safety Seat, subject to availability and suitability.",
      },
    ],
  },

  /* =======================================================
     8. GROUP TRANSFERS
  ======================================================= */

  {
    title:
      "Group and Event Transfers",

    shortTitle:
      "Group Transfers",

    slug:
      "group-transfers-melbourne",

    eyebrow:
      "Coordinated Private Transport",

    heroDescription:
  "Tailored chauffeur transport for families, celebrations, corporate groups and Melbourne events, with Booster Seat and Child Safety Seat requests available for younger passengers.",

    shortDescription:
      "Coordinated chauffeur transport for families, events, celebrations and corporate groups.",

    image:
      "https://res.cloudinary.com/vbr0vyzb/image/upload/v1788010061/group-transfers-melbourne-people-mover.png",

    icon:
      FiUsers,

    benefits: [
      "Family and group journeys",
      "Event venue transfers",
      "Multiple vehicle coordination",
      "Return transport",
      "Luggage planning",
      "Tailored pickup arrangements",
      "Booster Seat and Child Safety Seat requests",
    ],

    suitableVehicles: [
      "Mercedes-Benz V-Class",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes People Mover",
      "Mercedes-Benz GLE",
    ],

    sections: [
      {
        title:
          "Transport arranged for your group",

        paragraphs: [
          "Provide the passenger number, luggage requirements, pickup details and event schedule so appropriate transport can be recommended.",

          "Larger-capacity vehicles can be considered for families, corporate groups, celebrations and coordinated event travel.",
        ],
      },

      {
        title:
          "Looking after younger passengers too",

        paragraphs: [
          "Group transport is not only about fitting everyone into the vehicle. We also want babies and children travelling with the group to have a properly planned journey.",

          "Families can request a Booster Seat or Child Safety Seat and provide information about children, prams, luggage and passenger numbers so a suitable vehicle arrangement can be considered.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Can several vehicles be arranged?",

        answer:
          "Yes. Multiple vehicle requests can be considered depending on availability.",
      },

      {
        question:
          "Can child seats be requested for more than one child?",

        answer:
          "Include the number of children and required seat types in the special requirements section. The booking team will review availability and suitable vehicle arrangements.",
      },
    ],
  },

  /* =======================================================
     9. EVENT TRANSFERS
  ======================================================= */

  {
    title:
      "Melbourne Event Transfers",

    shortTitle:
      "Event Transfers",

    slug:
      "event-transfers-melbourne",

    eyebrow:
      "Private Event Chauffeur",

    heroDescription:
  "Professional chauffeur travel for sporting events, concerts, dinners, celebrations and major Melbourne occasions, with Booster Seat and Child Safety Seat requests available for children travelling with your group.",

    shortDescription:
      "Private chauffeur transport for sporting events, concerts, dinners, celebrations and Melbourne occasions.",

    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1800&q=85",

    icon:
      FiCompass,

    benefits: [
      "Venue pickup and drop-off",
      "Return travel",
      "Waiting-time options",
      "Sporting and entertainment events",
      "Private celebrations",
      "Flexible collection points",
      "Family and child-seat requests",
    ],

    suitableVehicles: [
      "BMW 7 Series",
      "Mercedes-Benz S-Class",
      "Mercedes-Benz V-Class",
      "Mercedes-Benz GLE",
      "Mercedes-Benz GLS",
      "BMW X7",
      "Audi Q7",
      "Mercedes People Mover",
    ],

    sections: [
      {
        title:
          "Arrive and leave without transport uncertainty",

        paragraphs: [
          "Event chauffeur transport can be arranged around the venue, scheduled start, expected finish and preferred collection point.",

          "Journeys can be arranged for couples, families, corporate guests and larger private groups.",
        ],
      },

      {
        title:
          "Event travel with children",

        paragraphs: [
          "Families attending sporting events, celebrations, dinners or other Melbourne occasions can request a Booster Seat or Child Safety Seat when arranging the journey.",

          "If you are travelling with children, tell us about the child-seat requirement, passenger numbers, prams and other luggage so the booking can be planned appropriately.",
        ],
      },
    ],

    faqs: [
      {
        question:
          "Can return pickup be arranged after an event?",

        answer:
          "Yes. Include an expected finish time or request flexible waiting in the quote.",
      },

      {
        question:
          "Can we travel to an event with babies or children?",

        answer:
          "Yes. Families can request Booster Seat or Child Safety Seat options when submitting the journey enquiry, subject to confirmation and availability.",
      },
    ],
  },
];