import {
  FiBookOpen,
  FiHome,
  FiLogOut,
  FiMail,
  FiPlusCircle,
} from "react-icons/fi";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  clearAdminSession,
} from "../services/adminAuth";

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  mobileOpen,
  onClose,
}: AdminSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminSession();

    onClose();

    navigate("/admin/login", {
      replace: true,
    });
  };

  const getNavLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    isActive
      ? "admin-sidebar__link admin-sidebar__link--active"
      : "admin-sidebar__link";

  return (
    <>
      {/* ===================================================
          MOBILE BACKDROP
      =================================================== */}

      <button
        className={`admin-sidebar__backdrop ${
          mobileOpen
            ? "admin-sidebar__backdrop--visible"
            : ""
        }`}
        type="button"
        aria-label="Close admin navigation"
        onClick={onClose}
      />

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`admin-sidebar ${
          mobileOpen
            ? "admin-sidebar--open"
            : ""
        }`}
        aria-label="Admin navigation"
      >
        {/* =================================================
            BRAND
        ================================================= */}

        <div className="admin-sidebar__brand">
          <img
            src="/privatechauffeurmelbourne.png"
            alt="Private Chauffeur Melbourne"
          />

          <div>
            <strong>
              PCM Admin
            </strong>

            <span>
              Content Management
            </span>
          </div>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="admin-sidebar__nav">
          <span className="admin-sidebar__label">
            Overview
          </span>

          <NavLink
            end
            to="/admin"
            onClick={onClose}
            className={getNavLinkClass}
          >
            <FiHome aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>

          <span className="admin-sidebar__label">
            Content
          </span>

          <NavLink
            to="/admin/blogs"
            onClick={onClose}
            className={getNavLinkClass}
          >
            <FiBookOpen aria-hidden="true" />
            <span>All Blogs</span>
          </NavLink>

          <NavLink
            to="/admin/blogs/new"
            onClick={onClose}
            className={getNavLinkClass}
          >
            <FiPlusCircle aria-hidden="true" />
            <span>Add Blog</span>
          </NavLink>

          <span className="admin-sidebar__label">
            System
          </span>

          <NavLink
            to="/admin/mail-settings"
            onClick={onClose}
            className={getNavLinkClass}
          >
            <FiMail aria-hidden="true" />
            <span>Mail Settings</span>
          </NavLink>
        </nav>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          className="admin-sidebar__logout"
          type="button"
          onClick={handleLogout}
        >
          <FiLogOut aria-hidden="true" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}