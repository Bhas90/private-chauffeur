import {
  FiArrowRight,
  FiMap,
  FiMapPin,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";
import { serviceAreasData } from "../../data/serviceAreasData";
import "./serviceAreasPage.css";

export default function ServiceAreasPage() {
  return (
    <main>
      <InnerPageHero
        eyebrow="Melbourne Chauffeur Coverage"
        title="Private chauffeur services across Melbourne."
        description="Explore airport transfers, corporate journeys, weddings, events and private chauffeur services available across Melbourne CBD, surrounding suburbs and selected regional Victorian destinations."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Service Areas" },
        ]}
      />

      <section className="service-areas-page">
        <div className="container">
          <div className="service-areas-page__intro">
            <span className="eyebrow">
              Chauffeur Service Near You
            </span>

            <h2 className="section-title">
              Choose your pickup area.
            </h2>

            <p className="section-description">
              Select an area to view available chauffeur
              services, nearby locations, airport-transfer
              information and a tailored quote form.
            </p>
          </div>

          <div className="service-areas-page__grid">
            {serviceAreasData.map((area) => (
              <article
                className="service-areas-page__card"
                key={area.slug}
              >
                <Link
                  className="service-areas-page__image"
                  to={`/service-areas/${area.slug}`}
                >
                  <img
                    src={area.image}
                    alt={`${area.name} chauffeur services`}
                    loading="lazy"
                  />

                  <span className="service-areas-page__overlay" />

                  <span className="service-areas-page__region">
                    {area.region}
                  </span>
                </Link>

                <div className="service-areas-page__content">
                  <FiMapPin />

                  <h3>{area.name}</h3>

                  <p>{area.introduction}</p>

                  <div className="service-areas-page__footer">
                    <Link to={`/service-areas/${area.slug}`}>
                      Explore Area
                      <FiArrowRight />
                    </Link>

                    <FiMap />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}