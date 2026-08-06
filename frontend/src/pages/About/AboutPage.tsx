import {
  FiCheck,
  FiClock,
  FiMapPin,
  FiShield,
  FiStar,
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";
import "./aboutPage.css";

const values = [
  {
    icon: FiUserCheck,
    title: "Professional Chauffeurs",
    description:
      "Courteous, discreet and focused on providing a smooth customer experience.",
  },
  {
    icon: FiClock,
    title: "Available 24/7",
    description:
      "Airport transfers, early departures and late arrivals can be requested at any time.",
  },
  {
    icon: FiShield,
    title: "Reliable Service",
    description:
      "Every journey is planned around the supplied pickup, destination and timing details.",
  },
  {
    icon: FiMapPin,
    title: "Melbourne Knowledge",
    description:
      "Travel across Melbourne CBD, surrounding suburbs and selected regional destinations.",
  },
];

const servicePoints = [
  "Airport transfers",
  "Corporate travel",
  "Wedding chauffeur services",
  "Hotel transfers",
  "Hourly chauffeur hire",
  "Private tours",
  "Events and group transfers",
  "Regional Victorian travel",
];

export default function AboutPage() {
  return (
    <main>
      <InnerPageHero
        eyebrow="About Private Chauffeur Melbourne"
        title="Professional chauffeur travel with a personal approach."
        description="We provide private airport transfers, corporate chauffeur services, wedding transport, event travel and tailored journeys across Melbourne and regional Victoria."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About" },
        ]}
      />

      <section className="about-page section">
        <div className="container">
          <div className="about-page__intro">
            <div className="about-page__content">
              <span className="eyebrow">Who We Are</span>

              <h2 className="section-title">
                Chauffeur travel designed around comfort, timing and care.
              </h2>

              <p className="section-description">
                Private Chauffeur Melbourne provides pre-arranged chauffeur
                services for airport travel, corporate appointments, weddings,
                events, hotels and private journeys throughout Melbourne and
                surrounding Victorian areas.
              </p>

              <p>
                Every booking is planned according to the customer’s pickup
                location, destination, schedule, passenger number, luggage
                requirements and preferred vehicle. The aim is to provide a
                straightforward and professional experience from the first
                enquiry through to the final destination.
              </p>

              <div className="about-page__actions">
                <Link className="button button--dark" to="/services">
                  Explore Our Services
                </Link>

                <Link className="button about-page__quote" to="/get-a-quote">
                  Request a Quote
                </Link>
              </div>
            </div>

            <div className="about-page__image">
              <img
                src="https://images.unsplash.com/photo-1620144319044-7204a28a9e17?auto=format&fit=crop&w=1500&q=85"
                alt="Professional Melbourne chauffeur service"
                loading="lazy"
              />

              <div className="about-page__badge">
                <FiStar />

                <div>
                  <strong>Premium Experience</strong>
                  <span>From booking to destination</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-page__values">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title}>
                <Icon />

                <h3>{title}</h3>

                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="about-page__services">
            <div>
              <span className="eyebrow">What We Provide</span>

              <h2 className="section-title">
                Chauffeur services for business, airport and private travel.
              </h2>

              <p className="section-description">
                Customers can request individual journeys, return bookings,
                hourly chauffeur hire and tailored multi-stop itineraries.
              </p>
            </div>

            <div className="about-page__service-list">
              {servicePoints.map((item) => (
                <div key={item}>
                  <FiCheck />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-page__fleet">
            <div className="about-page__fleet-image">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1500&q=85"
                alt="Luxury chauffeur vehicle in Melbourne"
                loading="lazy"
              />
            </div>

            <div className="about-page__fleet-content">
              <span className="eyebrow">Our Fleet</span>

              <h2 className="section-title">
                Executive vehicles selected for comfort and presentation.
              </h2>

              <p className="section-description">
                The current fleet includes Mercedes-Benz E-Class, Audi A8 L,
                BMW 7 Series, Holden Caprice, Chrysler 300C and Hyundai Genesis.
              </p>

              <p>
                Vehicle requests are subject to availability, passenger
                capacity, luggage requirements and the type of journey being
                arranged.
              </p>

              <Link className="button button--primary" to="/fleet">
                View Our Fleet
              </Link>
            </div>
          </div>

          <div className="about-page__coverage">
            <span className="eyebrow">Melbourne and Regional Coverage</span>

            <h2 className="section-title">
              Serving Melbourne CBD, suburbs and selected Victorian areas.
            </h2>

            <p className="section-description">
              Coverage includes Melbourne CBD, Camberwell, South Melbourne,
              North Melbourne, Richmond, Mickleham, South Yarra, Toorak,
              Gisborne, Kyneton, East Melbourne, West Melbourne, Kilmore,
              Woodend, Wallan, Kew, Wandong, Romsey, Lancefield and nearby
              locations.
            </p>

            <Link
              className="button button--dark"
              to="/service-areas/melbourne-cbd"
            >
              Explore Service Areas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}