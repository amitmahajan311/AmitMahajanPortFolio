import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { portfolioData } from "../portfolioData";

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer whenever route changes
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((o) => !o);

  const navLinks = [
    { label: "About", to: "/about" },
    { label: "Experience", to: "/experience" },
    { label: "Projects", to: "/projects" },
    { label: "Skills", to: "/skills" },
    { label: "Certifications", to: "/certifications" },
    { label: "Contact", to: "/contact" },
    { label: "Resume", to: "/resume" },
  ];

  return (
    <header className={`nav-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        {/* Logo → home */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="gradient-text">Amit Mahajan</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-menu" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `nav-link${isActive ? " nav-link-active" : ""}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {/* Theme Toggle */}
          <button
            className="btn btn-secondary theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </button>

          <Link to="/contact" className="btn btn-primary nav-btn-contact" onClick={closeMenu}>
            <span>Contact</span>
          </Link>
        </div>

        {/* Mobile header row */}
        <div className="nav-mobile-action-wrapper">
          <button
            className="btn btn-secondary theme-toggle-btn mobile-header-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </button>

          <button
            className={`nav-toggle ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`nav-mobile-overlay ${isOpen ? "open" : ""}`} onClick={closeMenu}>
        <nav className="nav-mobile-menu" onClick={(e) => e.stopPropagation()}>
          {navLinks.map((link, idx) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `nav-mobile-link${isActive ? " nav-mobile-link-active" : ""}`
              }
              onClick={closeMenu}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="nav-mobile-actions">
            <button
              className="btn btn-secondary mobile-theme-btn"
              onClick={() => { toggleTheme(); closeMenu(); }}
            >
              <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </button>
            <Link to="/contact" className="btn btn-primary" onClick={closeMenu}>
              <span>Contact Me</span>
            </Link>
          </div>
        </nav>
      </div>

      <style>{`
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 100;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
          display: flex;
          align-items: center;
          background: rgba(var(--bg-primary), 0.4);
        }
        .nav-header.scrolled {
          height: 70px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--border-color);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .nav-logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.03em;
          z-index: 101;
        }
        .nav-menu {
          display: flex;
          gap: 1.75rem;
          align-items: center;
        }
        .nav-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          position: relative;
          padding: 0.5rem 0;
        }
        .nav-link:hover,
        .nav-link-active {
          color: var(--text-primary);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: var(--gradient-accent);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-link:hover::after,
        .nav-link-active::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .theme-toggle-btn {
          padding: 0.65rem !important;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-primary);
        }
        .theme-toggle-btn svg {
          transition: transform 0.5s ease;
        }
        .theme-toggle-btn:hover svg {
          transform: rotate(35deg);
          color: var(--accent-cyan);
        }
        .nav-btn-resume {
          padding: 0.5rem 1rem !important;
          font-size: 0.85rem !important;
        }
        .nav-btn-contact {
          padding: 0.5rem 1.25rem !important;
          font-size: 0.85rem !important;
        }
        .nav-mobile-action-wrapper {
          display: none;
          align-items: center;
          gap: 0.75rem;
        }
        .nav-toggle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 101;
        }
        .nav-toggle .bar {
          width: 100%;
          height: 2px;
          background-color: var(--text-primary);
          border-radius: 2px;
          transition: var(--transition-smooth);
        }

        /* Mobile Overlay */
        .nav-mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 99;
        }
        .nav-mobile-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .nav-mobile-menu {
          position: absolute;
          top: 0;
          right: 0;
          width: 240px;
          height: 100%;
          background: var(--bg-secondary);
          border-left: 1px solid var(--border-color);
          padding: 5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .nav-mobile-overlay.open .nav-mobile-menu {
          transform: translateX(0);
        }
        .nav-mobile-link {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.4rem 0;
          border-bottom: 1px solid var(--border-color);
          transform: translateX(15px);
          opacity: 0;
          transition: var(--transition-smooth);
        }
        .nav-mobile-overlay.open .nav-mobile-link {
          transform: translateX(0);
          opacity: 1;
          transition-delay: 0.08s;
        }
        .nav-mobile-link:hover,
        .nav-mobile-link-active {
          color: var(--accent-cyan);
          padding-left: 0.5rem;
        }
        .nav-mobile-actions {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          transform: translateY(15px);
          opacity: 0;
          transition: var(--transition-smooth);
          transition-delay: 0.25s;
        }
        .nav-mobile-overlay.open .nav-mobile-actions {
          transform: translateY(0);
          opacity: 1;
        }
        /* Hamburger animation */
        .nav-toggle.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .nav-toggle.active .bar:nth-child(2) { opacity: 0; }
        .nav-toggle.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        @media (max-width: 820px) {
          .nav-menu, .nav-actions { display: none; }
          .nav-mobile-action-wrapper { display: flex; }
        }

        /* Split resume button group (desktop) */
        .resume-btn-group {
          display: flex;
          align-items: stretch;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }
        .resume-view-btn {
          border-radius: 0;
          border: none;
          border-right: 1px solid var(--border-color);
          padding: 0.6rem 0.9rem;
          gap: 0.45rem;
          font-size: 0.88rem;
        }
        .resume-dl-btn {
          border-radius: 0;
          border: none;
          padding: 0.6rem 0.7rem;
          color: var(--text-secondary);
        }
        .resume-dl-btn:hover { color: var(--accent-cyan); }
        .resume-btn-group .btn:hover { background: rgba(255,255,255,0.04); transform: none; }
        [data-theme="light"] .resume-btn-group { border-color: var(--border-color); }

        /* Mobile resume row */
        .mobile-resume-row {
          display: flex;
          gap: 0.6rem;
          width: 100%;
        }
        .mobile-resume-row .btn {
          flex: 1;
          font-size: 0.85rem;
          padding: 0.65rem 0.5rem;
          gap: 0.4rem;
        }
      `}</style>
    </header>
  );
}
