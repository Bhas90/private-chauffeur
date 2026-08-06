import {
  FiArrowUpRight,
  FiBriefcase,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import type { FleetVehicle } from "../../data/fleetData";
import { routePaths } from "../../routes/routePaths";

import "./fleetCard.css";

interface FleetCardProps {
  vehicle: FleetVehicle;
}

export default function FleetCard({
  vehicle,
}: FleetCardProps) {
  const vehicleDetailUrl =
    `${routePaths.fleet}/${vehicle.slug}`;

  const vehicleQuoteUrl =
    `${routePaths.quote}?vehicle=${encodeURIComponent(
      vehicle.slug,
    )}`;

  return (
    <article className="fleet-card">
      <Link
        className="fleet-card__image-wrapper"
        to={vehicleDetailUrl}
        aria-label={`View ${vehicle.name}`}
      >
        <img
          className="fleet-card__image"
          src={vehicle.image}
          alt={`${vehicle.name} chauffeur vehicle`}
          loading="lazy"
        />

        <span
          className="fleet-card__overlay"
          aria-hidden="true"
        />

        <span className="fleet-card__category">
          {vehicle.category}
        </span>

        {vehicle.featured && (
          <span className="fleet-card__featured">
            Popular
          </span>
        )}
      </Link>

      <div className="fleet-card__content">
        <h3>
          <Link to={vehicleDetailUrl}>
            {vehicle.name}
          </Link>
        </h3>

        <p>{vehicle.description}</p>

        <div className="fleet-card__capacity">
          <span>
            <FiUsers aria-hidden="true" />

            Up to {vehicle.passengers} passengers
          </span>

          <span>
            <FiBriefcase aria-hidden="true" />

            {vehicle.largeBags} large +{" "}
            {vehicle.cabinBags} cabin bags
          </span>
        </div>

        <div className="fleet-card__footer">
          <Link to={vehicleDetailUrl}>
            View Vehicle

            <FiArrowUpRight
              aria-hidden="true"
            />
          </Link>

          <Link to={vehicleQuoteUrl}>
            Request Quote
          </Link>
        </div>
      </div>
    </article>
  );
}