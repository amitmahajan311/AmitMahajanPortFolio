import React, { useState, useEffect } from "react";
import { portfolioData } from "../portfolioData";

// Category map for each project
const PROJECT_CATEGORIES = {
  "contract-intelligence": "GenAI",
  "ai-guardrail-framework": "GenAI",
  "rag-validation-automation": "Automation",
  "common-ui-accelerator": "UI/Platform",
  "bcbs-edw-modernization": "Data",
};

const FILTERS = ["All", "GenAI", "Automation", "UI/Platform", "Data"];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    document.title = "Projects | Amit Mahajan";
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const openModal = (proj) => setSelectedProject(proj);
  const closeModal = () => setSelectedProject(null);

  const filtered =
    activeFilter === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (p) => PROJECT_CATEGORIES[p.id] === activeFilter
        );

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <h2 className="section-title">Case Studies & Projects</h2>
        <p className="section-subtitle">
          Demonstrating technical leadership and delivery across generative AI, security guardrails,
          test automation, and cloud integrations.
        </p>

        {/* Filter bar */}
        <div className="filter-bar reveal-on-scroll">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "filter-btn-active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="projects-grid grid-3 reveal-on-scroll">
          {filtered.map((proj) => (
            <div
              className="project-card glowing-card"
              key={proj.id}
              onClick={() => openModal(proj)}
              style={{ cursor: "pointer" }}
            >
              <div className="project-card-header">
                <span className="project-tag-accent">{PROJECT_CATEGORIES[proj.id]}</span>
                <span className="project-arrow-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </span>
              </div>
              <h3 className="project-card-title">{proj.title}</h3>
              <p className="project-card-subtitle">{proj.subtitle}</p>

              <div className="project-card-tech">
                {proj.tech.slice(0, 3).map((t) => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
                {proj.tech.length > 3 && (
                  <span className="tech-tag-more">+{proj.tech.length - 3}</span>
                )}
              </div>
              <button
                className="project-readmore-btn"
                onClick={(e) => { e.stopPropagation(); openModal(proj); }}
              >
                <span>Read Case Study</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="filter-empty">
            <p>No projects found for this filter.</p>
          </div>
        )}

        {/* Modal */}
        {selectedProject && (
          <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal} aria-label="Close Case Study">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className="modal-header">
                <span className="modal-tag-meta">{selectedProject.subtitle}</span>
                <h3 className="modal-title">{selectedProject.title}</h3>
                <div className="modal-tech-stack">
                  {selectedProject.tech.map((t) => (
                    <span className="tech-badge" key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-body-layout">
                <div className="modal-left-narrative">
                  <div className="modal-section-block">
                    <h4>Problem Statement</h4>
                    <p>{selectedProject.problem}</p>
                  </div>
                  <div className="modal-section-block">
                    <h4>Solution Overview</h4>
                    <p>{selectedProject.solution}</p>
                  </div>
                  <div className="modal-section-block">
                    <h4>Key Contributions</h4>
                    <ul className="modal-contributions-list">
                      {selectedProject.contributions.map((item, idx) => (
                        <li key={idx}>
                          <span className="li-indicator"></span>
                          <p>{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="modal-right-sidebar">
                  <div className="modal-impact-card">
                    <span className="impact-label">Business & Operations Impact</span>
                    <p className="impact-value">{selectedProject.impact}</p>
                  </div>
                  <div className="modal-meta-sidebar-block">
                    <h5>Role</h5>
                    <p>{selectedProject.role}</p>
                  </div>
                  <div className="modal-meta-sidebar-block">
                    <h5>Platform Integration</h5>
                    <p>{selectedProject.linkText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .projects-section { background-color: var(--bg-secondary); }

        /* Filter bar */
        .filter-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2.5rem;
        }
        .filter-btn {
          padding: 0.45rem 1.1rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .filter-btn:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }
        .filter-btn-active {
          background: rgba(6,182,212,0.1);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }
        .filter-empty {
          text-align: center;
          padding: 4rem;
          color: var(--text-muted);
        }

        /* Cards */
        .project-card { display: flex; flex-direction: column; align-items: flex-start; height: 100%; justify-content: space-between; min-height: 250px; }
        .project-card-header { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 1.5rem; }
        .project-tag-accent { font-size: 0.75rem; font-weight: 600; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em; }
        .project-arrow-icon { color: var(--text-muted); transition: var(--transition-fast); }
        .project-card:hover .project-arrow-icon { color: var(--accent-cyan); transform: translate(2px,-2px); }
        .project-card-title { font-size: 1.35rem; font-weight: 700; margin-bottom: 0.4rem; }
        .project-card-subtitle { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 1.5rem; flex: 1; }
        .project-card-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
        .tech-tag { font-size: 0.72rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--text-secondary); }
        .tech-tag-more { font-size: 0.72rem; background: rgba(6,182,212,0.1); padding: 0.2rem 0.4rem; border-radius: 4px; color: var(--accent-cyan); font-weight: 600; }
        .project-readmore-btn { background: transparent; border: none; color: var(--accent-cyan); font-size: 0.85rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0; transition: var(--transition-fast); }
        .project-readmore-btn:hover { gap: 0.6rem; color: var(--text-primary); }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(4,6,9,0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 2rem; animation: fade-in-overlay 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
        .modal-content { width: 100%; max-width: 950px; max-height: 85vh; overflow-y: auto; border-radius: 20px; border: 1px solid var(--border-hover); padding: 3rem; position: relative; display: flex; flex-direction: column; gap: 2rem; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.9), var(--shadow-glow); animation: scale-up-modal 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }
        .modal-close { position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; transition: var(--transition-fast); }
        .modal-close:hover { color: var(--text-primary); background: rgba(255,255,255,0.08); border-color: var(--accent-cyan); transform: scale(1.05); }
        .modal-header { display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1.5rem; }
        .modal-tag-meta { font-size: 0.8rem; font-weight: 600; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.1em; }
        .modal-title { font-size: 2.2rem; font-weight: 800; }
        .modal-tech-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
        .tech-badge { font-size: 0.78rem; background: rgba(6,182,212,0.08); border: 1px solid rgba(6,182,212,0.15); padding: 0.3rem 0.75rem; border-radius: 30px; color: var(--accent-cyan); font-weight: 600; }
        .modal-body-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 3rem; }
        .modal-left-narrative { display: flex; flex-direction: column; gap: 2rem; }
        .modal-section-block h4 { font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; border-left: 3px solid var(--accent-cyan); padding-left: 0.75rem; }
        .modal-section-block p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.65; }
        .modal-contributions-list { list-style: none; display: flex; flex-direction: column; gap: 0.8rem; }
        .modal-contributions-list li { display: flex; align-items: flex-start; gap: 0.75rem; }
        .li-indicator { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-purple); flex-shrink: 0; margin-top: 0.6rem; }
        .modal-contributions-list p { margin: 0; }
        .modal-right-sidebar { display: flex; flex-direction: column; gap: 1.75rem; }
        .modal-impact-card { background: rgba(6,182,212,0.05); border: 1px solid rgba(6,182,212,0.15); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .impact-label { font-size: 0.75rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em; }
        .impact-value { font-size: 0.92rem; color: var(--text-primary); line-height: 1.5; margin: 0; font-weight: 500; }
        .modal-meta-sidebar-block h5 { font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 0.4rem; }
        .modal-meta-sidebar-block p { font-size: 0.92rem; color: var(--text-secondary); margin: 0; font-weight: 600; }

        @keyframes fade-in-overlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up-modal { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }

        @media (max-width: 768px) {
          .modal-content { padding: 1.5rem; max-height: 90vh; }
          .modal-title { font-size: 1.6rem; }
          .modal-body-layout { grid-template-columns: 1fr; gap: 2rem; }
          .modal-overlay { padding: 1rem; }
        }
      `}</style>
    </section>
  );
}
