import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "../portfolioData";

// ─── Config ──────────────────────────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODELS = [
  "gemini-flash-latest",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

// ─── Build context from portfolioData ────────────────────────────────────────
function buildSystemPrompt() {
  const { personalInfo, skills, experience, projects, certifications, education, contact } = portfolioData;
  return `You are a friendly and professional AI assistant embedded in ${personalInfo.name}'s portfolio website.
Your job is to answer visitor questions about ${personalInfo.name} based only on the data below.
Be concise, warm, and professional. Use bullet points when listing multiple items.
If the user asks for Amit's resume or wants to download it, you MUST tell them they can view it on the Resume Page (/resume) or download it directly using this link: [Download Resume PDF](/resume?download=true).
If asked something unrelated to ${personalInfo.name}'s professional profile, politely redirect.
Never make up information not present in the data below.

=== PERSONAL INFO ===
Name: ${personalInfo.name}
Title: ${personalInfo.title} | ${personalInfo.subTitle}
Location: ${personalInfo.location} (${personalInfo.relocationStatus})
Summary: ${personalInfo.summary}

=== EXPERIENCE ===
${experience.map(e =>
  `Role: ${e.role} at ${e.company} (${e.timeline})${e.promotionNote ? ` — ${e.promotionNote}` : ""}
Key achievements:
${e.achievements.map(a => `  • ${a}`).join("\n")}`
).join("\n\n")}

=== SKILLS ===
${skills.map(s => `${s.category}: ${s.items.join(", ")}`).join("\n")}

=== PROJECTS ===
${projects.map(p =>
  `Project: ${p.title} (${p.subtitle})
Role: ${p.role || "Developer"}
Tech: ${p.tech.join(", ")}
Problem: ${p.problem}
Solution: ${p.solution}
Contributions:
${p.contributions ? p.contributions.map(c => `  • ${c}`).join("\n") : "  • Developer"}
Impact: ${p.impact}`
).join("\n\n")}

=== CERTIFICATIONS ===
${certifications.map(c => `• ${c.title} — ${c.issuer}`).join("\n")}

=== EDUCATION ===
${education.degree}, ${education.school} (${education.timeline})

=== CONTACT ===
Email: ${contact.email}
Phone: ${contact.phone}
Website: ${contact.website}
LinkedIn: ${contact.linkedin}
GitHub: ${contact.github}`;
}

// ─── Gemini API Call (Streaming) ──────────────────────────────────────────────
async function callGeminiStream(userMessage, history, onChunk) {
  const systemPrompt = buildSystemPrompt();
  const contents = [
    ...history.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
        }),
      });

      if (!res.ok) continue;

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data:")) {
            const jsonStr = trimmed.slice(5).trim();
            if (jsonStr) {
              const data = JSON.parse(jsonStr);
              const textChunk = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textChunk) {
                onChunk(textChunk);
              }
            }
          }
        }
      }
      return true; // streaming completed successfully
    } catch (err) {
      console.error(`Error streaming with model ${model}:`, err);
      continue; // try next model
    }
  }
  return false; // all models failed
}

