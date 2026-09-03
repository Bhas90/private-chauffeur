import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FiCheck,
  FiClock,
  FiMapPin,
  FiShield,
  FiStar,
  FiUserCheck,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";

import "./aboutPage.css";

/* =========================================================
   TYPES
========================================================= */

interface FleetVehicle {
  id?: number | string;

  name: string;
  slug: string;
  category?: string;

  image?: string | null;
  coverImage?: string | null;

  active?: boolean;
  featured?: boolean;

  displayOrder?: number;
}

/* =========================================================
   VALUES
========================================================= */

const values = [
  {
    icon: FiUserCheck,

    title:
      "Professional Chauffeurs",

    description:
      "Courteous, discreet and focused on providing a smooth customer experience.",
  },

  {
    icon: FiClock,

    title:
      "Available 24/7",

    description:
      "Airport transfers, early departures and late arrivals can be requested at any time.",
  },

  {
    icon: FiShield,

    title:
      "Reliable Service",

    description:
      "Every journey is planned around the supplied pickup, destination and timing details.",
  },

  {
    icon: FiMapPin,

    title:
      "Melbourne Knowledge",

    description:
      "Travel across Melbourne CBD, surrounding suburbs and selected regional destinations.",
  },
];

/* =========================================================
   SERVICES
========================================================= */

