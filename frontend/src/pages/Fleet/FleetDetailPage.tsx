import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FiBriefcase,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiPlay,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { Navigate, useParams } from "react-router-dom";

import TailoredQuoteForm from "../../components/forms/TailoredQuoteForm";
import InnerPageHero from "../../components/hero/InnerPageHero";
import FleetSidebar from "../../components/sidebar/FleetSidebar";
import {
  getFleetVehicle,
} from "../../services/fleetApi";
import type {
  FleetMedia,
  FleetVehicle,
} from "../../services/fleetApi";
import { routePaths } from "../../routes/routePaths";

import "./fleetDetailPage.css";

type MediaTab =
  | "EXTERIOR"
  | "INTERIOR"
  | "VIDEO";

const tabLabel: Record<MediaTab, string> = {
  EXTERIOR: "Exterior",
  INTERIOR: "Interior",
  VIDEO: "Video",
};

export default function FleetDetailPage() {
  const { slug = "" } = useParams();
  const [vehicle, setVehicle] =
    useState<FleetVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] =
    useState<MediaTab>("EXTERIOR");
  const [selectedIndex, setSelectedIndex] =
    useState(0);
  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  useEffect(() => {
    let mounted = true;
    void getFleetVehicle(slug).then((value) => {
      if (mounted) {
        setVehicle(value);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const mediaByTab = useMemo(() => {
    const grouped: Record<MediaTab, FleetMedia[]> = {
      EXTERIOR: [],
      INTERIOR: [],
      VIDEO: [],
    };
    vehicle?.media.forEach((item) => {
      if (item.type === "EXTERIOR") {
        grouped.EXTERIOR.push(item);
      } else if (item.type === "INTERIOR") {
        grouped.INTERIOR.push(item);
      } else if (item.type === "VIDEO") {
        grouped.VIDEO.push(item);
      }
    });
    if (
      grouped.EXTERIOR.length === 0 &&
      vehicle?.coverImage
    ) {
      grouped.EXTERIOR.push({
        id: -1,
        type: "COVER",
        url: vehicle.coverImage,
        altText: vehicle.name,
        displayOrder: 0,
      });
    }
    return grouped;
  }, [vehicle]);

  const enabledTabs = (
    Object.keys(mediaByTab) as MediaTab[]
  ).filter(
    (tab) => mediaByTab[tab].length > 0,
  );

  useEffect(() => {
    if (
      !enabledTabs.includes(activeTab) &&
      enabledTabs[0]
    ) {
      setActiveTab(enabledTabs[0]);
      setSelectedIndex(0);
    }
  }, [activeTab, enabledTabs]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [activeTab, slug]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () =>
      window.removeEventListener(
        "keydown",
        closeOnEscape,
      );
  }, []);

  if (loading) {
    return (
      <main className="fleet-detail__loading">
        Loading vehicle…
      </main>
    );
  }

  if (!vehicle) {
    return (
      <Navigate
        replace
        to={routePaths.fleet}
      />
    );
  }

  const activeMedia =
    mediaByTab[activeTab] ?? [];
  const selectedMedia =
    activeMedia[selectedIndex] ?? activeMedia[0];

  const selectPrevious = () =>
    setSelectedIndex((current) =>
      current === 0
        ? activeMedia.length - 1
        : current - 1,
    );
  const selectNext = () =>
    setSelectedIndex((current) =>
      current === activeMedia.length - 1
        ? 0
        : current + 1,
    );

  return (
    <main>
      <InnerPageHero
        eyebrow={vehicle.category}
        title={vehicle.name}
        description={
          vehicle.heroDescription +
          " Complete the form below to request a personalised quotation for this vehicle."
        }
        image={vehicle.coverImage}
        breadcrumbs={[
          {
            label: "Home",
            path: routePaths.home,
          },
          {
            label: "Fleet",
            path: routePaths.fleet,
          },
          { label: vehicle.name },
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
                  <strong>{vehicle.passengers}</strong>
                  <span>Maximum Passengers</span>
                </div>
              </article>
              <article>
                <FiBriefcase />
                <div>
                  <strong>{vehicle.largeBags}</strong>
                  <span>Large Suitcases</span>
                </div>
              </article>
              <article>
                <FiBriefcase />
                <div>
                  <strong>{vehicle.cabinBags}</strong>
                  <span>Cabin Bags</span>
                </div>
              </article>
            </section>

            {selectedMedia && (
              <section className="fleet-media">
                <div className="fleet-media__tabs">
                  {enabledTabs.map((tab) => (
                    <button
                      type="button"
                      key={tab}
                      className={
                        activeTab === tab
                          ? "fleet-media__tab--active"
                          : ""
                      }
                      onClick={() => setActiveTab(tab)}
                    >
                      {tabLabel[tab]}
                    </button>
                  ))}
                </div>
                <div className="fleet-media__stage">
                  {activeTab === "VIDEO" ? (
                    <video
                      controls
                      preload="metadata"
                      src={selectedMedia.url}
                    />
                  ) : (
                    <img
                      src={selectedMedia.url}
                      alt={
                        selectedMedia.altText ||
                        vehicle.name
                      }
                    />
                  )}
                  {activeMedia.length > 1 && (
                    <>
                      <button
                        className="fleet-media__previous"
                        type="button"
                        onClick={selectPrevious}
                        aria-label="Previous media"
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        className="fleet-media__next"
                        type="button"
                        onClick={selectNext}
                        aria-label="Next media"
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  )}
                  {activeTab !== "VIDEO" && (
                    <button
                      className="fleet-media__expand"
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      aria-label="Open full screen"
                    >
                      <FiMaximize2 />
                    </button>
                  )}
                </div>
                {activeMedia.length > 1 && (
                  <div className="fleet-media__thumbnails">
                    {activeMedia.map((media, index) => (
                      <button
                        type="button"
                        key={media.id}
                        className={
                          index === selectedIndex
                            ? "fleet-media__thumbnail--active"
                            : ""
                        }
                        onClick={() =>
                          setSelectedIndex(index)
                        }
                      >
                        {activeTab === "VIDEO" ? (
                          <FiPlay />
                        ) : (
                          <img
                            src={media.url}
                            alt=""
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            <section className="fleet-detail__features">
              <span>Vehicle Highlights</span>
              <h2>
                Designed for premium chauffeur
                travel.
              </h2>
              <div>
                {vehicle.features.map((feature) => (
                  <article key={feature.title}>
                    <FiCheck />
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="fleet-detail__suitable">
              <span>Recommended Journeys</span>
              <h2>
                Ideal for these chauffeur services
              </h2>
              <ul>
                {vehicle.journeys.map((journey) => (
                  <li key={journey.title}>
                    <FiCheck />
                    {journey.title}
                  </li>
                ))}
              </ul>
            </section>

            <section className="fleet-detail__quote">
              <span className="eyebrow">
                Request This Vehicle
              </span>
              <h2>
                Request a quote for the {vehicle.name}.
              </h2>
              <p>
                Your preferred vehicle has already
                been selected. Complete your journey
                and contact details for a tailored
                quotation.
              </p>
              <TailoredQuoteForm
                defaultVehicle={vehicle.slug}
              />
            </section>
          </div>
        </div>
      </section>

      {lightboxOpen &&
        selectedMedia &&
        activeTab !== "VIDEO" && (
          <div
            className="fleet-media__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={vehicle.name + " gallery"}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              className="fleet-media__lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close full screen image"
            >
              <FiX />
            </button>
            <img
              src={selectedMedia.url}
              alt={
                selectedMedia.altText || vehicle.name
              }
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
    </main>
  );
}
