import { jsPDF } from "jspdf";
import { portfolioData } from "./portfolioData";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = {
  accent:     [6, 182, 212],
  accentDark: [14, 116, 144],
  text:       [15, 23, 42],
  textMid:    [71, 85, 105],
  textLight:  [148, 163, 184],
  white:      [255, 255, 255],
  bgHeader:   [7, 9, 14],
  rule:       [226, 232, 240],
  certBg:     [240, 253, 255],
};

const PAGE_W = 210;
const PAGE_H = 297;
const M      = 14;          // left/right margin
const COL_W  = PAGE_W - M * 2;
const FOOTER = PAGE_H - 8; // bottom safe zone

// ─── Helpers ─────────────────────────────────────────────────────────────────

function wrap(doc, text, maxW) {
  return doc.splitTextToSize(text, maxW);
}

function rule(doc, y, color = C.rule) {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.3);
  doc.line(M, y, PAGE_W - M, y);
}

function fillRect(doc, x, y, w, h, color) {
  doc.setFillColor(...color);
  doc.rect(x, y, w, h, "F");
}

/**
 * Draw section heading. Returns new y after heading + underrule.
 */
function heading(doc, title, y) {
  // Guard: if near bottom, new page first
  if (y + 16 > FOOTER) {
    doc.addPage();
    y = M + 4;
  }
  doc.setFillColor(...C.accent);
  doc.rect(M, y, 3, 5.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...C.accentDark);
  doc.text(title.toUpperCase(), M + 5, y + 4.5);

  rule(doc, y + 7.5, C.rule);
  return y + 12;
}

/**
 * Guard page break — if `need` mm won't fit, add a page.
 */
function guard(doc, y, need = 14) {
  if (y + need > FOOTER) {
    doc.addPage();
    return M + 4;
  }
  return y;
}

// ─── Main Generator ───────────────────────────────────────────────────────────

/**
 * action: 'download' | 'view'
 * 'download' → triggers browser save-as
 * 'view'     → opens a blob URL in a new tab
 */