const servicePoints = [
  "Airport transfers",
  "Corporate travel",
  "Wedding chauffeur services",
  "Hotel transfers",
  "Conference transfers",
  "Hourly chauffeur hire",
  "Private tours",
  "Group and event transfers",
  "Melbourne event transfers",
];

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
  const [
    fleetVehicles,
    setFleetVehicles,
  ] =
    useState<FleetVehicle[]>([]);

  const [
    fleetLoading,
    setFleetLoading,
  ] =
    useState(true);

  /* =======================================================
     API URL
  ======================================================= */

  const apiUrl =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api";

  /* =======================================================
     LOAD FLEET FROM ADMIN / DATABASE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadFleet =
      async () => {
        try {
          setFleetLoading(true);

          const response =
            await fetch(
              `${apiUrl}/fleet`,
            );

          if (!response.ok) {
            throw new Error(
              "Unable to load fleet.",
            );
          }

          const result =
            await response.json();

          if (!mounted) {
            return;
          }

          /*
           * Supports either:
           *
           * [...]
           *
           * or:
           *
           * { data: [...] }
           */
          const vehicles:
            FleetVehicle[] =
            Array.isArray(
              result,
            )
              ? result
              : Array.isArray(
                    result?.data,
                  )
                ? result.data
                : [];

          const activeVehicles =
            vehicles
              .filter(
                (vehicle) =>
                  vehicle.active !==
                  false,
              )
              .sort(
                (
                  first,
                  second,
                ) =>
                  (first.displayOrder ??
                    999) -
                  (second.displayOrder ??
                    999),
              );

          setFleetVehicles(
            activeVehicles,
          );
        } catch (error) {
          console.error(
            "About page fleet loading failed:",
            error,
          );

          if (mounted) {
            setFleetVehicles([]);
          }
        } finally {
          if (mounted) {
            setFleetLoading(false);
          }
        }
      };

    void loadFleet();

    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  /* =======================================================
     PRIMARY DISPLAY VEHICLES
  ======================================================= */

  const primaryVehicle =
    useMemo(() => {
      return (
        fleetVehicles.find(
          (vehicle) =>
            vehicle.slug ===
            "bmw-7-series",
        ) ||
        fleetVehicles.find(
          (vehicle) =>
            vehicle.featured,
        ) ||
        fleetVehicles[0]
      );
    }, [fleetVehicles]);

  const secondaryVehicle =
    useMemo(() => {
      return (
        fleetVehicles.find(
          (vehicle) =>
            vehicle.slug ===
            "mercedes-benz-s-class",
        ) ||
        fleetVehicles.find(
          (vehicle) =>
            vehicle.slug !==
            primaryVehicle?.slug,
        ) ||
        fleetVehicles[0]
      );
    }, [
      fleetVehicles,
      primaryVehicle,
    ]);

  /* =======================================================
     IMAGE HELPER
  ======================================================= */

  const getVehicleImage = (
    vehicle?: FleetVehicle,
  ) =>
    vehicle?.coverImage ||
    vehicle?.image ||
    "";

  /* =======================================================
     DYNAMIC FLEET NAME TEXT
  ======================================================= */

  const fleetNames =
    useMemo(() => {
      const names =
        fleetVehicles.map(
          (vehicle) =>
            vehicle.name,
        );

      if (
        names.length === 0
      ) {
        return "our executive and luxury chauffeur fleet";
      }

      if (
        names.length === 1
      ) {
        return names[0];
      }

      if (
        names.length === 2
      ) {
        return `${names[0]} and ${names[1]}`;
      }

      return `${names
        .slice(0, -1)
        .join(", ")} and ${
        names[
          names.length - 1
        ]
      }`;
    }, [fleetVehicles]);

  return (
    <main>
      {/* ===================================================
          HERO
      =================================================== */}

      <InnerPageHero
        eyebrow="About Private Chauffeur Melbourne"
        title="Professional chauffeur travel with a personal approach."
        description="We provide private airport transfers, corporate chauffeur services, wedding transport, event travel and tailored journeys across Melbourne and regional Victoria."
        breadcrumbs={[
          {
            label: "Home",
            path: "/",
          },
          {
            label: "About",
          },
        ]}
      />

      {/* ===================================================
          ABOUT PAGE
      =================================================== */}

      <section className="about-page section">
        <div className="container">
          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <div className="about-page__intro">
            <div className="about-page__content">
              <span className="eyebrow">
                Who We Are
              </span>

              <h2 className="section-title">
                Chauffeur travel designed
                around comfort, timing and
                care.
              </h2>

              <p className="section-description">
                Private Chauffeur Melbourne
                provides pre-arranged
                chauffeur services for
                airport travel, corporate
                appointments, weddings,
                conferences, events, hotels
                and private journeys
                throughout Melbourne and
                surrounding Victorian areas.
              </p>

              <p>
                Every booking is planned
                according to the customer's
                pickup location,
                destination, schedule,
                passenger numbers, luggage
                requirements, child-seat
                requirements and preferred
                vehicle. Our aim is to
                provide a straightforward
                and professional experience
                from the first enquiry
                through to the final
                destination.
              </p>

              <div className="about-page__actions">
                <Link
                  className="button button--dark"
                  to="/services"
                >
                  Explore Our Services
                </Link>

                <Link
                  className="button about-page__quote"
                  to="/get-a-quote"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* ===============================================
                PRIMARY FLEET IMAGE
            =============================================== */}

            <div className="about-page__image">
              {fleetLoading ? (
                <div className="about-page__image-placeholder">
                  Loading Fleet...
                </div>
              ) : primaryVehicle &&
                getVehicleImage(
                  primaryVehicle,
                ) ? (
                <Link
                  to={`/fleet/${primaryVehicle.slug}`}
                  aria-label={`View ${primaryVehicle.name}`}
                >
                  <img
                    src={getVehicleImage(
                      primaryVehicle,
                    )}
                    alt={`${primaryVehicle.name} private chauffeur vehicle in Melbourne`}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
              ) : (
                <div className="about-page__image-placeholder">
                  Private Chauffeur
                  Melbourne
                </div>
              )}

              <div className="about-page__badge">
                <FiStar
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    Premium Experience
                  </strong>

                  <span>
                    From booking to
                    destination
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              VALUES
          ================================================= */}

          <div className="about-page__values">
            {values.map(
              ({
                icon: Icon,
                title,
                description,
              }) => (
                <article
                  key={title}
                >
                  <Icon
                    aria-hidden="true"
                  />

                  <h3>
                    {title}
                  </h3>

                  <p>
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>

          {/* =================================================
              SERVICES
          ================================================= */}

          <div className="about-page__services">
            <div>
              <span className="eyebrow">
                What We Provide
              </span>

              <h2 className="section-title">
                Chauffeur services for
                business, airport,
                events and private
                travel.
              </h2>

              <p className="section-description">
                Customers can request
                individual journeys,
                return bookings, hourly
                chauffeur hire,
                conference transport,
                tours and tailored
                multi-stop itineraries.
              </p>
            </div>

            <div className="about-page__service-list">
              {servicePoints.map(
                (item) => (
                  <div
                    key={item}
                  >
                    <FiCheck
                      aria-hidden="true"
                    />

                    <span>
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* =================================================
              FLEET
          ================================================= */}

          <div className="about-page__fleet">
            {/* ===============================================
                SECONDARY FLEET IMAGE
            =============================================== */}

            <div className="about-page__fleet-image">
              {fleetLoading ? (
                <div className="about-page__image-placeholder">
                  Loading Fleet...
                </div>
              ) : secondaryVehicle &&
                getVehicleImage(
                  secondaryVehicle,
                ) ? (
                <Link
                  to={`/fleet/${secondaryVehicle.slug}`}
                  aria-label={`View ${secondaryVehicle.name}`}
                >
                  <img
                    src={getVehicleImage(
                      secondaryVehicle,
                    )}
                    alt={`${secondaryVehicle.name} luxury chauffeur vehicle in Melbourne`}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
              ) : (
                <div className="about-page__image-placeholder">
                  Luxury Chauffeur Fleet
                </div>
              )}
            </div>

            {/* ===============================================
                FLEET CONTENT
            =============================================== */}

            <div className="about-page__fleet-content">
              <span className="eyebrow">
                Our Fleet
              </span>

              <h2 className="section-title">
                Executive and luxury
                vehicles selected for
                comfort, space and
                presentation.
              </h2>

              <p className="section-description">
                {fleetLoading
                  ? "Loading our current chauffeur fleet..."
                  : `Our current chauffeur fleet includes ${fleetNames}.`}
              </p>

              <p>
                From flagship executive
                sedans to luxury SUVs and
                premium people movers,
                vehicle requests are
                arranged according to
                availability, passenger
                numbers, luggage,
                child-seat requirements
                and the type of journey.
              </p>

              <Link
                className="button button--primary"
                to="/fleet"
              >
                View Our Fleet
              </Link>
            </div>
          </div>

          {/* =================================================
              COVERAGE
          ================================================= */}

          <div className="about-page__coverage">
            <span className="eyebrow">
              Melbourne and Regional
              Coverage
            </span>

            <h2 className="section-title">
              Serving Melbourne CBD,
              suburbs and selected
              Victorian areas.
            </h2>

            <p className="section-description">
              Coverage includes Melbourne
              CBD, Camberwell, South
              Melbourne, North Melbourne,
              Richmond, Mickleham, South
              Yarra, Toorak, Gisborne,
              Kyneton, East Melbourne,
              West Melbourne, Kilmore,
              Woodend, Wallan, Kew,
              Wandong, Romsey, Lancefield
              and nearby locations.
            </p>

            <Link
              className="button button--dark"
              to="/service-areas"
            >
              Explore Service Areas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}