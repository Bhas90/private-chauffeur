import { Outlet } from "react-router-dom";

import ScrollToTop from "../components/common/ScrollToTop";
import Footer from "../components/footer/Footer";

export default function PublicLayout() {
  return (
    <>
     <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}