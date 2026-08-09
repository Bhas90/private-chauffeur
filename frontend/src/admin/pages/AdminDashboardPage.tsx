import {
  FiBookOpen,
  FiEdit3,
  FiMail,
  FiPlusCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="admin-page-heading">
        <div>
          <span>Dashboard</span>

          <h1>
            Website Administration
          </h1>

          <p>
            Manage chauffeur travel articles
            and website email configuration.
          </p>
        </div>

        <Link
          className="admin-primary-button"
          to="/admin/blogs/new"
        >
          <FiPlusCircle aria-hidden="true" />
          Add New Blog
        </Link>
      </div>

      {/* ===================================================
          DASHBOARD CARDS
      =================================================== */}

      <div className="admin-dashboard__cards">
        {/* BLOG MANAGEMENT */}

        <article>
          <span>
            <FiBookOpen aria-hidden="true" />
          </span>

          <div>
            <small>Blog CMS</small>

            <strong>
              Manage Articles
            </strong>

            <p>
              Create, edit, publish and manage
              website blog content.
            </p>
          </div>

          <Link to="/admin/blogs">
            Open Blogs
          </Link>
        </article>

        {/* ADD BLOG */}

        <article>
          <span>
            <FiEdit3 aria-hidden="true" />
          </span>

          <div>
            <small>Content</small>

            <strong>
              Add New Article
            </strong>

            <p>
              Prepare travel guides, news and
              chauffeur-related articles.
            </p>
          </div>

          <Link to="/admin/blogs/new">
            Create Blog
          </Link>
        </article>

        {/* MAIL SETTINGS */}

        <article>
          <span>
            <FiMail aria-hidden="true" />
          </span>

          <div>
            <small>Email</small>

            <strong>
              SMTP Settings
            </strong>

            <p>
              Configure Nodemailer and send
              test emails from the website.
            </p>
          </div>

          <Link to="/admin/mail-settings">
            Mail Settings
          </Link>
        </article>
      </div>
    </div>
  );
}