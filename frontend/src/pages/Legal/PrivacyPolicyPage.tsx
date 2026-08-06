import LegalPageLayout, {
  type LegalSection,
} from "../../components/legal/LegalPageLayout";

const privacySections: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    paragraphs: [
      "Private Chauffeur Melbourne respects your privacy and aims to handle personal information responsibly.",
      "This Privacy Policy explains how information may be collected, used, stored, disclosed and protected when you visit our website, request a quotation, submit an enquiry or use our chauffeur services.",
      "This policy should be read together with our Terms and Conditions, Cookie Policy and any booking terms supplied with a quotation or confirmed reservation.",
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We May Collect",
    paragraphs: [
      "The information collected depends on how you interact with us and the services you request.",
    ],
    points: [
      "Full name",
      "Email address",
      "Telephone and WhatsApp number",
      "Pickup and destination addresses",
      "Journey dates and times",
      "Flight number and airport information",
      "Passenger and luggage requirements",
      "Preferred chauffeur service or vehicle",
      "Booking references and enquiry details",
      "Additional requirements voluntarily provided by you",
      "Communication records between you and our team",
      "Website usage, device and browser information",
    ],
  },
  {
    id: "collection-methods",
    title: "3. How We Collect Information",
    paragraphs: [
      "We may collect personal information directly from you when you complete a website form, contact us by telephone, email or WhatsApp, request a quotation, confirm a booking or communicate with our team.",
      "We may also receive information from a person arranging travel on your behalf, a business client, travel coordinator, hotel, event organiser or another authorised representative.",
      "Technical information may be collected automatically through cookies, analytics tools, server logs and similar technologies when you use the website.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "4. How We Use Personal Information",
    paragraphs: [
      "Personal information may be used for legitimate business and service-related purposes.",
    ],
    points: [
      "Responding to enquiries and quotation requests",
      "Assessing chauffeur-service requirements",
      "Preparing and confirming bookings",
      "Coordinating pickups, destinations and itineraries",
      "Communicating journey updates",
      "Providing customer support",
      "Processing or verifying payments through authorised providers",
      "Managing complaints, cancellations and refunds",
      "Maintaining business and transaction records",
      "Improving website performance and user experience",
      "Preventing fraud, misuse and security incidents",
      "Meeting legal and regulatory obligations",
    ],
  },
  {
    id: "booking-information",
    title: "5. Booking and Journey Information",
    paragraphs: [
      "Journey information may include pickup addresses, destinations, passenger names, flight details, accommodation details, event locations and special requirements.",
      "Please avoid submitting sensitive personal information unless it is genuinely necessary for us to review or provide the requested service.",
      "Where you provide information about another passenger, you should ensure that you are authorised to provide that information.",
    ],
  },
  {
    id: "communications",
    title: "6. Email, Telephone and WhatsApp Communications",
    paragraphs: [
      "We may use the contact information you provide to respond to enquiries, send quotations, confirm bookings, provide service updates and address support requests.",
      "WhatsApp and email communications may be processed through third-party platforms. Their handling of information is governed by their own privacy terms and security practices.",
      "We do not guarantee that email, SMS or messaging platforms are completely secure or uninterrupted.",
    ],
  },
  {
    id: "payments",
    title: "7. Payments",
    paragraphs: [
      "Where electronic payments are offered, transactions may be processed by an independent payment provider.",
      "We may receive transaction references, payment status and limited billing information, but complete payment-card information should not be stored by us unless specifically required and appropriately secured.",
      "Payment providers maintain their own privacy policies and security controls.",
    ],
  },
  {
    id: "disclosure",
    title: "8. Disclosure to Service Providers",
    paragraphs: [
      "Relevant personal information may be disclosed to trusted providers where reasonably necessary to operate the website, communicate with customers or provide chauffeur services.",
    ],
    points: [
      "Chauffeurs and transport-service personnel",
      "Website-hosting and cloud providers",
      "Email and communication providers",
      "Payment processors",
      "Website analytics and security providers",
      "Professional advisers",
      "Government, regulatory or law-enforcement authorities where required",
    ],
  },
  {
    id: "overseas-processing",
    title: "9. Overseas Processing",
    paragraphs: [
      "Some technology, hosting, email, analytics or communication providers may process information outside Australia.",
      "Where applicable, we take reasonable steps to select reputable providers and manage information consistently with our legal obligations.",
    ],
  },
  {
    id: "security",
    title: "10. Data Security",
    paragraphs: [
      "We take reasonable administrative, technical and organisational measures to protect personal information from misuse, interference, loss and unauthorised access, modification or disclosure.",
      "These measures may include restricted administrative access, password controls, encrypted connections, secure hosting and periodic review of stored information.",
      "No online transmission or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    id: "retention",
    title: "11. Information Retention",
    paragraphs: [
      "Personal information is retained only for as long as reasonably required for the purpose for which it was collected, business record keeping, dispute management and legal obligations.",
      "When information is no longer required, it may be securely deleted, destroyed or de-identified where practical and legally permitted.",
    ],
  },
  {
    id: "access-and-correction",
    title: "12. Access and Correction",
    paragraphs: [
      "You may contact us to request access to personal information we hold about you or ask us to correct information that is inaccurate, incomplete or out of date.",
      "We may need to verify your identity before processing a request.",
      "In limited circumstances, access may be refused where permitted by law, and the reason will be explained where required.",
    ],
  },
  {
    id: "cookies-and-analytics",
    title: "13. Cookies and Analytics",
    paragraphs: [
      "Our website may use necessary cookies, analytics technologies and third-party content to operate correctly, measure performance and improve user experience.",
      "You can manage many cookies through your browser settings. Disabling certain cookies may affect website functionality.",
      "Further information is available in our Cookie Policy.",
    ],
  },
  {
    id: "marketing",
    title: "14. Marketing Communications",
    paragraphs: [
      "Marketing communications may be sent only where permitted and where appropriate consent or another lawful basis exists.",
      "You may ask us to stop sending promotional communications at any time.",
      "Service-related and booking-related messages may still be sent where necessary.",
    ],
  },
  {
    id: "third-party-links",
    title: "15. Third-Party Links",
    paragraphs: [
      "Our website may include links to Google Maps, social media platforms, payment services and other third-party websites.",
      "We are not responsible for the privacy practices, security or content of third-party services.",
      "You should review their privacy policies before providing information.",
    ],
  },
  {
    id: "complaints",
    title: "16. Privacy Questions and Complaints",
    paragraphs: [
      "Contact us if you have a question or complaint about how your personal information has been handled.",
      "We will review the matter and aim to respond within a reasonable period.",
      "You may also have the right to contact the Office of the Australian Information Commissioner where applicable.",
    ],
  },
  {
    id: "policy-changes",
    title: "17. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy to reflect changes to our website, services, technology, business practices or legal obligations.",
      "The updated version will be published on this page with a revised effective date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal Information"
      title="Privacy Policy"
      description="How Private Chauffeur Melbourne may collect, use, store and protect information provided through our website, enquiries and chauffeur services."
      effectiveDate="5 August 2026"
      sections={privacySections}
      notice="This policy should be reviewed against the business’s actual systems, third-party providers and legal obligations before the website is launched."  
      contactTitle="Questions about your privacy?"
      contactDescription="Contact our team to request access, ask for a correction or raise a concern about how your information has been handled."
    />
  );
}