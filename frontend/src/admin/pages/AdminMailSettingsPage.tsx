import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiRefreshCw,
  FiSave,
  FiSend,
  FiServer,
  FiSettings,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  getMailSettings,
  sendTestMail,
  updateMailSettings,
  verifyMailConnection,
} from "../services/mailSettingsApi";

import type {
  UpdateMailSettingsPayload,
} from "../services/mailSettingsApi";

import "../styles/adminMailSettings.css";

interface MailFormState {
  enabled: boolean;

  smtpHost: string;
  smtpPort: string;
  smtpSecure: boolean;

  smtpUsername: string;
  smtpPassword: string;
  hasSmtpPassword: boolean;

  fromName: string;
  fromEmail: string;
  replyToEmail: string;
  adminEmail: string;

  businessPhone: string;
  whatsappNumber: string;
  websiteUrl: string;
  businessAddress: string;

  sendAdminEmail: boolean;
  sendCustomerAutoReply: boolean;
  sendWhatsappNotification: boolean;
}

const initialState:
  MailFormState = {
  enabled: false,

  smtpHost: "",
  smtpPort: "587",
  smtpSecure: false,

  smtpUsername: "",
  smtpPassword: "",
  hasSmtpPassword: false,

  fromName:
    "Private Chauffeur Melbourne",

  fromEmail: "",
  replyToEmail: "",
  adminEmail: "",

  businessPhone: "",
  whatsappNumber: "",

  websiteUrl:
    "https://privatechauffeurmelbourne.com.au",

  businessAddress: "",

  sendAdminEmail: true,
  sendCustomerAutoReply: true,
  sendWhatsappNotification: false,
};

