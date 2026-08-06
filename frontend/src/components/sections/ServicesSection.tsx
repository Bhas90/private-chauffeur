import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { servicesData } from "../../data/servicesData";
import ServiceCard from "../cards/ServiceCard";
import "./servicesSection.css";

export default function ServicesSection() {
  return (
    <section className="services-section section section--white">
      <div className="container">
        <div className="services-section__header">
          <div className="section-header">
            <span className="eyebrow">Our Chauffeur Services</span>

            <h2 className="section-title">
              Premium travel for every Melbourne journey.
            </h2>

            <p className="section-description">
              From airport pickups and executive travel to weddings, private
              tours and group transport, every journey is planned around your
              comfort, timing and requirements.
            </p>
          </div>

          <Link className="button button--dark" to="/services">
            View All Services
            <FiArrowRight />
          </Link>
        </div>

        <div className="services-section__grid">
          {servicesData.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}