import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { routePaths } from "../../routes/routePaths";
import "./homeQuoteForm.css";

type TripType = "one-way" | "return";

interface QuoteFormData {
  pickup: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  tripType: TripType;
}

const initialFormData: QuoteFormData = {
  pickup: "",
  destination: "",
  pickupDate: "",
  pickupTime: "",
  passengers: "1",
  tripType: "one-way",
};

function getTodayDate(): string {
  const today = new Date();
  const timezoneOffset =
    today.getTimezoneOffset() * 60_000;

  return new Date(
    today.getTime() - timezoneOffset,
  )
    .toISOString()
    .split("T")[0];
}

export default function HomeQuoteForm() {
  const navigate = useNavigate();

  const minimumPickupDate = useMemo(
    () => getTodayDate(),
    [],
  );

  const [formData, setFormData] =
    useState<QuoteFormData>(initialFormData);

  const updateField = <
    K extends keyof QuoteFormData,
  >(
    field: K,
    value: QuoteFormData[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const searchParams =
      new URLSearchParams();

    searchParams.set(
      "pickup",
      formData.pickup.trim(),
    );

    searchParams.set(
      "destination",
      formData.destination.trim(),
    );

    searchParams.set(
      "pickupDate",
      formData.pickupDate,
    );

    searchParams.set(
      "pickupTime",
      formData.pickupTime,
    );

    searchParams.set(
      "passengers",
      formData.passengers,
    );

    searchParams.set(
      "tripType",
      formData.tripType,
    );

    navigate(
      `${routePaths.quote}?${searchParams.toString()}`,
    );
  };

  return (
    <section
      className="home-quote"
      aria-labelledby="home-quote-title"
    >
      <div className="container">
        <div className="home-quote__card">
          <div className="home-quote__heading">
            <span>Plan Your Journey</span>

            <h2 id="home-quote-title">
              Request a Chauffeur Quote
            </h2>

            <p>
              Enter your journey details once.
              We will carry them into the full
              quote form so you can continue
              without entering the same
              information again.
            </p>
          </div>

          <form
            className="home-quote__form"
            onSubmit={handleSubmit}
          >
            <div
              className="home-quote__trip-toggle"
              aria-label="Select journey type"
            >
              <button
                type="button"
                className={
                  formData.tripType ===
                  "one-way"
                    ? "home-quote__trip-button home-quote__trip-button--active"
                    : "home-quote__trip-button"
                }
                onClick={() =>
                  updateField(
                    "tripType",
                    "one-way",
                  )
                }
                aria-pressed={
                  formData.tripType ===
                  "one-way"
                }
              >
                One Way
              </button>

              <button
                type="button"
                className={
                  formData.tripType ===
                  "return"
                    ? "home-quote__trip-button home-quote__trip-button--active"
                    : "home-quote__trip-button"
                }
                onClick={() =>
                  updateField(
                    "tripType",
                    "return",
                  )
                }
                aria-pressed={
                  formData.tripType ===
                  "return"
                }
              >
                Return
              </button>
            </div>

            <div className="home-quote__fields">
              <label className="home-quote__field home-quote__field--location">
                <span>
                  <FiMapPin
                    aria-hidden="true"
                  />
                  Pickup Location
                </span>

                <input
                  type="text"
                  name="pickup"
                  value={formData.pickup}
                  onChange={(event) =>
                    updateField(
                      "pickup",
                      event.target.value,
                    )
                  }
                  placeholder="Enter pickup address"
                  autoComplete="street-address"
                  required
                />
              </label>

              <label className="home-quote__field home-quote__field--location">
                <span>
                  <FiMapPin
                    aria-hidden="true"
                  />
                  Destination
                </span>

                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={(event) =>
                    updateField(
                      "destination",
                      event.target.value,
                    )
                  }
                  placeholder="Enter destination"
                  required
                />
              </label>

              <label className="home-quote__field">
                <span>
                  <FiCalendar
                    aria-hidden="true"
                  />
                  Pickup Date
                </span>

                <input
                  type="date"
                  name="pickupDate"
                  min={minimumPickupDate}
                  value={formData.pickupDate}
                  onChange={(event) =>
                    updateField(
                      "pickupDate",
                      event.target.value,
                    )
                  }
                  required
                />
              </label>

              <label className="home-quote__field">
                <span>
                  <FiClock
                    aria-hidden="true"
                  />
                  Pickup Time
                </span>

                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={(event) =>
                    updateField(
                      "pickupTime",
                      event.target.value,
                    )
                  }
                  required
                />
              </label>

              <label className="home-quote__field">
                <span>
                  <FiUsers
                    aria-hidden="true"
                  />
                  Passengers
                </span>

                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={(event) =>
                    updateField(
                      "passengers",
                      event.target.value,
                    )
                  }
                  required
                >
                  {Array.from(
                    {
                      length: 16,
                    },
                    (_, index) => index + 1,
                  ).map((passengerCount) => (
                    <option
                      key={passengerCount}
                      value={String(
                        passengerCount,
                      )}
                    >
                      {passengerCount}
                    </option>
                  ))}
                </select>
              </label>

              <button
                className="home-quote__submit"
                type="submit"
              >
                Continue
                <FiArrowRight
                  aria-hidden="true"
                />
              </button>
            </div>

            <p className="home-quote__notice">
              Your journey details will be
              carried into the full quote form.
              Continuing does not confirm a
              booking, vehicle or final price.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}