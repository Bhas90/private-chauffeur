import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiCreditCard,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import "./corporateTravelSection.css";

const corporateBenefits = [
  {
    icon: FiBriefcase,
    title: "Executive Transfers",
    description:
      "Professional travel for executives, clients, meetings and business appointments.",
  },
  {
    icon: FiCalendar,
    title: "Roadshows and Events",
    description:
      "Coordinated travel across multiple meetings, venues and scheduled stops.",
  },
  {
    icon: FiUsers,
    title: "Conference Transport",
    description:
      "Reliable private transport for delegates, speakers and corporate guests.",
  },
  {
    icon: FiCreditCard,
    title: "Corporate Accounts",
    description:
      "Simplified repeat bookings and account-based travel management.",
  },
];

const corporatePoints = [
  "Airport transfers for executives and clients",
  "Hourly chauffeur hire",
  "Multiple-stop itineraries",
  "Conference and event coordination",
  "Professional booking communication",
  "Flexible vehicle selection",
];

export default function CorporateTravelSection() {
  return (
    <section className="corporate-travel section">
      <div className="container">
        <div className="corporate-travel__panel">
          <div className="corporate-travel__visual">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1500&q=85"
              alt="Corporate chauffeur travel in Melbourne"
              loading="lazy"
            />

            <div className="corporate-travel__image-overlay" />

            <div className="corporate-travel__image-content">
              <span>Corporate Chauffeur Melbourne</span>

              <h3>Business travel that works around your schedule.</h3>
            </div>
          </div>

          <div className="corporate-travel__content">
            <span className="eyebrow">Corporate Travel</span>

            <h2 className="section-title">
              Professional chauffeur services for Melbourne businesses.
            </h2>

            <p className="section-description">
              Arrange polished and dependable transport for executives,
              business travellers, clients, conferences and important
              appointments throughout Melbourne.
            </p>

            <div className="corporate-travel__benefits">
              {corporateBenefits.map(({ icon: Icon, title, description }) => (
                <article key={title}>
                  <Icon />

                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>

            <ul className="corporate-travel__points">
              {corporatePoints.map((point) => (
                <li key={point}>
                  <FiCheck />
                  {point}
                </li>
              ))}
            </ul>

            <div className="corporate-travel__actions">
              <Link
                className="button button--primary"
                to="/services/corporate-chauffeur-melbourne"
              >
                Explore Corporate Travel
                <FiArrowRight />
              </Link>

              <Link
                className="corporate-travel__account-link"
                to="/contact?enquiry=corporate-account"
              >
                Enquire About Corporate Accounts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}