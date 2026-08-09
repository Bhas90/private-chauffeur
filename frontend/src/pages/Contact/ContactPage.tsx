import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";
import { siteConfig } from "../../config/siteConfig";
import { servicesData } from "../../data/servicesData";
import { routePaths } from "../../routes/routePaths";

import "./contactPage.css";

type PreferredContactMethod =
  | "phone"
  | "email"
  | "whatsapp";

interface ContactFormData {
  fullName: string;
  email: string;
  mobile: string;
  subject: string;
  service: string;
  preferredContact: PreferredContactMethod;
  message: string;
  privacyAccepted: boolean;
}

const initialFormData: ContactFormData = {
  fullName: "",
  email: "",
  mobile: "",
  subject: "",
  service: "",
  preferredContact: "phone",
  message: "",
  privacyAccepted: false,
};

const contactFaqs = [
  {
    question:
      "Do you accept chauffeur enquiries 24 hours a day?",
    answer:
      "Yes. You can submit an enquiry or quote request at any time. Journey availability and final pricing will be confirmed by our booking team.",
  },
  {
    question:
      "How quickly will your booking team respond?",
    answer:
      "Response times depend on enquiry volume and journey urgency. For immediate assistance, call or text us directly.",
  },
  {
    question:
      "Can I send my complete travel itinerary by email?",
    answer:
      "Yes. You can email your itinerary, passenger details, flight information, pickup locations and preferred vehicle requirements.",
  },
  {
    question: "Can I request a callback?",
    answer:
      "Yes. Select phone as your preferred contact method and include a suitable callback time in your message.",
  },
  {
    question: "Which locations do you service?",
    answer:
      "We provide chauffeur services throughout Melbourne CBD, surrounding suburbs and selected regional Victorian locations.",
  },
  {
    question:
      "Should I use this form for a booking quote?",
    answer:
      "For a detailed journey quotation, use our Get a Quote page. This contact form is best for general enquiries, support and business-related questions.",
  },
];

const coverageAreas = [
  "Melbourne CBD",
  "South Yarra",
];

const whatsappMessage = encodeURIComponent(
  `Hello Private Chauffeur Melbourne,

I'm interested in your chauffeur services.

Could you please assist me with my enquiry?

Thank you.`,
);

const whatsappUrl =
  `https://wa.me/61452600001?text=${whatsappMessage}`;

const googleBusinessUrl =
  "https://maps.app.goo.gl/G2JeLntYdgEuqky57";

const googleMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.7825656268883!2d144.9158724114165!3d-37.587234621008825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6522b5de40001%3A0xe6e8adc4523d144c!2sPrivate%20Chauffeur%20Melbourne!5e1!3m2!1sen!2sin!4v1785920666292!5m2!1sen!2sin";

