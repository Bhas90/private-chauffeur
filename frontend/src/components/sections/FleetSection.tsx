import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { fleetData } from "../../data/fleetData";
import { routePaths } from "../../routes/routePaths";
import FleetCard from "../cards/FleetCard";

import "./fleetSection.css";

export default function FleetSection() {
  return (
    <section className="fleet-section section">
      <div className="container">
        <div className="fleet-section__header">
          <div className="section-header">
            <span className="eyebrow">
              Executive Chauffeur Fleet
            </span>

            <h2 className="section-title">
              Luxury vehicles selected for comfort, privacy and style.
            </h2>

            <p className="section-description">
              Choose from our chauffeur-driven executive and luxury sedans
              for airport transfers, corporate travel, weddings, special
              events and private journeys across Melbourne.
            </p>
          </div>

          <Link
            className="button fleet-section__button"
            to={routePaths.fleet}
          >
            Explore Full Fleet
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="fleet-section__grid">
          {fleetData.map((vehicle) => (
            <FleetCard
              key={vehicle.slug}
              vehicle={vehicle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}