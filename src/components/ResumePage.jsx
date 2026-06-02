import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { portfolioData } from "../portfolioData";
import { generateResumePdf } from "../generateResumePdf";

export default function ResumePage() {
  const { personalInfo, contact, skills, certifications, experience, projects, education } = portfolioData;
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await new Promise((r) => setTimeout(r, 100)); // Short delay for UI feedback
      await generateResumePdf("download");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    document.title = "Resume | Amit Mahajan";
    const params = new URLSearchParams(window.location.search);
    if (params.get("download") === "true") {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      handleDownload();
    }
  }, []);

  return (
    <section className="section resume-page-section">
      <div className="container resume-page-container reveal-on-scroll">
        
        {/* Control Bar */}
        <div className="resume-control-bar glass-panel">
          <div className="control-left">
            <Link to="/" className="btn btn-secondary btn-back-home">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back Home</span>
            </Link>
          </div>
          <div className="control-right">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn btn-primary btn-download-pdf btn-glow"
            >
              {downloading ? (
                <>
                  <span className="pdf-spinner"></span>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download Resume PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Resume Sheet - Formatted exactly like the PDF */}
        <div className="resume-sheet exact-pdf-format glass-panel glowing-card">
          
          {/* Header Block (Dark matching the PDF fillRect Header) */}
          <div className="sheet-pdf-header">
            <div className="identity-block">
              <h1 className="name">{personalInfo.name}</h1>
              <p className="title-tagline">{personalInfo.title}  |  {personalInfo.subTitle}</p>
              <p className="location-line">Location: {personalInfo.location}  ·  {personalInfo.relocationStatus}</p>
            </div>
            
            <div className="contact-block-lines">
              <div className="contact-line">
                <a href={`mailto:${contact.email}`} className="contact-link">{contact.email}</a>
                <span className="line-sep">|</span>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="contact-link">{contact.phone}</a>
              </div>
              <div className="contact-line">
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="contact-link">amitmahajan.in</a>
                <span className="line-sep">|</span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/amit-mahajan-2574ab144</a>
                <span className="line-sep">|</span>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="contact-link">github.com/amitmahajan311</a>
              </div>
            </div>
          </div>

          <div className="sheet-body-content">
            
            {/* Section: Summary */}
            <div className="sheet-pdf-section">
              <div className="section-header-pdf">
                <h2 className="section-title-text">Summary</h2>
              </div>
              <p className="summary-text-pdf">{personalInfo.summary}</p>
            </div>

            {/* Section: Experience */}
            <div className="sheet-pdf-section">
              <div className="section-header-pdf">
                <h2 className="section-title-text">Experience</h2>
              </div>
              
              <div className="experience-list-pdf">
                {experience.map((exp, index) => (
                  <div key={index} className="experience-item-pdf">
                    <div className="exp-meta-row-1">
                      <span className="exp-role-pdf">
                        {exp.role}
                        {exp.promotionNote && (
                          <span className="promotion-note-pdf"> ({exp.promotionNote})</span>
                        )}
                      </span>
                      <span className="exp-timeline-pdf">{exp.timeline}</span>
                    </div>
                    <div className="exp-meta-row-2">
                      <span className="exp-company-location">{exp.company}  ·  {exp.location}</span>
                    </div>
                    <ul className="achievements-bullets-pdf">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="bullet-pdf">
                          <span className="bullet-dot-pdf"></span>
                          <span className="bullet-text-pdf">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Selected Projects */}
            <div className="sheet-pdf-section">
              <div className="section-header-pdf">
                <h2 className="section-title-text">Selected Projects</h2>
              </div>
              
              <div className="projects-list-pdf">
                {projects.map((proj, index) => (
                  <div key={index} className="project-item-pdf">
                    <div className="project-row-1">
                      <span className="project-title-pdf">{proj.title}</span>
                      <span className="project-tech-pdf">{proj.tech.join("  ·  ")}</span>
                    </div>
                    <div className="project-row-2">
                      <p className="project-impact-pdf">Impact: {proj.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Skills */}
            <div className="sheet-pdf-section">
              <div className="section-header-pdf">
                <h2 className="section-title-text">Skills</h2>
              </div>
              
              <div className="skills-list-pdf">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="skill-item-pdf">
                    <span className="skill-cat-label">{skillGroup.category}:</span>
                    <span className="skill-cat-items"> {skillGroup.items.join("   ·   ")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Certifications */}
            <div className="sheet-pdf-section">
              <div className="section-header-pdf">
                <h2 className="section-title-text">Certifications</h2>
              </div>
              
              <div className="certifications-grid-pdf">
                {certifications.map((cert, index) => (
                  <div key={index} className="cert-card-pdf">
                    <span className="cert-title-text-pdf">{cert.title}</span>
                    <span className="cert-issuer-text-pdf">Issued by {cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Education */}
            <div className="sheet-pdf-section">
              <div className="section-header-pdf">
                <h2 className="section-title-text">Education</h2>
              </div>
              
              <div className="education-block-pdf">
                <div className="edu-row-1">
                  <span className="edu-degree-pdf">{education.degree}</span>
                  <span className="edu-timeline-pdf">{education.timeline}</span>
                </div>
                <div className="edu-row-2">
                  <span className="edu-school-pdf">{education.school}</span>
                </div>
                {education.details && <p className="edu-details-pdf">{education.details}</p>}
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .resume-page-section {
          padding-top: 120px;
          padding-bottom: 80px;
          min-height: 100vh;
        }
        .resume-page-container {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Control Bar styling */
        .resume-control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
        }
        .control-left, .control-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .btn-back-home {
          padding: 0.6rem 1rem !important;
          font-size: 0.88rem !important;
        }
        .btn-download-pdf {
          padding: 0.65rem 1.25rem !important;
          font-size: 0.88rem !important;
        }

        /* Sheet styling */
        .resume-sheet.exact-pdf-format {
          padding: 0; /* Clear container padding to style header edge-to-edge */
          border-radius: 16px;
          border: 1px solid var(--border-color);
          background: var(--bg-tertiary);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          color: var(--text-primary);
          overflow: hidden;
        }

        /* Sheet Identity Header - matching dark header block of PDF */
        .sheet-pdf-header {
          background: #07090e;
          padding: 2.2rem 2.8rem;
          border-bottom: 3.5px solid var(--accent-cyan);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.9rem;
        }
        .identity-block {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .identity-block .name {
          font-size: 2.3rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0;
          color: #ffffff;
        }
        .identity-block .title-tagline {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--accent-cyan);
          margin: 0;
        }
        .identity-block .location-line {
          font-size: 0.82rem;
          color: #94a3b8;
          margin: 0;
          font-weight: 500;
        }
        .contact-block-lines {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
          text-align: left;
        }
        .contact-line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
        }
        .line-sep {
          color: #475569;
          font-weight: normal;
        }
        .contact-link {
          color: #94a3b8;
          text-decoration: none;
          transition: var(--transition-fast);
          display: inline-flex;
          align-items: center;
        }
        .contact-link:hover {
          color: var(--accent-cyan);
          text-decoration: underline;
        }

        /* Body padding */
        .sheet-body-content {
          padding: 2.8rem;
          display: flex;
          flex-direction: column;
          gap: 2.2rem;
        }

        /* Section structure */
        .sheet-pdf-section {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .section-header-pdf {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.4rem;
          margin-bottom: 0.5rem;
        }
        .section-title-text {
          font-size: 0.95rem;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-cyan);
          margin: 0;
        }
        .summary-text-pdf {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Experience formatting */
        .experience-list-pdf {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .experience-item-pdf {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .exp-meta-row-1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .exp-role-pdf {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .promotion-note-pdf {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          font-style: italic;
        }
        .exp-timeline-pdf {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .exp-meta-row-2 {
          display: flex;
        }
        .exp-company-location {
          font-size: 0.85rem;
          color: var(--accent-cyan);
          font-weight: 600;
        }
        .achievements-bullets-pdf {
          list-style: none;
          padding: 0;
          margin: 0.4rem 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .bullet-pdf {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }
        .bullet-dot-pdf {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent-cyan);
          margin-top: 0.45rem;
          flex-shrink: 0;
        }
        .bullet-text-pdf {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* Projects formatting */
        .projects-list-pdf {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .project-item-pdf {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.01);
        }
        [data-theme="light"] .project-item-pdf {
          background: rgba(0, 0, 0, 0.005);
        }
        .project-row-1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .project-title-pdf {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .project-tech-pdf {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .project-row-2 {
          margin-top: 0.15rem;
        }
        .project-impact-pdf {
          font-size: 0.82rem;
          font-style: italic;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Skills formatting */
        .skills-list-pdf {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .skill-item-pdf {
          font-size: 0.84rem;
          line-height: 1.5;
        }
        .skill-cat-label {
          font-weight: 700;
          color: var(--text-primary);
        }
        .skill-cat-items {
          color: var(--text-secondary);
        }

        /* Certifications grid (Matches side by side PDF design) */
        .certifications-grid-pdf {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.65rem;
        }
        .cert-card-pdf {
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.15);
          border-radius: 6px;
          padding: 0.6rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .cert-title-text-pdf {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .cert-issuer-text-pdf {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        /* Education block */
        .education-block-pdf {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .edu-row-1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .edu-degree-pdf {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .edu-timeline-pdf {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .edu-row-2 {
          display: flex;
        }
        .edu-school-pdf {
          font-size: 0.85rem;
          color: var(--accent-cyan);
          font-weight: 600;
        }
        .edu-details-pdf {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        /* Responsiveness */
        @media (max-width: 768px) {
          .resume-page-section {
            padding-top: 80px;
            padding-bottom: 40px;
          }
          .sheet-pdf-header {
            padding: 1.5rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .contact-block-lines {
            align-items: flex-start;
            text-align: left;
          }
          .sheet-body-content {
            padding: 1.5rem;
            gap: 1.5rem;
          }
          .identity-block .name {
            font-size: 1.8rem;
          }
          .exp-meta-row-1, .project-row-1, .edu-row-1 {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.2rem;
          }
          .certifications-grid-pdf {
            grid-template-columns: 1fr;
          }
        }

        /* Print styles overrides */
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .resume-page-section {
            padding: 0 !important;
          }
          .resume-control-bar,
          header,
          footer,
          .custom-cursor,
          .custom-cursor-dot,
          .bg-glow-container {
            display: none !important;
          }
          .resume-sheet.exact-pdf-format {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
          }
          .sheet-pdf-header {
            background: #07090e !important;
            color: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .identity-block .name {
            color: white !important;
          }
          .contact-link {
            color: #94a3b8 !important;
          }
          .sheet-body-content {
            padding: 2rem 0 !important;
          }
          .section-title-text {
            color: #0e7490 !important;
          }
          .bullet-text-pdf, .summary-text-pdf, .project-impact-pdf, .edu-details-pdf {
            color: #475569 !important;
          }
          .cert-card-pdf {
            background: #f0fdfa !important;
            border-color: #29b6f6 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </section>
  );
}
