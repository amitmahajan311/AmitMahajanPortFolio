import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import HomePage from "./components/HomePage";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import ResumePage from "./components/ResumePage";
import NotFound from "./components/NotFound";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Apply data-theme attribute whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Global mouse-tracking for card glow effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const cards = document.querySelectorAll(".glowing-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.closest(".glowing-card") ||
        e.target.closest(".exp-tab-btn") ||
        e.target.closest("input") ||
        e.target.closest("textarea")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Lagging outer trail cursor
  useEffect(() => {
    let animFrame;
    const updateTrail = () => {
      setTrailPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return { x: prev.x + dx * 0.16, y: prev.y + dy * 0.16 };
      });
      animFrame = requestAnimationFrame(updateTrail);
    };
    animFrame = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animFrame);
  }, [mousePos]);

  // Scroll-reveal via IntersectionObserver (runs on each route render)
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -40px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => revealElements.forEach((el) => revealObserver.unobserve(el));
  });

  return (
    <div className="portfolio-app-root">
      {/* Background animated blobs */}
      <div className="bg-glow-container" aria-hidden="true">
        <div className="bg-glow-blob blob-1"></div>
        <div className="bg-glow-blob blob-2"></div>
      </div>

      {/* Premium custom cursor (hidden on touch) */}
      <div
        className={`custom-cursor ${isHovering ? "hovering" : ""}`}
        style={{ left: `${trailPos.x}px`, top: `${trailPos.y}px` }}
        aria-hidden="true"
      />
      <div
        className="custom-cursor-dot"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        aria-hidden="true"
      />

      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
