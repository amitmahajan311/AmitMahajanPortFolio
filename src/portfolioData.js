// NOTE: Place amit_resume.pdf in src/assets/ to re-enable the download button

export const portfolioData = {
  personalInfo: {
    name: "Amit Mahajan",
    title: "Senior AI Engineer",
    subTitle: "GenAI Developer",
    location: "Pune, India",
    relocationStatus: "Open to Relocation",
    headline: "Engineering Intelligent Systems & Enterprise-Scale Generative AI Solutions",
    summary: `Senior AI Engineer with 4.5+ years of experience designing and delivering Generative AI applications, enterprise AI platforms, and intelligent automation solutions across healthcare and insurance. Currently automating Directors & Officers (D&O) insurance renewals for Zurich IPZ using LangChain-based AI agent workflows, Python APIs, custom AWS Guardrails, and RAG validation. Expert in Azure AI Services, OpenAI LLMs, LangChain, Python, FastAPI, Streamlit, React.js, AI Guardrails, and Retrieval-Augmented Generation (RAG). Highly accomplished in document intelligence solutions, AI governance frameworks, automated validation platforms, and reusable AI accelerators supporting enterprise adoption of Generative AI. Strong foundation in cloud technologies, data engineering, Snowflake migration, and large-scale healthcare data modernization initiatives.`,
    stats: [
      { label: "Years of Experience", value: "4+" },
      { label: "AI Accelerators Built", value: "3+" },
      { label: "Client Demos Delivered", value: "20+" },
      { label: "Domain Certifications", value: "7" }
    ]
  },
  
  contact: {
    email: "amitmahajan264889@gmail.com",
    phone: "+91-9919631352",
    website: "https://amitmahajan.in",
    linkedin: "https://www.linkedin.com/in/amit-mahajan-2574ab144/",
    github: "https://github.com/amitmahajan311",
    resumeUrl: null, // Restore: add amit_resume.pdf to src/assets/ and re-import above
  },

  skills: [
    {
      category: "Generative AI & LLMs",
      items: [
        "OpenAI",
        "Azure AI Services",
        "Prompt Engineering",
        "Retrieval-Augmented Generation (RAG)",
        "AI Guardrails",
        "LLM Applications",
        "Document Intelligence",
        "AI Evaluation & Testing",
        "Responsible AI"
      ]
    },
    {
      category: "AI Application Development",
      items: [
        "Python",
        "FastAPI",
        "Streamlit",
        "React.js",
        "JavaScript",
        "REST APIs",
        "Full-Stack Development",
        "HTML/CSS"
      ]
    },
    {
      category: "Cloud & Platform Engineering",
      items: [
        "AWS",
        "Microsoft Azure",
        "Cloud Integration",
        "Linux/Unix",
        "Developer Productivity Tools"
      ]
    },
    {
      category: "Testing & Automation",
      items: [
        "Selenium",
        "Pytest",
        "Automation Framework Development",
        "RAG Testing & Validation"
      ]
    },
    {
      category: "Data Engineering",
      items: [
        "Snowflake",
        "Teradata",
        "SQL",
        "Ab Initio ETL",
        "Data Migration",
        "Data Validation",
        "ETL Development"
      ]
    }
  ],

  certifications: [
    {
      title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
      issuer: "NTT DATA",
      badge: "Azure AI",
      color: "azure"
    },
    {
      title: "Developing Generative AI Applications on AWS",
      issuer: "AWS Partner",
      badge: "AWS GenAI",
      color: "aws"
    },
    {
      title: "GenAI Academy Green Belt Certified",
      issuer: "NTT DATA",
      badge: "Green Belt",
      color: "green"
    },
    {
      title: "AWS Migration Essentials (Technical)",
      issuer: "AWS Partner",
      badge: "AWS Migration",
      color: "aws"
    },
    {
      title: "Snowflake Fundamentals Certification",
      issuer: "Snowflake",
      badge: "Snowflake",
      color: "snowflake"
    },
    {
      title: "Building a Data Warehouse using Matillion",
      issuer: "Matillion",
      badge: "Matillion",
      color: "matillion"
    },
    {
      title: "Selenium Automation Framework Training",
      issuer: "Udemy",
      badge: "Selenium",
      color: "selenium"
    }
  ],

  experience: [
    {
      role: "Senior AI Engineer",
      promotionNote: "Promoted in June 2024 from Ab Initio Developer (2+ years of experience)",
      company: "NTT DATA",
      location: "Pune, India (Remote)",
      timeline: "May 2022 – Present",
      achievements: [
        "Designed and delivered enterprise Generative AI applications leveraging Azure AI Services, OpenAI LLMs, Python, FastAPI, Streamlit, and React.js for internal accelerators and client-facing solutions.",
        "Led multiple Generative AI proof-of-concept (POC) initiatives end-to-end — from solution architecture and rapid prototyping through development, testing, and enterprise validation for diverse business use cases.",
        "Designed and delivered 20+ enterprise Generative AI demonstrations across banking (Wells Fargo, Citibank, Morgan Stanley, Truist), insurance (Zurich, MetLife, Hanover, Hiscox, SBI), and healthcare (Point32Health, Magellan) domains — covering Agentic AI, intelligent claims processing, RAG-based document intelligence, real-time compliance monitoring, and conversational AI solutions.",
        "Designed and implemented an AI-powered Contract Intelligence solution using Azure AI Services and OpenAI models to extract structured business information from unstructured documents, reducing contract analysis time from hours to under 2 minutes per document with 95%+ extraction accuracy.",
        "Developed a reusable AWS AI Guardrail framework with moderation APIs supporting text, image, JSON, and document inputs, enabling configurable AI governance and policy enforcement; containerized using Docker and Uvicorn for scalable, portable deployment.",
        "Automated validation workflows for Retrieval-Augmented Generation (RAG) components using Selenium and Pytest, improving testing reliability and reducing manual validation effort by 60%.",
        "Engineered and deployed a Common UI accelerator on Azure Web App, consolidating multiple POC backends (FastAPI + Flask/WSGI) and frontends into a single containerized runtime with Docker, Kubernetes, and automated CI/CD pipelines, enabling rapid client demonstrations through unified path-based routing.",
        "Contributed to enterprise AI platforms supporting RAG workflows, document parsing services, reusable AI accelerators, and developer productivity initiatives.",
        "Developed interactive React.js user interfaces integrated with backend APIs, enabling real-time AI interactions, insight visualization, and rapid solution prototyping.",
        "Established reusable UI standards, component libraries, and implementation guidelines, improving development consistency and accelerating AI solution delivery across teams.",
        "Collaborated with architects, developers, and business stakeholders to prototype, validate, and deliver scalable AI solutions aligned with business requirements.",
        "Provided technical guidance and knowledge sharing across AI projects, supporting successful delivery of multiple GenAI accelerators and proof-of-concept solutions.",
        "Supported large-scale healthcare data modernization for BCBS, providing end-to-end production support across 3,000+ ETL jobs using Ab Initio, Teradata, and Snowflake, while successfully remediating 1,400+ Ab Initio objects with 100% data integrity."
      ]
    }
  ],

  projects: [
    {
      id: "zurich-ipz-do-renewal",
      title: "Zurich IPZ: D&O Insurance Renewal Automation",
      subtitle: "Agentic AI Workflows for Directors & Officers Insurance",
      tech: ["LangChain", "LangGraph", "Python", "FastAPI", "React.js", "AWS Guardrails", "RAG"],
      role: "Senior AI Engineer",
      problem: "The Directors & Officers (D&O) insurance renewal process is largely manual, spanning data gathering, validation, and business review stages. This slows every renewal and increases operational effort and the risk of inconsistencies.",
      solution: "Building AI agent workflows that automate the different stages of the D&O renewal lifecycle. LangChain-based workflows drive the orchestration, Python APIs handle backend business logic, validation logic enforces data and business rules, and React.js interfaces integrate with the AI-powered backend services.",
      contributions: [
        "Developed and orchestrated LangChain nodes implementing AI agent workflows for the different stages of the renewal process.",
        "Built Python-based APIs to support business logic, AI workflow execution, and integration between application components.",
        "Implemented business and data validation logic to ensure accuracy, consistency, and reliability across renewal stages.",
        "Implemented custom AWS Guardrails and RAG validation workflows, and integrated AI-powered backend services with React.js frontends."
      ],
      impact: "Streamlines the D&O insurance renewal process through AI-driven automation, reducing manual intervention and improving operational efficiency for business stakeholders.",
      linkText: "LangChain | AWS | React.js"
    },
    {
      id: "contract-intelligence",
      title: "Contract Intelligence Platform",
      subtitle: "Enterprise Document AI Extraction",
      tech: ["Azure AI Services", "OpenAI LLMs", "Streamlit", "Python"],
      role: "Senior AI Engineer",
      problem: "Enterprise legal and procurement teams spent hundreds of hours manually reviewing lengthy contract agreements to extract key metadata, compliance terms, and business variables, leading to slow processing times and human errors.",
      solution: "Engineered an end-to-end Generative AI document ingestion and intelligence pipeline. The solution leverages Azure Document Intelligence for advanced OCR layout extraction and OpenAI models to parse unstructured contract text into highly structured JSON data formats.",
      contributions: [
        "Built document ingestion pipelines and prompt-engineered extraction workflows with structured JSON schemas.",
        "Developed a responsive Streamlit-based web interface for document uploads, interactive field reviews, direct text editing, and PDF/Excel export.",
        "Implemented secure, multi-stage LLM calling patterns to handle large multi-page contract variations."
      ],
      impact: "Automated the extraction of metadata across diverse vendor agreement formats, reducing average contract analysis time from hours to under 2 minutes per document, and achieved 95%+ accuracy in extracting critical legal fields.",
      linkText: "Azure AI | OpenAI"
    },
    {
      id: "ai-guardrail-framework",
      title: "AWS AI Guardrail Framework",
      subtitle: "Enterprise Governance & Policy Enforcement",
      tech: ["FastAPI", "Amazon Bedrock", "Amazon S3", "Python", "AWS", "Docker"],
      role: "Senior AI Engineer",
      problem: "The codebase solves a common GenAI safety challenge: how to consistently moderate multi-format content (text, JSON payloads/files, and images) before and after model interaction, while keeping policy control centralized and updateable in AWS.",
      solution: "This project is a FastAPI microservice that wraps Amazon Bedrock Guardrails as reusable APIs. It provides input and output moderation for user prompts and model responses, JSON payload/file moderation, image moderation using Bedrock and S3, and dynamic guardrail policy updates. Security is implemented through Bearer token auth sourced from env, SSM parameters, or configurations.",
      contributions: [
        "Unified moderation API layer across multiple data modalities, not just plain text.",
        "Guardrail lifecycle support: update configuration and auto-create new versions.",
        "Recursive JSON utilities that extract and re-inject moderated values in nested structures.",
        "S3-based file workflow for production-style content pipelines.",
        "Strong request validation via Pydantic models for guardrail policy structures.",
        "Containerized deployment path (Docker + Uvicorn) for easy runtime portability."
      ],
      impact: "Reduces compliance and reputational risk by enforcing safety policies before/after LLM processing, and speeds go-live by offering moderation as a drop-in service. Standardizes moderation endpoint contracts, simplifies integration, improves policy governance, and aligns with secure AWS operational practices (SSM, IAM).",
      linkText: "AWS"
    },
    {
      id: "rag-validation-automation",
      title: "RAG Validation Automation Framework",
      subtitle: "TechHub Custom RAG Lifecycle Validation",
      tech: ["Python", "Selenium", "Pytest", "Automation"],
      role: "Senior AI Engineer",
      problem: "TechHub has a Custom RAG capability running on a shared AI platform with reusable AI components. Multiple teams depend on it for different use cases, and platform code can change over time. The core problem was that there was no consistent, repeatable way to validate that Custom RAG workflows still worked end to end after updates. This created risk of regressions, delayed releases, and manual validation effort.",
      solution: "We built an automated test framework focused on Custom RAG use case lifecycle validation. The solution is Selenium plus Pytest based and validates the key user flows and data checks for use case creation, update behavior, and deletion scenarios. The framework is data-driven and reusable, so future teams can run the same suite when platform code changes and quickly detect whether Custom RAG behavior is still correct.",
      contributions: [
        "Designed and implemented end-to-end automation coverage for Custom RAG use case flows.",
        "Built reusable Pytest test structure and fixtures for scalable regression execution.",
        "Added validation logic to ensure data and workflow consistency across scenarios.",
        "Created a framework that can be executed repeatedly in future release cycles to confirm platform stability."
      ],
      impact: "Reduces production risk by catching regressions before release, improves confidence for platform and product teams using Custom RAG, and standardizes test execution processes across teams, accelerating release cycles.",
      linkText: "Azure"
    },
    {
      id: "common-ui-accelerator",
      title: "Common UI Accelerator Platform",
      subtitle: "Centralized Hub for Reusable Enterprise AI Solutions",
      tech: ["FastAPI", "React.js", "Python", "Docker", "Kubernetes", "CI/CD"],
      role: "Senior AI Engineer",
      problem: "The earlier architecture ran isolated POCs across multiple web apps, leading to infrastructure sprawl, high maintenance overhead, repeated CI/CD configurations, and operational fragmentation. Scaling registration of new POCs remained error-prone, requiring manual router edits across imports, API mounts, and frontend paths with shared runtime blast radius concerns.",
      solution: "Engineered a unified FastAPI gateway that consolidates multiple POCs into a single Azure Web App. Backends are mounted via FastAPI or WSGI middleware, while frontends are served as static SPA routes. To onboard a new POC, developers add the POC folder into main, register it in app.py, update the built distributions (dist), and push to GitHub, where a CI/CD pipeline automatically builds and deploys the entire runtime as a single unit.",
      contributions: [
        "Centralized multi-POC runtime: Consolidated multiple independent POC backend apps and frontend dist builds into a single running FastAPI service (app.py).",
        "Hybrid framework compatibility: Integrated Flask-based applications via WSGI middleware alongside native FastAPI endpoints under a unified runtime.",
        "Standardized route conventions: Enforced consistent path-based routing patterns for UIs and APIs to ensure predictable access and namespace separation.",
        "SPA-aware frontend hosting: Structured static directory mounts with SPA fallback routing to correctly serve client-side routed frontends across multiple POCs.",
        "Automated CI/CD onboarding: Established a pipeline workflow where pushing POC updates (adding folders to main and updating dist assets) triggers a build for deployment to a single Azure Web App.",
        "Containerized deployment baseline: Standardized runtime packaging using Docker and Kubernetes manifests for repeatable, scalable deployment."
      ],
      impact: "Reduced infrastructure complexity by consolidating isolated web apps into a single containerized runtime, lowering maintenance overhead and cloud costs. Accelerated stakeholder demos by enabling teams to deploy and navigate new POCs via unified path-based routing under one ingress host.",
      linkText: "Azure"
    },
    {
      id: "bcbs-edw-modernization",
      title: "BCBS EDW (Healthcare Data Modernization)",
      subtitle: "Enterprise Warehouse Integration & Cloud Migration",
      tech: ["Ab Initio", "Teradata", "Snowflake", "UNIX", "SQL", "Control Center"],
      role: "Ab Initio Developer",
      problem: "BCBSNC needed to integrate various historical source systems from their current CDW into a new Enterprise Data Warehouse (EDW) while enhancing enterprise integrated repositories and managing high maintenance costs of legacy data platforms.",
      solution: "Developed and maintained complex ETL workflows using Ab Initio to build and run graphs, leveraged Snowflake and Teradata to view data and manually run SQL queries for testing and data validation, and utilized Control Center to monitor job status, manage incidents, and configure schedule run times.",
      contributions: [
        "Developed, maintained, and executed complex ETL workflows and graphs using Ab Initio GDE, Co>Operating System, and EME.",
        "Manually queried, viewed, and validated high-volume datasets in Teradata and Snowflake using SQL queries for testing and data reconciliation.",
        "Monitored batch job run status, handled incident resolution, and configured scheduled execution times using Control Center.",
        "Remediated and modernized 1,400+ Ab Initio objects (graphs, plans, and psets) as part of enterprise legacy modernization initiatives."
      ],
      impact: "Delivered end-to-end production support for critical ETL workflows, ensuring uninterrupted data processing and system reliability across 3,000+ jobs, and successfully modernizing 1,400+ objects with 100% data integrity.",
      linkText: "Ab Initio, Teradata, Snowflake & Control Center"
    },
    {
      id: "excel-data-cleanup-sandbox",
      title: "Excel Data Cleanup & Validation Sandbox",
      subtitle: "Data Engineering, Ingestion Pipelines & Interactive ETL",
      tech: ["React", "FastAPI", "Pandas", "Tailwind CSS", "Python", "REST API", "openpyxl", "xlsxwriter"],
      role: "Full-Stack ETL Developer",
      problem: "Raw client spreadsheet uploads (CSV, XLS, XLSX) frequently suffer from trailing whitespaces, invalid email syntax, non-standardized date structures (e.g. May 20, 2026 vs 2026-05-20), and duplicate records with capitalization typos. These data discrepancies bypass standard ingestion rules, corrupting database tables and causing downstream reporting failures.",
      solution: "Developed a decoupled, full-stack ETL sandbox platform. The frontend dashboard gives users real-time previews of original sheets, missing values rates, and date anomalies. A high-performance FastAPI backend executes a customizable pipeline (whitespace trimming, email domain validation, case formatting, and date standardization). The system finishes with a case-insensitive, composite duplicate matching engine to resolve rows that only become identical after formatting.",
      contributions: [
        "Case-Insensitive Composite Matching: Engineered a type-agnostic duplicate detection algorithm using Pandas, matching rows on combined keys (like ID and Name) regardless of casing typos or integer-to-string format mismatches.",
        "Compliance Audit & Diff Tracking: Built an element-wise comparison utility tracking cell edits, row deletions, and column drops to feed a searchable Audit Trail and generate corporate Quality Excel reports.",
        "Robust Excel Parsers: Implemented custom try-except wrappers over python spreadsheet libraries (openpyxl and xlrd) to capture zip-bomb or engine faults, returning friendly diagnostic tips to the user instead of raw stack traces."
      ],
      impact: "Delivered 95% speed reduction in spreadsheet cleaning cycles for operations teams, intercepting structural faults before database ingestion and securing 100% downstream analytical data integrity.",
      linkText: "React, Vite, FastAPI, Pandas, openpyxl & xlsxwriter",
      demoUrl: "https://excel-data-cleanup-and-validation-t.vercel.app",
      architecture: {
        description: "The application follows a decoupled Client-Server pattern split into three main modules: React Dashboard, Communication Protocol (REST API), and FastAPI & Pandas pipeline backend.",
        steps: [
          {
            title: "1. Client Side (React Dashboard)",
            detail: "Includes a dynamic Settings Panel for parameter toggles (whitespace trimming, casing conversions, date standardization), Upload Handler for extensions checking and multipart uploads, and Preview Screens displaying missing value highlights."
          },
          {
            title: "2. Communication Protocol (REST API)",
            detail: "Features stateless endpoints communicating via axios with secure, in-memory session folder caching backend to minimize network overhead."
          },
          {
            title: "3. Backend Engine (FastAPI & Pandas Pipeline)",
            detail: "Fires datasets through sequential ETL steps: Data Normalization (blank dropping, whitespace trim), Email & Date Standardization (regex parsing to ISO YYYY-MM-DD), Late-Stage Composite Duplicates Matching (casing/type-agnostic normalization), and Audit Change Log generation."
          }
        ]
      }
    }
  ],

  education: {
    degree: "Integrated B.Tech & M.Tech in Computer Science & Engineering",
    school: "Lovely Professional University (LPU), Punjab",
    timeline: "2017 – 2022",
    details: ""
  }
};
