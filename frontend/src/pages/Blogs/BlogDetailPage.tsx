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
import { fleetData } from "../../data/fleetData";
import {
  getBlogBySlug,
  getRelatedBlogs,
} from "../../data/blogData";
import { serviceAreasData } from "../../data/serviceAreasData";
import { servicesData } from "../../data/servicesData";
import "./blogDetailPage.css";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = getBlogBySlug(slug);

  if (!post) {
    return <Navigate replace to="/blog" />;
  }

  const relatedBlogs = getRelatedBlogs(
    post.slug,
    post.category,
    3,
  );

  const relatedServices = servicesData.filter((service) =>
    post.relatedServiceSlugs.includes(service.slug),
  );

  const relatedFleet = fleetData.filter((vehicle) =>
    post.relatedFleetSlugs.includes(vehicle.slug),
  );

  const relatedAreas = serviceAreasData.filter((area) =>
    post.relatedAreaSlugs.includes(area.slug),
  );

  const publishedDate = new Date(
    post.publishedAt,
  ).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main>
      <InnerPageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        image={post.image}
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

      <section className="blog-detail">
        <div className="container blog-detail__layout">
          <aside className="blog-detail__sidebar">
            <div className="blog-detail__meta-card">
              <span className="eyebrow">
                Article Information
              </span>

              <div className="blog-detail__meta-list">
                <div>
                  <FiCalendar />

                  <span>
                    <strong>Published</strong>
                    {publishedDate}
                  </span>
                </div>

                {updatedDate && (
                  <div>
                    <FiClock />

                    <span>
                      <strong>Updated</strong>
                      {updatedDate}
                    </span>
                  </div>
                )}

                <div>
                  <FiClock />

                  <span>
                    <strong>Reading Time</strong>
                    {post.readingTime}
                  </span>
                </div>

                <div>
                  <FiUser />

                  <span>
                    <strong>Author</strong>
                    {post.author}
                  </span>
                </div>

                <div>
                  <FiTag />

                  <span>
                    <strong>Category</strong>
                    {post.category}
                  </span>
                </div>
              </div>
            </div>

          </aside>

          <article className="blog-detail__article">
            <header className="blog-detail__article-header">
              <span>{post.category}</span>

              <h2>{post.title}</h2>

              <p>{post.excerpt}</p>

              <div className="blog-detail__article-meta">
                <span>
                  <FiCalendar />
                  {publishedDate}
                </span>

                <span>
                  <FiClock />
                  {post.readingTime}
                </span>

                <span>
                  <FiUser />
                  {post.author}
                </span>
              </div>
            </header>

            <div className="blog-detail__content">
              {post.sections.map((section) => (
                <section
                  key={section.heading}
                  className="blog-detail__section"
                >
                  <h2>{section.heading}</h2>

                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.points && (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>
                          <FiCheck />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {relatedServices.length > 0 && (
              <section className="blog-detail__related">
                <span className="eyebrow">
                  Related Chauffeur Services
                </span>

                <h2>
                  Services connected to this article.
                </h2>

                <div className="blog-detail__related-grid">
                  {relatedServices.map((service) => {
                    const Icon = service.icon;

                    return (
                      <article key={service.slug}>
                        <Icon />

                        <h3>{service.shortTitle}</h3>

                        <p>{service.shortDescription}</p>

                        <Link
                          to={`/services/${service.slug}`}
                        >
                          Explore Service
                          <FiArrowRight />
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {relatedFleet.length > 0 && (
              <section className="blog-detail__related">
                <span className="eyebrow">
                  Related Chauffeur Fleet
                </span>

                <h2>
                  Vehicles suited to this journey.
                </h2>

                <div className="blog-detail__fleet-grid">
                  {relatedFleet.map((vehicle) => (
                    <article key={vehicle.slug}>
                      <Link
                        className="blog-detail__fleet-image"
                        to={`/fleet/${vehicle.slug}`}
                      >
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          loading="lazy"
                        />
                      </Link>

                      <div>
                        <h3>{vehicle.name}</h3>

                        <p>{vehicle.shortDescription}</p>

                        <Link
                          to={`/fleet/${vehicle.slug}`}
                        >
                          View Vehicle
                          <FiArrowRight />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {relatedAreas.length > 0 && (
              <section className="blog-detail__related">
                <span className="eyebrow">
                  Related Service Areas
                </span>

                <h2>
                  Chauffeur coverage across Melbourne.
                </h2>

                <div className="blog-detail__areas-grid">
                  {relatedAreas.map((area) => (
                    <Link
                      key={area.slug}
                      to={`/service-areas/${area.slug}`}
                    >
                      <FiMapPin />

                      <span>
                        <strong>{area.name}</strong>
                        <small>{area.region}</small>
                      </span>

                      <FiArrowRight />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {post.faqs && post.faqs.length > 0 && (
              <section className="blog-detail__faqs">
                <span className="eyebrow">
                  Article FAQs
                </span>

                <h2>Frequently asked questions.</h2>

                <div>
                  {post.faqs.map((faq) => (
                    <details key={faq.question}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="blog-detail__cta">
              <div>
                <span className="eyebrow">
                  Private Chauffeur Melbourne
                </span>

                <h2>
                  Ready to plan your Melbourne chauffeur
                  journey?
                </h2>

                <p>
                  Submit your travel details for a tailored
                  quotation or contact our team for general
                  assistance.
                </p>
              </div>

              <div className="blog-detail__cta-actions">
                <Link
                  className="button button--primary"
                  to="/get-a-quote"
                >
                  Request a Quote
                  <FiArrowRight />
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

      {relatedBlogs.length > 0 && (
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
                <FiArrowRight />
              </Link>
            </div>

            <div className="blog-detail__more-grid">
              {relatedBlogs.map((relatedPost) => (
                <article key={relatedPost.slug}>
                  <Link
                    className="blog-detail__more-image"
                    to={`/blog/${relatedPost.slug}`}
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      loading="lazy"
                    />
                  </Link>

                  <div>
                    <span>{relatedPost.category}</span>

                    <h3>
                      <Link
                        to={`/blog/${relatedPost.slug}`}
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>

                    <p>{relatedPost.excerpt}</p>

                    <Link
                      to={`/blog/${relatedPost.slug}`}
                    >
                      Read Article
                      <FiArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}