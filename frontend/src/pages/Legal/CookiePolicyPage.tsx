import LegalPageLayout, {
  type LegalSection,
} from "../../components/legal/LegalPageLayout";

const cookieSections: LegalSection[] = [
  {
    id: "overview",
    title: "1. What Are Cookies?",
    paragraphs: [
      "Cookies are small text files stored on your device when you visit a website.",
      "They help websites remember preferences, improve functionality, analyse visitor behaviour and enhance the overall browsing experience.",
      "This Cookie Policy explains how Private Chauffeur Melbourne uses cookies and similar technologies on this website.",
    ],
  },

  {
    id: "necessary",
    title: "2. Necessary Cookies",
    paragraphs: [
      "Necessary cookies enable the website to function correctly.",
      "These cookies support essential website features such as navigation, security, accessibility and session management.",
      "The website may not operate correctly if these cookies are disabled.",
    ],
  },

  {
    id: "performance",
    title: "3. Performance Cookies",
    paragraphs: [
      "Performance cookies help us understand how visitors use our website.",
      "Information collected may include page visits, navigation behaviour, device type and website performance.",
      "This information helps improve user experience and website performance.",
    ],
  },

  {
    id: "analytics",
    title: "4. Analytics Cookies",
    paragraphs: [
      "Analytics tools may collect anonymous or aggregated information regarding website usage.",
      "Analytics data helps us understand which pages perform well and identify areas for improvement.",
      "Examples may include Google Analytics or similar services.",
    ],
  },

  {
    id: "marketing",
    title: "5. Marketing Cookies",
    paragraphs: [
      "Marketing cookies may be used to measure advertising effectiveness and improve future marketing campaigns.",
      "Where required, these cookies will only be used in accordance with applicable legal requirements.",
    ],
  },

  {
    id: "third-party",
    title: "6. Third-Party Services",
    paragraphs: [
      "Some website features may be provided by third-party services.",
      "Examples include Google Maps, YouTube, Google Fonts, embedded content, social media integrations and analytics providers.",
      "These providers may place their own cookies according to their respective privacy policies.",
    ],
  },

  {
    id: "managing",
    title: "7. Managing Cookies",
    paragraphs: [
      "Most internet browsers allow you to view, manage, delete or block cookies.",
      "Disabling certain cookies may reduce website functionality or prevent some features from operating correctly.",
    ],
  },

  {
    id: "consent",
    title: "8. Cookie Consent",
    paragraphs: [
      "Where applicable, cookie consent may be requested before optional cookies are placed on your device.",
      "You may change your preferences at any time using available browser controls or website settings where provided.",
    ],
  },

  {
    id: "changes",
    title: "9. Changes to This Policy",
    paragraphs: [
      "This Cookie Policy may be updated to reflect changes to our website, technology or legal obligations.",
      "Updated versions will be published on this page together with the revised effective date.",
    ],
  },

  {
    id: "contact",
    title: "10. Contact",
    paragraphs: [
      "If you have questions regarding cookies or website privacy, please contact Private Chauffeur Melbourne.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Cookie Policy"
      title="Cookie Policy"
      description="Learn how cookies and similar technologies may be used on the Private Chauffeur Melbourne website."
      effectiveDate="5 August 2026"
      sections={cookieSections}
      notice="This Cookie Policy should be reviewed together with the Privacy Policy before website launch."
      sidebarTitle="About Cookies"
      sidebarDescription="Cookies help improve website performance, remember preferences and provide a better browsing experience."
      contactTitle="Questions About Cookies?"
      contactDescription="If you have questions regarding cookies or privacy, please contact our team."
    />
  );
}