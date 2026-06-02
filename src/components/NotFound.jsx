import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Page Not Found | Amit Mahajan";
  }, []);

  return (
    <section className="notfound-section">
      <div className="container notfound-container">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-desc">
          Looks like you wandered into an uncharted zone. The page you're looking for doesn't exist.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            <span>Go Home</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            View Projects
          </Link>
        </div>
      </div>

      <style>{`
        .notfound-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 80px;
        }
        .notfound-container {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          max-width: 600px;
        }
        .notfound-code {
          font-family: var(--font-heading);
          font-size: 8rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.05em;
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.3;
        }
        .notfound-title {
          font-size: 2.5rem;
          font-weight: 800;
        }
        .notfound-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .notfound-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