export default function ContactPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitStatus, setSubmitStatus] =
    useState<"idle" | "success" | "error">(
      "idle",
    );

  const serviceOptions = useMemo(
    () =>
      servicesData.map((service) => ({
        value: service.slug,
        label:
          service.shortTitle ||
          service.title,
      })),
    [],
  );

  const updateField = <
    K extends keyof ContactFormData,
  >(
    field: K,
    value: ContactFormData[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

const handleSubmit = async (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  if (!formData.privacyAccepted) {
    setSubmitStatus("error");
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus("idle");

  try {
    /* =====================================================
       API URL FROM FRONTEND .ENV
    ===================================================== */

    const apiUrl =
      import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      throw new Error(
        "Frontend API URL is not configured.",
      );
    }

    /* =====================================================
       SERVICE DISPLAY NAME
    ===================================================== */

    const selectedService =
      serviceOptions.find(
        (service) =>
          service.value ===
          formData.service,
      );

    let serviceLabel =
      selectedService?.label || "";

    if (
      formData.service === "general"
    ) {
      serviceLabel =
        "General Enquiry";
    }

    if (
      formData.service ===
      "existing-booking"
    ) {
      serviceLabel =
        "Existing Booking Support";
    }

    if (
      formData.service === "business"
    ) {
      serviceLabel =
        "Business or Partnership";
    }

    /* =====================================================
       PREPARE PAYLOAD
    ===================================================== */

    const payload = {
      fullName:
        formData.fullName.trim(),

      email:
        formData.email
          .trim()
          .toLowerCase(),

      mobile:
        formData.mobile.trim(),

      subject:
        formData.subject.trim(),

      service:
        serviceLabel ||
        "General Enquiry",

      preferredContact:
        formData.preferredContact,

      message:
        formData.message.trim(),
    };

    /* =====================================================
       SEND CONTACT ENQUIRY
    ===================================================== */

    const response =
      await fetch(
        `${apiUrl}/mail/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(payload),
        },
      );

    /* =====================================================
       READ RESPONSE
    ===================================================== */

    let responseData:
      | {
          success?: boolean;
          message?: string;
        }
      | null = null;

    try {
      responseData =
        await response.json();
    } catch {
      responseData = null;
    }

    if (!response.ok) {
      throw new Error(
        responseData?.message ||
          "Unable to send your enquiry.",
      );
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    setSubmitStatus("success");

    setFormData(initialFormData);

    window.setTimeout(() => {
      navigate(
        `${routePaths.thankYou}?type=contact`,
        {
          replace: true,
        },
      );
    }, 900);
  } catch (error) {
    console.error(
      "Contact form submission failed:",
      error,
    );

    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <main>
      <InnerPageHero
        eyebrow="Contact Private Chauffeur Melbourne"
        title="Let’s plan your journey."
        description="Contact our Melbourne booking team for general enquiries, existing booking support, airport transfers, corporate travel, weddings and private chauffeur services."
        breadcrumbs={[
          {
            label: "Home",
            path: routePaths.home,
          },
          {
            label: "Contact",
          },
        ]}
      />

      <section className="contact-page">
        <div className="container contact-page__layout">
          <aside className="contact-page__sidebar">
            <div className="contact-page__information">
              <span className="eyebrow">
                Contact Information
              </span>

              <h2>
                Speak with our Melbourne
                chauffeur team.
              </h2>

              <p>
                Contact us for booking support
                and private chauffeur
                requirements.
              </p>

              <div className="contact-page__contact-list">
                <a href={siteConfig.phoneHref}>
                  <FiPhone aria-hidden="true" />

                  <span>
                    <strong>
                      Call or text
                    </strong>

                    {siteConfig.phone}
                  </span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                >
                  <FiMessageCircle
                    aria-hidden="true"
                  />

                  <span>
                    <strong>WhatsApp</strong>
                    Chat with our team
                  </span>
                </a>

                <div>
                  <FiClock aria-hidden="true" />

                  <span>
                    <strong>
                      Booking assistance
                    </strong>

                    Available 24 hours
                  </span>
                </div>
              </div>

              <Link
                className="contact-page__quote-link"
                to={routePaths.quote}
              >
                Request a Chauffeur Quote
                <FiArrowRight
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="contact-page__coverage">
              <span className="eyebrow">
                Service Coverage
              </span>

              <h3>
                Melbourne and regional
                Victoria
              </h3>

              <ul>
                {coverageAreas.map((area) => (
                  <li key={area}>
                    <FiMapPin
                      aria-hidden="true"
                    />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={routePaths.serviceAreas}
              >
                View All Service Areas
                <FiArrowRight
                  aria-hidden="true"
                />
              </Link>
            </div>
          </aside>

          <div className="contact-page__main">
            <section className="contact-form-card">
              <div className="contact-form-card__heading">
                <span className="eyebrow">
                  General Enquiry
                </span>

                <h2>How can we help?</h2>

                <p>
                  Complete the form below and
                  our team will respond using
                  your preferred contact method.
                  For a detailed journey price,
                  use the chauffeur quote form.
                </p>
              </div>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="contact-form__grid">
                  <label className="contact-form__field">
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

                  <label className="contact-form__field">
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

                  <label className="contact-form__field">
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

                  <label className="contact-form__field">
                    <span>
                      Enquiry Subject*
                    </span>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={(event) =>
                        updateField(
                          "subject",
                          event.target.value,
                        )
                      }
                      placeholder="How can we assist?"
                      required
                    />
                  </label>

                  <label className="contact-form__field">
                    <span>
                      Related Service
                    </span>

                    <select
                      name="service"
                      value={formData.service}
                      onChange={(event) =>
                        updateField(
                          "service",
                          event.target.value,
                        )
                      }
                    >
                      <option value="">
                        Select a service
                      </option>

                      <option value="general">
                        General Enquiry
                      </option>

                      <option value="existing-booking">
                        Existing Booking Support
                      </option>

                      <option value="business">
                        Business or Partnership
                      </option>

                      {serviceOptions.map(
                        (service) => (
                          <option
                            key={service.value}
                            value={service.value}
                          >
                            {service.label}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <fieldset className="contact-form__field contact-form__contact-method">
                    <legend>
                      Preferred Contact Method
                    </legend>

                    <div>
                      <label>
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={
                            formData.preferredContact ===
                            "phone"
                          }
                          onChange={() =>
                            updateField(
                              "preferredContact",
                              "phone",
                            )
                          }
                        />

                        <span>Phone</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={
                            formData.preferredContact ===
                            "email"
                          }
                          onChange={() =>
                            updateField(
                              "preferredContact",
                              "email",
                            )
                          }
                        />

                        <span>Email</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="preferredContact"
                          value="whatsapp"
                          checked={
                            formData.preferredContact ===
                            "whatsapp"
                          }
                          onChange={() =>
                            updateField(
                              "preferredContact",
                              "whatsapp",
                            )
                          }
                        />

                        <span>WhatsApp</span>
                      </label>
                    </div>
                  </fieldset>

                  <label className="contact-form__field contact-form__field--full">
                    <span>Your Message*</span>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(event) =>
                        updateField(
                          "message",
                          event.target.value,
                        )
                      }
                      placeholder="Tell us how we can help..."
                      rows={7}
                      required
                    />
                  </label>
                </div>

                <label className="contact-form__privacy">
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
                    I agree that my information
                    may be used to respond to
                    this enquiry in accordance
                    with the{" "}
                    <Link
                      to={routePaths.privacy}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {submitStatus ===
                  "success" && (
                  <div
                    className="contact-form__message contact-form__message--success"
                    role="status"
                  >
                    <FiCheckCircle
                      aria-hidden="true"
                    />

                    <span>
                      Thank you. Your enquiry
                      has been received. You
                      will now be redirected.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    className="contact-form__message contact-form__message--error"
                    role="alert"
                  >
                    Please review the form,
                    accept the Privacy Policy
                    and try again.
                  </div>
                )}

                <button
                  className="contact-form__submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Sending Enquiry..."
                    : "Send Enquiry"}

                  {!isSubmitting && (
                    <FiSend
                      aria-hidden="true"
                    />
                  )}
                </button>
              </form>
            </section>
          </div>
        </div>
      </section>

      <section className="contact-map-section">
        <div className="container contact-map-section__layout">
          <div className="contact-map-section__info">
            <span className="eyebrow">
              Google Business
            </span>

            <h2>
              Find Private Chauffeur
              Melbourne.
            </h2>

            <p>
              Visit our Google Business
              Profile, explore directions and
              contact our Melbourne chauffeur
              team directly.
            </p>

            <div className="contact-map-section__buttons">
              <a
                className="button button--primary"
                href={googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Google Maps
              </a>

              <Link
                className="button button--dark"
                to={routePaths.quote}
              >
                Request Quote
              </Link>
            </div>
          </div>

          <div className="contact-map-section__map">
            <iframe
              src={googleMapEmbedUrl}
              title="Private Chauffeur Melbourne"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      <section className="contact-faq-section">
        <div className="container">
          <div className="contact-faq-section__heading">
            <span className="eyebrow">
              Contact FAQs
            </span>

            <h2>
              Frequently asked questions.
            </h2>

            <p>
              Find quick answers before
              contacting our chauffeur booking
              team.
            </p>
          </div>

          <div className="contact-faq-section__grid">
            {contactFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                </summary>

                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-final-cta">
        <div className="container contact-final-cta__inner">
          <div>
            <span className="eyebrow">
              Need a Chauffeur Quote?
            </span>

            <h2>
              Tell us about your Melbourne
              journey.
            </h2>

            <p>
              Share your pickup, destination,
              passengers, luggage and preferred
              vehicle for a tailored quotation.
            </p>
          </div>

          <div className="contact-final-cta__actions">
            
             
              <a
              className="button contact-final-cta__call"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiMessageCircle
                aria-hidden="true"
              />
              WhatsApp Us
            </a>
                    

            <Link
              className="button button--primary"
              to={routePaths.quote}
            >
              Request a Quote
              <FiArrowRight
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}