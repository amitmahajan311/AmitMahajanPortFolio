import React from "react";
import { portfolioData } from "../portfolioData";
import amitProfile from "../assets/amit.png";

export default function Hero() {
  const { personalInfo, contact } = portfolioData;

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      const headerOffset = 70; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Clear hash from address bar
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <section className="section hero-section" id="hero">
      <div className="container hero-container">
        <div className="hero-content reveal-on-scroll">
          <div className="hero-meta-badge">
            <span className="location-pin">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {personalInfo.location}
            </span>
            <span className="divider">•</span>
            <span className="relocation-badge">{personalInfo.relocationStatus}</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
          </h1>
          <h2 className="hero-subtitle-role">
            {personalInfo.title} <span className="text-muted">|</span> <span className="role-highlight">{personalInfo.subTitle}</span>
          </h2>
          <p className="hero-headline">{personalInfo.headline}</p>
          <p className="hero-description">{personalInfo.summary}</p>

          <div className="hero-ctas">
            <a 
              href="#contact" 
              className="btn btn-primary btn-glow"
              onClick={handleScrollToContact}
            >
              <span>Contact Me</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a
              href={contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <span>View Resume</span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary hero-social-link"
              aria-label="LinkedIn Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary hero-social-link"
              aria-label="GitHub Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
          </div>
        </div>

        <div className="hero-stats reveal-on-scroll">
          <div className="hero-illustration">
            {/* abstract premium AI geometric design */}
            <div className="ai-core-container">
              <div className="ai-orbit orbit-1"></div>
              <div className="ai-orbit orbit-2"></div>
              <div className="ai-orbit orbit-3"></div>
              <div className="ai-core">
                <img 
                  src={amitProfile} 
                  alt="Amit Mahajan - Senior AI Engineer" 
                  className="hero-avatar-img" 
                />
              </div>
              <div className="pulse-circle"></div>
            </div>
          </div>
          
          <div className="stats-grid">
            {personalInfo.stats.map((stat, idx) => (
              <div className="stat-card glass-panel" key={idx}>
                <span className="stat-value gradient-text">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 120px;
          padding-bottom: 60px;
          border-bottom: 1px solid var(--border-color);
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(8, 145, 178, 0.08);
          border: 1px solid rgba(8, 145, 178, 0.15);
          border-radius: 30px;
          padding: 0.4rem 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-cyan);
          margin-bottom: 1.5rem;
        }
        .location-pin {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
        }
        .hero-subtitle-role {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .role-highlight {
          color: var(--accent-cyan);
        }
        .hero-headline {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 1.5rem;
          max-width: 90%;
        }
        .hero-description {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 95%;
        }
        .hero-ctas {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .hero-social-link {
          padding: 0.75rem !important;
          width: 44px;
          height: 44px;
          border-radius: 8px;
        }
        
        /* Stats & Illustration Right Column */
        .hero-stats {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }
        .hero-illustration {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-core-container {
          position: relative;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-core {
          width: 120px;
          height: 120px;
          background: var(--bg-tertiary);
          border: 2px solid var(--accent-cyan);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 0 30px rgba(8, 145, 178, 0.35);
          overflow: hidden;
        }
        .hero-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transform: scale(1.05);
          transition: transform 0.4s ease;
        }
        .hero-avatar-img:hover {
          transform: scale(1.15);
        }
        .ai-orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.1);
        }
        [data-theme="light"] .ai-orbit {
          border-color: rgba(0, 0, 0, 0.08);
        }
        .orbit-1 {
          width: 150px;
          height: 150px;
          border-color: rgba(8, 145, 178, 0.2);
          animation: rotate-orbit-1 12s infinite linear;
        }
        .orbit-2 {
          width: 190px;
          height: 190px;
          border-color: rgba(139, 92, 246, 0.2);
          animation: rotate-orbit-2 18s infinite linear;
        }
        .orbit-3 {
          width: 230px;
          height: 230px;
          border-color: rgba(37, 99, 235, 0.15);
          animation: rotate-orbit-1 25s infinite linear;
        }
        .pulse-circle {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 2px solid var(--accent-purple);
          animation: pulse-out 3s infinite ease-out;
          opacity: 0;
          z-index: 5;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          width: 100%;
        }
        .stat-card {
          padding: 1.25rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 1px solid var(--border-color);
          background: var(--bg-tertiary);
          transition: var(--transition-smooth);
        }
        .stat-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-3px);
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }
        .stat-label {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
        }

        /* Animations */
        @keyframes rotate-orbit-1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-orbit-2 {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-out {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          .hero-meta-badge {
            margin-bottom: 1.25rem;
          }
          .hero-title {
            font-size: 3.2rem;
          }
          .hero-headline {
            max-width: 100%;
          }
          .hero-description {
            max-width: 100%;
            margin-bottom: 2rem;
          }
          .hero-ctas {
            justify-content: center;
          }
          .hero-stats {
            max-width: 450px;
            margin: 0 auto;
          }
          .hero-illustration {
            width: 250px;
            height: 250px;
          }
          .ai-core-container {
            width: 180px;
            height: 180px;
          }
          .ai-core {
            width: 100px;
            height: 100px;
          }
          .orbit-1 { width: 120px; height: 120px; }
          .orbit-2 { width: 150px; height: 150px; }
          .orbit-3 { width: 180px; height: 180px; }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle-role {
            font-size: 1.4rem;
          }
          .hero-headline {
            font-size: 1.1rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
