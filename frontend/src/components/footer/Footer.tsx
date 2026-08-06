import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { siteConfig } from "../../config/siteConfig";
import "./footer.css";

const legalLinks = [
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    path: "/terms-and-conditions",
  },
  {
    label: "Refund Policy",
    path: "/cancellation-and-refund-policy",
  },
  {
    label: "Cookie Policy",
    path: "/cookie-policy",
  },
  {
    label: "Report a Problem",
    path: "/report-a-problem",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__copyright">
          © {currentYear} {siteConfig.businessName}. All rights reserved.
        </p>

        <div className="site-footer__social">
          <a
            href="#"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
          >
            <FiFacebook />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <FiInstagram />
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin />
          </a>
        </div>

        <nav className="site-footer__legal" aria-label="Legal navigation">
          {legalLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}