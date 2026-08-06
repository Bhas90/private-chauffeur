import {
  FiClock,
  FiMapPin,
  FiShield,
  FiStar,
} from "react-icons/fi";

import "./trustHighlights.css";

const trustItems = [
  {
    icon: FiClock,
    title: "Available 24/7",
    description: "Book chauffeur travel at any time.",
  },
  {
    icon: FiShield,
    title: "Professional Service",
    description: "Reliable, discreet and customer-focused.",
  },
  {
    icon: FiStar,
    title: "Premium Fleet",
    description: "Executive vehicles maintained for comfort.",
  },
  {
    icon: FiMapPin,
    title: "Melbourne-Wide",
    description: "CBD, suburbs and regional Victoria.",
  },
];

export default function TrustHighlights() {
  return (
    <section className="trust-highlights">
      <div className="container">
        <div className="trust-highlights__grid">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <article className="trust-highlights__item" key={title}>
              <span className="trust-highlights__icon">
                <Icon />
              </span>

              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}