import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiPhone,
} from "react-icons/fi";

import { siteConfig } from "../../config/siteConfig";
import HeroNavigation from "../navbar/HeroNavigation";
import "./heroHeader.css";

const trustItems = [
  "Available 24/7",
  "Professional Chauffeurs",
  "Melbourne-Wide Service",
];

export default function HeroHeader() {
  return (
    <section className="hero-header">
      <div className="hero-header__background" />

      <div className="hero-header__overlay" />

      <div className="container hero-header__content-wrapper">
        <div className="hero-header__content">
          <span className="hero-header__eyebrow">
            Private Chauffeur Melbourne
          </span>

          <h1>
            Melbourne Chauffeur Travel,
            <span> Refined Around You.</span>
          </h1>

          <p>
            Premium airport transfers, corporate journeys, private travel and
            special-event transportation across Melbourne and regional
            Victoria.
          </p>

          <div className="hero-header__actions">
            <Link className="button button--primary" to="/get-a-quote">
              Get a Quote
              <FiArrowRight />
            </Link>

            <a
              className="button hero-header__call-button"
              href={siteConfig.phoneHref}
            >
              <FiPhone />
              Call {siteConfig.phone}
            </a>
          </div>

          <ul className="hero-header__trust">
            {trustItems.map((item) => (
              <li key={item}>
                <FiCheckCircle />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <HeroNavigation />
    </section>
  );
}