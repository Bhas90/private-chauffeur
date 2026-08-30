import {
  Outlet,
  useLocation,
} from "react-router-dom";

import ScrollToTop from "../components/common/ScrollToTop";
import Footer from "../components/footer/Footer";
import FleetPromoPopup from "../components/fleet/FleetPromoPopup";

export default function PublicLayout() {
  const location =
    useLocation();

  /*
   * Do not show the promotional popup
   * on pages where it would interrupt
   * a booking/conversion or advertise
   * the vehicle the customer is
   * already viewing.
   */
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

      <Outlet />

      {shouldShowFleetPromo && (
        <FleetPromoPopup />
      )}

      <Footer />
    </>
  );
}