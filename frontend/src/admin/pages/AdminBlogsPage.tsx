import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FiCheckCircle,
  FiEdit2,
  FiEye,
  FiFileText,
  FiPlusCircle,
  FiRefreshCw,
  FiSearch,
  FiStar,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import {
  deleteAdminBlog,
  getAdminBlogs,
  publishAdminBlog,
  unpublishAdminBlog,
} from "../services/blogAdminApi";

import type {
  AdminBlog,
  BlogStatus,
} from "../services/blogAdminApi";

import "../styles/adminBlogs.css";

/* =========================================================
   TYPES
========================================================= */

type StatusFilter =
  | "ALL"
  | BlogStatus;

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (
  value: string | null,
): string => {
  if (!value) {
    return "Not published";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-AU",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
};

/* =========================================================
   COMPONENT
========================================================= */

export default function AdminBlogsPage() {
  const navigate = useNavigate();

  const [blogs, setBlogs] =
    useState<AdminBlog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  /* =======================================================
     LOAD BLOGS
  ======================================================= */

  const loadBlogs = useCallback(
    async (silent = false) => {
      try {
        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response =
          await getAdminBlogs();

        setBlogs(response);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load blogs.";

        toast.error(message);

        if (
          message
            .toLowerCase()
            .includes("session")
        ) {
          navigate(
            "/admin/login",
            {
              replace: true,
            },
          );
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    void loadBlogs();
  }, [loadBlogs]);

  /* =======================================================
     FILTER BLOGS
  ======================================================= */

  const filteredBlogs =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      return blogs.filter(
        (blog) => {
          const matchesSearch =
            !query ||
            blog.title
              .toLowerCase()
              .includes(query) ||
            blog.category
              .toLowerCase()
              .includes(query) ||
            blog.author
              .toLowerCase()
              .includes(query) ||
            blog.slug
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "ALL" ||
            blog.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      blogs,
      search,
      statusFilter,
    ]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const totalBlogs =
    blogs.length;

  const publishedBlogs =
    blogs.filter(
      (blog) =>
        blog.status === "PUBLISHED",
    ).length;

  const draftBlogs =
    blogs.filter(
      (blog) =>
        blog.status === "DRAFT",
    ).length;

  const featuredBlogs =
    blogs.filter(
      (blog) => blog.featured,
    ).length;

  /* =======================================================
     PUBLISH / UNPUBLISH
  ======================================================= */

  const handleStatusToggle = async (
    blog: AdminBlog,
  ) => {
    try {
      setUpdatingId(blog.id);

      const updatedBlog =
        blog.status === "PUBLISHED"
          ? await unpublishAdminBlog(
              blog.id,
            )
          : await publishAdminBlog(
              blog.id,
            );

      setBlogs((current) =>
        current.map((item) =>
          item.id === blog.id
            ? updatedBlog
            : item,
        ),
      );

      toast.success(
        updatedBlog.status ===
          "PUBLISHED"
          ? "Blog published successfully."
          : "Blog moved to draft.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update blog.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =======================================================
     DELETE BLOG
  ======================================================= */

  const handleDelete = async (
    blog: AdminBlog,
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${blog.title}"?\n\nThis action cannot be undone.`,
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(blog.id);

      await deleteAdminBlog(
        blog.id,
      );

      setBlogs((current) =>
        current.filter(
          (item) =>
            item.id !== blog.id,
        ),
      );

      toast.success(
        "Blog deleted successfully.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete blog.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="admin-blogs">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="admin-page-heading">
        <div>
          <span>
            Blog CMS
          </span>

          <h1>
            Manage Articles
          </h1>

          <p>
            Create, edit, publish and manage
            chauffeur travel articles from
            one place.
          </p>
        </div>

        <Link
          className="admin-primary-button"
          to="/admin/blogs/new"
        >
          <FiPlusCircle
            aria-hidden="true"
          />

          Add New Blog
        </Link>
      </div>

      {/* ===================================================
          SUMMARY
      =================================================== */}

      <div className="admin-blogs__summary">
        <article>
          <span>
            <FiFileText
              aria-hidden="true"
            />
          </span>

          <div>
            <strong>
              {totalBlogs}
            </strong>

            <small>
              Total Blogs
            </small>
          </div>
        </article>

        <article>
          <span>
            <FiCheckCircle
              aria-hidden="true"
            />
          </span>

          <div>
            <strong>
              {publishedBlogs}
            </strong>

            <small>
              Published
            </small>
          </div>
        </article>

        <article>
          <span>
            <FiXCircle
              aria-hidden="true"
            />
          </span>

          <div>
            <strong>
              {draftBlogs}
            </strong>

            <small>
              Drafts
            </small>
          </div>
        </article>

        <article>
          <span>
            <FiStar
              aria-hidden="true"
            />
          </span>

          <div>
            <strong>
              {featuredBlogs}
            </strong>

            <small>
              Featured
            </small>
          </div>
        </article>
      </div>

      {/* ===================================================
          FILTER BAR
      =================================================== */}

      <div className="admin-blogs__toolbar">
        <div className="admin-blogs__search">
          <FiSearch
            aria-hidden="true"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search blogs..."
            aria-label="Search blogs"
          />
        </div>

        <div className="admin-blogs__toolbar-actions">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target
                  .value as StatusFilter,
              )
            }
            aria-label="Filter blog status"
          >
            <option value="ALL">
              All Statuses
            </option>

            <option value="PUBLISHED">
              Published
            </option>

            <option value="DRAFT">
              Draft
            </option>
          </select>

          <button
            type="button"
            disabled={refreshing}
            onClick={() =>
              void loadBlogs(true)
            }
          >
            <FiRefreshCw
              aria-hidden="true"
              className={
                refreshing
                  ? "admin-blogs__spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>
      </div>

      {/* ===================================================
          BLOG LIST
      =================================================== */}

      <section className="admin-blogs__panel">
        {loading ? (
          <div className="admin-blogs__loading">
            <span
              aria-hidden="true"
            />

            <p>
              Loading articles...
            </p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="admin-blogs__empty">
            <FiFileText
              aria-hidden="true"
            />

            <h2>
              No articles found.
            </h2>

            <p>
              {blogs.length === 0
                ? "Create your first chauffeur travel article."
                : "Try changing your search or status filter."}
            </p>

            {blogs.length === 0 && (
              <Link
                className="admin-primary-button"
                to="/admin/blogs/new"
              >
                <FiPlusCircle
                  aria-hidden="true"
                />

                Add First Blog
              </Link>
            )}
          </div>
        ) : (
          <div className="admin-blogs__table-wrap">
            <table className="admin-blogs__table">
              <thead>
                <tr>
                  <th>
                    Article
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Published
                  </th>

                  <th>
                    Featured
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.map(
                  (blog) => (
                    <tr key={blog.id}>
                      {/* ARTICLE */}

                      <td>
                        <div className="admin-blogs__article">
                          <div className="admin-blogs__thumbnail">
                            {blog.image ? (
                              <img
                                src={
                                  blog.image
                                }
                                alt={
                                  blog.title
                                }
                                loading="lazy"
                              />
                            ) : (
                              <FiFileText
                                aria-hidden="true"
                              />
                            )}
                          </div>

                          <div>
                            <strong>
                              {
                                blog.title
                              }
                            </strong>

                            <span>
                              /blog/
                              {blog.slug}
                            </span>

                            <small>
                              {
                                blog.author
                              }
                              {" • "}
                              {
                                blog.readingTime
                              }
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}

                      <td>
                        <span className="admin-blogs__category">
                          {
                            blog.category
                          }
                        </span>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`admin-blogs__status ${
                            blog.status ===
                            "PUBLISHED"
                              ? "admin-blogs__status--published"
                              : "admin-blogs__status--draft"
                          }`}
                        >
                          {blog.status ===
                          "PUBLISHED"
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      {/* DATE */}

                      <td>
                        {formatDate(
                          blog.publishedAt,
                        )}
                      </td>

                      {/* FEATURED */}

                      <td>
                        {blog.featured ? (
                          <span className="admin-blogs__featured">
                            <FiStar
                              aria-hidden="true"
                            />

                            Yes
                          </span>
                        ) : (
                          <span>
                            No
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="admin-blogs__actions">
                          {blog.status ===
                            "PUBLISHED" && (
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              title="View article"
                              aria-label={`View ${blog.title}`}
                            >
                              <FiEye
                                aria-hidden="true"
                              />
                            </a>
                          )}

                          <Link
                            to={`/admin/blogs/${blog.id}/edit`}
                            title="Edit article"
                            aria-label={`Edit ${blog.title}`}
                          >
                            <FiEdit2
                              aria-hidden="true"
                            />
                          </Link>

                          <button
                            type="button"
                            disabled={
                              updatingId ===
                              blog.id
                            }
                            onClick={() =>
                              void handleStatusToggle(
                                blog,
                              )
                            }
                            title={
                              blog.status ===
                              "PUBLISHED"
                                ? "Move to draft"
                                : "Publish article"
                            }
                            aria-label={
                              blog.status ===
                              "PUBLISHED"
                                ? `Move ${blog.title} to draft`
                                : `Publish ${blog.title}`
                            }
                          >
                            {blog.status ===
                            "PUBLISHED" ? (
                              <FiXCircle
                                aria-hidden="true"
                              />
                            ) : (
                              <FiCheckCircle
                                aria-hidden="true"
                              />
                            )}
                          </button>

                          <button
                            className="admin-blogs__delete"
                            type="button"
                            disabled={
                              deletingId ===
                              blog.id
                            }
                            onClick={() =>
                              void handleDelete(
                                blog,
                              )
                            }
                            title="Delete article"
                            aria-label={`Delete ${blog.title}`}
                          >
                            <FiTrash2
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}