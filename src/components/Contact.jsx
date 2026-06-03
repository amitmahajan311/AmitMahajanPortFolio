import React, { useState, useEffect } from "react";
import { portfolioData } from "../portfolioData";

export default function Contact() {
  const { contact } = portfolioData;
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.title = "Contact | Amit Mahajan";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg("");

    const apiKey = import.meta.env.VITE_BREVO_API_KEY;
    const senderEmail = import.meta.env.VITE_BREVO_SENDER_EMAIL || "amitmahajan264889@gmail.com";
    const senderName = import.meta.env.VITE_BREVO_SENDER_NAME || "Amit Mahajan Portfolio";

    try {
      let response;
      let usedServerless = false;

      // 1. Try sending via the serverless function (hides the API key, runs on Vercel backend)
      try {
        response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            subject: formState.subject,
            message: formState.message
          })
        });
        
        // If the path was found (it is not a 404), mark it as processed
        if (response.status !== 404) {
          usedServerless = true;
        }
      } catch (err) {
        console.warn("Serverless API endpoint failed or unreachable, falling back to direct Brevo call:", err);
      }

      // 2. Fallback to client-side direct request (e.g. during local Vite development)
      if (!usedServerless || !response || response.status === 404) {
        response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "api-key": apiKey,
            "content-type": "application/json"
          },
          body: JSON.stringify({
            sender: {
              name: senderName,
              email: senderEmail
            },
            to: [
              {
                email: senderEmail,
                name: "Amit Mahajan"
              }
            ],
            replyTo: {
              email: formState.email,
              name: formState.name
            },
            subject: `Portfolio Contact: ${formState.subject}`,
            htmlContent: `
              <h3>New Message from Portfolio Contact Form (Client Fallback)</h3>
              <p><strong>Name:</strong> ${formState.name}</p>
              <p><strong>Email:</strong> ${formState.email}</p>
              <p><strong>Subject:</strong> ${formState.subject}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; line-height: 1.5; color: #333;">${formState.message}</p>
            `
          })
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to send email via Brevo.");
      }

      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 7000);
    } catch (err) {
      console.error("Email sending error:", err);
      setErrorMsg(err.message || "There was an error sending your message. Please try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have an enterprise GenAI project, a role opening, or want to discuss AI guardrails? Send a message directly.
        </p>

        <div className="contact-grid reveal-on-scroll">
          {/* Contact Methods Sidebar */}
          <div className="contact-info-panel">
            <h3 className="contact-panel-heading">Direct Connection</h3>
            <p className="contact-panel-desc">
              Feel free to reach out via email, schedule a sync, or find my social handles below.
            </p>

            <div className="contact-cards-list">
              <a href={`mailto:${contact.email}`} className="contact-item-card glass-panel" id="contact-link-email">
                <span className="contact-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>
                </span>
                <div className="contact-card-text">
                  <span className="contact-card-label">Email Address</span>
                  <span className="contact-card-value">{contact.email}</span>
                </div>
              </a>

              <a href={`tel:${contact.phone}`} className="contact-item-card glass-panel" id="contact-link-phone">
                <span className="contact-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <div className="contact-card-text">
                  <span className="contact-card-label">Phone Number</span>
                  <span className="contact-card-value">{contact.phone}</span>
                </div>
              </a>

              <div className="contact-item-card glass-panel">
                <span className="contact-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div className="contact-card-text">
                  <span className="contact-card-label">Office Location</span>
                  <span className="contact-card-value">Pune, India (Open to Relocation)</span>
                </div>
              </div>
            </div>

            <div className="contact-socials-row">
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="LinkedIn Profile" id="contact-social-linkedin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="GitHub Profile" id="contact-social-github">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-panel glass-panel">
            <h3 className="form-heading">Send a Message</h3>
            
            {submitted ? (
              <div className="submit-success-banner" role="alert" id="contact-form-success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <div>
                  <h5>Message Received!</h5>
                  <p>Thank you. Amit will respond to your inquiry shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" id="portfolio-contact-form">
                {errorMsg && (
                  <div className="submit-error-banner" role="alert">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      name="name" 
                      value={formState.name} 
                      onChange={handleInputChange} 
                      placeholder="Your Name" 
                      required 
                      disabled={sending}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      name="email" 
                      value={formState.email} 
                      onChange={handleInputChange} 
                      placeholder="you@example.com" 
                      required 
                      disabled={sending}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input 
                    type="text" 
                    id="contact-subject" 
                    name="subject" 
                    value={formState.subject} 
                    onChange={handleInputChange} 
                    placeholder="Project Inquiry / Job Opening" 
                    required 
                    disabled={sending}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea 
                    id="contact-message" 
                    name="message" 
                    value={formState.message} 
                    onChange={handleInputChange} 
                    rows="5" 
                    placeholder="Hi Amit, we are looking for a Senior AI Engineer to lead..." 
                    required
                    disabled={sending}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn" id="contact-submit-button" disabled={sending}>
                  <span>{sending ? "Sending Message..." : "Send Message"}</span>
                  {sending ? (
                    <span className="pdf-spinner" style={{ borderLeftColor: '#fff', width: 14, height: 14 }}></span>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 4rem;
          align-items: start;
        }
        
        .contact-info-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .contact-panel-heading {
          font-size: 1.6rem;
          font-weight: 700;
        }
        
        .contact-panel-desc {
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }
        
        .contact-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .contact-item-card {
          padding: 1.25rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          border: 1px solid var(--glass-border);
          transition: var(--transition-fast);
        }
        
        a.contact-item-card:hover {
          border-color: var(--border-hover);
          background: rgba(255, 255, 255, 0.02);
          transform: translateX(4px);
        }
        
        .contact-card-icon {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: rgba(6, 182, 212, 0.08);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .contact-card-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0; /* Enable text truncation if overflow */
        }
        
        .contact-card-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .contact-card-value {
          font-size: 0.92rem;
          color: var(--text-primary);
          font-weight: 600;
          word-break: break-all;
        }
        
        .contact-socials-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .contact-social-btn {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        
        .contact-social-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          transform: translateY(-2px);
        }
        
        /* Form Styling */
        .contact-form-panel {
          padding: 2.5rem;
          border-radius: 18px;
          border: 1px solid var(--glass-border);
        }
        
        .form-heading {
          font-size: 1.4rem;
          margin-bottom: 2rem;
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .form-group input, .form-group textarea {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.8rem 1rem;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }
        
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.1);
        }
        
        .form-submit-btn {
          width: 100%;
          padding: 0.9rem !important;
          margin-top: 0.5rem;
        }

        .submit-success-banner {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 1.5rem;
          border-radius: 10px;
          animation: fade-in-tab 0.4s ease;
        }
        .submit-success-banner h5 {
          font-size: 1.05rem;
          margin-bottom: 0.25rem;
          color: #10b981;
        }
         .submit-success-banner p {
          font-size: 0.88rem;
          margin: 0;
          color: var(--text-secondary);
        }

        .submit-error-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.25rem;
          font-size: 0.88rem;
          font-weight: 500;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
        
        @media (max-width: 576px) {
          .form-group-row {
            grid-template-columns: 1fr;
          }
          .contact-form-panel {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
