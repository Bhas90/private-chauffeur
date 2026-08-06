import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { blogData } from "../../data/blogData";
import "./latestBlogsSection.css";

const formatBlogDate = (date: string) =>
  new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function LatestBlogsSection() {
  const latestBlogs = [...blogData]
    .sort(
      (firstBlog, secondBlog) =>
        new Date(secondBlog.publishedAt).getTime() -
        new Date(firstBlog.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <section className="latest-blogs section section--white">
      <div className="container">
        <div className="latest-blogs__header">
          <div className="section-header">
            <span className="eyebrow">
              Travel Advice and Insights
            </span>

            <h2 className="section-title">
              Helpful guides for travelling around Melbourne.
            </h2>

            <p className="section-description">
              Explore airport-transfer advice, corporate travel planning,
              private touring ideas and practical chauffeur booking guides.
            </p>
          </div>

          <Link
            className="button button--dark"
            to="/blog"
          >
            View All Articles
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="latest-blogs__grid">
          {latestBlogs.map((blog) => (
            <article
              className="latest-blogs__card"
              key={blog.slug}
            >
              <Link
                className="latest-blogs__image"
                to={`/blog/${blog.slug}`}
                aria-label={`Read ${blog.title}`}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                />

                <span>{blog.category}</span>
              </Link>

              <div className="latest-blogs__content">
                <div className="latest-blogs__meta">
                  <span>
                    <FiCalendar aria-hidden="true" />
                    {formatBlogDate(blog.publishedAt)}
                  </span>

                  <span>
                    <FiClock aria-hidden="true" />
                    {blog.readingTime}
                  </span>
                </div>

                <h3>
                  <Link to={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h3>

                <p>{blog.excerpt}</p>

                <Link
                  className="latest-blogs__link"
                  to={`/blog/${blog.slug}`}
                  aria-label={`Read article: ${blog.title}`}
                >
                  Read Article
                  <FiArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
