import {
  FiCheck,
  FiClock,
  FiMapPin,
  FiShield,
  FiStar,
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import "./whyChooseUs.css";

const benefits = [
  {
    icon: FiUserCheck,
    title: "Professional Chauffeurs",
    description:
      "Courteous, discreet and experienced chauffeurs focused on your comfort and schedule.",
  },
  {
    icon: FiClock,
    title: "Available 24 Hours",
    description:
      "Early airport departures, late arrivals and private journeys can be arranged around the clock.",
  },
  {
    icon: FiMapPin,
    title: "Local Melbourne Knowledge",
    description:
      "Efficient travel across Melbourne CBD, surrounding suburbs and regional Victorian destinations.",
  },
  {
    icon: FiShield,
    title: "Reliable and Secure",
    description:
      "Carefully planned bookings, well-maintained vehicles and dependable customer communication.",
  },
];

const includedItems = [
  "Flight monitoring for airport pickups",
  "Door-to-door chauffeur service",
  "Clean and comfortable vehicles",
  "Instant estimates or manual quotations",
  "WhatsApp and email booking updates",
  "Corporate and private travel options",
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us section">
      <div className="container why-choose-us__layout">
        <div className="why-choose-us__visual">
          <div className="why-choose-us__main-image">
            <img
              src="https://images.unsplash.com/photo-1620144319044-7204a28a9e17?auto=format&fit=crop&w=1400&q=85"
              alt="Professional chauffeur opening a luxury vehicle"
              loading="lazy"
            />
          </div>

          <div className="why-choose-us__small-image">
            <img
              src="https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=900&q=85"
              alt="Luxury chauffeur vehicle interior"
              loading="lazy"
            />
          </div>

          <div className="why-choose-us__experience">
            <FiStar />

            <div>
              <strong>Premium Service</strong>
              <span>From booking to destination</span>
            </div>
          </div>
        </div>

        <div className="why-choose-us__content">
          <span className="eyebrow">Why Travel With Us</span>

          <h2 className="section-title">
            A chauffeur experience built around reliability and care.
          </h2>

          <p className="section-description">
            Whether you are travelling to Melbourne Airport, attending
            an important meeting or planning a private event, our
            service is designed to make every part of your journey
            straightforward, comfortable and professional.
          </p>

          <div className="why-choose-us__benefits">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article key={title}>
                <span>
                  <Icon />
                </span>

                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>

          <ul className="why-choose-us__included">
            {includedItems.map((item) => (
              <li key={item}>
                <FiCheck />
                {item}
              </li>
            ))}
          </ul>

          <div className="why-choose-us__actions">
            <Link className="button button--dark" to="/about">
              Discover Our Service
            </Link>

            <Link className="button why-choose-us__quote" to="/get-a-quote">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}