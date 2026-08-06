import {
  FiArrowRight,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { siteConfig } from "../../config/siteConfig";
import { routePaths } from "../../routes/routePaths";

import "./finalCtaSection.css";

const whatsappMessage = encodeURIComponent(
  `Hello Private Chauffeur Melbourne,

I would like to request a chauffeur quote.

Please assist me with my journey requirements.

Thank you.`,
);

const whatsappUrl =
  siteConfig.whatsappHref ||
  `https://wa.me/61452600001?text=${whatsappMessage}`;

export default function FinalCtaSection() {
  return (
    <section className="final-cta">
      <div className="final-cta__background" />
      <div className="final-cta__overlay" />

      <div className="container final-cta__content">
        <span>Private Chauffeur Melbourne</span>

        <h2>
          Tell us where you’re going. We’ll take care of the journey.
        </h2>

        <p>
          Request an airport transfer, corporate journey, special-event
          chauffeur or private Melbourne travel quote today.
        </p>

        <div className="final-cta__actions">
          <Link
            className="button button--primary"
            to={routePaths.quote}
          >
            Request Your Quote
            <FiArrowRight aria-hidden="true" />
          </Link>

          <a
            className="button final-cta__call"
            href={siteConfig.phoneHref}
            aria-label={`Call ${siteConfig.businessName}`}
          >
            <FiPhone aria-hidden="true" />
            Call Now
          </a>

          <a
            className="button final-cta__whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Private Chauffeur Melbourne on WhatsApp"
          >
            <FiMessageCircle aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}