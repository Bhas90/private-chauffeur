import {
  FiMail,
  FiPhone,
  FiShield,
} from "react-icons/fi";

import {
  useSearchParams,
} from "react-router-dom";

import TailoredQuoteForm from "../../components/forms/TailoredQuoteForm";
import InnerPageHero from "../../components/hero/InnerPageHero";

import {
  siteConfig,
} from "../../config/siteConfig";

import {
  routePaths,
} from "../../routes/routePaths";

import "./quotePage.css";

/* =========================================================
   TYPES
========================================================= */

type TripType =
  | "one-way"
  | "return";

type ChildSeatType =
  | ""
  | "booster-seat"
  | "child-safety-seat";

/* =========================================================
   HELPERS
========================================================= */

function getTripType(
  value: string | null,
): TripType {
  return value === "return"
    ? "return"
    : "one-way";
}

function getPassengerCount(
  value: string | null,
): string {
  if (!value) {
    return "1";
  }

  const count =
    Number(value);

  if (
    Number.isNaN(count) ||
    count < 1 ||
    count > 16
  ) {
    return "1";
  }

  return String(
    Math.floor(count),
  );
}

function getChildSeatType(
  value: string | null,
): ChildSeatType {
  if (
    value === "booster-seat"
  ) {
    return "booster-seat";
  }

  if (
    value ===
    "child-safety-seat"
  ) {
    return "child-safety-seat";
  }

  return "";
}

/* =========================================================
   QUOTE PAGE
========================================================= */

export default function QuotePage() {
  const [
    searchParams,
  ] =
    useSearchParams();

  /* =======================================================
     QUERY PARAM DEFAULTS
  ======================================================= */

  const defaultService =
    searchParams.get(
      "service",
    ) ?? "";

  const defaultVehicle =
    searchParams.get(
      "vehicle",
    ) ?? "";

  const defaultPickup =
    searchParams.get(
      "pickup",
    ) ?? "";

  const defaultDestination =
    searchParams.get(
      "destination",
    ) ?? "";

  const defaultPickupDate =
    searchParams.get(
      "pickupDate",
    ) ?? "";

  const defaultPickupTime =
    searchParams.get(
      "pickupTime",
    ) ?? "";

  const defaultPassengers =
    getPassengerCount(
      searchParams.get(
        "passengers",
      ),
    );

  const defaultTripType =
    getTripType(
      searchParams.get(
        "tripType",
      ),
    );

  const defaultChildSeat =
    getChildSeatType(
      searchParams.get(
        "childSeat",
      ),
    );

  /* =======================================================
     JOURNEY STATUS
  ======================================================= */

  const hasCompleteJourney =
    Boolean(
      defaultPickup.trim(),
    ) &&
    Boolean(
      defaultDestination.trim(),
    ) &&
    Boolean(
      defaultPickupDate,
    ) &&
    Boolean(
      defaultPickupTime,
    );

  return (
    <main>
      {/* ===================================================
          HERO
      =================================================== */}

      <InnerPageHero
        showNavigation={false}
        eyebrow="Tailored Chauffeur Quote"
        title="Complete Your Chauffeur Enquiry"
        description={
          hasCompleteJourney
            ? "Your journey details are ready. Complete your contact, service, vehicle and travel preferences so our booking team can prepare your tailored quotation."
            : "Provide your journey, contact, service and vehicle requirements. Our booking team will review the details and confirm availability and pricing."
        }
        breadcrumbs={[
          {
            label: "Home",
            path:
              routePaths.home,
          },
          {
            label:
              "Get a Quote",
          },
        ]}
      />

      {/* ===================================================
          QUOTE PAGE
      =================================================== */}

      <section className="quote-page">
        <div className="container quote-page__layout">
          {/* =================================================
              INFORMATION SIDEBAR
          ================================================= */}

          <aside className="quote-page__information">
            <span className="eyebrow">
              Private Chauffeur Melbourne
            </span>

            <h2>
              Plan your journey with
              our booking team.
            </h2>

            <p>
              {hasCompleteJourney
                ? "Your journey details have been carried across from the homepage. You can review or edit them inside the form before submitting."
                : "Complete the journey information and tell us your preferred service, vehicle, child-seat requirements and any special requirements."}
            </p>

            {/* ===============================================
                CONTACT DETAILS
            =============================================== */}

            <div className="quote-page__contact-list">
              <a
                href={
                  siteConfig.phoneHref
                }
              >
                <FiPhone
                  aria-hidden="true"
                />

                <span>
                  <strong>
                    Call or Text
                  </strong>

                  {
                    siteConfig.phone
                  }
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
              >
                <FiMail
                  aria-hidden="true"
                />

                <span>
                  <strong>
                    Email
                  </strong>

                  {
                    siteConfig.email
                  }
                </span>
              </a>

              <div>
                <FiShield
                  aria-hidden="true"
                />

                <span>
                  <strong>
                    Private and Secure
                  </strong>

                  Your information is
                  used only to review
                  and respond to your
                  chauffeur enquiry.
                </span>
              </div>
            </div>

            {/* ===============================================
                NOTICE
            =============================================== */}

            <div className="quote-page__notice">
              <strong>
                Booking confirmation
              </strong>

              <p>
                Submitting this form
                does not confirm your
                booking, vehicle
                availability or final
                price.
              </p>
            </div>
          </aside>

          {/* =================================================
              FORM AREA
          ================================================= */}

          <div className="quote-page__main">
            <div className="quote-page__form-heading">
              <span className="eyebrow">
                {hasCompleteJourney
                  ? "Journey Ready"
                  : "Complete Your Journey"}
              </span>

              <h2>
                {hasCompleteJourney
                  ? "Review your journey and complete your details."
                  : "Tell us about your chauffeur journey."}
              </h2>

              <p>
                {hasCompleteJourney
                  ? "Your pickup, destination, date, time, passengers and journey type are already available below."
                  : "Add the missing journey information, followed by your contact details, service, preferred vehicle and child-seat requirements."}
              </p>
            </div>

            {/* ===============================================
                QUOTE FORM
            =============================================== */}

            <TailoredQuoteForm
              defaultService={
                defaultService
              }
              defaultVehicle={
                defaultVehicle
              }
              defaultPickup={
                defaultPickup
              }
              defaultDestination={
                defaultDestination
              }
              defaultPickupDate={
                defaultPickupDate
              }
              defaultPickupTime={
                defaultPickupTime
              }
              defaultPassengers={
                defaultPassengers
              }
              defaultTripType={
                defaultTripType
              }
              defaultChildSeat={
                defaultChildSeat
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}