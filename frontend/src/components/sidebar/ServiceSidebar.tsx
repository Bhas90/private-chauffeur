import { FiArrowRight, FiPhone } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import { siteConfig } from "../../config/siteConfig";
import { servicesData } from "../../data/servicesData";
import "./serviceSidebar.css";

export default function ServiceSidebar() {
  return (
    <aside className="service-sidebar">
      <div className="service-sidebar__menu">
        <span>Our Services</span>

        <h2>Explore Chauffeur Services</h2>

        <nav>
          {servicesData.map((service) => (
            <NavLink
              key={service.slug}
              to={`/services/${service.slug}`}
              className={({ isActive }) =>
                isActive ? "service-sidebar__link--active" : undefined
              }
            >
              <span>{service.shortTitle}</span>
              <FiArrowRight />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="service-sidebar__help">
       

        <h3>Speak with our team.</h3>

        <a href={siteConfig.phoneHref}>
          <FiPhone />
          {siteConfig.phone}
        </a>
      </div>
    </aside>
  );
}