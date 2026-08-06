import { Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";

import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";

import ServicesPage from "./pages/Services/ServicesPage";
import ServiceDetailPage from "./pages/Services/ServiceDetailPage";

import FleetPage from "./pages/Fleet/FleetPage";
import FleetDetailPage from "./pages/Fleet/FleetDetailPage";

import ServiceAreasPage from "./pages/ServiceAreas/ServiceAreasPage";
import ServiceAreaDetailPage from "./pages/ServiceAreas/ServiceAreaDetailPage";

import QuotePage from "./pages/Quote/QuotePage";
import ContactPage from "./pages/Contact/ContactPage";

import BlogPage from "./pages/Blogs/BlogPage";
import BlogDetailPage from "./pages/Blogs/BlogDetailPage";

import PrivacyPolicyPage from "./pages/Legal/PrivacyPolicyPage";
import RefundPolicyPage from "./pages/Legal/RefundPolicyPage";
import CookiePolicyPage from "./pages/Legal/CookiePolicyPage";

import TermsPage from "./pages/Terms/TermsPage";
import ReportProblemPage from "./pages/Support/ReportProblemPage";

import ThankYouPage from "./pages/ThankYou/ThankYouPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

import PlaceholderPage from "./pages/PlaceholderPage/PlaceholderPage";

import { routePaths } from "./routes/routePaths";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {/* Home */}
        <Route
          index
          element={<HomePage />}
        />

        {/* About */}
        <Route
          path={routePaths.about}
          element={<AboutPage />}
        />

        {/* Services */}
        <Route
          path={routePaths.services}
          element={<ServicesPage />}
        />

        <Route
          path={routePaths.serviceDetail}
          element={<ServiceDetailPage />}
        />

        {/* Fleet */}
        <Route
          path={routePaths.fleet}
          element={<FleetPage />}
        />

        <Route
          path={routePaths.fleetDetail}
          element={<FleetDetailPage />}
        />

        {/* Service Areas */}
        <Route
          path={routePaths.serviceAreas}
          element={<ServiceAreasPage />}
        />

        <Route
          path={routePaths.serviceAreaDetail}
          element={<ServiceAreaDetailPage />}
        />

        {/* Quote */}
        <Route
          path={routePaths.quote}
          element={<QuotePage />}
        />

        {/* Contact */}
        <Route
          path={routePaths.contact}
          element={<ContactPage />}
        />

        {/* Blog */}
        <Route
          path={routePaths.blog}
          element={<BlogPage />}
        />

        <Route
          path={routePaths.blogDetail}
          element={<BlogDetailPage />}
        />

        {/* FAQ */}
        <Route
          path={routePaths.faq}
          element={
            <PlaceholderPage
              title="Frequently Asked Questions"
              description="Find answers about bookings, airport transfers, vehicles, cancellations and chauffeur travel."
            />
          }
        />

        {/* Legal Pages */}
        <Route
          path={routePaths.privacy}
          element={<PrivacyPolicyPage />}
        />

        <Route
          path={routePaths.terms}
          element={<TermsPage />}
        />

        <Route
          path={routePaths.cancellationPolicy}
          element={<RefundPolicyPage />}
        />

        <Route
          path={routePaths.cookiePolicy}
          element={<CookiePolicyPage />}
        />

        {/* Support */}
        <Route
          path={routePaths.reportProblem}
          element={<ReportProblemPage />}
        />

        {/* Submission Confirmation */}
        <Route
          path={routePaths.thankYou}
          element={<ThankYouPage />}
        />

        {/* Optional direct 404 route */}
        <Route
          path={routePaths.notFound}
          element={<NotFoundPage />}
        />

        {/* Unknown URLs */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}