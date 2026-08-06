import {
  FiArrowLeft,
  FiHome,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import HeroNavigation from "../../components/navbar/HeroNavigation";
import "./notFoundPage.css";

const helpfulLinks = [
  {
    label: "Chauffeur Services",
    path: "/services",
  },
  {
    label: "Luxury Fleet",
    path: "/fleet",
  },
  {
    label: "Service Areas",
    path: "/service-areas",
  },
  {
    label: "Travel Guides",
    path: "/blog",
  },
  {
    label: "Contact Us",
    path: "/contact",
  },
  {
    label: "Request a Quote",
    path: "/get-a-quote",
  },
];

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-page__hero">
        <div className="not-found-page__background" />
        <div className="not-found-page__overlay" />

        <div className="container not-found-page__content">
          <span className="not-found-page__code">
            404
          </span>

          <span className="eyebrow">
            Page Not Found
          </span>

          <h1>
            This page is not available.
          </h1>

          <p>
            The page may have been moved, removed or the
            address may have been entered incorrectly. Use
            the links below to continue exploring Private
            Chauffeur Melbourne.
          </p>

          <div className="not-found-page__actions">
            <Link
              className="button button--primary"
              to="/"
            >
              <FiHome aria-hidden="true" />
              Return Home
            </Link>

            <button
              type="button"
              className="button not-found-page__back-button"
              onClick={() => window.history.back()}
            >
              <FiArrowLeft aria-hidden="true" />
              Go Back
            </button>
          </div>
        </div>

        <HeroNavigation />
      </section>

      <section className="not-found-page__help">
        <div className="container">
          <div className="not-found-page__heading">
            <span className="eyebrow">
              Helpful Links
            </span>

            <h2>
              Continue planning your Melbourne journey.
            </h2>

            <p>
              Browse our chauffeur services, vehicles,
              local coverage and travel information.
            </p>
          </div>

          <div className="not-found-page__grid">
            {helpfulLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
              >
                {item.path === "/service-areas" ? (
                  <FiMapPin aria-hidden="true" />
                ) : (
                  <FiSearch aria-hidden="true" />
                )}

                <span>
                  <strong>{item.label}</strong>
                  <small>
                    Visit {item.path}
                  </small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}