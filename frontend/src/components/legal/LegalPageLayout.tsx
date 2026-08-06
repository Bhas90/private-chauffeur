import type { ReactNode } from "react";
import {
  FiArrowRight,
  FiMail,
  FiPhone,
  FiShield,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { siteConfig } from "../../config/siteConfig";
import InnerPageHero from "../hero/InnerPageHero";
import "./legalPageLayout.css";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  content?: ReactNode;
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  effectiveDate: string;
  sections: LegalSection[];
  notice?: string;
  sidebarTitle?: string;
  sidebarDescription?: string;
  contactTitle?: string;
  contactDescription?: string;
}

export default function LegalPageLayout({
  eyebrow,
  title,
  description,
  effectiveDate,
  sections,
  notice,
  sidebarTitle = "",
  sidebarDescription = "Please review this information carefully before using our website or chauffeur services.",
  contactTitle = "Need clarification?",
  contactDescription = "Contact Private Chauffeur Melbourne if you have questions about this policy.",
}: LegalPageLayoutProps) {
  return (
    <main>
      <InnerPageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[
          {
            label: "Home",
            path: "/",
          },
          {
            label: title,
          },
        ]}
      />

      <section className="legal-page">
        <div className="container legal-page__layout">
          <aside className="legal-page__sidebar">
            <div className="legal-page__summary">
              <FiShield aria-hidden="true" />

              <span className="eyebrow">
                Private Chauffeur Melbourne
              </span>

              <h2>{sidebarTitle}</h2>

              <p>{sidebarDescription}</p>

              <div className="legal-page__contact-list">
                <a href={siteConfig.phoneHref}>
                  <FiPhone aria-hidden="true" />

                  <span>
                    <strong>Call or text</strong>
                    {siteConfig.phone}
                  </span>
                </a>

                <a href={`mailto:${siteConfig.email}`}>
                  <FiMail aria-hidden="true" />

                  <span>
                    <strong>Email enquiries</strong>
                    {siteConfig.email}
                  </span>
                </a>
              </div>
            </div>

            <nav
              className="legal-page__contents"
              aria-label={`${title} contents`}
            >
              <strong>On this page</strong>

              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-page__content">
            <header className="legal-page__header">
              <span className="eyebrow">
                Legal Information
              </span>

              <h2>{title}</h2>

              <p>
                Effective date: {effectiveDate}
              </p>

              {notice && (
                <div className="legal-page__notice">
                  <FiShield aria-hidden="true" />
                  <p>{notice}</p>
                </div>
              )}
            </header>

            <div className="legal-page__sections">
              {sections.map((section) => (
                <section
                  className="legal-page__section"
                  id={section.id}
                  key={section.id}
                >
                  <h2>{section.title}</h2>

                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      {paragraph}
                    </p>
                  ))}

                  {section.points && (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.content}
                </section>
              ))}
            </div>

            <section className="legal-page__contact">
              <div>
                <span className="eyebrow">
                  Contact Our Team
                </span>

                <h2>{contactTitle}</h2>

                <p>{contactDescription}</p>
              </div>

              <div className="legal-page__contact-actions">
                <a
                  className="button button--primary"
                  href={`mailto:${siteConfig.email}`}
                >
                  Email Our Team
                  <FiArrowRight aria-hidden="true" />
                </a>

                <Link
                  className="button legal-page__secondary-button"
                  to="/contact"
                >
                  Contact Page
                </Link>
              </div>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}