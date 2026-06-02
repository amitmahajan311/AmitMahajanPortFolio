import React, { useEffect } from "react";
import { portfolioData } from "../portfolioData";

export default function Skills() {
  const categories = portfolioData.skills;

  useEffect(() => {
    document.title = "Skills | Amit Mahajan";
  }, []);

  // Custom SVGs corresponding to categories for premium visual indicators
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Generative AI & LLMs":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><path d="M4.5 12h15"/></svg>
        );
      case "AI Application Development":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        );
      case "Cloud & Platform Engineering":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        );
      case "Testing & Automation":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        );
      case "Data Engineering":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
        );
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        );
    }
  };

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <h2 className="section-title">Technical Expertise</h2>
        <p className="section-subtitle">
          Highly specialized in Generative AI ecosystems, cloud architectures, automation frameworks, and cloud data platforms.
        </p>

        {/* Skills Board Layout */}
        <div className="skills-grid reveal-on-scroll">
          {categories.map((cat, idx) => (
            <div 
              className={`skills-category-card glass-panel ${idx === 0 ? "featured-skills-card" : ""}`} 
              key={cat.category}
            >
              <div className="skills-card-header">
                <span className="skills-card-icon">{getCategoryIcon(cat.category)}</span>
                <h3 className="skills-card-title">{cat.category}</h3>
              </div>

              <div className="skills-badges-list">
                {cat.items.map((skill) => (
                  <div className="skill-badge-item" key={skill}>
                    <span className="skill-dot"></span>
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.25rem;
        }
        
        .skills-category-card {
          padding: 2.25rem;
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          transition: var(--transition-smooth);
        }
        .skills-category-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-3px);
          box-shadow: var(--shadow-premium);
        }

        /* Highlight the GenAI card (the first index) */
        .featured-skills-card {
          grid-column: span 2;
          background: linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, var(--bg-tertiary) 100%);
          border: 1px solid rgba(6, 182, 212, 0.25);
        }
        
        .featured-skills-card:hover {
          border-color: var(--accent-cyan);
          box-shadow: var(--shadow-premium), var(--shadow-glow);
        }

        .skills-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        
        .skills-card-icon {
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .featured-skills-card .skills-card-icon {
          color: var(--accent-purple);
        }
        
        .skills-card-title {
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        .skills-badges-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        /* Skills Badges styling */
        .skill-badge-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          transition: var(--transition-fast);
        }
        
        .skill-badge-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--accent-cyan);
          transform: translateY(-2px);
        }
        
        .featured-skills-card .skill-badge-item:hover {
          border-color: var(--accent-purple);
        }

        .skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-cyan);
        }
        
        .featured-skills-card .skill-dot {
          background: var(--accent-purple);
        }

        .skill-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .skill-badge-item:hover .skill-name {
          color: var(--text-primary);
        }

        @media (max-width: 992px) {
          .featured-skills-card {
            grid-column: span 1;
          }
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
