import {
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import type { ServiceItem } from "../../data/servicesData";
import { routePaths } from "../../routes/routePaths";

import "./serviceCard.css";

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  const Icon = service.icon;

  const serviceDetailUrl =
    `${routePaths.services}/${service.slug}`;

  const serviceQuoteUrl =
    `${routePaths.quote}?service=${encodeURIComponent(
      service.slug,
    )}`;

  return (
    <article className="service-card">
      <Link
        className="service-card__image-wrapper"
        to={serviceDetailUrl}
        aria-label={`View ${service.title}`}
      >
        <img
          className="service-card__image"
          src={service.image}
          alt={`${service.title} in Melbourne`}
          loading="lazy"
        />

        <span
          className="service-card__overlay"
          aria-hidden="true"
        />

        {service.featured && (
          <span className="service-card__badge">
            Popular Service
          </span>
        )}

        <span
          className="service-card__icon"
          aria-hidden="true"
        >
          <Icon />
        </span>
      </Link>

      <div className="service-card__content">
        <h3>
          <Link to={serviceDetailUrl}>
            {service.title}
          </Link>
        </h3>

        <p>{service.shortDescription}</p>

        <div className="service-card__actions">
          <Link
            className="service-card__link"
            to={serviceDetailUrl}
          >
            Explore Service

            <FiArrowUpRight
              aria-hidden="true"
            />
          </Link>

          <Link
            className="service-card__quote-link"
            to={serviceQuoteUrl}
          >
            Request Quote

            <FiArrowRight
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}