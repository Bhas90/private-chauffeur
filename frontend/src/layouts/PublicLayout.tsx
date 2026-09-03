import {
  Outlet,
  useLocation,
} from "react-router-dom";

import ChildSafetyBanner from "../components/common/ChildSafetyBanner";
import ScrollToTop from "../components/common/ScrollToTop";
import Footer from "../components/footer/Footer";
import FleetPromoPopup from "../components/fleet/FleetPromoPopup";

export default function PublicLayout() {
  const location =
    useLocation();

  /* =======================================================
     FLEET PROMO VISIBILITY
  ======================================================= */

  const hiddenPopupPaths = [
    "/fleet/bmw-x7",
    "/get-a-quote",
    "/thank-you",
  ];

  const shouldShowFleetPromo =
    !hiddenPopupPaths.some(
      (path) =>
        location.pathname ===
        path,
    );

  return (
    <>
      <ScrollToTop />

      {/* ===================================================
          GLOBAL CHILD SAFETY BANNER
      =================================================== */}

      <ChildSafetyBanner />

      {/* ===================================================
          PUBLIC PAGE CONTENT
      =================================================== */}

      <Outlet />

      {/* ===================================================
          FLEET PROMO POPUP
      =================================================== */}

      {shouldShowFleetPromo && (
        <FleetPromoPopup />
      )}

      {/* ===================================================
          FOOTER
      =================================================== */}

      <Footer />
    </>
  );
}