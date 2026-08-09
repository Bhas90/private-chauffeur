import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiSearch,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";

import {
  getPublishedBlogs,
} from "../../services/blogApi";

import type {
  BlogPost,
} from "../../services/blogApi";

import "./blogPage.css";

const formatBlogDate = (
  value: string | null,
  longMonth = false,
): string => {
  if (!value) {
    return "Recently published";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently published";
  }

  return date.toLocaleDateString(
    "en-AU",
    {
      day: "numeric",
      month: longMonth
        ? "long"
        : "short",
      year: "numeric",
    },
  );
};

export default function BlogPage() {
  const [blogs, setBlogs] =
    useState<BlogPost[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  /* =======================================================
     LOAD PUBLISHED BLOGS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getPublishedBlogs();

        if (!mounted) {
          return;
        }

        setBlogs(response);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load blog articles.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          blogs.map(
            (post) =>
              post.category,
          ),
        ),
      ),
    ],
    [blogs],
  );

  /* =======================================================
     FILTER POSTS
  ======================================================= */

  const filteredPosts =
    useMemo(() => {
      const normalisedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return blogs.filter(
        (post) => {
          const matchesCategory =
            selectedCategory ===
              "All" ||
            post.category ===
              selectedCategory;

          const matchesSearch =
            !normalisedSearch ||
            post.title
              .toLowerCase()
              .includes(
                normalisedSearch,
              ) ||
            post.excerpt
              .toLowerCase()
              .includes(
                normalisedSearch,
              ) ||
            post.tags.some(
              (tag) =>
                tag
                  .toLowerCase()
                  .includes(
                    normalisedSearch,
                  ),
            );

          return (
            matchesCategory &&
            matchesSearch
          );
        },
      );
    }, [
      blogs,
      searchTerm,
      selectedCategory,
    ]);

  /* =======================================================
     FEATURED POST
  ======================================================= */

  const featuredPost = useMemo(
    () =>
      blogs.find(
        (post) =>
          post.featured,
      ) ?? blogs[0],
    [blogs],
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main>
      <InnerPageHero
        eyebrow="Melbourne Chauffeur Insights"
        title="Travel guides, advice and chauffeur insights."
        description="Explore practical guidance about Melbourne Airport transfers, corporate travel, chauffeur vehicles, weddings, events and private journeys."
        breadcrumbs={[
          {
            label: "Home",
            path: "/",
          },
          {
            label: "Blog",
          },
        ]}
      />

      <section className="blog-page">
        <div className="container">
          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="blog-page__state">
              <span
                className="blog-page__loader"
                aria-hidden="true"
              />

              <h3>
                Loading chauffeur articles...
              </h3>

              <p>
                Please wait while we load the latest travel guides.
              </p>
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="blog-page__state">
              <h3>
                Unable to load articles
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>
            </div>
          )}

          {/* =================================================
              BLOG CONTENT
          ================================================= */}

          {!loading &&
            !error && (
              <>
                {featuredPost && (
                  <article className="blog-page__featured">
                    <Link
                      className="blog-page__featured-image"
                      to={`/blog/${featuredPost.slug}`}
                    >
                      {featuredPost.image ? (
                        <img
                          src={
                            featuredPost.image
                          }
                          alt={
                            featuredPost.title
                          }
                        />
                      ) : (
                        <div className="blog-page__image-placeholder">
                          Private Chauffeur Melbourne
                        </div>
                      )}

                      <span className="blog-page__featured-overlay" />
                    </Link>

                    <div className="blog-page__featured-content">
                      <span className="blog-page__category">
                        Featured ·{" "}
                        {
                          featuredPost.category
                        }
                      </span>

                      <h2>
                        <Link
                          to={`/blog/${featuredPost.slug}`}
                        >
                          {
                            featuredPost.title
                          }
                        </Link>
                      </h2>

                      <p>
                        {
                          featuredPost.excerpt
                        }
                      </p>

                      <div className="blog-page__meta">
                        <span>
                          <FiCalendar
                            aria-hidden="true"
                          />

                          {formatBlogDate(
                            featuredPost.publishedAt,
                            true,
                          )}
                        </span>

                        <span>
                          <FiClock
                            aria-hidden="true"
                          />

                          {
                            featuredPost.readingTime
                          }
                        </span>
                      </div>

                      <Link
                        className="button button--primary"
                        to={`/blog/${featuredPost.slug}`}
                      >
                        Read Featured Article
                        <FiArrowRight
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                )}

                {/* ===========================================
                    FILTER BAR
                =========================================== */}

                <div className="blog-page__toolbar">
                  <div className="blog-page__search">
                    <FiSearch
                      aria-hidden="true"
                    />

                    <input
                      type="search"
                      value={
                        searchTerm
                      }
                      onChange={(
                        event,
                      ) =>
                        setSearchTerm(
                          event.target
                            .value,
                        )
                      }
                      placeholder="Search chauffeur guides..."
                      aria-label="Search blog articles"
                    />
                  </div>

                  <div
                    className="blog-page__categories"
                    aria-label="Blog categories"
                  >
                    {categories.map(
                      (category) => (
                        <button
                          type="button"
                          key={
                            category
                          }
                          className={
                            selectedCategory ===
                            category
                              ? "blog-page__category-button blog-page__category-button--active"
                              : "blog-page__category-button"
                          }
                          onClick={() =>
                            setSelectedCategory(
                              category,
                            )
                          }
                        >
                          {
                            category
                          }
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* ===========================================
                    HEADING
                =========================================== */}

                <div className="blog-page__heading">
                  <span className="eyebrow">
                    Latest Articles
                  </span>

                  <h2 className="section-title">
                    Helpful information
                    for your Melbourne
                    journey.
                  </h2>

                  <p className="section-description">
                    Read local travel
                    advice and explore
                    related chauffeur
                    services, vehicles
                    and service areas.
                  </p>
                </div>

                {/* ===========================================
                    BLOG GRID
                =========================================== */}

                {filteredPosts.length >
                0 ? (
                  <div className="blog-page__grid">
                    {filteredPosts.map(
                      (post) => (
                        <article
                          className="blog-card"
                          key={
                            post.id
                          }
                        >
                          <Link
                            className="blog-card__image"
                            to={`/blog/${post.slug}`}
                          >
                            {post.image ? (
                              <img
                                src={
                                  post.image
                                }
                                alt={
                                  post.title
                                }
                                loading="lazy"
                              />
                            ) : (
                              <div className="blog-page__image-placeholder">
                                Private
                                Chauffeur
                                Melbourne
                              </div>
                            )}

                            <span className="blog-card__category">
                              {
                                post.category
                              }
                            </span>
                          </Link>

                          <div className="blog-card__content">
                            <div className="blog-card__meta">
                              <span>
                                <FiCalendar
                                  aria-hidden="true"
                                />

                                {formatBlogDate(
                                  post.publishedAt,
                                )}
                              </span>

                              <span>
                                <FiClock
                                  aria-hidden="true"
                                />

                                {
                                  post.readingTime
                                }
                              </span>
                            </div>

                            <h3>
                              <Link
                                to={`/blog/${post.slug}`}
                              >
                                {
                                  post.title
                                }
                              </Link>
                            </h3>

                            <p>
                              {
                                post.excerpt
                              }
                            </p>

                            <Link
                              className="blog-card__link"
                              to={`/blog/${post.slug}`}
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
                ) : (
                  <div className="blog-page__empty">
                    <h3>
                      No articles found
                    </h3>

                    <p>
                      Try another search
                      term or choose a
                      different category.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm(
                          "",
                        );

                        setSelectedCategory(
                          "All",
                        );
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
        </div>
      </section>
    </main>
  );
}