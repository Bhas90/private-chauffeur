import LegalPageLayout, {
  type LegalSection,
} from "../../components/legal/LegalPageLayout";

const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of These Terms",
    paragraphs: [
      "These Terms and Conditions apply when you access this website, request a quotation, make an enquiry or book chauffeur services with Private Chauffeur Melbourne.",
      "By using the website or confirming a booking, you acknowledge that you have read and accepted these terms together with any quotation, booking confirmation or additional conditions supplied to you.",
      "If you are arranging travel for another passenger, you confirm that you are authorised to accept these terms on their behalf.",
    ],
  },
  {
    id: "website-use",
    title: "2. Website Use",
    paragraphs: [
      "The website is provided to present general business information, chauffeur services, fleet information, service areas, travel content and enquiry facilities.",
      "You must not misuse the website, interfere with its operation, attempt unauthorised access or submit false, unlawful or misleading information.",
      "Website information may be changed, corrected or removed without notice.",
    ],
  },
  {
    id: "quotations",
    title: "3. Quotations",
    paragraphs: [
      "A quotation is based on the information provided at the time of the request, including journey date, pickup time, locations, passenger numbers, luggage, stops, waiting requirements and preferred vehicle.",
      "A quotation does not constitute a confirmed booking unless we expressly confirm the reservation.",
      "A quotation may be revised where journey details change or the original information was incomplete or inaccurate.",
    ],
  },
  {
    id: "booking-confirmation",
    title: "4. Booking Confirmation",
    paragraphs: [
      "A booking is confirmed only after you receive written confirmation from us and satisfy any required payment or deposit conditions.",
      "Submitting an online form, email, WhatsApp message or telephone enquiry does not by itself confirm vehicle availability.",
      "You are responsible for checking that all details shown in the confirmation are accurate and notifying us promptly of any error.",
    ],
  },
  {
    id: "pricing",
    title: "5. Pricing",
    paragraphs: [
      "Prices may be calculated manually, by distance, by time, by itinerary or through a combination of these methods.",
      "Unless stated otherwise, prices are based on the confirmed itinerary and may not include additional waiting, parking, tolls, airport charges, unscheduled stops, cleaning, damage or other expenses.",
      "Any applicable GST or additional charge will be identified where required.",
    ],
  },
  {
    id: "payments",
    title: "6. Payments",
    paragraphs: [
      "Payment requirements, due dates and accepted payment methods will be stated in the quotation, invoice or booking confirmation.",
      "We may require full payment or a deposit before confirming or commencing a service.",
      "Failure to make payment when due may result in the booking being suspended or cancelled.",
      "Payment terms form part of the agreement between a business and its customer and should be clearly communicated in invoices and contracts. ",
    ],
  },
  {
    id: "passenger-information",
    title: "7. Passenger and Journey Information",
    paragraphs: [
      "You must provide complete and accurate information about passengers, luggage, pickup locations, destinations, flight details, accessibility requirements, child-seat requests and other relevant needs.",
      "We may decline or amend a journey where the selected vehicle cannot safely or legally accommodate the passengers or luggage.",
      "Special requirements are subject to prior confirmation.",
    ],
  },
  {
    id: "airport-transfers",
    title: "8. Airport Transfers",
    paragraphs: [
      "Airport bookings should include the correct airport, terminal, airline, flight number and scheduled arrival or departure time.",
      "Passengers remain responsible for allowing sufficient time for airline check-in, security, traffic and airport requirements.",
      "Flight monitoring, where offered, does not guarantee that all changes or disruptions will be detected.",
      "Airport pickup instructions and included waiting periods will be stated in the booking confirmation where applicable.",
    ],
  },
  {
    id: "waiting-time",
    title: "9. Waiting Time",
    paragraphs: [
      "Included waiting time, if any, depends on the service and will be stated in the quotation or booking confirmation.",
      "Additional waiting time may incur charges and remains subject to chauffeur and vehicle availability.",
      "If the passenger cannot be contacted or located after the applicable waiting period, the booking may be treated as a no-show.",
    ],
  },
  {
    id: "changes",
    title: "10. Booking Changes",
    paragraphs: [
      "Requests to change a date, pickup time, address, destination, passenger count, vehicle or itinerary must be made as early as possible.",
      "Changes are subject to availability and may result in a revised price.",
      "A material change may be treated as a cancellation of the original booking and the creation of a new booking.",
    ],
  },
  {
    id: "cancellations",
    title: "11. Cancellations",
    paragraphs: [
      "Cancellation conditions depend on the service, notice provided, vehicle allocation, third-party charges and work already undertaken.",
      "Applicable cancellation charges should be stated in the quotation or confirmation.",
      "Further information is available in our Cancellation and Refund Policy.",
    ],
  },
  {
    id: "no-shows",
    title: "12. Passenger No-Shows",
    paragraphs: [
      "A passenger may be considered a no-show where they do not attend the confirmed pickup location, cannot be contacted or do not provide updated instructions within the applicable waiting period.",
      "A no-show may result in the booking price becoming non-refundable, subject to applicable law and the circumstances.",
    ],
  },
  {
    id: "vehicle-availability",
    title: "13. Vehicle Availability and Substitution",
    paragraphs: [
      "Vehicle models shown on the website are indicative of the fleet or vehicle category and remain subject to availability.",
      "We may provide a comparable or upgraded vehicle where the requested vehicle becomes unavailable because of maintenance, breakdown, operational requirements or circumstances outside our reasonable control.",
      "We will take reasonable steps to provide a suitable replacement.",
    ],
  },
  {
    id: "chauffeur-delays",
    title: "14. Delays and Disruptions",
    paragraphs: [
      "Journey times can be affected by traffic, weather, road closures, events, airport conditions, emergencies and other circumstances outside our control.",
      "We do not guarantee a particular arrival time unless expressly agreed in writing.",
      "We will take reasonable steps to provide the service within an appropriate timeframe and communicate material issues where possible.",
    ],
  },
  {
    id: "passenger-conduct",
    title: "15. Passenger Conduct",
    paragraphs: [
      "Passengers must behave lawfully and must not threaten, harass, distract or endanger the chauffeur or other persons.",
      "Smoking, illegal substances and unlawful activity are prohibited in the vehicle.",
      "We may refuse or end a service where passenger behaviour creates a safety, legal or property risk.",
    ],
  },
  {
    id: "damage-cleaning",
    title: "16. Damage and Cleaning",
    paragraphs: [
      "The person making the booking may be responsible for reasonable costs arising from passenger-caused damage, excessive cleaning or loss, subject to evidence and applicable law.",
      "Any charge will be assessed according to the circumstances and reasonable repair, cleaning or downtime costs.",
    ],
  },
  {
    id: "children",
    title: "17. Children and Child Restraints",
    paragraphs: [
      "Children must be supervised by a responsible adult.",
      "Any child-seat or restraint requirement must be requested before booking and confirmed by us.",
      "The booking party is responsible for providing accurate information about each child and confirming suitability.",
    ],
  },
  {
    id: "lost-property",
    title: "18. Lost Property",
    paragraphs: [
      "Passengers should check the vehicle before leaving.",
      "We will take reasonable steps to identify and return property found in a vehicle, but we do not guarantee recovery.",
      "Reasonable delivery, postage or handling costs may apply when returning an item.",
    ],
  },
  {
    id: "third-party-services",
    title: "19. Third-Party Services",
    paragraphs: [
      "We may use independent chauffeurs, payment providers, communication services, hosting providers or other suppliers.",
      "Where a third party provides a separate service directly to you, that provider's terms may also apply.",
    ],
  },
  {
    id: "consumer-rights",
    title: "20. Australian Consumer Law",
    paragraphs: [
      "Nothing in these terms excludes, restricts or modifies any right, guarantee or remedy that cannot lawfully be excluded under the Australian Consumer Law.",
      "Where a service does not satisfy an applicable consumer guarantee, a customer may be entitled to a remedy depending on whether the failure is major or minor and on the surrounding circumstances.",
    ],
  },
  {
    id: "liability",
    title: "21. Liability",
    paragraphs: [
      "To the maximum extent permitted by law, we are not responsible for indirect, consequential or purely economic loss arising from matters outside our reasonable control.",
      "Any limitation of liability in these terms is subject to rights and remedies that cannot lawfully be excluded.",
      "You should notify us promptly if you believe a service has not been supplied as agreed.",
    ],
  },
  {
    id: "privacy",
    title: "22. Privacy",
    paragraphs: [
      "Personal information is handled according to our Privacy Policy.",
      "You should review that policy before submitting information about yourself or another passenger.",
    ],
  },
  {
    id: "intellectual-property",
    title: "23. Intellectual Property",
    paragraphs: [
      "Website text, design, branding, graphics and original content are owned by or licensed to Private Chauffeur Melbourne unless stated otherwise.",
      "You may view the website for personal and legitimate business-enquiry purposes but must not reproduce or commercially exploit its content without permission.",
    ],
  },
  {
    id: "governing-law",
    title: "24. Governing Law",
    paragraphs: [
      "These terms are governed by the laws applicable in Victoria, Australia.",
      "The parties submit to the courts and tribunals having jurisdiction in Victoria, subject to any mandatory consumer rights or jurisdictional requirements.",
    ],
  },
  {
    id: "changes-to-terms",
    title: "25. Changes to These Terms",
    paragraphs: [
      "We may update these terms to reflect changes in services, business practices or legal requirements.",
      "The version applying to a confirmed booking will generally be the version supplied or available when that booking was confirmed, unless otherwise required by law.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Booking and Website Terms"
      title="Terms and Conditions"
      description="The terms applying to website use, chauffeur quotations, confirmed bookings, payments, passenger responsibilities and service delivery."
      effectiveDate="5 August 2026"
      sections={termsSections}
      notice="These terms must be aligned with the business’s final pricing, payment, cancellation, waiting-time and operational procedures before launch."
      sidebarTitle="Please review these terms."
      sidebarDescription="These conditions explain the responsibilities of Private Chauffeur Melbourne, the person making the booking and each passenger."
      contactTitle="Have a question about these terms?"
      contactDescription="Contact our booking team before confirming your chauffeur service if any condition is unclear."
    />
  );
}