export async function generateResumePdf(action = "download") {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // Set PDF metadata — viewers use this as the tab/window title
  doc.setProperties({
    title:   "Amit_Mahajan_Resume",
    subject: "Senior AI Engineer Resume",
    author:  "Amit Mahajan",
    keywords: "AI Engineer, GenAI, Azure, RAG, LLM",
    creator: "Amit Mahajan Portfolio",
  });

  const {
    personalInfo, contact,
    skills, certifications,
    experience, projects, education,
  } = portfolioData;

  let y = 0;

  // ── HEADER ────────────────────────────────────────────────────────────────
  fillRect(doc, 0, 0, PAGE_W, 44, C.bgHeader);

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...C.white);
  doc.text(personalInfo.name, M, 15);

  // Title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...C.accent);
  doc.text(`${personalInfo.title}  |  ${personalInfo.subTitle}`, M, 22);

  // Location — NO emoji (Helvetica can't render them → garbled chars)
  doc.setFontSize(8.5);
  doc.setTextColor(...C.textLight);
  doc.text(
    `Location: ${personalInfo.location}  ·  ${personalInfo.relocationStatus}`,
    M, 28.5,
  );

  // Contact section (two left-aligned rows with clickable links)
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");

  const drawLinkRow = (items, yVal) => {
    let currentX = M;
    items.forEach((item, index) => {
      doc.setTextColor(148, 163, 184); // Slate 300 (C.textLight)
      doc.textWithLink(item.text, currentX, yVal, { url: item.url });
      currentX += doc.getTextWidth(item.text);

      if (index < items.length - 1) {
        const sep = "  |  ";
        doc.setTextColor(71, 85, 105); // Darker separator (C.textMid)
        doc.text(sep, currentX, yVal);
        currentX += doc.getTextWidth(sep);
      }
    });
  };

  drawLinkRow([
    { text: contact.email, url: `mailto:${contact.email}` },
    { text: contact.phone, url: `tel:${contact.phone.replace(/[^+\d]/g, "")}` }
  ], 34.5);

  drawLinkRow([
    { text: "amitmahajan.in", url: contact.website },
    { text: "linkedin.com/in/amit-mahajan-2574ab144", url: contact.linkedin },
    { text: "github.com/amitmahajan311", url: contact.github }
  ], 38.5);

  // Cyan accent bar below header
  doc.setDrawColor(...C.accent);
  doc.setLineWidth(0.9);
  doc.line(0, 44, PAGE_W, 44);

  y = 52;

  // ── PROFESSIONAL SUMMARY ─────────────────────────────────────────────────
  y = heading(doc, "Summary", y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...C.textMid);
  const sumLines = wrap(doc, personalInfo.summary, COL_W);
  doc.text(sumLines, M, y);
  y += sumLines.length * 4.2 + 6;

  // ── PROFESSIONAL EXPERIENCE ───────────────────────────────────────────────
  y = heading(doc, "Experience", y);

  experience.forEach((exp) => {
    y = guard(doc, y, 24);

    // Role
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...C.text);
    doc.text(exp.role, M, y);

    // Timeline — right aligned
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...C.textLight);
    doc.text(exp.timeline, PAGE_W - M, y, { align: "right" });

    // Company + location
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...C.accent);
    doc.text(`${exp.company}  ·  ${exp.location}`, M, y + 5.5);

    y += 11;
    rule(doc, y, C.rule);
    y += 4;

    // Achievement bullets
    exp.achievements.forEach((bullet) => {
      y = guard(doc, y, 9);
      const bLines = wrap(doc, bullet, COL_W - 6);

      // Filled cyan dot
      doc.setFillColor(...C.accent);
      doc.circle(M + 1.2, y - 0.5, 0.9, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.2);
      doc.setTextColor(...C.textMid);
      doc.text(bLines, M + 4, y);
      y += bLines.length * 3.9 + 1.8;
    });

    y += 5;
  });

  // ── FEATURED PROJECTS ─────────────────────────────────────────────────────
  y = heading(doc, "Selected Projects", y);

  projects.forEach((proj) => {
    y = guard(doc, y, 20);

    // Project title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...C.text);
    doc.text(proj.title, M, y);

    // Tech stack right-aligned
    const techStr = proj.tech.join("  ·  ");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.textLight);
    const techLines = wrap(doc, techStr, COL_W * 0.48);
    doc.text(techLines[0] ?? "", PAGE_W - M, y, { align: "right" });

    y += 5.5;

    // Impact summary
    const impactLines = wrap(doc, `Impact: ${proj.impact}`, COL_W - 4);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    doc.text(impactLines, M + 2, y);
    y += impactLines.length * 3.9 + 6;
  });

  // ── TECHNICAL SKILLS ─────────────────────────────────────────────────────
  y = heading(doc, "Skills", y);

  skills.forEach((cat) => {
    y = guard(doc, y, 14);

    // Category label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...C.text);
    doc.text(`${cat.category}:`, M, y);

    // Skills on next line, wrapped
    const skillStr = cat.items.join("   ·   ");
    const skillLines = wrap(doc, skillStr, COL_W - 2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    doc.text(skillLines, M, y + 5);
    y += skillLines.length * 4 + 9;
  });

  // ── CERTIFICATIONS ────────────────────────────────────────────────────────
  y = heading(doc, "Certifications", y);

  const CERT_COL_W = (COL_W - 8) / 2;
  let certRowY = y;

  certifications.forEach((cert, idx) => {
    const col = idx % 2;
    const xPos = M + col * (CERT_COL_W + 8);

    if (col === 0) {
      certRowY = guard(doc, certRowY, 14);
      y = certRowY;
    }

    // Card background
    doc.setFillColor(...C.certBg);
    doc.roundedRect(xPos, y - 3.5, CERT_COL_W, 12, 1.5, 1.5, "F");

    // Cert title (one line, truncated if needed)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.text);
    const titleLines = wrap(doc, cert.title, CERT_COL_W - 4);
    doc.text(titleLines[0], xPos + 2.5, y + 2);

    // Issuer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...C.textLight);
    doc.text(`Issued by ${cert.issuer}`, xPos + 2.5, y + 6.5);

    if (col === 1 || idx === certifications.length - 1) {
      certRowY += 15;
      y = certRowY;
    }
  });

  y = certRowY + 2;

  // ── EDUCATION ────────────────────────────────────────────────────────────
  y = heading(doc, "Education", y);

  y = guard(doc, y, 12);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.text);
  doc.text(education.degree, M, y);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...C.textLight);
  doc.text(education.timeline, PAGE_W - M, y, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...C.accent);
  doc.text(education.school, M, y + 5.5);

  if (education.details) {
    y += 11;
    const eduLines = wrap(doc, education.details, COL_W);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    doc.text(eduLines, M, y);
  }

  // ── PAGE FOOTERS ─────────────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...C.textLight);
    doc.text(
      `${personalInfo.name}  ·  Senior AI Engineer  ·  Page ${p} of ${totalPages}`,
      PAGE_W / 2, PAGE_H - 4,
      { align: "center" },
    );
    // Thin bottom rule
    doc.setDrawColor(...C.rule);
    doc.setLineWidth(0.2);
    doc.line(M, PAGE_H - 8, PAGE_W - M, PAGE_H - 8);
  }

  // ── OUTPUT ───────────────────────────────────────────────────────────────
  const fileName = "Amit_Mahajan_Resume.pdf";

  if (action === "view") {
    // Build a blob for the PDF
    const pdfBlob = doc.output("blob");
    const pdfUrl  = URL.createObjectURL(pdfBlob);

    // Wrap in a minimal HTML page so:
    //   • The browser tab shows "Amit_Mahajan_Resume" (not the UUID)
    //   • The download button in our toolbar saves with the correct filename
    const wrapperHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Amit_Mahajan_Resume</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; background: #3a3a3a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .toolbar {
      display: flex; align-items: center; justify-content: space-between;
      background: #1e1e1e; padding: 0 20px; height: 48px;
      border-bottom: 1px solid #333;
    }
    .toolbar-title { color: #e2e8f0; font-size: 14px; font-weight: 600; letter-spacing: 0.01em; }
    .toolbar-right { display: flex; align-items: center; gap: 10px; }
    .dl-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: #0891b2; color: #fff; border: none; border-radius: 6px;
      padding: 7px 14px; font-size: 13px; font-weight: 600;
      cursor: pointer; text-decoration: none; transition: background 0.2s;
    }
    .dl-btn:hover { background: #0e7490; }
    embed { display: block; width: 100%; height: calc(100vh - 48px); }
  </style>
</head>
<body>
  <div class="toolbar">
    <span class="toolbar-title">📄 Amit_Mahajan_Resume.pdf</span>
    <div class="toolbar-right">
      <a class="dl-btn" href="${pdfUrl}" download="${fileName}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      </a>
    </div>
  </div>
  <embed src="${pdfUrl}" type="application/pdf" width="100%" height="100%" />
</body>
</html>`;

    const htmlBlob = new Blob([wrapperHtml], { type: "text/html" });
    const htmlUrl  = URL.createObjectURL(htmlBlob);
    window.open(htmlUrl, "_blank", "noopener");

    // Clean up HTML blob URL after the tab has opened
    setTimeout(() => URL.revokeObjectURL(htmlUrl), 5000);
  } else {
    // Direct download with correct filename
    doc.save(fileName);
  }
}
