import {
  FiBriefcase,
  FiCheck,
  FiUsers,
} from "react-icons/fi";
import { Navigate, useParams } from "react-router-dom";

import TailoredQuoteForm from "../../components/forms/TailoredQuoteForm";
import InnerPageHero from "../../components/hero/InnerPageHero";
import FleetSidebar from "../../components/sidebar/FleetSidebar";
import { fleetData } from "../../data/fleetData";
import { routePaths } from "../../routes/routePaths";

import "./fleetDetailPage.css";

export default function FleetDetailPage() {
  const { slug } = useParams();

  const vehicle = fleetData.find(
    (item) => item.slug === slug,
  );

  if (!vehicle) {
    return (
      <Navigate
        replace
        to={routePaths.fleet}
      />
    );
  }

  return (
    <main>
      <InnerPageHero
        eyebrow={vehicle.category}
        title={vehicle.name}
        description={`${vehicle.heroDescription} Complete the form below to request a personalised quotation for this vehicle.`}
        image={vehicle.image}
        breadcrumbs={[
          {
            label: "Home",
            path: routePaths.home,
          },
          {
            label: "Fleet",
            path: routePaths.fleet,
          },
          {
            label: vehicle.name,
          },
        ]}
      />

      <section className="fleet-detail section">
        <div className="container fleet-detail__layout">
          <FleetSidebar />

          <div className="fleet-detail__content">
            <section className="fleet-detail__intro">
              <span>{vehicle.category}</span>

              <h2>{vehicle.name}</h2>

              <p>{vehicle.description}</p>
            </section>

            <section className="fleet-detail__capacity">
              <article>
                <FiUsers />

                <div>
                  <strong>
                    {vehicle.passengers}
                  </strong>

                  <span>
                    Maximum Passengers
                  </span>
                </div>
              </article>

              <article>
                <FiBriefcase />

                <div>
                  <strong>
                    {vehicle.largeBags}
                  </strong>

                  <span>
                    Large Suitcases
                  </span>
                </div>
              </article>

              <article>
                <FiBriefcase />

                <div>
                  <strong>
                    {vehicle.cabinBags}
                  </strong>

                  <span>
                    Cabin Bags
                  </span>
                </div>
              </article>
            </section>

            <section className="fleet-detail__gallery">
              {vehicle.gallery.map(
                (image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${vehicle.name} chauffeur vehicle ${index + 1}`}
                    loading="lazy"
                  />
                ),
              )}
            </section>

            <section className="fleet-detail__features">
              <span>
                Vehicle Highlights
              </span>

              <h2>
                Designed for premium
                chauffeur travel.
              </h2>

              <div>
                {vehicle.features.map(
                  (feature) => (
                    <article
                      key={feature.title}
                    >
                      <FiCheck />

                      <div>
                        <h3>
                          {feature.title}
                        </h3>

                        <p>
                          {
                            feature.description
                          }
                        </p>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </section>

            <section className="fleet-detail__suitable">
              <span>
                Recommended Journeys
              </span>

              <h2>
                Ideal for these
                chauffeur services
              </h2>

              <ul>
                {vehicle.suitableFor.map(
                  (item) => (
                    <li key={item}>
                      <FiCheck />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </section>

            {/* Quote Section */}

            <section className="fleet-detail__quote">
              <span className="eyebrow">
                Request This Vehicle
              </span>

              <h2>
                Request a quote for the{" "}
                {vehicle.name}.
              </h2>

              <p>
                Your preferred vehicle
                has already been
                selected. Complete your
                journey and contact
                details below and our
                booking team will
                prepare your tailored
                quotation.
              </p>

              <TailoredQuoteForm
                defaultVehicle={
                  vehicle.slug
                }
              />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}