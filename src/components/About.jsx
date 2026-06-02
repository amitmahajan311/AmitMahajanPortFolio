import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Tech marquee items
const TECH_ITEMS = [
  "OpenAI", "Azure AI", "Python", "FastAPI", "Streamlit", "React.js",
  "RAG", "LLMs", "AWS", "Snowflake", "Selenium", "Pytest",
  "Prompt Engineering", "AI Guardrails", "Teradata", "REST APIs",
  "Document Intelligence", "Responsible AI", "Ab Initio", "ETL",
];

export default function About() {
  useEffect(() => {
    document.title = "About | Amit Mahajan";
  }, []);

  const focusAreas = [
    "Generative AI & LLMs",
    "Azure AI Services",
    "OpenAI Models",
    "AWS Ecosystem",
    "Python & FastAPI",
    "Streamlit & React.js",
    "Retrieval-Augmented Generation (RAG)",
    "AI Guardrails & Governance",
    "Enterprise AI Platforms",
    "Snowflake & SQL",
    "Ab Initio ETL",
    "Data Validation"
  ];

  const domains = [
    {
      title: "Enterprise AI Solutions",
      desc: "Architecting reusable AI accelerators, contract analytics tooling, automated document parsing pipelines, and centralized UI application consoles for cross-team deployment.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
          <line x1="15" y1="3" x2="15" y2="21"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
      ),
    },
    {
      title: "Healthcare Domain Expert",
      desc: "Delivering massive-scale data warehouse modernization programs, ETL pipelines, and HIPAA-compliant cloud migrations (Snowflake) for major US healthcare systems.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <h2 className="section-title">Specializing in Enterprise GenAI Architectures</h2>
        <p className="section-subtitle">
          Bridging the gap between raw machine learning capability and production-grade enterprise software systems.
        </p>

        <div className="about-grid reveal-on-scroll">
          <div className="about-narrative">
            <h3 className="narrative-heading">Engineering AI with Rigor & Reliability</h3>
            <p>
              I am a <strong>Senior AI Engineer</strong> based in Pune, India, with over 4 years of professional experience building, deploying, and validating AI applications. My primary mission is helping enterprises adopt Generative AI safely, efficiently, and at scale.
            </p>
            <p>
              My expertise covers the complete AI lifecycle: from prompt design and semantic search orchestration (RAG) to API engineering (Python, FastAPI) and frontend dashboard creation (React.js, Streamlit). I place special emphasis on <strong>Responsible AI</strong>, building custom moderation APIs (AI Guardrails) and programmatic validation frameworks (Selenium, Pytest) to measure output quality.
            </p>
            <p>
              In addition to AI architecture, I maintain a strong foundation in high-throughput cloud migration and data engineering (Snowflake, Teradata, Ab Initio), allowing me to design AI pipelines that integrate seamlessly with pre-existing enterprise data structures.
            </p>
          </div>

          <div className="about-highlights-card glass-panel">
            <h4 className="card-heading">Core Tech Focus</h4>
            <div className="pills-container">
              {focusAreas.map((focus) => (
                <span className="focus-pill" key={focus}>{focus}</span>
              ))}
            </div>

            <div className="about-cv-teaser">
              <p className="teaser-text">Have a project in mind, or looking to expand your AI engineering team?</p>
              <Link to="/contact" className="btn btn-secondary teaser-btn">
                Let's Connect
              </Link>
            </div>
          </div>
        </div>

        {/* Tech I Love marquee strip */}
        <div className="tech-marquee-section reveal-on-scroll">
          <p className="marquee-label">Technologies I work with</p>
          <div className="marquee-track-outer">
            <div className="marquee-track">
              {[...TECH_ITEMS, ...TECH_ITEMS].map((tech, i) => (
                <span className="marquee-chip" key={i}>{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Domain cards */}
        <div className="domains-container reveal-on-scroll">
          <h3 className="domains-title">Industry Domain Experience</h3>
          <div className="grid-2">
            {domains.map((dom) => (
              <div className="domain-card glowing-card" key={dom.title}>
                <div className="domain-icon-wrapper">{dom.icon}</div>
                <h4 className="domain-card-title">{dom.title}</h4>
                <p className="domain-card-desc">{dom.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          margin-bottom: 5rem;
        }
        .about-narrative {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .narrative-heading { font-size: 1.6rem; margin-bottom: 0.5rem; }
        .about-narrative p { color: var(--text-secondary); font-size: 1rem; line-height: 1.7; }
        .about-narrative strong { color: var(--text-primary); }

        .about-highlights-card {
          padding: 2.25rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--glass-border);
        }
        .card-heading { font-size: 1.2rem; margin-bottom: 1.25rem; color: var(--text-primary); }
        .pills-container { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem; }
        .focus-pill {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.8rem;
          border-radius: 30px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }
        .focus-pill:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(6,182,212,0.05);
          transform: scale(1.05);
        }
        .about-cv-teaser { border-top: 1px solid var(--border-color); padding-top: 1.5rem; }
        .teaser-text { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.4; }
        .teaser-btn { width: 100%; font-size: 0.85rem !important; padding: 0.6rem !important; text-align: center; }

        /* Tech marquee strip */
        .tech-marquee-section {
          margin: 3rem 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background: var(--bg-tertiary);
          padding: 1.5rem 0;
        }
        .marquee-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 1rem;
        }
        .marquee-track-outer {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-chip {
          flex-shrink: 0;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          background: rgba(6,182,212,0.07);
          border: 1px solid rgba(6,182,212,0.15);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-cyan);
          white-space: nowrap;
          transition: var(--transition-fast);
        }
        .marquee-chip:hover {
          background: rgba(6,182,212,0.15);
          transform: translateY(-2px);
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Domain cards */
        .domains-container { border-top: 1px solid var(--border-color); padding-top: 4.5rem; }
        .domains-title { font-size: 1.5rem; margin-bottom: 2.25rem; text-align: center; }
        .domain-card { display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; }
        .domain-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(6,182,212,0.08);
          border: 1px solid rgba(6,182,212,0.15);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .domain-card-title { font-size: 1.25rem; font-weight: 700; }
        .domain-card-desc { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; }

        @media (max-width: 992px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>
    </section>
  );
}
