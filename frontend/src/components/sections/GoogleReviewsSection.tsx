import {
  FiExternalLink,
  FiMessageCircle,
  FiStar,
} from "react-icons/fi";

import "./googleReviewsSection.css";

export default function GoogleReviewsSection() {
  return (
    <section className="google-reviews section">
      <div className="container">
        <div className="google-reviews__panel">
          <div className="google-reviews__content">
            <span className="eyebrow">Google Customer Reviews</span>

            <h2 className="section-title">
              Genuine customer experiences will appear here.
            </h2>

            <p className="section-description">
              This section is prepared for verified Google reviews. Reviews
              will be connected through the admin panel or Google Business
              Profile integration without displaying invented testimonials.
            </p>

            <div className="google-reviews__rating">
              <div>
                {[1, 2, 3, 4, 5].map((item) => (
                  <FiStar key={item} />
                ))}
              </div>

              <span>Verified Google reviews integration ready</span>
            </div>
          </div>

          <div className="google-reviews__placeholder">
            <FiMessageCircle />

            <strong>Customer reviews coming soon</strong>

            <p>
              Add genuine review content, reviewer name, rating and Google
              review link from the admin dashboard.
            </p>

            <button type="button" disabled>
              View Google Reviews
              <FiExternalLink />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}