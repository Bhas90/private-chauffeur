import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

import { faqData } from "../../data/faqData";
import "./faqSection.css";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section section">
      <div className="container faq-section__layout">
        <div className="faq-section__intro">
          <span className="eyebrow">Frequently Asked Questions</span>

          <h2 className="section-title">
            Everything you need to know before booking.
          </h2>

          <p className="section-description">
            Find quick answers about airport pickups, service areas, vehicle
            selection, corporate bookings and payment options.
          </p>

          <div className="faq-section__support">
            <FiHelpCircle />

            <div>
              <strong>Still have a question?</strong>
              <span>Contact our team for help with your journey.</span>
            </div>
          </div>

          <Link className="button button--dark" to="/contact">
            Contact Our Team
          </Link>
        </div>

        <div className="faq-section__list">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                className={`faq-section__item ${
                  isOpen ? "faq-section__item--open" : ""
                }`}
                key={faq.question}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <FiChevronDown />
                </button>

                <div className="faq-section__answer">
                  <p>{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}