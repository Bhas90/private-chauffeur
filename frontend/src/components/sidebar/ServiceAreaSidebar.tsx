import {
  FiArrowRight,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

import { siteConfig } from "../../config/siteConfig";
import { serviceAreasData } from "../../data/serviceAreasData";
import "./serviceAreaSidebar.css";

export default function ServiceAreaSidebar() {
  return (
    <aside className="service-area-sidebar">
      <div className="service-area-sidebar__menu">
        <span>Areas We Serve</span>

        <h2>Melbourne Service Areas</h2>

        <nav>
          {serviceAreasData.map((area) => (
            <NavLink
              key={area.slug}
              to={`/service-areas/${area.slug}`}
              className={({ isActive }) =>
                isActive
                  ? "service-area-sidebar__link--active"
                  : undefined
              }
            >
              <div>
                <strong>{area.name}</strong>
                <small>{area.region}</small>
              </div>

              <FiArrowRight />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="service-area-sidebar__help">
        <FiMapPin />

        <span>Not seeing your location?</span>

        <h3>
         Serving Melbourne & Victoria.
        </h3>

        <a href={siteConfig.phoneHref}>
          <FiPhone />
          {siteConfig.phone}
        </a>
      </div>
    </aside>
  );
}