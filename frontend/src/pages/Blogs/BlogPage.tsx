import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiSearch,
} from "react-icons/fi";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import InnerPageHero from "../../components/hero/InnerPageHero";
import { blogData } from "../../data/blogData";
import "./blogPage.css";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(blogData.map((post) => post.category)),
      ),
    ],
    [],
  );

  const filteredPosts = useMemo(() => {
    const normalisedSearch =
      searchTerm.trim().toLowerCase();

    return blogData.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category === selectedCategory;

      const matchesSearch =
        !normalisedSearch ||
        post.title
          .toLowerCase()
          .includes(normalisedSearch) ||
        post.excerpt
          .toLowerCase()
          .includes(normalisedSearch) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(normalisedSearch),
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const featuredPost =
    blogData.find((post) => post.featured) ??
    blogData[0];

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
          {featuredPost && (
            <article className="blog-page__featured">
              <Link
                className="blog-page__featured-image"
                to={`/blog/${featuredPost.slug}`}
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                />

                <span className="blog-page__featured-overlay" />
              </Link>

              <div className="blog-page__featured-content">
                <span className="blog-page__category">
                  Featured · {featuredPost.category}
                </span>

                <h2>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p>{featuredPost.excerpt}</p>

                <div className="blog-page__meta">
                  <span>
                    <FiCalendar />
                    {new Date(
                      featuredPost.publishedAt,
                    ).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <span>
                    <FiClock />
                    {featuredPost.readingTime}
                  </span>
                </div>

                <Link
                  className="button button--primary"
                  to={`/blog/${featuredPost.slug}`}
                >
                  Read Featured Article
                  <FiArrowRight />
                </Link>
              </div>
            </article>
          )}

          <div className="blog-page__toolbar">
            <div className="blog-page__search">
              <FiSearch />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search chauffeur guides..."
                aria-label="Search blog articles"
              />
            </div>

            <div
              className="blog-page__categories"
              aria-label="Blog categories"
            >
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    selectedCategory === category
                      ? "blog-page__category-button blog-page__category-button--active"
                      : "blog-page__category-button"
                  }
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-page__heading">
            <span className="eyebrow">
              Latest Articles
            </span>

            <h2 className="section-title">
              Helpful information for your Melbourne journey.
            </h2>

            <p className="section-description">
              Read local travel advice and explore related
              chauffeur services, vehicles and service areas.
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="blog-page__grid">
              {filteredPosts.map((post) => (
                <article
                  className="blog-card"
                  key={post.slug}
                >
                  <Link
                    className="blog-card__image"
                    to={`/blog/${post.slug}`}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                    />

                    <span className="blog-card__category">
                      {post.category}
                    </span>
                  </Link>

                  <div className="blog-card__content">
                    <div className="blog-card__meta">
                      <span>
                        <FiCalendar />
                        {new Date(
                          post.publishedAt,
                        ).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>

                      <span>
                        <FiClock />
                        {post.readingTime}
                      </span>
                    </div>

                    <h3>
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p>{post.excerpt}</p>

                    <Link
                      className="blog-card__link"
                      to={`/blog/${post.slug}`}
                    >
                      Read Article
                      <FiArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-page__empty">
              <h3>No articles found</h3>

              <p>
                Try another search term or choose a different
                category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}