export default function AdminMailSettingsPage() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState<MailFormState>(
      initialState,
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [verifying, setVerifying] =
    useState(false);

  const [
    sendingTest,
    setSendingTest,
  ] = useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    testEmail,
    setTestEmail,
  ] = useState("");

  /* =======================================================
     LOAD SETTINGS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadSettings =
      async () => {
        try {
          setLoading(true);

          const settings =
            await getMailSettings();

          if (!mounted) {
            return;
          }

          setForm({
            enabled:
              settings.enabled,

            smtpHost:
              settings.smtpHost,

            smtpPort:
              String(
                settings.smtpPort ||
                  587,
              ),

            smtpSecure:
              settings.smtpSecure,

            smtpUsername:
              settings.smtpUsername,

            smtpPassword: "",

            hasSmtpPassword:
              settings.hasSmtpPassword,

            fromName:
              settings.fromName,

            fromEmail:
              settings.fromEmail,

            replyToEmail:
              settings.replyToEmail,

            adminEmail:
              settings.adminEmail,

            businessPhone:
              settings.businessPhone,

            whatsappNumber:
              settings.whatsappNumber,

            websiteUrl:
              settings.websiteUrl,

            businessAddress:
              settings.businessAddress,

            sendAdminEmail:
              settings.sendAdminEmail,

            sendCustomerAutoReply:
              settings.sendCustomerAutoReply,

            sendWhatsappNotification:
              settings.sendWhatsappNotification,
          });

          setTestEmail(
            settings.adminEmail ||
              settings.fromEmail ||
              "",
          );
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Unable to load mail settings.";

          toast.error(message);

          if (
            message
              .toLowerCase()
              .includes("session")
          ) {
            navigate(
              "/admin/login",
              {
                replace: true,
              },
            );
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  const updateField = <
    K extends keyof MailFormState,
  >(
    key: K,
    value:
      MailFormState[K],
  ) => {
    setForm((current) => ({
      ...current,

      [key]: value,
    }));
  };

  /* =======================================================
     VALIDATE
  ======================================================= */

  const validateForm = () => {
    if (
      !form.smtpHost.trim()
    ) {
      toast.error(
        "SMTP host is required.",
      );

      return false;
    }

    const port =
      Number(form.smtpPort);

    if (
      !Number.isInteger(
        port,
      ) ||
      port < 1 ||
      port > 65535
    ) {
      toast.error(
        "Enter a valid SMTP port.",
      );

      return false;
    }

    if (
      !form.smtpUsername.trim()
    ) {
      toast.error(
        "SMTP username is required.",
      );

      return false;
    }

    if (
      !form.hasSmtpPassword &&
      !form.smtpPassword.trim()
    ) {
      toast.error(
        "SMTP password is required.",
      );

      return false;
    }

    if (
      !form.fromEmail.trim()
    ) {
      toast.error(
        "From email is required.",
      );

      return false;
    }

    if (
      form.sendAdminEmail &&
      !form.adminEmail.trim()
    ) {
      toast.error(
        "Admin recipient email is required when admin email notifications are enabled.",
      );

      return false;
    }

    if (
      form.sendWhatsappNotification &&
      !form.whatsappNumber.trim()
    ) {
      toast.error(
        "WhatsApp number is required when WhatsApp notifications are enabled.",
      );

      return false;
    }

    return true;
  };

  /* =======================================================
     BUILD PAYLOAD
  ======================================================= */

  const buildPayload =
    (): UpdateMailSettingsPayload => {
      const payload:
        UpdateMailSettingsPayload = {
        enabled:
          form.enabled,

        smtpHost:
          form.smtpHost.trim(),

        smtpPort:
          Number(
            form.smtpPort,
          ),

        smtpSecure:
          form.smtpSecure,

        smtpUsername:
          form.smtpUsername.trim(),

        fromName:
          form.fromName.trim(),

        fromEmail:
          form.fromEmail.trim(),

        replyToEmail:
          form.replyToEmail.trim(),

        adminEmail:
          form.adminEmail.trim(),

        businessPhone:
          form.businessPhone.trim(),

        whatsappNumber:
          form.whatsappNumber.trim(),

        websiteUrl:
          form.websiteUrl.trim(),

        businessAddress:
          form.businessAddress.trim(),

        sendAdminEmail:
          form.sendAdminEmail,

        sendCustomerAutoReply:
          form.sendCustomerAutoReply,

        sendWhatsappNotification:
          form.sendWhatsappNotification,
      };

      if (
        form.smtpPassword.trim()
      ) {
        payload.smtpPassword =
          form.smtpPassword;
      }

      return payload;
    };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async (
    event:
      FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const updated =
        await updateMailSettings(
          buildPayload(),
        );

      setForm((current) => ({
        ...current,

        smtpPassword: "",

        hasSmtpPassword:
          updated.hasSmtpPassword,
      }));

      toast.success(
        "Mail and business settings saved successfully.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to save settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     VERIFY SMTP
  ======================================================= */

  const handleVerify =
    async () => {
      if (!validateForm()) {
        return;
      }

      try {
        setVerifying(true);

        const updated =
          await updateMailSettings(
            buildPayload(),
          );

        const result =
          await verifyMailConnection();

        setForm(
          (current) => ({
            ...current,

            smtpPassword: "",

            hasSmtpPassword:
              updated.hasSmtpPassword,
          }),
        );

        toast.success(
          result.message,
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "SMTP verification failed.",
        );
      } finally {
        setVerifying(false);
      }
    };

  /* =======================================================
     SEND TEST
  ======================================================= */

  const handleSendTest =
    async () => {
      if (
        !testEmail.trim()
      ) {
        toast.error(
          "Enter a test recipient email.",
        );

        return;
      }

      if (!validateForm()) {
        return;
      }

      try {
        setSendingTest(true);

        const updated =
          await updateMailSettings(
            buildPayload(),
          );

        const result =
          await sendTestMail(
            testEmail.trim(),
          );

        setForm(
          (current) => ({
            ...current,

            smtpPassword: "",

            hasSmtpPassword:
              updated.hasSmtpPassword,
          }),
        );

        toast.success(
          result.message,
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to send test email.",
        );
      } finally {
        setSendingTest(false);
      }
    };

  if (loading) {
    return (
      <div className="admin-mail-settings__loading">
        <span />

        <p>
          Loading mail settings...
        </p>
      </div>
    );
  }

  return (
    <div className="admin-mail-settings">
      {/* ===================================================
          HEADING
      =================================================== */}

      <div className="admin-page-heading">
        <div>
          <span>
            Website Notifications
          </span>

          <h1>
            Mail & Business Settings
          </h1>

          <p>
            Configure SMTP, customer
            notifications, business
            contact details and lead
            delivery preferences.
          </p>
        </div>

        <div className="admin-mail-settings__status">
          <span
            className={
              form.enabled
                ? "admin-mail-settings__status-dot admin-mail-settings__status-dot--active"
                : "admin-mail-settings__status-dot"
            }
          />

          {form.enabled
            ? "Mail Sending Enabled"
            : "Mail Sending Disabled"}
        </div>
      </div>

      <form
        className="admin-mail-settings__form"
        onSubmit={handleSave}
      >
        {/* =================================================
            SERVICE ENABLE
        ================================================= */}

        <section className="admin-mail-settings__card">
          <div className="admin-mail-settings__card-heading">
            <div>
              <span>
                Mail Service
              </span>

              <h2>
                Enable Website Email
              </h2>

              <p>
                Control whether the
                website can send quote,
                enquiry and system
                emails.
              </p>
            </div>

            <label className="admin-mail-settings__switch">
              <input
                type="checkbox"
                checked={
                  form.enabled
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "enabled",
                    event.target
                      .checked,
                  )
                }
              />

              <span />
            </label>
          </div>
        </section>

        {/* =================================================
            SMTP
        ================================================= */}

        <section className="admin-mail-settings__card">
          <div className="admin-mail-settings__section-heading">
            <span className="admin-mail-settings__icon">
              <FiServer />
            </span>

            <div>
              <span>
                SMTP Configuration
              </span>

              <h2>
                Mail Server
              </h2>

              <p>
                Enter the SMTP
                credentials used by
                Nodemailer.
              </p>
            </div>
          </div>

          <div className="admin-mail-settings__grid">
            <label className="admin-mail-settings__field admin-mail-settings__field--full">
              <span>
                SMTP Host *
              </span>

              <input
                type="text"
                value={
                  form.smtpHost
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "smtpHost",
                    event.target
                      .value,
                  )
                }
                placeholder="smtp.gmail.com"
              />
            </label>

            <label className="admin-mail-settings__field">
              <span>
                SMTP Port *
              </span>

              <input
                type="number"
                min="1"
                max="65535"
                value={
                  form.smtpPort
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "smtpPort",
                    event.target
                      .value,
                  )
                }
              />
            </label>

            <label className="admin-mail-settings__checkbox-card">
              <input
                type="checkbox"
                checked={
                  form.smtpSecure
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "smtpSecure",
                    event.target
                      .checked,
                  )
                }
              />

              <div>
                <strong>
                  Secure Connection
                </strong>

                <span>
                  Enable when your
                  provider requires
                  direct SSL/TLS.
                </span>
              </div>
            </label>

            <label className="admin-mail-settings__field admin-mail-settings__field--full">
              <span>
                SMTP Username *
              </span>

              <input
                type="text"
                value={
                  form.smtpUsername
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "smtpUsername",
                    event.target
                      .value,
                  )
                }
                autoComplete="username"
              />
            </label>

            <label className="admin-mail-settings__field admin-mail-settings__field--full">
              <span>
                SMTP Password
              </span>

              <div className="admin-mail-settings__password">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    form.smtpPassword
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "smtpPassword",
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    form.hasSmtpPassword
                      ? "Stored securely — enter only to replace"
                      : "Enter SMTP password"
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current,
                    )
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {form.hasSmtpPassword && (
                <small className="admin-mail-settings__saved-password">
                  <FiCheckCircle />
                  Password already
                  stored.
                </small>
              )}
            </label>
          </div>
        </section>

        {/* =================================================
            BUSINESS CONTACT DETAILS
        ================================================= */}

        <section className="admin-mail-settings__card">
          <div className="admin-mail-settings__section-heading">
            <span className="admin-mail-settings__icon">
              <FiGlobe />
            </span>

            <div>
              <span>
                Business Details
              </span>

              <h2>
                Customer Contact
              </h2>

              <p>
                These details will be
                used in customer email
                CTAs and email footers.
              </p>
            </div>
          </div>

          <div className="admin-mail-settings__grid">
            <label className="admin-mail-settings__field">
              <span>
                Business Phone
              </span>

              <div className="admin-mail-settings__field-icon">
                <FiPhone />

                <input
                  type="text"
                  value={
                    form.businessPhone
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "businessPhone",
                      event.target
                        .value,
                    )
                  }
                  placeholder="+61..."
                />
              </div>
            </label>

            <label className="admin-mail-settings__field">
              <span>
                WhatsApp Number
              </span>

              <div className="admin-mail-settings__field-icon">
                <FiMessageCircle />

                <input
                  type="text"
                  value={
                    form.whatsappNumber
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "whatsappNumber",
                      event.target
                        .value,
                    )
                  }
                  placeholder="+61..."
                />
              </div>
            </label>

            <label className="admin-mail-settings__field admin-mail-settings__field--full">
              <span>
                Website URL
              </span>

              <div className="admin-mail-settings__field-icon">
                <FiGlobe />

                <input
                  type="url"
                  value={
                    form.websiteUrl
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "websiteUrl",
                      event.target
                        .value,
                    )
                  }
                  placeholder="https://privatechauffeurmelbourne.com.au"
                />
              </div>
            </label>

            <label className="admin-mail-settings__field admin-mail-settings__field--full">
              <span>
                Business Address
              </span>

              <div className="admin-mail-settings__field-icon">
                <FiMapPin />

                <input
                  type="text"
                  value={
                    form.businessAddress
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "businessAddress",
                      event.target
                        .value,
                    )
                  }
                  placeholder="Melbourne, Victoria, Australia"
                />
              </div>
            </label>
          </div>
        </section>

        {/* =================================================
            EMAIL DETAILS
        ================================================= */}

        <section className="admin-mail-settings__card">
          <div className="admin-mail-settings__section-heading">
            <span className="admin-mail-settings__icon">
              <FiMail />
            </span>

            <div>
              <span>
                Sender Details
              </span>

              <h2>
                Website Sender
              </h2>

              <p>
                Configure the sender
                and destination used
                for website emails.
              </p>
            </div>
          </div>

          <div className="admin-mail-settings__grid">
            <label className="admin-mail-settings__field">
              <span>
                From Name
              </span>

              <input
                type="text"
                value={
                  form.fromName
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "fromName",
                    event.target
                      .value,
                  )
                }
              />
            </label>

            <label className="admin-mail-settings__field">
              <span>
                From Email *
              </span>

              <input
                type="email"
                value={
                  form.fromEmail
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "fromEmail",
                    event.target
                      .value,
                  )
                }
              />
            </label>

            <label className="admin-mail-settings__field">
              <span>
                Reply-To Email
              </span>

              <input
                type="email"
                value={
                  form.replyToEmail
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "replyToEmail",
                    event.target
                      .value,
                  )
                }
              />
            </label>

            <label className="admin-mail-settings__field">
              <span>
                Admin Recipient Email
              </span>

              <input
                type="email"
                value={
                  form.adminEmail
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "adminEmail",
                    event.target
                      .value,
                  )
                }
              />
            </label>
          </div>
        </section>

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <section className="admin-mail-settings__card">
          <div className="admin-mail-settings__section-heading">
            <span className="admin-mail-settings__icon">
              <FiSettings />
            </span>

            <div>
              <span>
                Lead Delivery
              </span>

              <h2>
                Notification Controls
              </h2>

              <p>
                Choose which
                notifications should
                run when a customer
                submits a website
                enquiry.
              </p>
            </div>
          </div>

          <div className="admin-mail-settings__notification-list">
            <label className="admin-mail-settings__notification">
              <div>
                <FiMail />

                <span>
                  <strong>
                    Admin Email
                  </strong>

                  <small>
                    Send full lead
                    details to the admin
                    recipient email.
                  </small>
                </span>
              </div>

              <input
                type="checkbox"
                checked={
                  form.sendAdminEmail
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "sendAdminEmail",
                    event.target
                      .checked,
                  )
                }
              />
            </label>

            <label className="admin-mail-settings__notification">
              <div>
                <FiSend />

                <span>
                  <strong>
                    Customer Auto-Reply
                  </strong>

                  <small>
                    Send a branded
                    acknowledgement to
                    the customer.
                  </small>
                </span>
              </div>

              <input
                type="checkbox"
                checked={
                  form.sendCustomerAutoReply
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "sendCustomerAutoReply",
                    event.target
                      .checked,
                  )
                }
              />
            </label>

            <label className="admin-mail-settings__notification">
              <div>
                <FiMessageCircle />

                <span>
                  <strong>
                    WhatsApp Lead
                    Notification
                  </strong>

                  <small>
                    Deliver the enquiry
                    to the configured
                    WhatsApp business
                    number when API
                    integration is
                    enabled.
                  </small>
                </span>
              </div>

              <input
                type="checkbox"
                checked={
                  form.sendWhatsappNotification
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "sendWhatsappNotification",
                    event.target
                      .checked,
                  )
                }
              />
            </label>
          </div>
        </section>

        {/* =================================================
            TEST
        ================================================= */}

        <section className="admin-mail-settings__card">
          <div className="admin-mail-settings__section-heading">
            <span className="admin-mail-settings__icon">
              <FiSend />
            </span>

            <div>
              <span>
                Testing
              </span>

              <h2>
                Verify Email Setup
              </h2>
            </div>
          </div>

          <div className="admin-mail-settings__test">
            <label className="admin-mail-settings__field">
              <span>
                Test Recipient
              </span>

              <input
                type="email"
                value={
                  testEmail
                }
                onChange={(
                  event,
                ) =>
                  setTestEmail(
                    event.target
                      .value,
                  )
                }
              />
            </label>

            <div className="admin-mail-settings__test-actions">
              <button
                className="admin-mail-settings__verify"
                type="button"
                disabled={
                  verifying ||
                  saving ||
                  sendingTest
                }
                onClick={() =>
                  void handleVerify()
                }
              >
                <FiRefreshCw
                  className={
                    verifying
                      ? "admin-mail-settings__spin"
                      : ""
                  }
                />

                {verifying
                  ? "Verifying..."
                  : "Verify SMTP"}
              </button>

              <button
                className="admin-mail-settings__test-button"
                type="button"
                disabled={
                  sendingTest ||
                  saving ||
                  verifying
                }
                onClick={() =>
                  void handleSendTest()
                }
              >
                <FiSend />

                {sendingTest
                  ? "Sending..."
                  : "Send Test Email"}
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            SAVE
        ================================================= */}

        <div className="admin-mail-settings__save-bar">
          <div>
            <strong>
              Notification Settings
            </strong>

            <span>
              Save changes before
              leaving this page.
            </span>
          </div>

          <button
            type="submit"
            disabled={
              saving ||
              verifying ||
              sendingTest
            }
          >
            <FiSave />

            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}