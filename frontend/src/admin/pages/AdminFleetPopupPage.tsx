import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  FiClock,
  FiImage,
  FiSave,
  FiSettings,
  FiUploadCloud,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  getAdminFleet,
  getFleetPopupSettings,
  updateFleetPopupSettings,
} from "../services/fleetAdminApi";
import { uploadAdminMedia } from "../services/mediaUploadApi";
import type {
  AdminFleetVehicle,
  FleetPopupSettings,
} from "../services/fleetAdminApi";

import "../styles/adminFleet.css";

interface PopupForm {
  enabled: boolean;
  fleetVehicleId: string;
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  video: string;
  ctaText: string;
  ctaLink: string;
  showDelay: string;
  displayDuration: string;
  oncePerSession: boolean;
}

const initialState: PopupForm = {
  enabled: false,
  fleetVehicleId: "",
  eyebrow: "DISCOVER OUR FLEET",
  heading: "",
  description: "",
  image: "",
  video: "",
  ctaText: "Explore vehicle",
  ctaLink: "",
  showDelay: "5000",
  displayDuration: "7000",
  oncePerSession: true,
};

const toForm = (
  settings: FleetPopupSettings,
): PopupForm => ({
  enabled: settings.enabled,
  fleetVehicleId:
    settings.fleetVehicleId === null
      ? ""
      : String(settings.fleetVehicleId),
  eyebrow: settings.eyebrow ?? "",
  heading: settings.heading ?? "",
  description: settings.description ?? "",
  image: settings.image ?? "",
  video: settings.video ?? "",
  ctaText: settings.ctaText ?? "",
  ctaLink: settings.ctaLink ?? "",
  showDelay: String(settings.showDelay),
  displayDuration: String(settings.displayDuration),
  oncePerSession: settings.oncePerSession,
});

