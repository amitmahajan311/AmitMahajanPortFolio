import React, { useEffect } from "react";
import { portfolioData } from "../portfolioData";

export default function Certifications() {
  const certs = portfolioData.certifications;

  useEffect(() => {
    document.title = "Certifications | Amit Mahajan";
  }, []);

  // Render a clean logo outline depending on the color class
  const getBadgeIcon = (color) => {
    switch (color) {
      case "azure":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        );
      case "aws":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 10l7-7 7 7-7 7-7-7z"/><path d="M12 3v14"/></svg>
        );
      case "snowflake":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><path d="m19 9-7 3 7 3"/></svg>
        );
      case "matillion":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7l6 10V7"/></svg>
        );
      case "selenium":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        );
      case "green":
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        );
    }
  };

  return (
    <section className="section certifications-section" id="certifications">
      <div className="container">
        <h2 className="section-title">Certifications & Training</h2>
        <p className="section-subtitle">
          Validated capabilities across AI engineering, cloud solutions architecture, data pipelines, and test automation.
        </p>

        {/* Certifications Grid */}
        <div className="certs-grid grid-3 reveal-on-scroll">
          {certs.map((cert, index) => (
            <div className={`cert-card glowing-card border-glow-${cert.color}`} key={index}>
              <div className="cert-card-top">
                <div className={`cert-icon-wrapper theme-${cert.color}`}>
                  {getBadgeIcon(cert.color)}
                </div>
                <span className="cert-badge-tag">{cert.badge}</span>
              </div>
              <h3 className="cert-card-title">{cert.title}</h3>
              <p className="cert-card-issuer">Issued by {cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .certifications-section {
          background-color: var(--bg-secondary);
        }
        .cert-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          min-height: 190px;
          height: 100%;
        }
        .cert-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 1.5rem;
        }
        .cert-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
        }
        
        /* Custom vendor colors */
        .cert-icon-wrapper.theme-azure {
          color: var(--accent-blue);
          background: rgba(59, 130, 246, 0.08);
          border-color: rgba(59, 130, 246, 0.2);
        }
        .cert-icon-wrapper.theme-aws {
          color: var(--accent-aws);
          background: rgba(255, 153, 0, 0.08);
          border-color: rgba(255, 153, 0, 0.2);
        }
        .cert-icon-wrapper.theme-snowflake {
          color: var(--accent-snowflake);
          background: rgba(41, 182, 246, 0.08);
          border-color: rgba(41, 182, 246, 0.2);
        }
        .cert-icon-wrapper.theme-matillion {
          color: #ec4899; /* pink-500 */
          background: rgba(236, 72, 153, 0.08);
          border-color: rgba(236, 72, 153, 0.2);
        }
        .cert-icon-wrapper.theme-selenium {
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          border-color: rgba(6, 182, 212, 0.2);
        }
        .cert-icon-wrapper.theme-green {
          color: #10b981; /* green-500 */
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .cert-badge-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          color: var(--text-secondary);
        }
        
        .cert-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 0.5rem;
          flex: 1;
        }
        
        .cert-card-issuer {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Specific border hover color mappings based on badge issuer */
        .border-glow-azure:hover { border-color: var(--accent-blue); }
        .border-glow-aws:hover { border-color: var(--accent-aws); }
        .border-glow-snowflake:hover { border-color: var(--accent-snowflake); }
        .border-glow-matillion:hover { border-color: #ec4899; }
        .border-glow-selenium:hover { border-color: var(--accent-cyan); }
        .border-glow-green:hover { border-color: #10b981; }
      `}</style>
    </section>
  );
}
