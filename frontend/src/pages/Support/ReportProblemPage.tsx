import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiMail,
  FiPhone,
  FiSend,
  FiUploadCloud,
} from "react-icons/fi";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";
import { siteConfig } from "../../config/siteConfig";
import { routePaths } from "../../routes/routePaths";
import "./reportProblemPage.css";

type PreferredContactMethod =
  | "phone"
  | "email"
  | "whatsapp";

interface ReportProblemFormData {
  fullName: string;
  email: string;
  phone: string;
  bookingReference: string;
  journeyDate: string;
  category: string;
  subject: string;
  description: string;
  preferredContact: PreferredContactMethod;
  privacyAccepted: boolean;
}

const initialFormData: ReportProblemFormData = {
  fullName: "",
  email: "",
  phone: "",
  bookingReference: "",
  journeyDate: "",
  category: "",
  subject: "",
  description: "",
  preferredContact: "email",
  privacyAccepted: false,
};

const problemCategories = [
  "Booking or quotation issue",
  "Payment or refund enquiry",
  "Airport pickup issue",
  "Journey delay",
  "Vehicle concern",
  "Website problem",
  "Email or form problem",
  "Customer service concern",
  "Lost property",
  "Other",
];

export default function ReportProblemPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<ReportProblemFormData>(
      initialFormData,
    );

  const [attachment, setAttachment] =
    useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitStatus, setSubmitStatus] =
    useState<
      "idle" | "success" | "error"
    >("idle");

  const updateField = <
    K extends keyof ReportProblemFormData,
  >(
    field: K,
    value: ReportProblemFormData[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const handleAttachmentChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0] ?? null;

    if (!file) {
      setAttachment(null);
      return;
    }

    const maximumSize = 5 * 1024 * 1024;

    if (file.size > maximumSize) {
      event.target.value = "";
      setAttachment(null);
      setSubmitStatus("error");
      return;
    }

    setAttachment(file);
    setSubmitStatus("idle");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      isSubmitting ||
      !formData.privacyAccepted
    ) {
      if (!formData.privacyAccepted) {
        setSubmitStatus("error");
      }

      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(
        ([key, value]) => {
          payload.append(key, String(value));
        },
      );

      if (attachment) {
        payload.append(
          "attachment",
          attachment,
        );
      }

      /*
       * Replace this delay with the backend request.
       *
       * Example:
       *
       * const response = await fetch(
       *   "http://localhost:3000/api/v1/support/report-problem",
       *   {
       *     method: "POST",
       *     body: payload,
       *   },
       * );
       *
       * if (!response.ok) {
       *   throw new Error(
       *     "Unable to submit report",
       *   );
       * }
       */

      await new Promise((resolve) =>
        window.setTimeout(resolve, 700),
      );

      setSubmitStatus("success");
      setFormData(initialFormData);
      setAttachment(null);

      window.setTimeout(() => {
        navigate(
          `${routePaths.thankYou}?type=support`,
        );
      }, 900);
    } catch (error) {
      console.error(
        "Problem report submission failed:",
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
        showNavigation={false}
        eyebrow="Customer Support"
        title="Report a Problem"
        description="Tell us about a booking, payment, journey, website or customer-service issue. Our team will review the details and respond using your preferred contact method."
        breadcrumbs={[
          {
            label: "Home",
            path: routePaths.home,
          },
          {
            label: "Report a Problem",
          },
        ]}
      />

      <section className="report-problem-page">
        <div className="container report-problem-page__layout">
          <aside className="report-problem-page__sidebar">
            <div className="report-problem-page__information">
              <FiAlertCircle
                aria-hidden="true"
              />

              <span className="eyebrow">
                Support Information
              </span>

              <h2>
                Help us understand what
                happened.
              </h2>

              <p>
                Include clear details such as
                your booking reference,
                journey date, locations and
                any supporting screenshot or
                document.
              </p>

              <div className="report-problem-page__contact-list">
                <a href={siteConfig.phoneHref}>
                  <FiPhone
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Urgent assistance
                    </strong>

                    {siteConfig.phone}
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
                      Email support
                    </strong>

                    {siteConfig.email}
                  </span>
                </a>

                <div>
                  <FiClock
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Response time
                    </strong>

                    We aim to respond as soon
                    as reasonably possible.
                  </span>
                </div>
              </div>
            </div>

            <div className="report-problem-page__guidance">
              <span className="eyebrow">
                Before Submitting
              </span>

              <ul>
                <li>
                  <FiCheckCircle
                    aria-hidden="true"
                  />
                  Check that your contact
                  information is correct.
                </li>

                <li>
                  <FiCheckCircle
                    aria-hidden="true"
                  />
                  Include the booking
                  reference where available.
                </li>

                <li>
                  <FiCheckCircle
                    aria-hidden="true"
                  />
                  Explain the issue in
                  chronological order.
                </li>

                <li>
                  <FiCheckCircle
                    aria-hidden="true"
                  />
                  Upload only relevant
                  supporting files.
                </li>
              </ul>

              <Link to={routePaths.contact}>
                General enquiry instead?
              </Link>
            </div>
          </aside>

          <div className="report-problem-page__main">
            <section className="report-problem-form-card">
              <div className="report-problem-form-card__heading">
                <span className="eyebrow">
                  Problem Report Form
                </span>

                <h2>
                  Provide the issue details.
                </h2>

                <p>
                  Fields marked with an
                  asterisk are required.
                  Submitting this form does
                  not automatically confirm
                  a refund or other remedy.
                </p>
              </div>

              <form
                className="report-problem-form"
                onSubmit={handleSubmit}
              >
                <div className="report-problem-form__grid">
                  <label className="report-problem-form__field">
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

                  <label className="report-problem-form__field">
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

                  <label className="report-problem-form__field">
                    <span>Mobile Number*</span>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value,
                        )
                      }
                      placeholder="Enter your mobile number"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                  </label>

                  <label className="report-problem-form__field">
                    <span>
                      Booking Reference
                    </span>

                    <input
                      type="text"
                      name="bookingReference"
                      value={
                        formData.bookingReference
                      }
                      onChange={(event) =>
                        updateField(
                          "bookingReference",
                          event.target.value,
                        )
                      }
                      placeholder="Example: PCM-12345"
                    />
                  </label>

                  <label className="report-problem-form__field">
                    <span>Journey Date</span>

                    <input
                      type="date"
                      name="journeyDate"
                      value={formData.journeyDate}
                      onChange={(event) =>
                        updateField(
                          "journeyDate",
                          event.target.value,
                        )
                      }
                    />
                  </label>

                  <label className="report-problem-form__field">
                    <span>
                      Problem Category*
                    </span>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={(event) =>
                        updateField(
                          "category",
                          event.target.value,
                        )
                      }
                      required
                    >
                      <option value="">
                        Select a category
                      </option>

                      {problemCategories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <label className="report-problem-form__field report-problem-form__field--full">
                    <span>Subject*</span>

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
                      placeholder="Briefly describe the issue"
                      required
                    />
                  </label>

                  <label className="report-problem-form__field report-problem-form__field--full">
                    <span>
                      Detailed Description*
                    </span>

                    <textarea
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={(event) =>
                        updateField(
                          "description",
                          event.target.value,
                        )
                      }
                      placeholder="Explain what happened, when it occurred and how you would like us to assist."
                      rows={8}
                      required
                    />
                  </label>

                  <fieldset className="report-problem-form__field report-problem-form__contact-method">
                    <legend>
                      Preferred Contact Method
                    </legend>

                    <div>
                      {(
                        [
                          "phone",
                          "email",
                          "whatsapp",
                        ] as const
                      ).map((method) => (
                        <label key={method}>
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method}
                            checked={
                              formData.preferredContact ===
                              method
                            }
                            onChange={() =>
                              updateField(
                                "preferredContact",
                                method,
                              )
                            }
                          />

                          <span>
                            {method
                              .charAt(0)
                              .toUpperCase() +
                              method.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="report-problem-form__field report-problem-form__field--full">
                    <span>
                      Supporting Attachment
                    </span>

                    <label className="report-problem-form__upload">
                      <FiUploadCloud
                        aria-hidden="true"
                      />

                      <span>
                        <strong>
                          Upload screenshot or
                          document
                        </strong>

                        PDF, JPG, PNG or WEBP.
                        Maximum file size: 5 MB.
                      </span>

                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={
                          handleAttachmentChange
                        }
                      />
                    </label>

                    {attachment && (
                      <div className="report-problem-form__attachment">
                        <FiFileText
                          aria-hidden="true"
                        />

                        <span>
                          {attachment.name}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setAttachment(null)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <label className="report-problem-form__privacy">
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
                    I agree that the information
                    submitted may be used to
                    investigate and respond to
                    this report in accordance
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
                    className="report-problem-form__message report-problem-form__message--success"
                    role="status"
                  >
                    <FiCheckCircle
                      aria-hidden="true"
                    />

                    <span>
                      Your report has been
                      submitted successfully.
                      You will now be redirected.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    className="report-problem-form__message report-problem-form__message--error"
                    role="alert"
                  >
                    <FiAlertCircle
                      aria-hidden="true"
                    />

                    <span>
                      Please review the form.
                      Attachments must not
                      exceed 5 MB.
                    </span>
                  </div>
                )}

                <button
                  className="report-problem-form__submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting Report..."
                    : "Submit Problem Report"}

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
    </main>
  );
}