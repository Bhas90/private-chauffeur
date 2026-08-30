import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  getFleetPopup,
} from "../../services/fleetApi";
import type {
  FleetPopupSettings,
} from "../../services/fleetApi";

import "./fleetPromoPopup.css";

const sessionKey = "pcm-fleet-popup-seen";

export default function FleetPromoPopup() {
  const [popup, setPopup] =
    useState<FleetPopupSettings | null>(null);
  const [open, setOpen] = useState(false);
  const interacted = useRef(false);

  useEffect(() => {
    let showTimer: number | undefined;
    let closeTimer: number | undefined;
    let mounted = true;

    const load = async () => {
      const settings = await getFleetPopup();
      if (
        !mounted ||
        !settings?.enabled ||
        !settings.fleetVehicle
      ) {
        return;
      }

      if (
        settings.oncePerSession &&
        sessionStorage.getItem(sessionKey)
      ) {
        return;
      }

      setPopup(settings);
      showTimer = window.setTimeout(() => {
        if (!mounted) {
          return;
        }
        setOpen(true);
        if (settings.oncePerSession) {
          sessionStorage.setItem(sessionKey, "true");
        }
        const duration = settings.displayDuration ?? 7000;
        if (duration > 0) {
          closeTimer = window.setTimeout(() => {
            if (!interacted.current) {
              setOpen(false);
            }
          }, duration);
        }
      }, settings.showDelay ?? 5000);
    };

    void load();

    return () => {
      mounted = false;
      window.clearTimeout(showTimer);
      window.clearTimeout(closeTimer);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () =>
      window.removeEventListener(
        "keydown",
        closeOnEscape,
      );
  }, []);

  if (!open || !popup?.fleetVehicle) {
    return null;
  }

  const vehicle = popup.fleetVehicle;
  const link =
    popup.ctaLink ||
    "/fleet/" + vehicle.slug;
  const image =
    popup.image || vehicle.coverImage;
  const heading =
    popup.heading || vehicle.name;

  return (
    <div
      className="fleet-promo-popup"
      role="dialog"
      aria-modal="true"
      aria-label="Featured fleet vehicle"
      onMouseEnter={() => {
        interacted.current = true;
      }}
      onFocus={() => {
        interacted.current = true;
      }}
    >
      <button
        className="fleet-promo-popup__backdrop"
        type="button"
        aria-label="Close popup"
        onClick={() => setOpen(false)}
      />
      <section className="fleet-promo-popup__card">
        <button
          className="fleet-promo-popup__close"
          type="button"
          aria-label="Close popup"
          onClick={() => setOpen(false)}
        >
          <FiX />
        </button>
        <div className="fleet-promo-popup__media">
          {popup.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              src={popup.video}
            />
          ) : (
            <img
              src={image}
              alt={vehicle.name}
            />
          )}
        </div>
        <div className="fleet-promo-popup__content">
          <span>
            {popup.eyebrow || "DISCOVER OUR FLEET"}
          </span>
          <h2>{heading}</h2>
          <p>
            {popup.description ||
              vehicle.heroDescription}
          </p>
          <Link to={link} onClick={() => setOpen(false)}>
            {popup.ctaText || "Explore vehicle"}
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
