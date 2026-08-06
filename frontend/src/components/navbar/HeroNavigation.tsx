import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  FiChevronDown,
  FiMenu,
  FiPhone,
  FiX,
} from "react-icons/fi";

import { siteConfig } from "../../config/siteConfig";
import { serviceAreasData } from "../../data/serviceAreasData";
import { routePaths } from "../../routes/routePaths";

import "./heroNavigation.css";

interface NavigationItem {
  label: string;
  path: string;
}

interface HeroNavigationProps {
  variant?: "hero" | "inner";
}

const serviceItems: NavigationItem[] = [
  {
    label: "Airport Transfers",
    path: `${routePaths.services}/airport-transfers-melbourne`,
  },
  {
    label: "Corporate Chauffeur",
    path: `${routePaths.services}/corporate-chauffeur-melbourne`,
  },
  {
    label: "Wedding Chauffeur",
    path: `${routePaths.services}/wedding-chauffeur-melbourne`,
  },
  {
    label: "Hotel Transfers",
    path: `${routePaths.services}/hotel-transfers-melbourne`,
  },
  {
    label: "Conference Transfers",
    path: `${routePaths.services}/conference-transfers-melbourne`,
  },
  {
    label: "Hourly Chauffeur Hire",
    path: `${routePaths.services}/hourly-chauffeur-hire-melbourne`,
  },
  {
    label: "Private Tours",
    path: `${routePaths.services}/private-car-tours-melbourne`,
  },
  {
    label: "Group Transfers",
    path: `${routePaths.services}/group-transfers-melbourne`,
  },
];

