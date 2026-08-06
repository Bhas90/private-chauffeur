import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description = "This page is currently being prepared.",
}: PlaceholderPageProps) {
  return (
    <main className="page-content">
      <section className="section">
        <div className="container">
          <span className="eyebrow">Private Chauffeur Melbourne</span>

          <h1 className="section-title">{title}</h1>

          <p className="section-description">{description}</p>

          <div style={{ marginTop: "28px" }}>
            <Link className="button button--dark" to="/">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}