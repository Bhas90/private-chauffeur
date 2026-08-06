import { FiArrowRight, FiBriefcase, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";
import { fleetData } from "../../data/fleetData";
import "./fleetPage.css";

export default function FleetPage() {
  return (
    <main>
      <InnerPageHero
        eyebrow="Executive Chauffeur Fleet"
        title="Luxury Chauffeur Fleet for Melbourne Travel."
        description="Explore our Mercedes-Benz, Audi, BMW, Holden, Chrysler and Hyundai chauffeur vehicles for airport, corporate, wedding and private travel."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Fleet" },
        ]}
      />

      <section className="fleet-page section">
        <div className="container">
          <div className="fleet-page__intro">
            <span className="eyebrow">Choose Your Vehicle</span>

            <h2 className="section-title">
              Comfort, presentation and passenger requirements considered.
            </h2>

            <p className="section-description">
              Vehicle availability is confirmed during the booking process.
              Provide passenger and luggage information so the most suitable
              chauffeur vehicle can be recommended.
            </p>
          </div>

          <div className="fleet-page__grid">
            {fleetData.map((vehicle) => (
              <article className="fleet-page__card" key={vehicle.slug}>
                <Link
                  className="fleet-page__image"
                  to={`/fleet/${vehicle.slug}`}
                >
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.name} chauffeur vehicle`}
                    loading="lazy"
                  />

                  <span className="fleet-page__overlay" />

                  <span className="fleet-page__category">
                    {vehicle.category}
                  </span>
                </Link>

                <div className="fleet-page__content">
                  <h3>
                    <Link to={`/fleet/${vehicle.slug}`}>{vehicle.name}</Link>
                  </h3>

                  <p>{vehicle.description}</p>

                  <div className="fleet-page__capacity">
                    <span>
                      <FiUsers />
                      Up to {vehicle.passengers} passengers
                    </span>

                    <span>
                      <FiBriefcase />
                      {vehicle.largeBags} large and {vehicle.cabinBags} cabin bags
                    </span>
                  </div>

                  <div className="fleet-page__actions">
                    <Link to={`/fleet/${vehicle.slug}`}>
                      View Vehicle
                      <FiArrowRight />
                    </Link>

                    <Link to={`/get-a-quote?vehicle=${vehicle.slug}`}>
                      Request Quote
                    </Link>
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