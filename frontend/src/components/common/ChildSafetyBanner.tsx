import {
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import "./childSafetyBanner.css";

export default function ChildSafetyBanner() {
  return (
    <section
      className="child-safety-banner"
      aria-label="Child travel safety options"
    >
      <div className="container child-safety-banner__inner">
        <div className="child-safety-banner__icon">
          <FiShield
            aria-hidden="true"
          />
        </div>

        <div className="child-safety-banner__content">
          <span>
            Travelling With Babies
            or Children? No worries!
          </span>

          <strong>
            Booster Seat & Child Safety
            Seat options available.
          </strong>

        </div>

        <Link
          className="child-safety-banner__cta"
          to="/get-a-quote?childSeat=child-safety-seat"
        >
          Request Child Seat

          <FiArrowRight
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}