import {
  FiArrowRight,
  FiMap,
  FiMapPin,
  FiNavigation,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { serviceAreasData } from "../../data/serviceAreasData";
import { routePaths } from "../../routes/routePaths";

import "./serviceAreasSection.css";

const featuredAreas =
  serviceAreasData.slice(0, 10);

export default function ServiceAreasSection() {
  return (
    <section className="service-areas-section section">
      <div className="container service-areas-section__layout">
        <div className="service-areas-section__content">
          <span className="eyebrow">
            Melbourne Service Areas
          </span>

          <h2 className="section-title">
            Private chauffeur travel across Melbourne
            and regional Victoria.
          </h2>

          <p className="section-description">
            Book professional airport transfers,
            corporate travel, private journeys and
            event transport throughout Melbourne CBD,
            surrounding suburbs and selected regional
            Victorian destinations.
          </p>

          <div className="service-areas-section__features">
            <article>
              <FiNavigation aria-hidden="true" />

              <div>
                <strong>
                  Melbourne-wide journeys
                </strong>

                <span>
                  CBD, suburbs, airports and
                  surrounding destinations.
                </span>
              </div>
            </article>

            <article>
              <FiMap aria-hidden="true" />

              <div>
                <strong>
                  Regional transfers
                </strong>

                <span>
                  Macedon Ranges and nearby
                  Victorian locations.
                </span>
              </div>
            </article>
          </div>

          <Link
            className="button button--primary"
            to={routePaths.serviceAreas}
          >
            Explore All Service Areas

            <FiArrowRight
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="service-areas-section__areas">
          {featuredAreas.map((area) => (
            <Link
              key={area.slug}
              className="service-areas-section__area"
              to={`${routePaths.serviceAreas}/${area.slug}`}
            >
              <FiMapPin
                aria-hidden="true"
              />

              <div>
                <strong>{area.name}</strong>

                <span>{area.region}</span>
              </div>

              <FiArrowRight
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}