import {
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiEdit3,
  FiMapPin,
} from "react-icons/fi";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { fleetData } from "../../data/fleetData";
import { servicesData } from "../../data/servicesData";
import { routePaths } from "../../routes/routePaths";
import "./tailoredQuoteForm.css";

type TripType = "one-way" | "return";

interface TailoredQuoteFormProps {
  defaultService?: string;
  defaultVehicle?: string;
  defaultPickup?: string;
  defaultDestination?: string;
  defaultPickupDate?: string;
  defaultPickupTime?: string;
  defaultPassengers?: string;
  defaultTripType?: TripType;
}

interface QuoteFormState {
  fullName: string;
  email: string;
  mobile: string;
  serviceRequired: string;
  preferredVehicle: string;
  luggageRequirements: string;
  flightNumber: string;
  additionalRequirements: string;
  marketingConsent: boolean;
  privacyAccepted: boolean;
}

interface JourneyDetails {
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  tripType: TripType;
}

const baseInitialState: QuoteFormState = {
  fullName: "",
  email: "",
  mobile: "",
  serviceRequired: "",
  preferredVehicle: "",
  luggageRequirements: "",
  flightNumber: "",
  additionalRequirements: "",
  marketingConsent: false,
  privacyAccepted: false,
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

function normalisePassengerCount(
  value?: string,
): string {
  const passengerCount = Number(value);

  if (
    !value ||
    Number.isNaN(passengerCount) ||
    passengerCount < 1 ||
    passengerCount > 16
  ) {
    return "1";
  }

  return String(Math.floor(passengerCount));
}

function normaliseTripType(
  value?: TripType,
): TripType {
  return value === "return"
    ? "return"
    : "one-way";
}

function hasCompleteJourney(
  journey: JourneyDetails,
): boolean {
  return Boolean(
    journey.pickupLocation.trim() &&
      journey.destination.trim() &&
      journey.pickupDate &&
      journey.pickupTime,
  );
}

export default function TailoredQuoteForm({
  defaultService = "",
  defaultVehicle = "",
  defaultPickup = "",
  defaultDestination = "",
  defaultPickupDate = "",
  defaultPickupTime = "",
  defaultPassengers = "1",
  defaultTripType = "one-way",
}: TailoredQuoteFormProps) {
  const navigate = useNavigate();

  const minimumPickupDate = useMemo(
    () => getTodayDate(),
    [],
  );

  const createJourneyState =
    (): JourneyDetails => ({
      pickupLocation: defaultPickup,
      destination: defaultDestination,
      pickupDate: defaultPickupDate,
      pickupTime: defaultPickupTime,
      passengers:
        normalisePassengerCount(
          defaultPassengers,
        ),
      tripType:
        normaliseTripType(
          defaultTripType,
        ),
    });

  const [formData, setFormData] =
    useState<QuoteFormState>({
      ...baseInitialState,
      serviceRequired: defaultService,
      preferredVehicle: defaultVehicle,
    });

  const [journeyDetails, setJourneyDetails] =
    useState<JourneyDetails>(
      createJourneyState,
    );

  const [isEditingJourney, setIsEditingJourney] =
    useState(
      !hasCompleteJourney(
        createJourneyState(),
      ),
    );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      serviceRequired:
        defaultService ||
        current.serviceRequired,
      preferredVehicle:
        defaultVehicle ||
        current.preferredVehicle,
    }));
  }, [
    defaultService,
    defaultVehicle,
  ]);

  useEffect(() => {
    const nextJourney =
      createJourneyState();

    setJourneyDetails(nextJourney);

    setIsEditingJourney(
      !hasCompleteJourney(nextJourney),
    );
  }, [
    defaultDestination,
    defaultPassengers,
    defaultPickup,
    defaultPickupDate,
    defaultPickupTime,
    defaultTripType,
  ]);

  const updateField = <
    K extends keyof QuoteFormState,
  >(
    field: K,
    value: QuoteFormState[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateJourneyField = <
    K extends keyof JourneyDetails,
  >(
    field: K,
    value: JourneyDetails[K],
  ) => {
    setJourneyDetails((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const isAirportTransfer =
    formData.serviceRequired ===
    "airport-transfers-melbourne";

  const resetCustomerFields = () => {
    setFormData({
      ...baseInitialState,
      serviceRequired: defaultService,
      preferredVehicle: defaultVehicle,
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!formData.privacyAccepted) {
      toast.error(
        "Please accept the Privacy Policy before submitting.",
      );

      return;
    }

    if (
      !hasCompleteJourney(
        journeyDetails,
      )
    ) {
      setIsEditingJourney(true);

      toast.error(
        "Please complete your pickup, destination, date and time.",
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName:
          formData.fullName.trim(),

        email:
          formData.email
            .trim()
            .toLowerCase(),

        mobile:
          formData.mobile.trim(),

        serviceRequired:
          formData.serviceRequired,

        preferredVehicle:
          formData.preferredVehicle,

        luggageRequirements:
          formData.luggageRequirements.trim(),

        flightNumber:
          isAirportTransfer
            ? formData.flightNumber
                .trim()
                .toUpperCase()
            : "",

        additionalRequirements:
          formData.additionalRequirements.trim(),

        marketingConsent:
          formData.marketingConsent,

        privacyAccepted:
          formData.privacyAccepted,

        pickupLocation:
          journeyDetails.pickupLocation.trim(),

        destination:
          journeyDetails.destination.trim(),

        pickupDate:
          journeyDetails.pickupDate,

        pickupTime:
          journeyDetails.pickupTime,

        passengers:
          journeyDetails.passengers,

        tripType:
          journeyDetails.tripType,
      };

      /*
       * Replace the temporary delay with:
       *
       * const response = await fetch(
       *   "http://localhost:3000/api/v1/quotes",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json",
       *     },
       *     body: JSON.stringify(payload),
       *   },
       * );
       *
       * if (!response.ok) {
       *   throw new Error(
       *     "Quote request failed",
       *   );
       * }
       */

      console.log(
        "Quote request payload:",
        payload,
      );

      await new Promise((resolve) =>
        window.setTimeout(resolve, 700),
      );

      toast.success(
        "Your quote request has been received.",
      );

      resetCustomerFields();

      window.setTimeout(() => {
        navigate(
          `${routePaths.thankYou}?type=quote`,
        );
      }, 900);
    } catch (error) {
      console.error(
        "Quote form submission failed:",
        error,
      );

      toast.error(
        "We could not submit your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="tailored-quote-form"
      id="request-quote"
      aria-labelledby="tailored-quote-form-title"
    >
      <div className="tailored-quote-form__heading">
        <span>
          Complete Your Enquiry
        </span>

        <h2 id="tailored-quote-form-title">
          Add your contact and travel
          preferences.
        </h2>

        <p>
          Complete the remaining information
          and our booking team will review your
          journey and prepare a tailored
          quotation.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {isEditingJourney ? (
          <section className="tailored-quote-form__journey-editor">
            <div className="tailored-quote-form__journey-heading">
              <div>
                <span>
                  Journey Details
                </span>

                <h3>
                  Tell us about your journey.
                </h3>

                <p>
                  Complete the required travel
                  information before submitting
                  your quotation request.
                </p>
              </div>

              <FiMapPin
                aria-hidden="true"
              />
            </div>

            <div className="tailored-quote-form__grid">
              <label className="tailored-quote-form__wide">
                <span>
                  Pick-up Location*
                </span>

                <input
                  type="text"
                  name="pickupLocation"
                  value={
                    journeyDetails.pickupLocation
                  }
                  onChange={(event) =>
                    updateJourneyField(
                      "pickupLocation",
                      event.target.value,
                    )
                  }
                  placeholder="Enter the full pickup address"
                  autoComplete="street-address"
                  required
                />
              </label>

              <label className="tailored-quote-form__wide">
                <span>Destination*</span>

                <input
                  type="text"
                  name="destination"
                  value={
                    journeyDetails.destination
                  }
                  onChange={(event) =>
                    updateJourneyField(
                      "destination",
                      event.target.value,
                    )
                  }
                  placeholder="Enter the destination address"
                  required
                />
              </label>

              <label>
                <span>Pick-up Date*</span>

                <input
                  type="date"
                  name="pickupDate"
                  min={minimumPickupDate}
                  value={
                    journeyDetails.pickupDate
                  }
                  onChange={(event) =>
                    updateJourneyField(
                      "pickupDate",
                      event.target.value,
                    )
                  }
                  required
                />
              </label>

              <label>
                <span>Pick-up Time*</span>

                <input
                  type="time"
                  name="pickupTime"
                  value={
                    journeyDetails.pickupTime
                  }
                  onChange={(event) =>
                    updateJourneyField(
                      "pickupTime",
                      event.target.value,
                    )
                  }
                  required
                />
              </label>

              <label>
                <span>
                  Number of Passengers*
                </span>

                <select
                  name="passengers"
                  value={
                    journeyDetails.passengers
                  }
                  onChange={(event) =>
                    updateJourneyField(
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
                    (_, index) =>
                      index + 1,
                  ).map(
                    (passengerCount) => (
                      <option
                        key={passengerCount}
                        value={String(
                          passengerCount,
                        )}
                      >
                        {passengerCount}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <fieldset className="tailored-quote-form__trip-type">
                <legend>
                  Journey Type*
                </legend>

                <div className="tailored-quote-form__trip-options">
                  <label
                    className={
                      journeyDetails.tripType ===
                      "one-way"
                        ? "tailored-quote-form__trip-option tailored-quote-form__trip-option--active"
                        : "tailored-quote-form__trip-option"
                    }
                  >
                    <input
                      type="radio"
                      name="tripType"
                      value="one-way"
                      checked={
                        journeyDetails.tripType ===
                        "one-way"
                      }
                      onChange={() =>
                        updateJourneyField(
                          "tripType",
                          "one-way",
                        )
                      }
                    />

                    <span>One Way</span>
                  </label>

                  <label
                    className={
                      journeyDetails.tripType ===
                      "return"
                        ? "tailored-quote-form__trip-option tailored-quote-form__trip-option--active"
                        : "tailored-quote-form__trip-option"
                    }
                  >
                    <input
                      type="radio"
                      name="tripType"
                      value="return"
                      checked={
                        journeyDetails.tripType ===
                        "return"
                      }
                      onChange={() =>
                        updateJourneyField(
                          "tripType",
                          "return",
                        )
                      }
                    />

                    <span>
                      Return Journey
                    </span>
                  </label>
                </div>
              </fieldset>
            </div>

            {hasCompleteJourney(
              journeyDetails,
            ) && (
              <button
                type="button"
                className="tailored-quote-form__save-journey"
                onClick={() =>
                  setIsEditingJourney(false)
                }
              >
                Save Journey Details
                <FiCheckCircle
                  aria-hidden="true"
                />
              </button>
            )}
          </section>
        ) : (
          <section className="tailored-quote-form__journey-confirmed">
            <div>
              <FiCheckCircle
                aria-hidden="true"
              />

              <span>
                <strong>
                  Journey details completed
                </strong>

                <small>
                  {journeyDetails.pickupLocation}
                  {" → "}
                  {journeyDetails.destination}
                </small>
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setIsEditingJourney(true)
              }
            >
              <FiEdit3
                aria-hidden="true"
              />
              Edit Journey
            </button>
          </section>
        )}

        <div className="tailored-quote-form__customer-section">
          <div className="tailored-quote-form__section-heading">
            <span>
              Contact and Preferences
            </span>

            <h3>
              How should we contact you?
            </h3>
          </div>

          <div className="tailored-quote-form__grid">
            <label>
              <span>Full Name*</span>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(event) =>
                  updateField(
                    "fullName",
                    event.target.value,
                  )
                }
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>Email Address*</span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value,
                  )
                }
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
            </label>

            <label>
              <span>Mobile Number*</span>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={(event) =>
                  updateField(
                    "mobile",
                    event.target.value,
                  )
                }
                placeholder="Enter your mobile number"
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </label>

            <label>
              <span>Service Required*</span>

              <select
                name="serviceRequired"
                value={
                  formData.serviceRequired
                }
                onChange={(event) =>
                  updateField(
                    "serviceRequired",
                    event.target.value,
                  )
                }
                required
              >
                <option value="">
                  Select a service
                </option>

                {servicesData.map(
                  (service) => (
                    <option
                      key={service.slug}
                      value={service.slug}
                    >
                      {service.title}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              <span>
                Preferred Vehicle
              </span>

              <select
                name="preferredVehicle"
                value={
                  formData.preferredVehicle
                }
                onChange={(event) =>
                  updateField(
                    "preferredVehicle",
                    event.target.value,
                  )
                }
              >
                <option value="">
                  No preference
                </option>

                {fleetData.map(
                  (vehicle) => (
                    <option
                      key={vehicle.slug}
                      value={vehicle.slug}
                    >
                      {vehicle.name}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              <span>
                Luggage Requirements
              </span>

              <input
                type="text"
                name="luggageRequirements"
                value={
                  formData.luggageRequirements
                }
                onChange={(event) =>
                  updateField(
                    "luggageRequirements",
                    event.target.value,
                  )
                }
                placeholder="For example: 2 large bags, 2 cabin bags"
              />
            </label>

            {isAirportTransfer && (
              <label className="tailored-quote-form__full">
                <span>
                  Flight Number
                </span>

                <input
                  type="text"
                  name="flightNumber"
                  value={
                    formData.flightNumber
                  }
                  onChange={(event) =>
                    updateField(
                      "flightNumber",
                      event.target.value.toUpperCase(),
                    )
                  }
                  placeholder="For example: QF401"
                  autoCapitalize="characters"
                />
              </label>
            )}

            <label className="tailored-quote-form__full">
              <span>
                Additional Requirements /
                Special Requests
              </span>

              <textarea
                name="additionalRequirements"
                rows={6}
                value={
                  formData.additionalRequirements
                }
                onChange={(event) =>
                  updateField(
                    "additionalRequirements",
                    event.target.value,
                  )
                }
                placeholder="Add return details, additional stops, child-seat requests, accessibility requirements or other useful information."
              />
            </label>
          </div>
        </div>

        <label className="tailored-quote-form__consent">
          <input
            type="checkbox"
            name="marketingConsent"
            checked={
              formData.marketingConsent
            }
            onChange={(event) =>
              updateField(
                "marketingConsent",
                event.target.checked,
              )
            }
          />

          <span>
            I would like to receive occasional
            service updates and offers by email
            or SMS. I understand I can
            unsubscribe at any time.
          </span>
        </label>

        <label className="tailored-quote-form__consent">
          <input
            type="checkbox"
            name="privacyAccepted"
            checked={
              formData.privacyAccepted
            }
            onChange={(event) =>
              updateField(
                "privacyAccepted",
                event.target.checked,
              )
            }
            required
          />

          <span>
            I agree that my information may be
            used to review and respond to this
            quote request in accordance with
            the{" "}
            <Link to={routePaths.privacy}>
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : "Request My Quote"}

          {!isSubmitting && (
            <FiArrowRight
              aria-hidden="true"
            />
          )}
        </button>

        <div className="tailored-quote-form__notice">
          <FiCheckCircle
            aria-hidden="true"
          />

          <span>
            Submission does not confirm the
            booking. Your journey, vehicle
            availability and final price will
            be confirmed separately.
          </span>
        </div>
      </form>
    </section>
  );
}