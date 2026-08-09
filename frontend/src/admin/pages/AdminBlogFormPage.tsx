import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  FiArrowLeft,
  FiPlus,
  FiSave,
  FiTrash2,
} from "react-icons/fi";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import {
  createAdminBlog,
  getAdminBlog,
  updateAdminBlog,
} from "../services/blogAdminApi";

import type {
  BlogFaq,
  BlogPayload,
  BlogSection,
  BlogStatus,
} from "../services/blogAdminApi";

import "../styles/adminBlogForm.css";

const createEmptySection = (): BlogSection => ({
  heading: "",
  paragraphs: [""],
  points: [],
});

const createEmptyFaq = (): BlogFaq => ({
  question: "",
  answer: "",
});

const createInitialForm = (): BlogPayload => ({
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  author: "Private Chauffeur Melbourne",
  publishedAt: "",
  readingTime: "5 min read",
  image: "",
  featured: false,
  status: "DRAFT",
  tags: [],
  seoTitle: "",
  seoDescription: "",
  sections: [createEmptySection()],
  faqs: [],
  relatedServiceSlugs: [],
  relatedFleetSlugs: [],
  relatedAreaSlugs: [],
});

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AdminBlogFormPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [form, setForm] =
    useState<BlogPayload>(
      createInitialForm(),
    );

  const [loading, setLoading] =
    useState(isEditMode);

  const [saving, setSaving] =
    useState(false);

  const [slugTouched, setSlugTouched] =
    useState(false);

  const [tagsInput, setTagsInput] =
    useState("");

  const [
    serviceSlugsInput,
    setServiceSlugsInput,
  ] = useState("");

  const [
    fleetSlugsInput,
    setFleetSlugsInput,
  ] = useState("");

  const [
    areaSlugsInput,
    setAreaSlugsInput,
  ] = useState("");

  const blogId = useMemo(() => {
    if (!id) {
      return null;
    }

    const parsed = Number(id);

    return Number.isFinite(parsed)
      ? parsed
      : null;
  }, [id]);

  /* =======================================================
     LOAD BLOG FOR EDIT
  ======================================================= */

  useEffect(() => {
    if (!isEditMode || !blogId) {
      return;
    }

    const loadBlog = async () => {
      try {
        setLoading(true);

        const blog =
          await getAdminBlog(blogId);

        setForm({
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          category: blog.category,
          author: blog.author,
          publishedAt:
            blog.publishedAt ?? "",
          readingTime:
            blog.readingTime,
          image: blog.image ?? "",
          featured: blog.featured,
          status: blog.status,
          tags: blog.tags ?? [],
          seoTitle: blog.seoTitle,
          seoDescription:
            blog.seoDescription,
          sections:
            blog.sections?.length > 0
              ? blog.sections
              : [createEmptySection()],
          faqs: blog.faqs ?? [],
          relatedServiceSlugs:
            blog.relatedServiceSlugs ??
            [],
          relatedFleetSlugs:
            blog.relatedFleetSlugs ??
            [],
          relatedAreaSlugs:
            blog.relatedAreaSlugs ??
            [],
        });

        setTagsInput(
          (blog.tags ?? []).join(", "),
        );

        setServiceSlugsInput(
          (
            blog.relatedServiceSlugs ??
            []
          ).join(", "),
        );

        setFleetSlugsInput(
          (
            blog.relatedFleetSlugs ??
            []
          ).join(", "),
        );

        setAreaSlugsInput(
          (
            blog.relatedAreaSlugs ??
            []
          ).join(", "),
        );

        setSlugTouched(true);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load blog.",
        );

        navigate("/admin/blogs", {
          replace: true,
        });
      } finally {
        setLoading(false);
      }
    };

    void loadBlog();
  }, [
    blogId,
    isEditMode,
    navigate,
  ]);

  /* =======================================================
     BASIC FIELD UPDATE
  ======================================================= */

  const updateField = <
    K extends keyof BlogPayload,
  >(
    key: K,
    value: BlogPayload[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleTitleChange = (
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugTouched
        ? current.slug
        : slugify(value),
      seoTitle:
        current.seoTitle ||
        value,
    }));
  };

  /* =======================================================
     SECTIONS
  ======================================================= */

  const updateSection = (
    index: number,
    updates: Partial<BlogSection>,
  ) => {
    setForm((current) => ({
      ...current,
      sections: current.sections.map(
        (section, sectionIndex) =>
          sectionIndex === index
            ? {
                ...section,
                ...updates,
              }
            : section,
      ),
    }));
  };

  const addSection = () => {
    setForm((current) => ({
      ...current,
      sections: [
        ...current.sections,
        createEmptySection(),
      ],
    }));
  };

  const removeSection = (
    index: number,
  ) => {
    setForm((current) => ({
      ...current,
      sections:
        current.sections.length === 1
          ? current.sections
          : current.sections.filter(
              (_, sectionIndex) =>
                sectionIndex !== index,
            ),
    }));
  };

  const updateParagraph = (
    sectionIndex: number,
    paragraphIndex: number,
    value: string,
  ) => {
    const section =
      form.sections[sectionIndex];

    const paragraphs =
      section.paragraphs.map(
        (paragraph, index) =>
          index === paragraphIndex
            ? value
            : paragraph,
      );

    updateSection(sectionIndex, {
      paragraphs,
    });
  };

  const addParagraph = (
    sectionIndex: number,
  ) => {
    const section =
      form.sections[sectionIndex];

    updateSection(sectionIndex, {
      paragraphs: [
        ...section.paragraphs,
        "",
      ],
    });
  };

  const removeParagraph = (
    sectionIndex: number,
    paragraphIndex: number,
  ) => {
    const section =
      form.sections[sectionIndex];

    if (
      section.paragraphs.length === 1
    ) {
      return;
    }

    updateSection(sectionIndex, {
      paragraphs:
        section.paragraphs.filter(
          (_, index) =>
            index !== paragraphIndex,
        ),
    });
  };

  const updatePoints = (
    sectionIndex: number,
    value: string,
  ) => {
    updateSection(sectionIndex, {
      points: value
        .split("\n")
        .map((point) => point.trim())
        .filter(Boolean),
    });
  };

  /* =======================================================
     FAQS
  ======================================================= */

  const addFaq = () => {
    setForm((current) => ({
      ...current,
      faqs: [
        ...current.faqs,
        createEmptyFaq(),
      ],
    }));
  };

  const updateFaq = (
    index: number,
    updates: Partial<BlogFaq>,
  ) => {
    setForm((current) => ({
      ...current,
      faqs: current.faqs.map(
        (faq, faqIndex) =>
          faqIndex === index
            ? {
                ...faq,
                ...updates,
              }
            : faq,
      ),
    }));
  };

  const removeFaq = (
    index: number,
  ) => {
    setForm((current) => ({
      ...current,
      faqs: current.faqs.filter(
        (_, faqIndex) =>
          faqIndex !== index,
      ),
    }));
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error(
        "Blog title is required.",
      );

      return;
    }

    if (!form.slug.trim()) {
      toast.error(
        "Blog slug is required.",
      );

      return;
    }

    if (!form.excerpt.trim()) {
      toast.error(
        "Blog excerpt is required.",
      );

      return;
    }

    if (!form.category.trim()) {
      toast.error(
        "Category is required.",
      );

      return;
    }

    if (!form.author.trim()) {
      toast.error(
        "Author is required.",
      );

      return;
    }

    if (!form.seoTitle.trim()) {
      toast.error(
        "SEO title is required.",
      );

      return;
    }

    if (
      !form.seoDescription.trim()
    ) {
      toast.error(
        "SEO description is required.",
      );

      return;
    }

    const payload: BlogPayload = {
      ...form,

      slug: slugify(form.slug),

      image:
        form.image?.trim() || "",

      publishedAt:
        form.publishedAt || undefined,

      tags: tagsInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      relatedServiceSlugs:
        serviceSlugsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

      relatedFleetSlugs:
        fleetSlugsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

      relatedAreaSlugs:
        areaSlugsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

      sections: form.sections.map(
        (section) => ({
          heading:
            section.heading.trim(),

          paragraphs:
            section.paragraphs
              .map((paragraph) =>
                paragraph.trim(),
              )
              .filter(Boolean),

          points:
            section.points?.filter(
              Boolean,
            ) ?? [],
        }),
      ),

      faqs: form.faqs
        .map((faq) => ({
          question:
            faq.question.trim(),

          answer:
            faq.answer.trim(),
        }))
        .filter(
          (faq) =>
            faq.question &&
            faq.answer,
        ),
    };

    try {
      setSaving(true);

      if (
        isEditMode &&
        blogId
      ) {
        await updateAdminBlog(
          blogId,
          payload,
        );

        toast.success(
          "Blog updated successfully.",
        );
      } else {
        await createAdminBlog(
          payload,
        );

        toast.success(
          "Blog created successfully.",
        );
      }

      navigate("/admin/blogs");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to save blog.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-blog-form__loading">
        <span />

        <p>
          Loading article...
        </p>
      </div>
    );
  }

  return (
    <div className="admin-blog-form-page">
      <div className="admin-page-heading">
        <div>
          <span>
            Blog CMS
          </span>

          <h1>
            {isEditMode
              ? "Edit Article"
              : "Add New Article"}
          </h1>

          <p>
            Manage article content,
            publishing, SEO and related
            chauffeur information.
          </p>
        </div>

        <Link
          className="admin-blog-form__back"
          to="/admin/blogs"
        >
          <FiArrowLeft />
          Back to Blogs
        </Link>
      </div>

      <form
        className="admin-blog-form"
        onSubmit={handleSubmit}
      >
        {/* =================================================
            BASIC DETAILS
        ================================================= */}

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading">
            <span>
              Article Details
            </span>

            <h2>
              Basic Information
            </h2>
          </div>

          <div className="admin-blog-form__grid">
            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>
                Blog Title *
              </span>

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  handleTitleChange(
                    event.target.value,
                  )
                }
                placeholder="Enter blog title"
                required
              />
            </label>

            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>
                URL Slug *
              </span>

              <div className="admin-blog-form__slug">
                <span>
                  /blog/
                </span>

                <input
                  type="text"
                  value={form.slug}
                  onChange={(event) => {
                    setSlugTouched(true);

                    updateField(
                      "slug",
                      slugify(
                        event.target
                          .value,
                      ),
                    );
                  }}
                  placeholder="blog-url-slug"
                  required
                />
              </div>
            </label>

            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>
                Short Excerpt *
              </span>

              <textarea
                rows={4}
                value={form.excerpt}
                onChange={(event) =>
                  updateField(
                    "excerpt",
                    event.target.value,
                  )
                }
                placeholder="Short article introduction..."
                required
              />
            </label>

            <label className="admin-blog-form__field">
              <span>
                Category *
              </span>

              <input
                type="text"
                value={form.category}
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value,
                  )
                }
                placeholder="Airport Transfers"
                required
              />
            </label>

            <label className="admin-blog-form__field">
              <span>
                Author *
              </span>

              <input
                type="text"
                value={form.author}
                onChange={(event) =>
                  updateField(
                    "author",
                    event.target.value,
                  )
                }
                required
              />
            </label>

            <label className="admin-blog-form__field">
              <span>
                Reading Time *
              </span>

              <input
                type="text"
                value={
                  form.readingTime
                }
                onChange={(event) =>
                  updateField(
                    "readingTime",
                    event.target.value,
                  )
                }
                placeholder="5 min read"
                required
              />
            </label>

            <label className="admin-blog-form__field">
              <span>
                Publish Date
              </span>

              <input
                type="date"
                value={
                  form.publishedAt
                    ? form.publishedAt.slice(
                        0,
                        10,
                      )
                    : ""
                }
                onChange={(event) =>
                  updateField(
                    "publishedAt",
                    event.target.value,
                  )
                }
              />
            </label>

            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>
                Featured Image URL
              </span>

              <input
                type="url"
                value={
                  form.image ?? ""
                }
                onChange={(event) =>
                  updateField(
                    "image",
                    event.target.value,
                  )
                }
                placeholder="https://..."
              />
            </label>

            {form.image && (
              <div className="admin-blog-form__image-preview admin-blog-form__field--full">
                <img
                  src={form.image}
                  alt="Blog preview"
                />
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            STATUS
        ================================================= */}

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading">
            <span>
              Publishing
            </span>

            <h2>
              Article Status
            </h2>
          </div>

          <div className="admin-blog-form__status-row">
            <label>
              <span>
                Status
              </span>

              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target
                      .value as BlogStatus,
                  )
                }
              >
                <option value="DRAFT">
                  Draft
                </option>

                <option value="PUBLISHED">
                  Published
                </option>
              </select>
            </label>

            <label className="admin-blog-form__checkbox">
              <input
                type="checkbox"
                checked={
                  form.featured
                }
                onChange={(event) =>
                  updateField(
                    "featured",
                    event.target
                      .checked,
                  )
                }
              />

              <span>
                Mark as Featured Article
              </span>
            </label>
          </div>
        </section>

        {/* =================================================
            TAGS
        ================================================= */}

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading">
            <span>
              Organisation
            </span>

            <h2>
              Tags
            </h2>
          </div>

          <label className="admin-blog-form__field">
            <span>
              Tags
            </span>

            <input
              type="text"
              value={tagsInput}
              onChange={(event) =>
                setTagsInput(
                  event.target.value,
                )
              }
              placeholder="airport, melbourne, chauffeur"
            />

            <small>
              Separate tags with commas.
            </small>
          </label>
        </section>

        {/* =================================================
            ARTICLE SECTIONS
        ================================================= */}

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading admin-blog-form__card-heading--action">
            <div>
              <span>
                Article Content
              </span>

              <h2>
                Content Sections
              </h2>
            </div>

            <button
              type="button"
              onClick={addSection}
            >
              <FiPlus />
              Add Section
            </button>
          </div>

          <div className="admin-blog-form__repeat-list">
            {form.sections.map(
              (
                section,
                sectionIndex,
              ) => (
                <article
                  className="admin-blog-form__repeat-card"
                  key={`section-${sectionIndex}`}
                >
                  <div className="admin-blog-form__repeat-heading">
                    <strong>
                      Section{" "}
                      {sectionIndex +
                        1}
                    </strong>

                    {form.sections
                      .length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeSection(
                            sectionIndex,
                          )
                        }
                        aria-label="Remove section"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>

                  <label className="admin-blog-form__field">
                    <span>
                      Section Heading
                    </span>

                    <input
                      type="text"
                      value={
                        section.heading
                      }
                      onChange={(
                        event,
                      ) =>
                        updateSection(
                          sectionIndex,
                          {
                            heading:
                              event
                                .target
                                .value,
                          },
                        )
                      }
                      placeholder="Section heading"
                    />
                  </label>

                  <div className="admin-blog-form__paragraphs">
                    {section.paragraphs.map(
                      (
                        paragraph,
                        paragraphIndex,
                      ) => (
                        <div
                          key={`paragraph-${paragraphIndex}`}
                        >
                          <label className="admin-blog-form__field">
                            <span>
                              Paragraph{" "}
                              {paragraphIndex +
                                1}
                            </span>

                            <textarea
                              rows={5}
                              value={
                                paragraph
                              }
                              onChange={(
                                event,
                              ) =>
                                updateParagraph(
                                  sectionIndex,
                                  paragraphIndex,
                                  event
                                    .target
                                    .value,
                                )
                              }
                              placeholder="Write paragraph..."
                            />
                          </label>

                          {section
                            .paragraphs
                            .length >
                            1 && (
                            <button
                              className="admin-blog-form__remove-inline"
                              type="button"
                              onClick={() =>
                                removeParagraph(
                                  sectionIndex,
                                  paragraphIndex,
                                )
                              }
                            >
                              Remove Paragraph
                            </button>
                          )}
                        </div>
                      ),
                    )}

                    <button
                      className="admin-blog-form__secondary-button"
                      type="button"
                      onClick={() =>
                        addParagraph(
                          sectionIndex,
                        )
                      }
                    >
                      <FiPlus />
                      Add Paragraph
                    </button>
                  </div>

                  <label className="admin-blog-form__field">
                    <span>
                      Bullet Points
                    </span>

                    <textarea
                      rows={5}
                      value={(
                        section.points ??
                        []
                      ).join("\n")}
                      onChange={(
                        event,
                      ) =>
                        updatePoints(
                          sectionIndex,
                          event.target
                            .value,
                        )
                      }
                      placeholder={
                        "Point one\nPoint two\nPoint three"
                      }
                    />

                    <small>
                      Add one bullet
                      point per line.
                    </small>
                  </label>
                </article>
              ),
            )}
          </div>
        </section>

        {/* =================================================
            FAQ
        ================================================= */}

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading admin-blog-form__card-heading--action">
            <div>
              <span>
                Helpful Content
              </span>

              <h2>
                FAQs
              </h2>
            </div>

            <button
              type="button"
              onClick={addFaq}
            >
              <FiPlus />
              Add FAQ
            </button>
          </div>

          {form.faqs.length ===
          0 ? (
            <p className="admin-blog-form__empty-copy">
              No FAQs added yet.
            </p>
          ) : (
            <div className="admin-blog-form__repeat-list">
              {form.faqs.map(
                (
                  faq,
                  faqIndex,
                ) => (
                  <article
                    className="admin-blog-form__repeat-card"
                    key={`faq-${faqIndex}`}
                  >
                    <div className="admin-blog-form__repeat-heading">
                      <strong>
                        FAQ{" "}
                        {faqIndex +
                          1}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          removeFaq(
                            faqIndex,
                          )
                        }
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <label className="admin-blog-form__field">
                      <span>
                        Question
                      </span>

                      <input
                        type="text"
                        value={
                          faq.question
                        }
                        onChange={(
                          event,
                        ) =>
                          updateFaq(
                            faqIndex,
                            {
                              question:
                                event
                                  .target
                                  .value,
                            },
                          )
                        }
                      />
                    </label>

                    <label className="admin-blog-form__field">
                      <span>
                        Answer
                      </span>

                      <textarea
                        rows={4}
                        value={
                          faq.answer
                        }
                        onChange={(
                          event,
                        ) =>
                          updateFaq(
                            faqIndex,
                            {
                              answer:
                                event
                                  .target
                                  .value,
                            },
                          )
                        }
                      />
                    </label>
                  </article>
                ),
              )}
            </div>
          )}
        </section>

        {/* =================================================
            SEO
        ================================================= */}

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading">
            <span>
              Search Optimisation
            </span>

            <h2>
              SEO Settings
            </h2>
          </div>

          <div className="admin-blog-form__grid">
            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>
                SEO Title *
              </span>

              <input
                type="text"
                value={
                  form.seoTitle
                }
                onChange={(event) =>
                  updateField(
                    "seoTitle",
                    event.target.value,
                  )
                }
                required
              />
            </label>

            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>
                SEO Description *
              </span>

              <textarea
                rows={4}
                value={
                  form.seoDescription
                }
                onChange={(event) =>
                  updateField(
                    "seoDescription",
                    event.target.value,
                  )
                }
                required
              />
            </label>
          </div>
        </section>

        {/* =================================================
            RELATED CONTENT
        ================================================= */}

        <section className="admin-blog-form__card">
          <div className="admin-blog-form__card-heading">
            <span>
              Website Connections
            </span>

            <h2>
              Related Content
            </h2>
          </div>

          <div className="admin-blog-form__grid">
            <label className="admin-blog-form__field">
              <span>
                Related Service Slugs
              </span>

              <textarea
                rows={4}
                value={
                  serviceSlugsInput
                }
                onChange={(event) =>
                  setServiceSlugsInput(
                    event.target
                      .value,
                  )
                }
                placeholder="airport-transfers-melbourne, corporate-chauffeur-melbourne"
              />
            </label>

            <label className="admin-blog-form__field">
              <span>
                Related Fleet Slugs
              </span>

              <textarea
                rows={4}
                value={
                  fleetSlugsInput
                }
                onChange={(event) =>
                  setFleetSlugsInput(
                    event.target
                      .value,
                  )
                }
                placeholder="bmw-7-series, mercedes-benz-s-class"
              />
            </label>

            <label className="admin-blog-form__field admin-blog-form__field--full">
              <span>
                Related Service Area Slugs
              </span>

              <textarea
                rows={4}
                value={areaSlugsInput}
                onChange={(event) =>
                  setAreaSlugsInput(
                    event.target
                      .value,
                  )
                }
                placeholder="melbourne-cbd, south-yarra"
              />
            </label>
          </div>
        </section>

        {/* =================================================
            SAVE BAR
        ================================================= */}

        <div className="admin-blog-form__save-bar">
          <Link
            to="/admin/blogs"
            className="admin-blog-form__cancel"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
          >
            <FiSave />

            {saving
              ? "Saving..."
              : isEditMode
                ? "Update Blog"
                : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