// ─── Rule-based Fallback ──────────────────────────────────────────────────────
function getRuleBasedResponse(message) {
  const msg = message.toLowerCase();
  const { personalInfo, skills, experience, projects, certifications, contact, education } = portfolioData;

  // Greeting
  if (/\b(hi|hello|hey|howdy|greet)\b/.test(msg))
    return `Hi there! 👋 I'm Amit's AI assistant. Ask me about his **skills**, **projects**, **experience**, or how to **get in touch**!`;

  // Data Engineering / Ab Initio / SQL / Snowflake / Data Role / ETL
  if (/data|ab\s*initio|ab\s*iniito|abinitio|abiniito|snowflake|sql|etl/.test(msg)) {
    const p = projects[4];
    return `Amit has extensive experience in **Data Engineering & ETL**.\n\nHis flagship data project is **${p.title}** (${p.subtitle}) 📊\n\n**Key Contributions:**\n${p.contributions.map(c => `• ${c}`).join("\n")}\n\n**Impact:** ${p.impact}\n\n**Technologies:** ${p.tech.join(", ")}`;
  }

  // Best / top / recommend / favourite project
  if (/best|top|recommend|favour|favor|highlight|flagship|impressive|which one|standout/.test(msg) && /proj|work/.test(msg)) {
    const p = projects[0];
    return `The standout project is the **${p.title}** 🏆\n\n**${p.subtitle}**\n\n**Key contributions:**\n${p.contributions.map(c => `• ${c}`).join("\n")}\n\n**Impact:** ${p.impact}\n\n**Tech:** ${p.tech.join(", ")}`;
  }

  // Best skill
  if (/best|top|strong|expert|speciali|primary/.test(msg) && /skil|tech|expert|strength|good at/.test(msg))
    return `Amit's strongest expertise is **Generative AI & LLMs**:\n• Azure AI Services & OpenAI\n• RAG (Retrieval-Augmented Generation)\n• AI Guardrails & Governance\n• Agentic AI Systems\n• Python, FastAPI, Streamlit, React.js`;

  // Impact / results / metrics
  if (/impact|result|outcome|achiev|metric|number/.test(msg))
    return `Key measurable impacts:\n• ⏱️ Contract analysis: **hours → under 2 mins** (95%+ accuracy)\n• 🧪 RAG validation: **60% reduction** in manual effort\n• 🏗️ **1,400+ Ab Initio objects** modernized with 100% integrity\n• 📊 Production support for **3,000+ ETL jobs**\n• 🌍 **20+ enterprise demos** across 3 industries`;

  // How many
  if (/how many|count|number of|total/.test(msg)) {
    if (/proj/.test(msg)) return `Amit has **${projects.length} flagship projects** in his portfolio.`;
    if (/cert/.test(msg)) return `Amit holds **${certifications.length} certifications** across AI, cloud, and data.`;
    if (/client|demo/.test(msg)) return `Amit has delivered **20+ enterprise demos** across banking, insurance & healthcare.`;
    if (/year|exp/.test(msg)) return `Amit has **4+ years** of experience, with 2+ years focused on Generative AI.`;
  }

  // Specific tech
  if (/\bpython\b/.test(msg)) return `Yes! Python is Amit's primary language — used in **FastAPI**, **Streamlit**, **RAG pipelines**, **Selenium** automation, and **AI Guardrail** microservices.`;
  if (/\breact\b/.test(msg)) return `Amit builds React.js frontends integrated with AI backends — used in the **Common UI Accelerator** and **Contract Intelligence** platform.`;
  if (/\bfastapi\b/.test(msg)) return `FastAPI is Amit's go-to backend framework — powering the **AWS Guardrail Framework** and the **Common UI Accelerator** gateway.`;
  if (/\brag\b|retrieval/.test(msg)) return `Amit has deep RAG experience — building pipelines, validating with Selenium/Pytest frameworks, and contributing to enterprise AI platforms.`;
  if (/agentic|agent/.test(msg)) return `Amit delivered multiple **Agentic AI** demos — Agentic MDM, Agentic PMO, Agentic IntelliFax — across banking, insurance, and healthcare.`;

  // Skills
  if (/skil|tech|stack|language|tool|framework/.test(msg))
    return `Amit's key skill areas:\n${skills.map(s => `**${s.category}**: ${s.items.slice(0, 5).join(", ")}`).join("\n")}`;

  // Projects list
  if (/proj|work|built|develop|creat/.test(msg))
    return `Amit has **${projects.length} flagship projects**:\n${projects.map(p => `• **${p.title}** — ${p.subtitle}`).join("\n")}`;

  // Experience
  if (/exp|job|role|company|employer/.test(msg)) {
    const exp = experience[0];
    return `Amit works as **${exp.role}** at **${exp.company}** (${exp.timeline}).\n${exp.promotionNote ? `📈 ${exp.promotionNote}` : ""}`;
  }

  // Resume / CV / Download
  if (/resume|cv|download/.test(msg))
    return `You can view Amit's full resume on the [Resume Page](/resume), or download it directly using this link: [Download Resume PDF](/resume?download=true).`;

  // Contact
  if (/contact|email|phone|number|mobile|call|website|domain|url|hire|reach|connect|linkedin/.test(msg))
    return `You can reach Amit at:\n📧 **Email:** ${contact.email}\n📞 **Phone:** [${contact.phone}](tel:${contact.phone})\n🌐 **Website:** [amitmahajan.in](${contact.website})\n💼 **LinkedIn:** ${contact.linkedin}\n🐙 **GitHub:** ${contact.github}`;

  // Certifications
  if (/cert|certification|certified|credential/.test(msg))
    return `Amit holds **${certifications.length} certifications**:\n${certifications.map(c => `• ${c.title}`).join("\n")}`;

  // Education
  if (/education|degree|university|college|study|lpu/.test(msg))
    return `**${education.degree}**\n${education.school} (${education.timeline})`;

  // Location
  if (/location|where|city|india|remote/.test(msg))
    return `Amit is based in **${personalInfo.location}** and is **${personalInfo.relocationStatus}**.`;

  // GenAI
  if (/\b(ai|genai|llm|openai|azure|gpt)\b/.test(msg))
    return `Amit specialises in **Enterprise GenAI** — Azure AI Services, OpenAI LLMs, RAG pipelines, AI Guardrails, and Agentic AI. He has delivered **20+ demos** across banking, insurance & healthcare.`;

  // Summary
  if (/summary|about|who|tell me/.test(msg))
    return personalInfo.summary;

  return `I can help with Amit's **skills**, **projects**, **experience**, **impact metrics**, **certifications**, or how to **contact** him. What would you like to know?`;
}

