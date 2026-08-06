import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";
import { servicesData } from "../../data/servicesData";
import "./servicesPage.css";

export default function ServicesPage() {
  return (
    <main>
      <InnerPageHero
        eyebrow="Private Chauffeur Services"
        title="Professional chauffeur travel across Melbourne."
        description="Explore airport transfers, corporate travel, wedding transport, hotel transfers, private tours, events and flexible hourly chauffeur hire."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Services" },
        ]}
      />

      <section className="services-page ">
        <div className="container">
          <div className="services-page__intro">
            <span className="eyebrow">Choose Your Service</span>

            <h2 className="section-title">
              Chauffeur services planned around your journey.
            </h2>

            <p className="section-description">
              Select a service to view detailed information, suitable fleet
              options, common questions and a tailored quote form.
            </p>
          </div>

          <div className="services-page__grid">
            {servicesData.map((service) => {
              const Icon = service.icon;

              return (
                <article key={service.slug}>
                  <Link
                    className="services-page__image"
                    to={`/services/${service.slug}`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                    />

                    <span />
                  </Link>

                  <div className="services-page__content">
                    <Icon />

                    <h3>{service.title}</h3>

                    <p>{service.shortDescription}</p>

                    <Link to={`/services/${service.slug}`}>
                      Explore Service
                      <FiArrowRight />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}