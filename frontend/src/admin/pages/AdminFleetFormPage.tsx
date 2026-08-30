import {
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowUp,
  FiImage,
  FiPlus,
  FiSave,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import {
  addAdminFleetMedia,
  createAdminFleet,
  deleteAdminFleetMedia,
  getAdminFleetVehicle,
  orderAdminFleetMedia,
  updateAdminFleet,
} from "../services/fleetAdminApi";
import { uploadAdminMedia } from "../services/mediaUploadApi";
import type {
  FleetMedia,
  FleetMediaType,
  FleetPayload,
} from "../services/fleetAdminApi";

import "../styles/adminBlogForm.css";
import "../styles/adminFleet.css";

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const emptyFeature = () => ({
  title: "",
  description: "",
});

const emptyJourney = () => ({
  title: "",
});

const initialForm = (): FleetPayload => ({
  name: "",
  slug: "",
  category: "",
  heroDescription: "",
  description: "",
  coverImage: "",
  passengers: 4,
  largeBags: 2,
  cabinBags: 2,
  active: true,
  featured: false,
  displayOrder: 0,
  seoTitle: "",
  seoDescription: "",
  features: [emptyFeature()],
  recommendedJourneys: [emptyJourney()],
});

export default function AdminFleetFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicleId = useMemo(() => {
    const value = Number(id);
    return Number.isFinite(value) ? value : null;
  }, [id]);
  const isEditMode = vehicleId !== null;

  const [form, setForm] =
    useState<FleetPayload>(initialForm);
  const [media, setMedia] = useState<FleetMedia[]>([]);
  const [loading, setLoading] =
    useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] =
    useState(false);
  const [mediaType, setMediaType] =
    useState<FleetMediaType>("EXTERIOR");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAltText, setMediaAltText] =
    useState("");
  const [mediaSaving, setMediaSaving] =
    useState(false);
  const [mediaUploading, setMediaUploading] =
    useState(false);

  useEffect(() => {
    if (!vehicleId) {
      return;
    }
    const loadVehicle = async () => {
      try {
        const vehicle = await getAdminFleetVehicle(
          vehicleId,
        );
        setForm({
          name: vehicle.name,
          slug: vehicle.slug,
          category: vehicle.category,
          heroDescription:
            vehicle.heroDescription,
          description: vehicle.description,
          coverImage: vehicle.coverImage ?? "",
          passengers: vehicle.passengers,
          largeBags: vehicle.largeBags,
          cabinBags: vehicle.cabinBags,
          active: vehicle.active,
          featured: vehicle.featured,
          displayOrder: vehicle.displayOrder,
          seoTitle: vehicle.seoTitle,
          seoDescription: vehicle.seoDescription,
          features:
            vehicle.features.length > 0
              ? vehicle.features.map(
                ({ title, description }) => ({
                  title,
                  description,
                }),
              )
              : [emptyFeature()],
          recommendedJourneys:
            vehicle.journeys.length > 0
              ? vehicle.journeys.map(({ title }) => ({
                title,
              }))
              : [emptyJourney()],
        });
        setMedia(vehicle.media);
        setSlugTouched(true);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load vehicle.",
        );
        navigate("/admin/fleet", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    void loadVehicle();
  }, [navigate, vehicleId]);

  const update = <K extends keyof FleetPayload>(
    key: K,
    value: FleetPayload[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updateFeature = (
    index: number,
    key: "title" | "description",
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      features: current.features.map(
        (feature, featureIndex) =>
          featureIndex === index
            ? { ...feature, [key]: value }
            : feature,
      ),
    }));
  };

  const updateJourney = (
    index: number,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      recommendedJourneys:
        current.recommendedJourneys.map(
          (journey, journeyIndex) =>
            journeyIndex === index
              ? { title: value }
              : journey,
        ),
    }));
  };

  const submit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const payload: FleetPayload = {
      ...form,
      name: form.name.trim(),
      slug: slugify(form.slug),
      category: form.category.trim(),
      heroDescription: form.heroDescription.trim(),
      description: form.description.trim(),
      coverImage: form.coverImage?.trim(),
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
      features: form.features.filter(
        (item) =>
          item.title.trim() &&
          item.description.trim(),
      ),
      recommendedJourneys:
        form.recommendedJourneys.filter((item) =>
          item.title.trim(),
        ),
    };
    if (
      !payload.name ||
      !payload.slug ||
      !payload.category ||
      !payload.heroDescription ||
      !payload.description ||
      !payload.seoTitle ||
      !payload.seoDescription
    ) {
      toast.error(
        "Please complete all required fleet and SEO fields.",
      );
      return;
    }
    try {
      setSaving(true);
      const saved = isEditMode
        ? await updateAdminFleet(vehicleId, payload)
        : await createAdminFleet(payload);
      toast.success(
        isEditMode
          ? "Fleet vehicle updated."
          : "Fleet vehicle created. Add its media next.",
      );
      if (!isEditMode) {
        navigate("/admin/fleet/" + saved.id + "/edit", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to save vehicle.",
      );
    } finally {
      setSaving(false);
    }
  };

  const addMedia = async () => {
    if (!vehicleId || !mediaUrl.trim()) {
      toast.error(
        "Save the vehicle first, then enter a media URL.",
      );
      return;
    }
    try {
      setMediaSaving(true);
      const added = await addAdminFleetMedia(
        vehicleId,
        {
          type: mediaType,
          url: mediaUrl.trim(),
          altText: mediaAltText.trim(),
          displayOrder: media.length,
        },
      );
      setMedia((current) => [...current, added]);
      if (mediaType === "COVER") {
        update("coverImage", added.url);
      }
      setMediaUrl("");
      setMediaAltText("");
      toast.success("Media added.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to add media.",
      );
    } finally {
      setMediaSaving(false);
    }
  };

  const removeMedia = async (item: FleetMedia) => {
    if (!vehicleId || !window.confirm("Remove this media item?")) {
      return;
    }
    try {
      await deleteAdminFleetMedia(vehicleId, item.id);
      setMedia((current) =>
        current.filter((mediaItem) =>
          mediaItem.id !== item.id,
        ),
      );
      toast.success("Media removed.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to remove media.",
      );
    }
  };

  const uploadMedia = async (file?: File) => {
    if (!file) return;
    try {
      setMediaUploading(true);
      const url = await uploadAdminMedia(file);
      setMediaUrl(url);
      if (!mediaAltText && mediaType !== "VIDEO") {
        setMediaAltText(
          `${form.name || "Chauffeur vehicle"} ${mediaType.toLowerCase()}`,
        );
      }
      toast.success("Upload complete. Click Add media to save it.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setMediaUploading(false);
    }
  };

  const moveMedia = async (index: number, direction: -1 | 1) => {
    if (!vehicleId) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= media.length) return;
    const previous = media;
    const reordered = [...media];
    [reordered[index], reordered[nextIndex]] = [
      reordered[nextIndex],
      reordered[index],
    ];
    setMedia(reordered);
    try {
      setMedia(
        await orderAdminFleetMedia(
          vehicleId,
          reordered.map((item) => item.id),
        ),
      );
    } catch (error) {
      setMedia(previous);
      toast.error(error instanceof Error ? error.message : "Unable to reorder media.");
    }
  };

  if (loading) {
    return <p>Loading fleet vehicle…</p>;
  }

  return (
    <div className="admin-blog-form-page">
      <div className="admin-page-heading">
        <div>
          <span>Fleet CMS</span>
          <h1>
            {isEditMode
              ? "Edit fleet vehicle"
              : "Add fleet vehicle"}
          </h1>
          <p>
            Only add approved chauffeur fleet
            vehicles.
          </p>
        </div>
        <Link
          className="admin-blog-form__back"
          to="/admin/fleet"
        >
          <FiArrowLeft />
          Back to Fleet
        </Link>
      </div>

      <form
        className="admin-blog-form"
        onSubmit={submit}
      >
        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading">
            <span>Vehicle details</span>
            <h2>Core information</h2>
          </div>
          <div className="admin-blog-form__grid">
            <label className="admin-blog-form__field">
              <span>Name *</span>
              <input
                value={form.name}
                onChange={(event) => {
                  const name = event.target.value;
                  update("name", name);
                  if (!slugTouched) {
                    update("slug", slugify(name));
                  }
                  if (!form.seoTitle) {
                    update("seoTitle", name);
                  }
                }}
              />
            </label>
            <label className="admin-blog-form__field">
              <span>Slug *</span>
              <input
                value={form.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  update("slug", slugify(event.target.value));
                }}
              />
            </label>
            <label className="admin-blog-form__field">
              <span>Category *</span>
              <input
                value={form.category}
                onChange={(event) =>
                  update("category", event.target.value)
                }
                placeholder="e.g. Luxury SUV"
              />
            </label>
            <label className="admin-blog-form__field">
              <span>Display order</span>
              <input
                type="number"
                min="0"
                value={form.displayOrder}
                onChange={(event) =>
                  update(
                    "displayOrder",
                    Number(event.target.value),
                  )
                }
              />
            </label>
            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>Hero description *</span>
              <textarea
                value={form.heroDescription}
                onChange={(event) =>
                  update(
                    "heroDescription",
                    event.target.value,
                  )
                }
              />
            </label>
            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>Full description *</span>
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
            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>Main / cover image URL</span>
              <input
                type="url"
                value={form.coverImage}
                onChange={(event) =>
                  update(
                    "coverImage",
                    event.target.value,
                  )
                }
                placeholder="Persistent image URL"
              />
            </label>
          </div>
        </section>

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading">
            <span>Capacity and visibility</span>
            <h2>Vehicle settings</h2>
          </div>
          <div className="admin-blog-form__grid">
            {[
              ["passengers", "Passengers"],
              ["largeBags", "Large bags"],
              ["cabinBags", "Cabin bags"],
            ].map(([key, label]) => (
              <label
                className="admin-blog-form__field"
                key={key}
              >
                <span>{label}</span>
                <input
                  type="number"
                  min="0"
                  value={
                    form[
                      key as
                        | "passengers"
                        | "largeBags"
                        | "cabinBags"
                    ]
                  }
                  onChange={(event) =>
                    update(
                      key as
                        | "passengers"
                        | "largeBags"
                        | "cabinBags",
                      Number(event.target.value),
                    )
                  }
                />
              </label>
            ))}
            <label className="admin-fleet__check">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) =>
                  update("active", event.target.checked)
                }
              />
              Active on public website
            </label>
            <label className="admin-fleet__check">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  update("featured", event.target.checked)
                }
              />
              Featured vehicle
            </label>
          </div>
        </section>

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading admin-blog-form__card-heading--action">
            <div>
              <span>Highlights</span>
              <h2>Vehicle features</h2>
            </div>
            <button
              type="button"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  features: [
                    ...current.features,
                    emptyFeature(),
                  ],
                }))
              }
            >
              <FiPlus /> Add feature
            </button>
          </div>
          <div className="admin-fleet__repeat-list">
            {form.features.map((feature, index) => (
              <div
                className="admin-fleet__repeat-card"
                key={index}
              >
                <input
                  value={feature.title}
                  placeholder="Feature title"
                  onChange={(event) =>
                    updateFeature(
                      index,
                      "title",
                      event.target.value,
                    )
                  }
                />
                <textarea
                  value={feature.description}
                  placeholder="Feature description"
                  onChange={(event) =>
                    updateFeature(
                      index,
                      "description",
                      event.target.value,
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      features: current.features.filter(
                        (_, itemIndex) =>
                          itemIndex !== index,
                      ),
                    }))
                  }
                  disabled={form.features.length === 1}
                  aria-label="Remove feature"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading admin-blog-form__card-heading--action">
            <div>
              <span>Suggested uses</span>
              <h2>Recommended journeys</h2>
            </div>
            <button
              type="button"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  recommendedJourneys: [
                    ...current.recommendedJourneys,
                    emptyJourney(),
                  ],
                }))
              }
            >
              <FiPlus /> Add journey
            </button>
          </div>
          <div className="admin-fleet__journeys">
            {form.recommendedJourneys.map(
              (journey, index) => (
                <div key={index}>
                  <input
                    value={journey.title}
                    placeholder="e.g. Melbourne Airport transfer"
                    onChange={(event) =>
                      updateJourney(
                        index,
                        event.target.value,
                      )
                    }
                  />
                  <button
                    type="button"
                    disabled={
                      form.recommendedJourneys
                        .length === 1
                    }
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        recommendedJourneys:
                          current.recommendedJourneys.filter(
                            (_, itemIndex) =>
                              itemIndex !== index,
                          ),
                      }))
                    }
                    aria-label="Remove journey"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading">
            <span>Search visibility</span>
            <h2>SEO details</h2>
          </div>
          <div className="admin-blog-form__grid">
            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>SEO meta title *</span>
              <input
                value={form.seoTitle}
                onChange={(event) =>
                  update("seoTitle", event.target.value)
                }
              />
            </label>
            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>SEO meta description *</span>
              <textarea
                value={form.seoDescription}
                onChange={(event) =>
                  update(
                    "seoDescription",
                    event.target.value,
                  )
                }
              />
            </label>
          </div>
        </section>

        <section className="admin-blog-form__card">
            <div className="admin-blog-form__card-heading">
              <span>Fleet media</span>
              <h2>Exterior, interior and video</h2>
              <p>
                Add URLs from your persistent media
                storage. Files are not stored on Vercel
                or in the database.
              </p>
            </div>
            {!isEditMode && (
              <div className="admin-fleet__media-notice">
                <strong>Create the vehicle first</strong>
                <p>
                  Complete the required vehicle and SEO details,
                  then click “Create vehicle &amp; add media”. The
                  media controls will become available after the
                  vehicle has been created.
                </p>
              </div>
            )}
            <div className="admin-fleet__media-add">
              <select
                disabled={!isEditMode}
                value={mediaType}
                onChange={(event) =>
                  setMediaType(
                    event.target.value as FleetMediaType,
                  )
                }
              >
                <option value="COVER">Cover image</option>
                <option value="EXTERIOR">Exterior image</option>
                <option value="INTERIOR">Interior image</option>
                <option value="VIDEO">Video</option>
              </select>
              <input
                type="url"
                disabled={!isEditMode}
                value={mediaUrl}
                onChange={(event) =>
                  setMediaUrl(event.target.value)
                }
                placeholder="Media URL"
              />
              <label className="admin-fleet__upload-button">
                <FiUploadCloud />
                {mediaUploading ? "Uploading…" : "Upload file"}
                <input
                  type="file"
                  accept={mediaType === "VIDEO" ? "video/*" : "image/*"}
                  disabled={!isEditMode || mediaUploading || mediaSaving}
                  onChange={(event) => {
                    void uploadMedia(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </label>
              <input
                disabled={!isEditMode}
                value={mediaAltText}
                onChange={(event) =>
                  setMediaAltText(event.target.value)
                }
                placeholder="Alt text (optional)"
              />
              <button
                type="button"
                onClick={() => void addMedia()}
                disabled={!isEditMode || mediaSaving || mediaUploading}
              >
                <FiPlus /> Add media
              </button>
            </div>
            <div className="admin-fleet__media-list">
              {media.length === 0 ? (
                <p>No media added yet.</p>
              ) : (
                media.map((item, index) => (
                  <article key={item.id}>
                    {item.type === "VIDEO" ? (
                      <FiImage />
                    ) : (
                      <img src={item.url} alt="" />
                    )}
                    <div>
                      <strong>{item.type}</strong>
                      <span>{item.altText || item.url}</span>
                    </div>
                    <div className="admin-fleet__media-actions">
                      <button type="button" disabled={index === 0} onClick={() => void moveMedia(index, -1)} aria-label="Move media up"><FiArrowUp /></button>
                      <button type="button" disabled={index === media.length - 1} onClick={() => void moveMedia(index, 1)} aria-label="Move media down"><FiArrowDown /></button>
                      <button type="button" onClick={() => void removeMedia(item)} aria-label="Remove media"><FiTrash2 /></button>
                    </div>
                  </article>
                ))
              )}
            </div>
        </section>

        <div className="admin-blog-form__footer">
          <Link to="/admin/fleet">Cancel</Link>
          <button
            className="admin-primary-button"
            type="submit"
            disabled={saving}
          >
            <FiSave />
            {saving
              ? "Saving…"
              : isEditMode
                ? "Save vehicle"
                : "Create vehicle & add media"}
          </button>
        </div>
      </form>
    </div>
  );
}
