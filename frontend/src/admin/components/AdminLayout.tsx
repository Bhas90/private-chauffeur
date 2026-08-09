import { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  getCurrentAdmin,
  isAdminAuthenticated,
} from "../services/adminAuth";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

import "../styles/admin.css";

export default function AdminLayout() {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [checking, setChecking] =
    useState(true);

  const [validSession, setValidSession] =
    useState(isAdminAuthenticated());

  /* =======================================================
     VALIDATE ADMIN SESSION
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const validateSession = async () => {
      if (!isAdminAuthenticated()) {
        if (mounted) {
          setValidSession(false);
          setChecking(false);
        }

        return;
      }

      try {
        await getCurrentAdmin();

        if (mounted) {
          setValidSession(true);
        }
      } catch {
        if (mounted) {
          setValidSession(false);
        }
      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    };

    void validateSession();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     CLOSE MOBILE SIDEBAR AFTER ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (checking) {
    return (
      <div className="admin-loading">
        <div
          className="admin-loading__spinner"
          aria-hidden="true"
        />

        <span>
          Loading administration...
        </span>
      </div>
    );
  }

  /* =======================================================
     NOT AUTHENTICATED
  ======================================================= */

  if (!validSession) {
    return (
      <Navigate
        replace
        to="/admin/login"
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  /* =======================================================
     ADMIN LAYOUT
  ======================================================= */

  return (
    <div className="admin-shell">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => {
          setMobileOpen(false);
        }}
      />

      <div className="admin-shell__main">
        <AdminHeader
          onMenuClick={() => {
            setMobileOpen(true);
          }}
        />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}