// ─── Suggested Prompts ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "What are Amit's key skills?",
  "Tell me about his projects",
  "How can I contact Amit?",
  "What certifications does he have?",
];

// ─── Chatbot Component ────────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm Amit's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
      id: 0,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, open]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");

    const userMsg = { role: "user", text: userText, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    let assistantText = "";
    const assistantMsgId = Date.now() + 1;
    let isStreamingStarted = false;

    // Try LLM Streaming
    try {
      const success = await callGeminiStream(
        userText,
        historyRef.current,
        (textChunk) => {
          if (!isStreamingStarted) {
            isStreamingStarted = true;
            setLoading(false); // hide typing dots once streaming starts
            setMessages(prev => [
              ...prev,
              { role: "assistant", text: textChunk, id: assistantMsgId }
            ]);
          } else {
            setMessages(prev =>
              prev.map(m => (m.id === assistantMsgId ? { ...m, text: m.text + textChunk } : m))
            );
          }
          assistantText += textChunk;
        }
      );

      if (success && assistantText) {
        setUsingFallback(false); // reset fallback state because the LLM is working!
        historyRef.current = [
          ...historyRef.current,
          { role: "user", text: userText },
          { role: "assistant", text: assistantText },
        ].slice(-12);
        return; // finished successfully
      } else {
        // If streaming failed mid-way, keep what we got; else fallback
        if (isStreamingStarted) {
          setLoading(false);
          return;
        }
        setUsingFallback(true);
      }
    } catch (err) {
      console.error("Streaming failed:", err);
      setUsingFallback(true);
    }

    // Rule-based fallback
    const fallbackText = getRuleBasedResponse(userText);
    setLoading(false);
    setMessages(prev => [
      ...prev,
      { role: "assistant", text: fallbackText, id: assistantMsgId }
    ]);

    historyRef.current = [
      ...historyRef.current,
      { role: "user", text: userText },
      { role: "assistant", text: fallbackText },
    ].slice(-12);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, lineIndex) => {
      let cleanLine = line;

      // Handle markdown headings (e.g. ### Title, ## Title, # Title) at the start of a line
      const headingMatch = line.match(/^(\s*)(#{1,6}\s+)(.*)/);
      if (headingMatch) {
        cleanLine = headingMatch[1] + "**" + headingMatch[3] + "**";
      }

      // Handle markdown bullets (* or - or •) at the start of a line
      const bulletMatch = cleanLine.match(/^(\s*)([*•-]\s+)(.*)/);
      if (bulletMatch) {
        cleanLine = bulletMatch[1] + "• " + bulletMatch[3];
      }

      // Split line into parts formatting markdown links: [label](url)
      const linkRegex = /(\[[^\]]+\]\([^)]+\))/g;
      const linkParts = cleanLine.split(linkRegex);

      const content = linkParts.map((part, pIdx) => {
        // Check if this part is a markdown link
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const label = linkMatch[1];
          const url = linkMatch[2];
          return (
            <a
              key={pIdx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          );
        }

        // Split part into bold (**text**) and italic (*text*)
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((bp, bIdx) => {
          if (bp.startsWith("**") && bp.endsWith("**")) {
            const innerBold = bp.slice(2, -2);
            const italicParts = innerBold.split(/(\*[^*]+\*)/g);
            return (
              <strong key={`${pIdx}-${bIdx}`}>
                {italicParts.map((ip, iIdx) => {
                  if (ip.startsWith("*") && ip.endsWith("*")) {
                    return <em key={iIdx}>{ip.slice(1, -1)}</em>;
                  }
                  return ip;
                })}
              </strong>
            );
          } else {
            const italicParts = bp.split(/(\*[^*]+\*)/g);
            return italicParts.map((ip, iIdx) => {
              if (ip.startsWith("*") && ip.endsWith("*")) {
                return <em key={iIdx}>{ip.slice(1, -1)}</em>;
              }
              return ip;
            });
          }
        });
      });

      return (
        <React.Fragment key={lineIndex}>
          {content}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        id="chatbot-toggle-btn"
        className={`chatbot-fab ${open ? "fab-open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open AI chat assistant"}
        title={open ? "Close" : "Chat with Amit's AI Assistant"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
        {!open && <span className="fab-pulse" />}
      </button>

      {/* Chat Panel */}
      <div className={`chatbot-panel ${open ? "panel-open" : ""}`} role="dialog" aria-label="AI Chat Assistant">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <div>
              <div className="chat-title">Amit's AI Assistant</div>
              <div className="chat-status">
                <span className="status-dot" />
                {usingFallback ? "Smart mode" : "AI powered"}
              </div>
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" id="chat-messages-container">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble-wrap ${msg.role}`}>
              {msg.role === "assistant" && (
                <div className="bubble-avatar">✦</div>
              )}
              <div className={`chat-bubble ${msg.role}`}>
                {renderText(msg.text)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-bubble-wrap assistant">
              <div className="bubble-avatar">✦</div>
              <div className="chat-bubble assistant typing-bubble">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions (only show at start) */}
        {messages.length <= 1 && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-wrap">
          <input
            ref={inputRef}
            id="chatbot-input"
            className="chat-input"
            type="text"
            placeholder="Ask me anything about Amit..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            maxLength={300}
            aria-label="Chat message input"
          />
          <button
            id="chatbot-send-btn"
            className="chat-send-btn"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <style>{`
        /* ── FAB Button ── */
        .chatbot-fab {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.45);
          z-index: 1000;
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
        }
        .chatbot-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(6, 182, 212, 0.6);
        }
        .chatbot-fab.fab-open {
          background: var(--text-muted);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .fab-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.35);
          animation: pulse-ring 2s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* ── Chat Panel ── */
        .chatbot-panel {
          position: fixed;
          bottom: 5.5rem;
          right: 2rem;
          width: 370px;
          height: 500px;
          max-height: calc(100vh - 7.5rem);
          max-height: calc(100dvh - 7.5rem);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 16px 48px rgba(0,0,0,0.18);
          z-index: 999;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px) scale(0.97) translateZ(0);
          pointer-events: none;
          transition: opacity 0.28s ease, transform 0.28s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        .chatbot-panel.panel-open {
          opacity: 1;
          transform: translateY(0) scale(1) translateZ(0);
          pointer-events: all;
        }

        /* ── Header ── */
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-color);
          background: linear-gradient(135deg, rgba(6,182,212,0.08), rgba(59,130,246,0.06));
          flex-shrink: 0;
        }
        .chat-header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .chat-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .chat-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .chat-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 6px;
          display: flex;
          transition: color 0.2s;
        }
        .chat-close-btn:hover { color: var(--text-primary); }

        /* ── Messages ── */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1rem 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          scrollbar-width: thin;
          scrollbar-color: var(--border-color) transparent;
        }
        .chat-bubble-wrap {
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
          animation: msg-in 0.22s ease-out;
        }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-bubble-wrap.user { flex-direction: row-reverse; }
        .bubble-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
          color: #fff;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-bottom: 2px;
        }
        .chat-bubble {
          max-width: 78%;
          padding: 0.65rem 0.9rem;
          border-radius: 14px;
          font-size: 0.875rem;
          line-height: 1.55;
          word-break: break-word;
        }
        .chat-bubble.assistant {
          background: rgba(6, 182, 212, 0.07);
          border: 1px solid rgba(6, 182, 212, 0.15);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }
        .chat-bubble.user {
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .chat-bubble a {
          color: var(--accent-cyan);
          text-decoration: underline;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .chat-bubble.user a {
          color: #fff;
          text-decoration: underline;
        }
        .chat-bubble a:hover {
          opacity: 0.85;
        }

        /* Typing dots */
        .typing-bubble {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 0.75rem 1rem;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-cyan);
          animation: bounce-dot 1.2s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }

        /* ── Suggestions ── */
        .chat-suggestions {
          padding: 0.5rem 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          flex-shrink: 0;
        }
        .suggestion-chip {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.75rem;
          padding: 0.3rem 0.65rem;
          border-radius: 20px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .suggestion-chip:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.06);
        }

        /* ── Input ── */
        .chat-input-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-top: 1px solid var(--border-color);
          flex-shrink: 0;
        }
        .chat-input {
          flex: 1;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input:focus { border-color: var(--accent-cyan); }
        .chat-input::placeholder { color: var(--text-muted); }
        .chat-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .chat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .chat-send-btn:not(:disabled):hover { transform: scale(1.08); }

        /* ── Mobile & Tablet responsive ── */
        @media (max-width: 768px) {
          .chatbot-panel {
            right: 0.75rem;
            left: 0.75rem;
            width: auto;
            bottom: 0.75rem;
            height: calc(100vh - 1.5rem);
            height: calc(100dvh - 1.5rem);
            max-height: none;
          }
          .chatbot-fab {
            right: 1.25rem;
            bottom: 1.25rem;
          }
          .chatbot-fab.fab-open {
            opacity: 0;
            pointer-events: none;
            transform: scale(0);
          }
        }
      `}</style>
    </>
  );
}
