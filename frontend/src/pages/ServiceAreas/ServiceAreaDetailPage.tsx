import {
  FiArrowRight,
  FiCheck,
  FiMapPin,
} from "react-icons/fi";
import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import TailoredQuoteForm from "../../components/forms/TailoredQuoteForm";
import InnerPageHero from "../../components/hero/InnerPageHero";
import ServiceAreaSidebar from "../../components/sidebar/ServiceAreaSidebar";
import {
  getNearbyServiceAreas,
  getServiceAreaBySlug,
} from "../../data/serviceAreasData";
import { routePaths } from "../../routes/routePaths";

import "./serviceAreaDetailPage.css";

export default function ServiceAreaDetailPage() {
  const { slug } = useParams<{
    slug: string;
  }>();

  const area = getServiceAreaBySlug(slug);

  if (!area) {
    return (
      <Navigate
        replace
        to={routePaths.serviceAreas}
      />
    );
  }

  const nearbyAreas =
    getNearbyServiceAreas(
      area.nearbyAreas,
    );

  const airportQuoteUrl =
    `${routePaths.quote}?pickup=${encodeURIComponent(
      area.name,
    )}&service=airport-transfers-melbourne`;

  return (
    <main>
      <InnerPageHero
        eyebrow={`${area.region} Chauffeur Service`}
        title={`${area.name} Chauffeur Services`}
        description={area.heroDescription}
        image={area.image}
        breadcrumbs={[
          {
            label: "Home",
            path: routePaths.home,
          },
          {
            label: "Service Areas",
            path: routePaths.serviceAreas,
          },
          {
            label: area.name,
          },
        ]}
      />

      <section className="service-area-detail">
        <div className="container service-area-detail__layout">
          <ServiceAreaSidebar />

          <div className="service-area-detail__content">
            <section className="service-area-detail__intro">
              <span>{area.region}</span>

              <h2>
                Private chauffeur travel in{" "}
                {area.name}
              </h2>

              <p>{area.introduction}</p>
            </section>

            <section className="service-area-detail__highlights">
              {area.highlights.map(
                (highlight) => (
                  <article key={highlight}>
                    <FiCheck
                      aria-hidden="true"
                    />

                    <span>{highlight}</span>
                  </article>
                ),
              )}
            </section>

            <section className="service-area-detail__section">
              <span>
                Available Services
              </span>

              <h2>
                Chauffeur services available
                in {area.name}
              </h2>

              <p>
                Journeys can be arranged
                according to your pickup
                address, destination, passenger
                count, luggage requirements
                and preferred travel time.
              </p>

              <div className="service-area-detail__services">
                {area.services.map(
                  (service) => (
                    <article key={service}>
                      <FiCheck
                        aria-hidden="true"
                      />

                      <span>{service}</span>
                    </article>
                  ),
                )}
              </div>
            </section>

            <section className="service-area-detail__airport">
              <div>
                <span>
                  Airport Chauffeur Travel
                </span>

                <h2>
                  {area.name} to Melbourne
                  Airport transfers
                </h2>

                <p>
                  Arrange pre-booked chauffeur
                  travel between {area.name},
                  Melbourne Airport, Avalon
                  Airport, Melbourne CBD,
                  hotels and surrounding
                  destinations.
                </p>

                <ul>
                  <li>
                    <FiCheck
                      aria-hidden="true"
                    />

                    Flight number can be
                    provided for pickup
                    coordination
                  </li>

                  <li>
                    <FiCheck
                      aria-hidden="true"
                    />

                    Passenger and luggage
                    requirements considered
                  </li>

                  <li>
                    <FiCheck
                      aria-hidden="true"
                    />

                    One-way and return journeys
                    available
                  </li>

                  <li>
                    <FiCheck
                      aria-hidden="true"
                    />

                    Early and late journeys may
                    be requested
                  </li>
                </ul>

                <Link to={airportQuoteUrl}>
                  Request Airport Quote

                  <FiArrowRight
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="service-area-detail__airport-image">
                <img
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85"
                  alt={`${area.name} airport chauffeur transfer`}
                  loading="lazy"
                />
              </div>
            </section>

            {nearbyAreas.length > 0 && (
              <section className="service-area-detail__nearby">
                <span>
                  Nearby Coverage
                </span>

                <h2>
                  Nearby chauffeur service
                  areas
                </h2>

                <div>
                  {nearbyAreas.map(
                    (nearbyArea) => (
                      <Link
                        key={
                          nearbyArea.slug
                        }
                        to={`${routePaths.serviceAreas}/${nearbyArea.slug}`}
                      >
                        <FiMapPin
                          aria-hidden="true"
                        />

                        <span>
                          <strong>
                            {
                              nearbyArea.name
                            }
                          </strong>

                          <small>
                            {
                              nearbyArea.region
                            }
                          </small>
                        </span>

                        <FiArrowRight
                          aria-hidden="true"
                        />
                      </Link>
                    ),
                  )}
                </div>
              </section>
            )}

            <section className="service-area-detail__faqs">
              <span>Local FAQs</span>

              <h2>
                Frequently asked questions
                about {area.name}
              </h2>

              <div>
                {area.faqs.map((faq) => (
                  <article
                    key={faq.question}
                  >
                    <h3>
                      {faq.question}
                    </h3>

                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="service-area-detail__quote">
              <span className="eyebrow">
                Request a Local Chauffeur Quote
              </span>

              <h2>
                Plan your chauffeur journey
                from {area.name}.
              </h2>

              <p>
                Your pickup area has already
                been selected. Complete your
                destination, travel date,
                preferred service, vehicle and
                contact information below.
              </p>

              <TailoredQuoteForm
                defaultPickup={area.name}
              />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}