import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import {
  getPublishedBlogs,
} from "../../services/blogApi";

import type {
  BlogPost,
} from "../../services/blogApi";

import "./latestBlogsSection.css";

/* =========================================================
   DATE FORMATTER
========================================================= */

const formatBlogDate = (
  date: string | null,
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
      month: "short",
      year: "numeric",
    },
  );
};

/* =========================================================
   LATEST BLOGS SECTION
========================================================= */

export default function LatestBlogsSection() {
  const [
    blogs,
    setBlogs,
  ] = useState<BlogPost[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /* =======================================================
     LOAD PUBLISHED BLOGS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadBlogs =
      async () => {
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
              : "Unable to load articles.",
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
     LATEST 3 PUBLISHED BLOGS
  ======================================================= */

  const latestBlogs =
    useMemo(() => {
      return [...blogs]
        .sort(
          (
            firstBlog,
            secondBlog,
          ) => {
            const firstDate =
              firstBlog.publishedAt ||
              firstBlog.createdAt;

            const secondDate =
              secondBlog.publishedAt ||
              secondBlog.createdAt;

            return (
              new Date(
                secondDate,
              ).getTime() -
              new Date(
                firstDate,
              ).getTime()
            );
          },
        )
        .slice(0, 3);
    }, [blogs]);

  return (
    <section
      className="latest-blogs section section--white"
      aria-labelledby="latest-blogs-title"
    >
      <div className="container">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="latest-blogs__header">
          <div className="section-header">
            <span className="eyebrow">
              Travel Advice and Insights
            </span>

            <h2
              className="section-title"
              id="latest-blogs-title"
            >
              Helpful guides for
              travelling around Melbourne.
            </h2>

            <p className="section-description">
              Explore airport-transfer
              advice, corporate travel
              planning, private touring
              ideas and practical chauffeur
              booking guides.
            </p>
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

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="latest-blogs__state">
            <span
              className="latest-blogs__loader"
              aria-hidden="true"
            />

            <p>
              Loading latest articles...
            </p>
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading &&
          error && (
            <div className="latest-blogs__state">
              <p>
                Latest articles are
                temporarily unavailable.
              </p>
            </div>
          )}

        {/* =================================================
            BLOG GRID
        ================================================= */}

        {!loading &&
          !error &&
          latestBlogs.length > 0 && (
            <div className="latest-blogs__grid">
              {latestBlogs.map(
                (blog) => {
                  const blogPath =
                    `/blog/${blog.slug}`;

                  return (
                    <article
                      className="latest-blogs__card"
                      key={blog.id}
                    >
                      {/* =====================================
                          IMAGE
                      ===================================== */}

                      <Link
                        className="latest-blogs__image"
                        to={blogPath}
                        aria-label={`Read ${blog.title}`}
                      >
                        {blog.image ? (
                          <img
                            src={
                              blog.image
                            }
                            alt={`${blog.title} article`}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="latest-blogs__image-placeholder">
                            Private Chauffeur
                            Melbourne
                          </div>
                        )}

                        <span>
                          {blog.category}
                        </span>
                      </Link>

                      {/* =====================================
                          CONTENT
                      ===================================== */}

                      <div className="latest-blogs__content">
                        <div className="latest-blogs__meta">
                          <span>
                            <FiCalendar
                              aria-hidden="true"
                            />

                            {formatBlogDate(
                              blog.publishedAt,
                            )}
                          </span>

                          <span>
                            <FiClock
                              aria-hidden="true"
                            />

                            {blog.readingTime}
                          </span>
                        </div>

                        <h3>
                          <Link
                            to={blogPath}
                          >
                            {blog.title}
                          </Link>
                        </h3>

                        <p>
                          {blog.excerpt}
                        </p>

                        <Link
                          className="latest-blogs__link"
                          to={blogPath}
                          aria-label={`Read article: ${blog.title}`}
                        >
                          Read Article

                          <FiArrowUpRight
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          latestBlogs.length ===
            0 && (
            <p className="latest-blogs__empty">
              New chauffeur travel
              articles will be available
              soon.
            </p>
          )}
      </div>
    </section>
  );
}