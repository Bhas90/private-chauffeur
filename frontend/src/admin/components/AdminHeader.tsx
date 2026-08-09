import {
  FiMenu,
  FiUser,
} from "react-icons/fi";

import {
  getStoredAdmin,
} from "../services/adminAuth";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const admin = getStoredAdmin();

  return (
    <header className="admin-header">
      {/* ===================================================
          MOBILE MENU
      =================================================== */}

      <button
        className="admin-header__menu"
        type="button"
        onClick={onMenuClick}
        aria-label="Open admin navigation"
        title="Open navigation"
      >
        <FiMenu aria-hidden="true" />
      </button>

      {/* ===================================================
          ADMIN TITLE
      =================================================== */}

      <div className="admin-header__title">
        <span>
          Private Chauffeur Melbourne
        </span>

        <strong>
          Administration
        </strong>
      </div>

      {/* ===================================================
          ADMIN PROFILE
      =================================================== */}

      <div className="admin-header__profile">
        <span
          className="admin-header__avatar"
          aria-hidden="true"
        >
          <FiUser />
        </span>

        <div>
          <strong>
            {admin?.name || "Administrator"}
          </strong>

          {admin?.email && (
            <span>
              {admin.email}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}