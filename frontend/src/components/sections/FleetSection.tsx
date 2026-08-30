import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { routePaths } from "../../routes/routePaths";
import { getFleet } from "../../services/fleetApi";
import type { FleetVehicle } from "../../services/fleetApi";
import FleetCard from "../cards/FleetCard";
import "./fleetSection.css";

export default function FleetSection() {
  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    void getFleet().then(setFleet);
  }, []);

  return (
    <section className="fleet-section section">
      <div className="container">
        <div className="fleet-section__header">
          <div className="section-header">
            <span className="eyebrow">Executive Chauffeur Fleet</span>

            <h2 className="section-title">
              Luxury vehicles selected for comfort, privacy and style.
            </h2>

            <p className="section-description">
              Choose from our chauffeur-driven executive and luxury sedans
              for airport transfers, corporate travel, weddings, special
              events and private journeys across Melbourne.
            </p>
          </div>

          <Link
            className="button fleet-section__button"
            to={routePaths.fleet}
          >
            Explore Full Fleet
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        {fleet.length > 0 && (
          <div className="fleet-section__carousel">
            <button
              className="fleet-section__nav fleet-section__nav--previous"
              type="button"
              aria-label="Previous fleet vehicle"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <FiChevronLeft aria-hidden="true" />
            </button>

            <Swiper
              key={fleet.length}
              className="fleet-section__swiper"
              modules={[Autoplay, A11y]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={fleet.length > 1}
              speed={750}
              spaceBetween={26}
              slidesPerView={1}
              slidesPerGroup={1}
              watchOverflow
              grabCursor
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                700: {
                  slidesPerView: 2,
                  spaceBetween: 22,
                },
                1100: {
                  slidesPerView: 3,
                  spaceBetween: 26,
                },
              }}
              aria-label="Featured chauffeur fleet"
            >
              {fleet.map((vehicle) => (
                <SwiperSlide key={vehicle.slug}>
                  <FleetCard vehicle={vehicle} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="fleet-section__nav fleet-section__nav--next"
              type="button"
              aria-label="Next fleet vehicle"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
