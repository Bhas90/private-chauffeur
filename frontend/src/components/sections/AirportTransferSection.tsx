import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiNavigation,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { routePaths } from "../../routes/routePaths";

import "./airportTransferSection.css";

const features = [
  "Melbourne Airport and Avalon Airport transfers",
  "Flight tracking and arrival-time monitoring",
  "Meet-and-greet assistance",
  "International and domestic terminal pickups",
  "Door-to-door private transport",
  "Available for individuals, families and corporate travellers",
];

const airportServiceSlug =
  "airport-transfers-melbourne";

export default function AirportTransferSection() {
  const serviceDetailUrl =
    `${routePaths.services}/${airportServiceSlug}`;

  const airportQuoteUrl =
    `${routePaths.quote}?service=${encodeURIComponent(
      airportServiceSlug,
    )}`;

  return (
    <section className="airport-transfer section">
      <div className="container airport-transfer__layout">
        <div className="airport-transfer__content">
          <span className="eyebrow">
            Melbourne Airport Transfers
          </span>

          <h2 className="section-title">
            Start and finish your journey with a
            reliable airport chauffeur.
          </h2>

          <p className="section-description">
            Travel between Melbourne Airport,
            Avalon Airport, Melbourne CBD,
            surrounding suburbs and regional
            Victoria with a private chauffeur
            service planned around your flight
            and schedule.
          </p>

          <div className="airport-transfer__quick-points">
            <article>
              <FiClock aria-hidden="true" />

              <div>
                <strong>
                  24/7 Availability
                </strong>

                <span>
                  Early departures and late
                  arrivals supported.
                </span>
              </div>
            </article>

            <article>
              <FiNavigation
                aria-hidden="true"
              />

              <div>
                <strong>
                  Flight Monitoring
                </strong>

                <span>
                  Pickup timing adjusted around
                  flight updates.
                </span>
              </div>
            </article>

            <article>
              <FiMapPin aria-hidden="true" />

              <div>
                <strong>
                  Door-to-Door Travel
                </strong>

                <span>
                  Direct transport to your
                  chosen destination.
                </span>
              </div>
            </article>
          </div>

          <ul className="airport-transfer__features">
            {features.map((feature) => (
              <li key={feature}>
                <FiCheckCircle
                  aria-hidden="true"
                />

                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="airport-transfer__actions">
            <Link
              className="button button--primary"
              to={serviceDetailUrl}
            >
              Explore Airport Transfers

              <FiArrowRight
                aria-hidden="true"
              />
            </Link>

            <Link
              className="button airport-transfer__quote"
              to={airportQuoteUrl}
            >
              Get Airport Quote

              <FiArrowRight
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="airport-transfer__visual">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1500&q=85"
            alt="Melbourne airport chauffeur transfer"
            loading="lazy"
          />

          <div className="airport-transfer__overlay" />

          <div className="airport-transfer__route-card">
            <span>Popular Journey</span>

            <strong>
              Melbourne Airport
            </strong>

            <small>
              To Melbourne CBD and surrounding
              suburbs
            </small>

            <Link to={airportQuoteUrl}>
              Request Quote

              <FiArrowRight
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="airport-transfer__badge">
            <FiNavigation
              aria-hidden="true"
            />

            <span>
              <strong>
                Flight-monitored
              </strong>

              airport pickups
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}