import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { blogData } from "../../data/blogData";
import "./latestBlogsSection.css";

export default function LatestBlogsSection() {
  return (
    <section className="latest-blogs section section--white">
      <div className="container">
        <div className="latest-blogs__header">
          <div className="section-header">
            <span className="eyebrow">Travel Advice and Insights</span>

            <h2 className="section-title">
              Helpful guides for travelling around Melbourne.
            </h2>

            <p className="section-description">
              Explore airport-transfer advice, corporate travel planning,
              private touring ideas and practical chauffeur booking guides.
            </p>
          </div>

          <Link className="button button--dark" to="/blog">
            View All Articles
            <FiArrowRight />
          </Link>
        </div>

        <div className="latest-blogs__grid">
          {blogData.map((blog) => (
            <article className="latest-blogs__card" key={blog.slug}>
              <Link
                className="latest-blogs__image"
                to={`/blog/${blog.slug}`}
              >
                <img src={blog.image} alt={blog.title} loading="lazy" />
                <span>{blog.category}</span>
              </Link>

              <div className="latest-blogs__content">
                <div className="latest-blogs__meta">
                  <span>
                    <FiCalendar />
                    {blog.date}
                  </span>

                  <span>
                    <FiClock />
                    {blog.readTime}
                  </span>
                </div>

                <h3>
                  <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>

                <p>{blog.excerpt}</p>

                <Link
                  className="latest-blogs__link"
                  to={`/blog/${blog.slug}`}
                >
                  Read Article
                  <FiArrowUpRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}