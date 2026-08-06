import {
  FiArrowRight,
  FiCheckCircle,
  FiHome,
  FiPhone,
} from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";
import { siteConfig } from "../../config/siteConfig";
import "./thankYouPage.css";

type SubmissionType =
  | "quote"
  | "contact"
  | "support"
  | "general";

const pageContent: Record<
  SubmissionType,
  {
    eyebrow: string;
    title: string;
    description: string;
    confirmationTitle: string;
    confirmationText: string;
  }
> = {
  quote: {
    eyebrow: "Quote Request Received",
    title: "Thank you for requesting a chauffeur quote.",
    description:
      "Our Melbourne booking team has received your journey details and will review your service, passenger, luggage and vehicle requirements.",
    confirmationTitle: "Your quote request has been received.",
    confirmationText:
      "A member of our booking team will review your information and contact you using the details supplied in the form.",
  },

  contact: {
    eyebrow: "Enquiry Received",
    title: "Thank you for contacting us.",
    description:
      "Your general enquiry has been received by Private Chauffeur Melbourne.",
    confirmationTitle: "Your message has been sent.",
    confirmationText:
      "Our team will review your enquiry and respond using your preferred contact method.",
  },

  support: {
    eyebrow: "Support Report Received",
    title: "Thank you for reporting the problem.",
    description:
      "Your report has been submitted for review by our support team.",
    confirmationTitle: "Your report has been received.",
    confirmationText:
      "We will review the information and any supporting attachment before contacting you.",
  },

  general: {
    eyebrow: "Submission Received",
    title: "Thank you.",
    description:
      "Your information has been received by Private Chauffeur Melbourne.",
    confirmationTitle: "Your submission was successful.",
    confirmationText:
      "Our team will review the details and contact you where a response is required.",
  },
};

function getSubmissionType(
  value: string | null,
): SubmissionType {
  if (
    value === "quote" ||
    value === "contact" ||
    value === "support"
  ) {
    return value;
  }

  return "general";
}

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();

  const submissionType = getSubmissionType(
    searchParams.get("type"),
  );

  const content = pageContent[submissionType];

  return (
    <main>
      <InnerPageHero
        showNavigation={false}
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        breadcrumbs={[
          {
            label: "Home",
            path: "/",
          },
          {
            label: "Thank You",
          },
        ]}
      />

      <section className="thank-you-page">
        <div className="container thank-you-page__container">
          <div className="thank-you-page__card">
            <div className="thank-you-page__icon">
              <FiCheckCircle aria-hidden="true" />
            </div>

            <span className="eyebrow">
              Private Chauffeur Melbourne
            </span>

            <h2>{content.confirmationTitle}</h2>

            <p>{content.confirmationText}</p>

            <div className="thank-you-page__next">
              <h3>What happens next?</h3>

              <div className="thank-you-page__steps">
                <article>
                  <span>01</span>

                  <div>
                    <strong>Review</strong>

                    <p>
                      Our team reviews the information you
                      provided.
                    </p>
                  </div>
                </article>

                <article>
                  <span>02</span>

                  <div>
                    <strong>Contact</strong>

                    <p>
                      We contact you by phone, email or WhatsApp
                      where required.
                    </p>
                  </div>
                </article>

                <article>
                  <span>03</span>

                  <div>
                    <strong>Confirmation</strong>

                    <p>
                      Quote, booking or support details are
                      confirmed separately.
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <div className="thank-you-page__notice">
              <strong>Please note</strong>

              <p>
                A form submission does not automatically confirm
                a chauffeur booking, vehicle availability,
                refund or other requested outcome.
              </p>
            </div>

            <div className="thank-you-page__actions">
              <Link
                className="button button--primary"
                to="/"
              >
                <FiHome aria-hidden="true" />
                Return Home
              </Link>

              <Link
                className="button thank-you-page__secondary-button"
                to="/services"
              >
                Explore Services
                <FiArrowRight aria-hidden="true" />
              </Link>

              <a
                className="button thank-you-page__call-button"
                href={siteConfig.phoneHref}
              >
                <FiPhone aria-hidden="true" />
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}