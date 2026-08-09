import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiLogIn,
  FiMail,
} from "react-icons/fi";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  adminLogin,
  isAdminAuthenticated,
} from "../services/adminAuth";

import "../styles/adminLogin.css";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    document.title =
      "Admin Login | Private Chauffeur Melbourne";
  }, []);

  /* =======================================================
     ALREADY LOGGED IN
  ======================================================= */

  if (isAdminAuthenticated()) {
    return (
      <Navigate
        replace
        to="/admin"
      />
    );
  }

  const from =
    (
      location.state as {
        from?: string;
      } | null
    )?.from || "/admin";

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password.",
      );

      return;
    }

    try {
      setLoading(true);

      await adminLogin(
        email.trim(),
        password,
      );

      navigate(from, {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        className="admin-login__background"
        aria-hidden="true"
      />

      <div
        className="admin-login__overlay"
        aria-hidden="true"
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="admin-login__container">
        {/* =================================================
            BRAND
        ================================================= */}

        <section className="admin-login__brand">
          <div className="admin-login__logo">
            <img
              src="/privatechauffeurmelbourne.png"
              alt="Private Chauffeur Melbourne"
            />
          </div>

          <span>
            Administration
          </span>

          <h1>
            Private Chauffeur
            <br />
            Melbourne
          </h1>

          <p>
            Secure administration for website
            blogs and email configuration.
          </p>
        </section>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <section className="admin-login__card">
          <div className="admin-login__heading">
            <span>
              Admin Access
            </span>

            <h2>
              Welcome back.
            </h2>

            <p>
              Sign in to manage website content
              and mail settings.
            </p>
          </div>

          {/* ERROR MESSAGE */}

          {error && (
            <div
              className="admin-login__error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* LOGIN FORM */}

          <form
            className="admin-login__form"
            onSubmit={handleSubmit}
          >
            {/* EMAIL */}

            <label>
              <span>
                Email Address
              </span>

              <div className="admin-login__input">
                <FiMail aria-hidden="true" />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                  placeholder="admin@example.com"
                  autoComplete="email"
                  disabled={loading}
                  required
                />
              </div>
            </label>

            {/* PASSWORD */}

            <label>
              <span>
                Password
              </span>

              <div className="admin-login__input">
                <FiLock aria-hidden="true" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current,
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  title={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FiEyeOff
                      aria-hidden="true"
                    />
                  ) : (
                    <FiEye
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </label>

            {/* SUBMIT */}

            <button
              className="admin-login__submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <FiLogIn
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </form>

          <p className="admin-login__security">
            Authorised administrators only.
          </p>
        </section>
      </div>
    </main>
  );
}