export default function AdminFleetPopupPage() {
  const navigate = useNavigate();
  const [form, setForm] =
    useState<PopupForm>(initialState);
  const [fleet, setFleet] = useState<
    AdminFleetVehicle[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<
    "image" | "video" | null
  >(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [settings, vehicles] = await Promise.all([
          getFleetPopupSettings(),
          getAdminFleet(),
        ]);
        setForm(toForm(settings));
        setFleet(vehicles);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load popup settings.";
        toast.error(message);
        if (message.toLowerCase().includes("session")) {
          navigate("/admin/login", {
            replace: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [navigate]);

  const update = <K extends keyof PopupForm>(
    key: K,
    value: PopupForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updateFleetPopupSettings({
        enabled: form.enabled,
        fleetVehicleId: form.fleetVehicleId
          ? Number(form.fleetVehicleId)
          : null,
        eyebrow: form.eyebrow.trim() || null,
        heading: form.heading.trim() || null,
        description:
          form.description.trim() || null,
        image: form.image.trim() || null,
        video: form.video.trim() || null,
        ctaText: form.ctaText.trim() || null,
        ctaLink: form.ctaLink.trim() || null,
        showDelay: Number(form.showDelay),
        displayDuration:
          Number(form.displayDuration),
        oncePerSession: form.oncePerSession,
      });
      toast.success("Fleet popup settings saved.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to save popup settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  const uploadPopupMedia = async (
    kind: "image" | "video",
    file?: File,
  ) => {
    if (!file) return;
    try {
      setUploading(kind);
      const url = await uploadAdminMedia(
        file,
        "private-chauffeur/fleet-popup",
      );
      update(kind, url);
      toast.success(`Popup ${kind} uploaded.`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Upload failed.",
      );
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return <p>Loading popup settings…</p>;
  }

  return (
    <div className="admin-fleet-popup">
      <div className="admin-page-heading">
        <div>
          <span>Fleet CMS</span>
          <h1>Fleet promo popup</h1>
          <p>
            Control the optional public fleet popup
            without changing code.
          </p>
        </div>
      </div>
      <form
        className="admin-fleet-popup__form"
        onSubmit={submit}
      >
        <section className="admin-fleet-popup__card">
          <div className="admin-fleet-popup__card-heading">
            <FiSettings />
            <div>
              <span>Display controls</span>
              <h2>Popup behaviour</h2>
            </div>
          </div>
          <label className="admin-fleet__check">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(event) =>
                update("enabled", event.target.checked)
              }
            />
            Enable fleet promo popup
          </label>
          <label className="admin-fleet-popup__field">
            <span>Active fleet vehicle</span>
            <select
              value={form.fleetVehicleId}
              onChange={(event) =>
                update(
                  "fleetVehicleId",
                  event.target.value,
                )
              }
            >
              <option value="">
                Select fleet vehicle
              </option>
              {fleet
                .filter((vehicle) => vehicle.active)
                .map((vehicle) => (
                <option
                  key={vehicle.id}
                  value={vehicle.id}
                >
                  {vehicle.name}
                  {vehicle.active ? "" : " (inactive)"}
                </option>
                ))}
            </select>
          </label>
          <div className="admin-fleet-popup__timing">
            <label className="admin-fleet-popup__field">
              <span>
                <FiClock /> Show delay (milliseconds)
              </span>
              <input
                type="number"
                min="0"
                value={form.showDelay}
                onChange={(event) =>
                  update(
                    "showDelay",
                    event.target.value,
                  )
                }
              />
            </label>
            <label className="admin-fleet-popup__field">
              <span>
                <FiClock /> Display duration (milliseconds)
              </span>
              <input
                type="number"
                min="0"
                value={form.displayDuration}
                onChange={(event) =>
                  update(
                    "displayDuration",
                    event.target.value,
                  )
                }
              />
            </label>
          </div>
          <label className="admin-fleet__check">
            <input
              type="checkbox"
              checked={form.oncePerSession}
              onChange={(event) =>
                update(
                  "oncePerSession",
                  event.target.checked,
                )
              }
            />
            Show only once per browser session
          </label>
        </section>

        <section className="admin-fleet-popup__card">
          <div className="admin-fleet-popup__card-heading">
            <FiImage />
            <div>
              <span>Popup content</span>
              <h2>Message and media</h2>
            </div>
          </div>
          <div className="admin-fleet-popup__grid">
            <label className="admin-fleet-popup__field">
              <span>Eyebrow</span>
              <input
                value={form.eyebrow}
                onChange={(event) =>
                  update("eyebrow", event.target.value)
                }
              />
            </label>
            <label className="admin-fleet-popup__field">
              <span>CTA text</span>
              <input
                value={form.ctaText}
                onChange={(event) =>
                  update("ctaText", event.target.value)
                }
              />
            </label>
            <label className="admin-fleet-popup__field admin-fleet-popup__field--full">
              <span>Heading</span>
              <input
                value={form.heading}
                onChange={(event) =>
                  update("heading", event.target.value)
                }
              />
            </label>
            <label className="admin-fleet-popup__field admin-fleet-popup__field--full">
              <span>Description</span>
              <textarea
                value={form.description}
                onChange={(event) =>
                  update(
                    "description",
                    event.target.value,
                  )
                }
              />
            </label>
            <label className="admin-fleet-popup__field admin-fleet-popup__field--full">
              <span>Popup image URL</span>
              <input
                type="url"
                value={form.image}
                onChange={(event) =>
                  update("image", event.target.value)
                }
                placeholder="Optional persistent image URL"
              />
              <span className="admin-fleet-popup__upload">
                <FiUploadCloud />
                {uploading === "image" ? "Uploading…" : "Upload popup image"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading !== null}
                  onChange={(event) => {
                    void uploadPopupMedia("image", event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </span>
            </label>
            <label className="admin-fleet-popup__field admin-fleet-popup__field--full">
              <span>Popup video URL</span>
              <input
                type="url"
                value={form.video}
                onChange={(event) =>
                  update("video", event.target.value)
                }
                placeholder="Optional persistent video URL"
              />
              <span className="admin-fleet-popup__upload">
                <FiUploadCloud />
                {uploading === "video" ? "Uploading…" : "Upload popup video"}
                <input
                  type="file"
                  accept="video/*"
                  disabled={uploading !== null}
                  onChange={(event) => {
                    void uploadPopupMedia("video", event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </span>
            </label>
            <label className="admin-fleet-popup__field admin-fleet-popup__field--full">
              <span>CTA link</span>
              <input
                value={form.ctaLink}
                onChange={(event) =>
                  update("ctaLink", event.target.value)
                }
                placeholder="e.g. /fleet/bmw-x7"
              />
            </label>
          </div>
        </section>
        <button
          className="admin-primary-button"
          type="submit"
          disabled={saving}
        >
          <FiSave />
          {saving ? "Saving…" : "Save popup settings"}
        </button>
      </form>
    </div>
  );
}
