import React, { useState, useEffect } from "react";
import { portfolioData } from "../portfolioData";
import nttDataLogo from "../assets/ntt-data-logo.png";

export default function Experience() {
  const experiences = portfolioData.experience;
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    document.title = "Experience | Amit Mahajan";
  }, []);

  const nttAiExp = experiences[0];

  // Group achievements into logical pillars to help recruiters digest the info
  const pillars = {
    all: {
      label: "All Achievements",
      items: nttAiExp.achievements
    },
    genai: {
      label: "GenAI & LLM Solutions",
      items: nttAiExp.achievements.filter(a => 
        a.includes("Azure AI") || 
        a.includes("OpenAI") || 
        a.includes("Contract Intelligence") ||
        a.includes("Generative AI proof-of-concept") ||
        a.includes("20+ enterprise Generative AI") ||
        a.includes("Agentic AI")
      )
    },
    platforms: {
      label: "AI Platforms & Accelerators",
      items: nttAiExp.achievements.filter(a => 
        a.includes("Common UI") || 
        a.includes("standards") || 
        a.includes("developer productivity") ||
        a.includes("reusable AI accelerators") ||
        a.includes("RAG workflows, document parsing")
      )
    },
    governance: {
      label: "AI Governance & Guardrails",
      items: nttAiExp.achievements.filter(a => 
        a.includes("Guardrail") || 
        a.includes("moderation") || 
        a.includes("validation workflows") ||
        a.includes("reliability")
      )
    },
    data: {
      label: "Data & Cloud Support",
      items: nttAiExp.achievements.filter(a => 
          a.includes("BCBS") || 
          a.includes("Ab Initio") || 
          a.includes("Snowflake") ||
          a.includes("migration") ||
          a.includes("ETL") ||
          a.includes("Teradata") ||
          a.includes("reconciliation") ||
          a.includes("tuning")
        )
    }
  };

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-subtitle">
          Leading technical execution and delivering scalable, secure Generative AI capabilities within enterprise platforms.
        </p>

        <div className="experience-container reveal-on-scroll">
          {experiences.map((exp, expIdx) => {
            const isAiRole = expIdx === 0;
            return (
              <div 
                className="experience-card glass-panel" 
                key={expIdx}
                style={{ marginBottom: expIdx < experiences.length - 1 ? "3rem" : "0" }}
              >
                {/* Header info */}
                <div className="exp-card-header">
                  <div className="company-logo-wrap">
                    <img src={nttDataLogo} alt="NTT DATA" className="company-logo-img" />
                  </div>
                  <div className="company-info">
                    <div className="role-title-row">
                      <h3 className="exp-role">{exp.role}</h3>
                      {exp.promotionNote && (
                        <span className="promotion-badge">{exp.promotionNote}</span>
                      )}
                    </div>
                    <h4 className="exp-company-meta">
                      <span className="company-name">{exp.company}</span>
                      <span className="bullet">•</span>
                      <span className="company-location">{exp.location}</span>
                    </h4>
                  </div>
                  <div className="exp-timeline-badge">{exp.timeline}</div>
                </div>

                <p className="exp-intro-summary">
                  Designing, building, and launching enterprise-grade Generative AI accelerators, intelligent document extraction tools, and runtime moderation layers while supporting large-scale database modernization plans.
                </p>

                <>
                  {/* Interactive Filters */}
                  <div className="exp-tabs" role="tablist" aria-label="Experience Categories">
                    {Object.keys(pillars).map((key) => (
                      <button
                        key={key}
                        role="tab"
                        aria-selected={activeTab === key}
                        aria-controls={`tabpanel-${key}`}
                        id={`tab-${key}`}
                        className={`exp-tab-btn ${activeTab === key ? "active" : ""}`}
                        onClick={() => setActiveTab(key)}
                      >
                        {pillars[key].label}
                      </button>
                    ))}
                  </div>

                  {/* Achievement Bullet Points */}
                  <div 
                    id={`tabpanel-${activeTab}`} 
                    role="tabpanel" 
                    aria-labelledby={`tab-${activeTab}`}
                    className="exp-bullets"
                  >
                    {pillars[activeTab].items.map((bullet, index) => {
                      let highlighted = bullet;
                      const terms = [
                        "Azure AI Services", "OpenAI LLMs", "FastAPI", "Streamlit", "React.js", 
                        "proof-of-concept", "POC", "Contract Intelligence", "AWS AI Guardrail", 
                        "moderation APIs", "RAG", "Selenium", "Pytest", "Common UI Accelerator", 
                        "SQL Script Generator", "Snowflake", "Ab Initio ETL", "Teradata",
                        "Ab Initio", "Ab Initio GDE", "Co>Operating System", "EME", "data validation", 
                        "reconciliation", "performance optimization", "Modernized 1400+", "remediated", 
                        "modernization", "ETL jobs", "monitoring", "incident resolution", "deployment support", 
                        "root cause analysis", "performance tuning", "ETL", "data integration"
                      ];
                      terms.forEach(term => {
                        const escapedTerm = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                        const regex = new RegExp(`\\b(${escapedTerm})\\b`, "gi");
                        highlighted = highlighted.replace(regex, "<strong>$1</strong>");
                      });

                      return (
                        <div className="bullet-item" key={index}>
                          <span className="bullet-icon-wrapper">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                          <p className="bullet-text" dangerouslySetInnerHTML={{ __html: highlighted }} />
                        </div>
                      );
                    })}
                  </div>
                </>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .experience-container {
          position: relative;
        }
        .experience-card {
          padding: 3rem;
          border-radius: 18px;
          border: 1px solid var(--glass-border);
          position: relative;
        }
        .exp-card-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.75rem;
          flex-wrap: wrap;
        }
        .company-logo-wrap {
          width: 90px;
          height: 90px;
          border-radius: 14px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
          flex-shrink: 0;
        }
        .company-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .company-info {
          flex: 1;
          min-width: 250px;
        }
        .role-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.25rem;
        }
        .exp-role {
          font-size: 1.8rem;
          font-weight: 800;
        }
        .promotion-badge {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          height: fit-content;
        }
        .exp-company-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .company-name {
          color: var(--accent-cyan);
        }
        .bullet {
          color: var(--text-muted);
        }
        .exp-timeline-badge {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          border-radius: 30px;
          padding: 0.5rem 1.25rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .exp-intro-summary {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.25rem;
        }

        /* Filter Tabs */
        .exp-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        .exp-tab-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .exp-tab-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
        }
        .exp-tab-btn.active {
          background: rgba(6, 182, 212, 0.08);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }
        
        /* Bullets container */
        .exp-bullets {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          animation: fade-in-tab 0.3s ease-out;
        }
        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .bullet-icon-wrapper {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.08);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }
        .bullet-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .bullet-text strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        @keyframes fade-in-tab {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .experience-card {
            padding: 1.5rem;
          }
          .exp-role {
            font-size: 1.4rem;
          }
          .exp-card-header {
            gap: 1rem;
          }
          .exp-tabs {
            gap: 0.4rem;
          }
          .exp-tab-btn {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