export default function HeroNavigation({
  variant = "hero",
}: HeroNavigationProps) {
  const location = useLocation();

  const [isSticky, setIsSticky] =
    useState(false);

  const [isMobileOpen, setIsMobileOpen] =
    useState(false);

  const [
    mobileServicesOpen,
    setMobileServicesOpen,
  ] = useState(false);

  const [
    mobileAreasOpen,
    setMobileAreasOpen,
  ] = useState(false);

  const featuredAreaItems = useMemo(
    () => serviceAreasData.slice(0, 10),
    [],
  );

  const isServicesActive =
    location.pathname ===
      routePaths.services ||
    location.pathname.startsWith(
      `${routePaths.services}/`,
    );

  const isServiceAreasActive =
    location.pathname ===
      routePaths.serviceAreas ||
    location.pathname.startsWith(
      `${routePaths.serviceAreas}/`,
    );

  useEffect(() => {
    if (variant === "inner") {
      setIsSticky(false);
      return;
    }

    const handleScroll = () => {
      const heroElement =
        document.querySelector<HTMLElement>(
          ".hero-header",
        );

      const heroHeight =
        heroElement?.offsetHeight ??
        window.innerHeight;

      setIsSticky(
        window.scrollY >= heroHeight - 80,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );
    };
  }, [variant]);

  useEffect(() => {
    document.body.classList.toggle(
      "menu-open",
      isMobileOpen,
    );

    return () => {
      document.body.classList.remove(
        "menu-open",
      );
    };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileAreasOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
        setMobileServicesOpen(false);
        setMobileAreasOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileAreasOpen(false);
  };

  const toggleMobileServices = () => {
    setMobileServicesOpen(
      (current) => !current,
    );

    setMobileAreasOpen(false);
  };

  const toggleMobileAreas = () => {
    setMobileAreasOpen(
      (current) => !current,
    );

    setMobileServicesOpen(false);
  };

  const navigationClassName = [
    "hero-navigation",
    variant === "inner"
      ? "hero-navigation--inner"
      : "",
    variant === "hero" && isSticky
      ? "hero-navigation--sticky"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={navigationClassName}>
        <div className="container hero-navigation__inner">
          <Link
            className="hero-navigation__logo"
            to={routePaths.home}
            aria-label={`${siteConfig.businessName} home`}
          >
            <img
              className="hero-navigation__logo-image"
              src="/privatechauffeurmelbourne.png"
              alt={`${siteConfig.businessName} logo`}
            />
          </Link>

          <nav
            className="hero-navigation__desktop"
            aria-label="Main navigation"
          >
            <NavLink to={routePaths.home}>
              Home
            </NavLink>

            <div className="hero-navigation__dropdown">
              <NavLink
                to={routePaths.services}
                className={
                  isServicesActive
                    ? "active"
                    : undefined
                }
              >
                Services

                <FiChevronDown
                  aria-hidden="true"
                />
              </NavLink>

              <div className="hero-navigation__dropdown-menu">
                {serviceItems.map(
                  (service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                    >
                      {service.label}
                    </Link>
                  ),
                )}

                <Link
                  className="hero-navigation__all-link"
                  to={routePaths.services}
                >
                  View All Services
                </Link>
              </div>
            </div>

            <NavLink to={routePaths.fleet}>
              Fleet
            </NavLink>

            <div className="hero-navigation__dropdown">
              <NavLink
                to={routePaths.serviceAreas}
                className={
                  isServiceAreasActive
                    ? "active"
                    : undefined
                }
              >
                Service Areas

                <FiChevronDown
                  aria-hidden="true"
                />
              </NavLink>

              <div className="hero-navigation__dropdown-menu hero-navigation__dropdown-menu--areas">
                {featuredAreaItems.map(
                  (area) => (
                    <Link
                      key={area.slug}
                      to={`${routePaths.serviceAreas}/${area.slug}`}
                    >
                      {area.name}
                    </Link>
                  ),
                )}

                <Link
                  className="hero-navigation__all-link"
                  to={routePaths.serviceAreas}
                >
                  View All Service Areas
                </Link>
              </div>
            </div>

            <NavLink to={routePaths.about}>
              About
            </NavLink>

            <NavLink to={routePaths.blog}>
              Blog
            </NavLink>

            <NavLink to={routePaths.contact}>
              Contact
            </NavLink>
          </nav>

          <div className="hero-navigation__actions">
            <a
              className="hero-navigation__phone"
              href={siteConfig.phoneHref}
              aria-label={`Call ${siteConfig.businessName}`}
            >
              <FiPhone
                aria-hidden="true"
              />

              <span>
                {siteConfig.phone}
              </span>
            </a>

            <Link
              className="hero-navigation__quote"
              to={routePaths.quote}
            >
              Get a Quote
            </Link>

            <button
              type="button"
              className="hero-navigation__menu-button"
              onClick={() =>
                setIsMobileOpen(true)
              }
              aria-label="Open navigation menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
            >
              <FiMenu
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`hero-mobile-overlay ${
          isMobileOpen
            ? "hero-mobile-overlay--open"
            : ""
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={`hero-mobile-menu ${
          isMobileOpen
            ? "hero-mobile-menu--open"
            : ""
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileOpen}
      >
        <div className="hero-mobile-menu__header">
          <Link
            className="hero-mobile-menu__logo"
            to={routePaths.home}
            onClick={closeMobileMenu}
            aria-label={`${siteConfig.businessName} home`}
          >
            <img
              src="/privatechauffeurmelbourne.png"
              alt={`${siteConfig.businessName} logo`}
            />
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            <FiX
              aria-hidden="true"
            />
          </button>
        </div>

        <nav aria-label="Mobile main navigation">
          <NavLink
            to={routePaths.home}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

          <button
            type="button"
            onClick={toggleMobileServices}
            aria-expanded={
              mobileServicesOpen
            }
            aria-controls="mobile-services-menu"
          >
            <span>Services</span>

            <FiChevronDown
              aria-hidden="true"
              className={
                mobileServicesOpen
                  ? "hero-mobile-menu__icon--open"
                  : ""
              }
            />
          </button>

          <div
            id="mobile-services-menu"
            className={`hero-mobile-menu__services ${
              mobileServicesOpen
                ? "hero-mobile-menu__services--open"
                : ""
            }`}
          >
            <NavLink
              to={routePaths.services}
              onClick={closeMobileMenu}
            >
              View All Services
            </NavLink>

            {serviceItems.map(
              (service) => (
                <NavLink
                  key={service.path}
                  to={service.path}
                  onClick={closeMobileMenu}
                >
                  {service.label}
                </NavLink>
              ),
            )}
          </div>

          <NavLink
            to={routePaths.fleet}
            onClick={closeMobileMenu}
          >
            Fleet
          </NavLink>

          <button
            type="button"
            onClick={toggleMobileAreas}
            aria-expanded={
              mobileAreasOpen
            }
            aria-controls="mobile-service-areas-menu"
          >
            <span>Service Areas</span>

            <FiChevronDown
              aria-hidden="true"
              className={
                mobileAreasOpen
                  ? "hero-mobile-menu__icon--open"
                  : ""
              }
            />
          </button>

          <div
            id="mobile-service-areas-menu"
            className={`hero-mobile-menu__services ${
              mobileAreasOpen
                ? "hero-mobile-menu__services--open"
                : ""
            }`}
          >
            <NavLink
              to={routePaths.serviceAreas}
              onClick={closeMobileMenu}
            >
              View All Service Areas
            </NavLink>

            {serviceAreasData.map(
              (area) => (
                <NavLink
                  key={area.slug}
                  to={`${routePaths.serviceAreas}/${area.slug}`}
                  onClick={closeMobileMenu}
                >
                  {area.name}
                </NavLink>
              ),
            )}
          </div>

          <NavLink
            to={routePaths.about}
            onClick={closeMobileMenu}
          >
            About
          </NavLink>

          <NavLink
            to={routePaths.blog}
            onClick={closeMobileMenu}
          >
            Blog
          </NavLink>

          <NavLink
            to={routePaths.contact}
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
        </nav>

        <div className="hero-mobile-menu__footer">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Call ${siteConfig.businessName}`}
          >
            <FiPhone
              aria-hidden="true"
            />

            {siteConfig.phone}
          </a>

          <Link
            to={routePaths.quote}
            onClick={closeMobileMenu}
          >
            Get a Quote
          </Link>
        </div>
      </aside>
    </>
  );
}