import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiMapPin,
  FiTag,
  FiUser,
} from "react-icons/fi";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";

import {
  getPublishedBlogBySlug,
  getPublishedBlogs,
  getRelatedPublishedBlogs,
} from "../../services/blogApi";

import type {
  BlogPost,
} from "../../services/blogApi";

import { fleetData } from "../../data/fleetData";
import { serviceAreasData } from "../../data/serviceAreasData";
import { servicesData } from "../../data/servicesData";

import "./blogDetailPage.css";

/* =========================================================
   DATE FORMATTER
========================================================= */

const formatDate = (
  date?: string | null,
): string => {
  if (!date) {
    return "Recently published";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    return "Recently published";
  }

  return parsedDate.toLocaleDateString(
    "en-AU",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
};

/* =========================================================
   COMPONENT
========================================================= */

export default function BlogDetailPage() {
  const { slug } =
    useParams<{
      slug: string;
    }>();

  const [
    post,
    setPost,
  ] =
    useState<BlogPost | null>(
      null,
    );

  const [
    allPublishedBlogs,
    setAllPublishedBlogs,
  ] =
    useState<BlogPost[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    notFound,
    setNotFound,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  /* =======================================================
     LOAD ARTICLE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadArticle =
      async () => {
        if (!slug) {
          setNotFound(true);
          setLoading(false);

          return;
        }

        try {
          setLoading(true);
          setError("");
          setNotFound(false);

          const [
            article,
            blogs,
          ] =
            await Promise.all([
              getPublishedBlogBySlug(
                slug,
              ),

              getPublishedBlogs(),
            ]);

          if (!mounted) {
            return;
          }

          setPost(article);

          setAllPublishedBlogs(
            blogs,
          );
        } catch (err) {
          if (!mounted) {
            return;
          }

          const message =
            err instanceof Error
              ? err.message
              : "Unable to load article.";

          if (
            message
              .toLowerCase()
              .includes(
                "not found",
              )
          ) {
            setNotFound(true);
          } else {
            setError(message);
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    void loadArticle();

    return () => {
      mounted = false;
    };
  }, [slug]);

  /* =======================================================
     RELATED BLOGS
  ======================================================= */

  const relatedBlogs =
    useMemo(() => {
      if (!post) {
        return [];
      }

      return getRelatedPublishedBlogs(
        allPublishedBlogs,
        post.slug,
        post.category,
        3,
      );
    }, [
      allPublishedBlogs,
      post,
    ]);

  /* =======================================================
     RELATED SERVICES
  ======================================================= */

  const relatedServices =
    useMemo(() => {
      if (!post) {
        return [];
      }

      return servicesData.filter(
        (service) =>
          post.relatedServiceSlugs.includes(
            service.slug,
          ),
      );
    }, [post]);

  /* =======================================================
     RELATED FLEET
  ======================================================= */

  const relatedFleet =
    useMemo(() => {
      if (!post) {
        return [];
      }

      return fleetData.filter(
        (vehicle) =>
          post.relatedFleetSlugs.includes(
            vehicle.slug,
          ),
      );
    }, [post]);

  /* =======================================================
     RELATED SERVICE AREAS
  ======================================================= */

  const relatedAreas =
    useMemo(() => {
      if (!post) {
        return [];
      }

      return serviceAreasData.filter(
        (area) =>
          post.relatedAreaSlugs.includes(
            area.slug,
          ),
      );
    }, [post]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main>
        <section className="blog-detail blog-detail--loading">
          <div className="container">
            <div className="blog-detail__loading">
              <span
                aria-hidden="true"
              />

              <h2>
                Loading article...
              </h2>

              <p>
                Please wait while we
                load the latest chauffeur
                insight.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <main>
        <InnerPageHero
          eyebrow="Chauffeur Insights"
          title="Unable to load article."
          description="We could not load this chauffeur article at the moment."
          breadcrumbs={[
            {
              label: "Home",
              path: "/",
            },
            {
              label: "Blog",
              path: "/blog",
            },
          ]}
        />

        <section className="blog-detail">
          <div className="container">
            <div className="blog-detail__loading">
              <h2>
                Something went wrong.
              </h2>

              <p>
                {error}
              </p>

              <Link
                className="button button--primary"
                to="/blog"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (
    notFound ||
    !slug ||
    !post
  ) {
    return (
      <Navigate
        replace
        to="/blog"
      />
    );
  }

  /* =======================================================
     ARTICLE VALUES
  ======================================================= */

  const publishedDate =
    formatDate(
      post.publishedAt,
    );

  const updatedDate =
    post.updatedAt
      ? formatDate(
          post.updatedAt,
        )
      : null;

  return (
    <main>
      {/* ===================================================
          HERO
      =================================================== */}

      <InnerPageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        image={
          post.image ||
          undefined
        }
        breadcrumbs={[
          {
            label: "Home",
            path: "/",
          },
          {
            label: "Blog",
            path: "/blog",
          },
          {
            label: post.title,
          },
        ]}
      />

      {/* ===================================================
          ARTICLE
      =================================================== */}

      <section className="blog-detail">
        <div className="container blog-detail__layout">
          {/* ===============================================
              SIDEBAR
          =============================================== */}

          <aside className="blog-detail__sidebar">
            <div className="blog-detail__meta-card">
              <span className="eyebrow">
                Article Information
              </span>

              <div className="blog-detail__meta-list">
                <div>
                  <FiCalendar
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Published
                    </strong>

                    {
                      publishedDate
                    }
                  </span>
                </div>

                {updatedDate && (
                  <div>
                    <FiClock
                      aria-hidden="true"
                    />

                    <span>
                      <strong>
                        Updated
                      </strong>

                      {
                        updatedDate
                      }
                    </span>
                  </div>
                )}

                <div>
                  <FiClock
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Reading Time
                    </strong>

                    {
                      post.readingTime
                    }
                  </span>
                </div>

                <div>
                  <FiUser
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Author
                    </strong>

                    {
                      post.author
                    }
                  </span>
                </div>

                <div>
                  <FiTag
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Category
                    </strong>

                    {
                      post.category
                    }
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* ===============================================
              MAIN ARTICLE
          =============================================== */}

          <article className="blog-detail__article">
            <header className="blog-detail__article-header">
              <span>
                {post.category}
              </span>

              <h2>
                {post.title}
              </h2>

              <p>
                {post.excerpt}
              </p>

              <div className="blog-detail__article-meta">
                <span>
                  <FiCalendar
                    aria-hidden="true"
                  />

                  {
                    publishedDate
                  }
                </span>

                <span>
                  <FiClock
                    aria-hidden="true"
                  />

                  {
                    post.readingTime
                  }
                </span>

                <span>
                  <FiUser
                    aria-hidden="true"
                  />

                  {
                    post.author
                  }
                </span>
              </div>
            </header>

            {/* =============================================
                CONTENT SECTIONS
            ============================================= */}

            <div className="blog-detail__content">
              {post.sections.map(
                (
                  section,
                  sectionIndex,
                ) => (
                  <section
                    key={`${section.heading}-${sectionIndex}`}
                    className="blog-detail__section"
                  >
                    {section.heading && (
                      <h2>
                        {
                          section.heading
                        }
                      </h2>
                    )}

                    {section.paragraphs.map(
                      (
                        paragraph,
                        paragraphIndex,
                      ) => (
                        <p
                          key={`paragraph-${sectionIndex}-${paragraphIndex}`}
                        >
                          {
                            paragraph
                          }
                        </p>
                      ),
                    )}

                    {section.points &&
                      section.points.length >
                        0 && (
                        <ul>
                          {section.points.map(
                            (
                              point,
                              pointIndex,
                            ) => (
                              <li
                                key={`point-${sectionIndex}-${pointIndex}`}
                              >
                                <FiCheck
                                  aria-hidden="true"
                                />

                                <span>
                                  {
                                    point
                                  }
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                  </section>
                ),
              )}
            </div>

            {/* =============================================
                RELATED SERVICES
            ============================================= */}

            {relatedServices.length >
              0 && (
              <section className="blog-detail__related">
                <span className="eyebrow">
                  Related Chauffeur
                  Services
                </span>

                <h2>
                  Services connected to
                  this article.
                </h2>

                <div className="blog-detail__related-grid">
                  {relatedServices.map(
                    (service) => {
                      const Icon =
                        service.icon;

                      return (
                        <article
                          key={
                            service.slug
                          }
                        >
                          <Icon
                            aria-hidden="true"
                          />

                          <h3>
                            {
                              service.shortTitle
                            }
                          </h3>

                          <p>
                            {
                              service.shortDescription
                            }
                          </p>

                          <Link
                            to={`/services/${service.slug}`}
                            aria-label={`Explore ${service.shortTitle}`}
                          >
                            Explore Service

                            <FiArrowRight
                              aria-hidden="true"
                            />
                          </Link>
                        </article>
                      );
                    },
                  )}
                </div>
              </section>
            )}

            {/* =============================================
                RELATED FLEET
            ============================================= */}

            {relatedFleet.length >
              0 && (
              <section className="blog-detail__related">
                <span className="eyebrow">
                  Related Chauffeur Fleet
                </span>

                <h2>
                  Vehicles suited to this
                  journey.
                </h2>

                <div className="blog-detail__fleet-grid">
                  {relatedFleet.map(
                    (vehicle) => (
                      <article
                        key={
                          vehicle.slug
                        }
                      >
                        <Link
                          className="blog-detail__fleet-image"
                          to={`/fleet/${vehicle.slug}`}
                          aria-label={`View ${vehicle.name}`}
                        >
                          <img
                            src={
                              vehicle.image
                            }
                            alt={`${vehicle.name} chauffeur vehicle`}
                            loading="lazy"
                          />
                        </Link>

                        <div>
                          <h3>
                            <Link
                              to={`/fleet/${vehicle.slug}`}
                            >
                              {
                                vehicle.name
                              }
                            </Link>
                          </h3>

                          <p>
                            {
                              vehicle.description
                            }
                          </p>

                          <Link
                            to={`/fleet/${vehicle.slug}`}
                            aria-label={`View ${vehicle.name}`}
                          >
                            View Vehicle

                            <FiArrowRight
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </article>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* =============================================
                RELATED AREAS
            ============================================= */}

            {relatedAreas.length >
              0 && (
              <section className="blog-detail__related">
                <span className="eyebrow">
                  Related Service Areas
                </span>

                <h2>
                  Chauffeur coverage
                  across Melbourne.
                </h2>

                <div className="blog-detail__areas-grid">
                  {relatedAreas.map(
                    (area) => (
                      <Link
                        key={
                          area.slug
                        }
                        to={`/service-areas/${area.slug}`}
                        aria-label={`View chauffeur services in ${area.name}`}
                      >
                        <FiMapPin
                          aria-hidden="true"
                        />

                        <span>
                          <strong>
                            {
                              area.name
                            }
                          </strong>

                          <small>
                            {
                              area.region
                            }
                          </small>
                        </span>

                        <FiArrowRight
                          aria-hidden="true"
                        />
                      </Link>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* =============================================
                FAQS
            ============================================= */}

            {post.faqs &&
              post.faqs.length >
                0 && (
                <section className="blog-detail__faqs">
                  <span className="eyebrow">
                    Article FAQs
                  </span>

                  <h2>
                    Frequently asked
                    questions.
                  </h2>

                  <div>
                    {post.faqs.map(
                      (
                        faq,
                        faqIndex,
                      ) => (
                        <details
                          key={`faq-${faqIndex}`}
                        >
                          <summary>
                            {
                              faq.question
                            }
                          </summary>

                          <p>
                            {
                              faq.answer
                            }
                          </p>
                        </details>
                      ),
                    )}
                  </div>
                </section>
              )}

            {/* =============================================
                CTA
            ============================================= */}

            <section className="blog-detail__cta">
              <div>
                <span className="eyebrow">
                  Private Chauffeur
                  Melbourne
                </span>

                <h2>
                  Ready to plan your
                  Melbourne chauffeur
                  journey?
                </h2>

                <p>
                  Submit your travel
                  details for a tailored
                  quotation or contact
                  our team for general
                  assistance.
                </p>
              </div>

              <div className="blog-detail__cta-actions">
                <Link
                  className="button button--primary"
                  to="/get-a-quote"
                >
                  Request a Quote

                  <FiArrowRight
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  className="button blog-detail__contact-button"
                  to="/contact"
                >
                  Contact Our Team
                </Link>
              </div>
            </section>
          </article>
        </div>
      </section>

      {/* ===================================================
          MORE ARTICLES
      =================================================== */}

      {relatedBlogs.length >
        0 && (
        <section className="blog-detail__more">
          <div className="container">
            <div className="blog-detail__more-heading">
              <div>
                <span className="eyebrow">
                  More Chauffeur Insights
                </span>

                <h2 className="section-title">
                  Continue reading.
                </h2>
              </div>

              <Link
                className="button button--dark"
                to="/blog"
              >
                View All Articles

                <FiArrowRight
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="blog-detail__more-grid">
              {relatedBlogs.map(
                (relatedPost) => (
                  <article
                    key={
                      relatedPost.id
                    }
                  >
                    <Link
                      className="blog-detail__more-image"
                      to={`/blog/${relatedPost.slug}`}
                      aria-label={`Read ${relatedPost.title}`}
                    >
                      {relatedPost.image ? (
                        <img
                          src={
                            relatedPost.image
                          }
                          alt={
                            relatedPost.title
                          }
                          loading="lazy"
                        />
                      ) : (
                        <div className="blog-detail__image-placeholder">
                          Private Chauffeur
                          Melbourne
                        </div>
                      )}
                    </Link>

                    <div>
                      <span>
                        {
                          relatedPost.category
                        }
                      </span>

                      <h3>
                        <Link
                          to={`/blog/${relatedPost.slug}`}
                        >
                          {
                            relatedPost.title
                          }
                        </Link>
                      </h3>

                      <p>
                        {
                          relatedPost.excerpt
                        }
                      </p>

                      <Link
                        to={`/blog/${relatedPost.slug}`}
                        aria-label={`Read ${relatedPost.title}`}
                      >
                        Read Article

                        <FiArrowRight
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}