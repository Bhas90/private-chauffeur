import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import "./scrollToTop.css";

export default function ScrollToTop() {
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  /*
   * Automatically scroll to the top whenever
   * the route changes.
   */
  useEffect(() => {
    requestAnimationFrame(() => {
      /*
       * If the URL contains a hash,
       * scroll to that section.
       */
      if (location.hash) {
        const element = document.getElementById(
          location.hash.replace("#", ""),
        );

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          return;
        }
      }

      /*
       * Otherwise always start the page
       * from the very top.
       */
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  }, [
    location.pathname,
    location.search,
    location.hash,
  ]);

  /*
   * Show floating button after scrolling.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Back to top"
      onClick={scrollToTop}
      className={`scroll-to-top ${
        isVisible
          ? "scroll-to-top--visible"
          : ""
      }`}
    >
      <FiArrowUp />

      <span className="sr-only">
        Scroll to top
      </span>
    </button>
  );
}