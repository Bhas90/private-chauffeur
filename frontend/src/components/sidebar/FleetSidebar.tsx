import { FiArrowRight, FiPhone } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import { siteConfig } from "../../config/siteConfig";
import { fleetData } from "../../data/fleetData";
import "./fleetSidebar.css";

export default function FleetSidebar() {
  return (
    <aside className="fleet-sidebar">
      <div className="fleet-sidebar__menu">
        <span>Our Chauffeur Fleet</span>

        <h2>Choose a Vehicle</h2>

        <nav>
          {fleetData.map((vehicle) => (
            <NavLink
              key={vehicle.slug}
              to={`/fleet/${vehicle.slug}`}
              className={({ isActive }) =>
                isActive ? "fleet-sidebar__link--active" : undefined
              }
            >
              <div>
                <strong>{vehicle.name}</strong>
                <small>{vehicle.category}</small>
              </div>

              <FiArrowRight />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="fleet-sidebar__help">
        
        <h3>Tell us about your trip.</h3>

        <a href={siteConfig.phoneHref}>
          <FiPhone />
          {siteConfig.phone}
        </a>
      </div>
    </aside>
  );
}