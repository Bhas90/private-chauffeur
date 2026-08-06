import LegalPageLayout, {
  type LegalSection,
} from "../../components/legal/LegalPageLayout";

const refundSections: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    paragraphs: [
      "This Cancellation and Refund Policy explains how booking changes, cancellations and refunds may be handled by Private Chauffeur Melbourne.",
      "This policy should be read together with our Terms and Conditions and any quotation or booking confirmation.",
    ],
  },

  {
    id: "booking-cancellation",
    title: "2. Booking Cancellations",
    paragraphs: [
      "Cancellation requests should be submitted as soon as possible after you become aware that travel is no longer required.",
      "Applicable cancellation charges may depend on the amount of notice provided, vehicle allocation, chauffeur scheduling and third-party costs already incurred.",
      "The applicable cancellation conditions will normally be stated in the quotation or booking confirmation.",
    ],
  },

  {
    id: "changes",
    title: "3. Booking Changes",
    paragraphs: [
      "Requests to change dates, pickup times, destinations, passenger numbers or vehicles are subject to availability.",
      "Some booking changes may result in revised pricing or require a new quotation.",
    ],
  },

  {
    id: "airport",
    title: "4. Airport Transfers",
    paragraphs: [
      "Airport bookings rely on accurate flight information being supplied.",
      "Where flight details change, passengers should notify us as soon as reasonably possible.",
      "Additional waiting time or itinerary changes may affect pricing.",
    ],
  },

  {
    id: "corporate",
    title: "5. Corporate Bookings",
    paragraphs: [
      "Corporate accounts may operate under separate service agreements or negotiated cancellation conditions.",
      "Where a corporate agreement exists, that agreement takes precedence over this general policy.",
    ],
  },

  {
    id: "refunds",
    title: "6. Refund Processing",
    paragraphs: [
      "Approved refunds will generally be returned using the original payment method where practical.",
      "Refund processing times depend on the payment provider and financial institution.",
      "Administrative processing times may vary.",
    ],
  },

  {
    id: "non-refundable",
    title: "7. Non-refundable Costs",
    paragraphs: [
      "Some costs may already have been incurred before cancellation, including third-party charges, allocated chauffeurs, special vehicle preparation or other committed operational expenses.",
      "Where permitted by law, these amounts may not be refundable.",
    ],
  },

  {
    id: "no-show",
    title: "8. Passenger No-Shows",
    paragraphs: [
      "If a passenger fails to attend the confirmed pickup location and cannot be contacted within the applicable waiting period, the booking may be treated as a no-show.",
      "Any applicable charges remain subject to Australian Consumer Law.",
    ],
  },

  {
    id: "force-majeure",
    title: "9. Events Outside Our Control",
    paragraphs: [
      "Weather, road closures, emergencies, airport disruptions, government restrictions and other circumstances outside reasonable control may affect scheduled services.",
      "Where possible we will work with customers to identify suitable alternatives.",
    ],
  },

  {
    id: "consumer-law",
    title: "10. Australian Consumer Law",
    paragraphs: [
      "Nothing in this policy excludes or limits any rights or remedies available under Australian Consumer Law.",
      "Customers may be entitled to remedies depending on the circumstances and applicable legislation.",
    ],
  },

  {
    id: "contact",
    title: "11. Questions About Refunds",
    paragraphs: [
      "If you have questions about cancellations or refunds, please contact our booking team before cancelling your reservation.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Cancellation & Refund Policy"
      title="Cancellation & Refund Policy"
      description="Understand how cancellations, booking changes and refund requests are handled by Private Chauffeur Melbourne."
      effectiveDate="5 August 2026"
      sections={refundSections}
      notice="This policy should be reviewed against the final business booking process before publication."
      sidebarTitle="Booking Changes & Refunds"
      sidebarDescription="We encourage customers to notify us as early as possible if travel plans change."
      contactTitle="Need Help?"
      contactDescription="Contact our booking team if you need assistance with a cancellation or refund request."
    />
  );
}