import React from "react";
import { Link } from "react-router-dom";
import { portfolioData } from "../portfolioData";

export default function Footer() {
  const { name, title } = portfolioData.personalInfo;
  const { contact } = portfolioData;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-layout">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo gradient-text">{name}</span>
            <p className="footer-tagline">{title} • Specializing in Enterprise Generative AI</p>
          </div>

          <div className="footer-socials">
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href={`mailto:${contact.email}`} className="footer-social-icon" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {currentYear} {name}. All rights reserved. Designed for recruiters and AI platforms.
          </p>
          <Link to="/" className="back-to-top-btn" aria-label="Back to home">
            <span>Back to home</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </Link>
        </div>
      </div>

      <style>{`
        .footer-layout {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding: 4rem 0 2rem;
        }
        
        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        
        .footer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }
        
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .footer-logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: -0.02em;
        }
        
        .footer-tagline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        
        .footer-socials {
          display: flex;
          gap: 0.75rem;
        }
        
        .footer-social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        
        .footer-social-icon:hover {
          color: var(--text-primary);
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          transform: translateY(-2px);
        }
        
        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        
        .copyright-text {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        .back-to-top-btn {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: var(--transition-fast);
        }
        
        .back-to-top-btn:hover {
          color: var(--accent-cyan);
          transform: translateY(-3px);
        }

        @media (max-width: 576px) {
          .footer-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .footer-bottom {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  );
}
