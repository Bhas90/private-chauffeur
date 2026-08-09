import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import App from "./App";

/* =========================================================
   GLOBAL STYLES
========================================================= */

import "./styles/global.css";

/* =========================================================
   ADMIN STYLES
========================================================= */

import "./admin/styles/admin.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);