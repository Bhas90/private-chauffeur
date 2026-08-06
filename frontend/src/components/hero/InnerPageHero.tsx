import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import HeroNavigation from "../navbar/HeroNavigation";
import "./innerPageHero.css";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface InnerPageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  image?: string;
  breadcrumbs: BreadcrumbItem[];
  showNavigation?: boolean;
}

export default function InnerPageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
  showNavigation = true,
}: InnerPageHeroProps) {
  const backgroundStyle = image
    ? {
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(5, 15, 24, 0.94),
            rgba(8, 26, 42, 0.66)
          ),
          url("${image}")
        `,
      }
    : undefined;

  return (
    <>
      <section
        className="inner-page-hero"
        style={backgroundStyle}
      >
        <div className="container inner-page-hero__content">
          <nav
            className="inner-page-hero__breadcrumbs"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`}>
                {item.path ? (
                  <Link to={item.path}>
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}

                {index < breadcrumbs.length - 1 && (
                  <FiChevronRight />
                )}
              </span>
            ))}
          </nav>

          {eyebrow && (
            <span className="inner-page-hero__eyebrow">
              {eyebrow}
            </span>
          )}

          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>

      {showNavigation && (
        <HeroNavigation variant="inner" />
      )}
    </>
  );
}