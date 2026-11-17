/**
 * Single source of truth for the portfolio.
 * Every item is stored once; the active profile decides which blurb shows and in what order.
 * A link whose value is "TODO" renders as a disabled "Coming soon" button.
 */

export type Profile = "tech" | "product" | "both";
export type Lane = "tech" | "product";

export type LinkKey = "github" | "live" | "paper" | "report" | "deck" | "demo" | "event" | "profile";
export type Links = Partial<Record<LinkKey, string>>;

export type Item = {
  slug: string;
  title: string;
  org: string;
  role?: string;
  kicker: string;
  dates?: string;
  location?: string;
  profiles: Lane[];
  /** Match scores exist only where the content pack gives them; the tag is hidden otherwise. */
  matchTech?: number;
  matchProduct?: number;
  /** Lane-neutral description, used when an item has no per-lane blurbs. */
  blurb?: string;
  blurbTech?: string;
  blurbProduct?: string;
  bulletsTech?: string[];
  bulletsProduct?: string[];
  stack: string[];
  links: Links;
  /** Slug of a related project, rendered as an in-site "Open project" button. */
  related?: string;
  logo?: string; // key into /public/logos, e.g. "makemytrip"
  secondaryLogo?: string;
  art?: string; // /public/art path; placeholder until supplied
  pinProduct?: boolean; // appears first in the product profile
};

export const TODO = "TODO";
const both: Lane[] = ["tech", "product"];

/* ------------------------------------------------------------------ identity */

export const identity = {
  name: "Sneha Roychowdhury",
  initials: "SR",
  email: "sneharc.work@gmail.com",
  phone: "+91-8368253911",
  social: {
    github: "https://github.com/sneharc16",
    linkedin: "https://www.linkedin.com/in/snehaaroychowdhury/",
    leetcode: "https://leetcode.com/u/snehaarc/",
    codechef: "https://www.codechef.com/users/sneharc16",
  },
  resume: {
    tech: "/resume/sneha-tech.pdf",
    product: "/resume/sneha-product.pdf",
  },
  education: {
    degree: "B.Tech, Electronics and Communication Engineering (AI)",
    institute: "Indira Gandhi Delhi Technical University for Women (IGDTUW)",
    city: "Delhi",
    years: "2023 to 2027",
    logo: "igdtuw",
  },
} as const;

/* ---------------------------------------------------------------------- hero */

export const hero: Record<Profile, { label: string; tagline: string }> = {
  tech: {
    label: "Final-year engineer, IGDTUW",
    tagline:
      "Final-year engineer at IGDTUW who ships full-stack and AI systems, competes at ICPC, and has an IEEE paper and a hackathon win among 88,000 teams.",
  },
  product: {
    label: "Product-minded engineer, IGDTUW",
    tagline:
      "Engineer turned product thinker: PRDs for a Rs. 60,000 Cr public programme, a 4-portal internal platform at Cars24, and eight product and B-plan wins across IITs and IIMs.",
  },
  both: {
    label: "Engineer who also does product",
    tagline:
      "Writes the PRD, builds the thing, then competes at ICPC on the weekend. Pick a lane? Why.",
  },
};

export const heroLogos = ["makemytrip", "cars24", "kpmg", "igdtuw", "drdo"];

/* ------------------------------------------------------------------ profiles */

export const BOTH_SUBTITLES = {
  receipts: "Can do both. Has the receipts.",
  prdThenBuild: "Writes the PRD, then builds it.",
  whyChoose: "Why choose?",
} as const;

export const profileMeta: Record<Profile, { label: string; accent: string; subtitle: string }> = {
  tech: { label: "Tech", accent: "#3B82F6", subtitle: "Ships the code." },
  product: { label: "Product", accent: "#F59E0B", subtitle: "Decides what ships." },
  both: { label: "Both", accent: "#8B5CF6", subtitle: BOTH_SUBTITLES.receipts },
};

/* ------------------------------------------------------------------- about */

export const about = [
  "I am a final-year ECE-AI student at IGDTUW, Delhi, and I grew up a defence kid, which means I have changed cities often and learnt to build quickly wherever I land. I am currently a Project Intern (Technology) at MakeMyTrip in the Goibibo business unit, working with tech, product and marketing teams on coupon automation and traveller-intent pipelines.",
  "On the engineering side I build end to end: an LLM geospatial planner published in IEEE Xplore, a wellness platform that won Smart India Hackathon 2024, an offline OS assistant for Samsung EnnovateX, and a deterministic financial attention engine (Groww Delta). I compete at ICPC regionals and hold a 4-star CodeChef rating.",
  "On the product side I have written 20+ PRDs at KPMG for a World Bank-backed government programme, built internal tools at Cars24 that cut coordination by 70%, and won B-plan and product case competitions at IIT Delhi, IIM Bangalore and DTU. I am looking for SDE and APM roles starting January 2027.",
];

export const timeline: { label: string; text: string }[] = [
  { label: "2023", text: "Joined IGDTUW (ECE-AI)" },
  { label: "Nov 2024", text: "Won Smart India Hackathon 2024" },
  { label: "Jan to Jul 2025", text: "DRDO research intern, LLM-GISx; IEEE paper" },
  { label: "2025", text: "ICPC Asia West regionals, Citadel finalist, Samsung EnnovateX" },
  { label: "Jun to Aug 2026", text: "Cars24 intern" },
  { label: "Aug to Oct 2026", text: "KPMG product intern" },
  { label: "Nov 2026", text: "MakeMyTrip (Goibibo) intern" },
  { label: "Jan 2027", text: "Open to SDE and APM roles" },
];

/* --------------------------------------------------------------- experience */

const cars24Tech = {
  blurbTech:
    "Project Rakshak, a 4-portal React 19 platform with RBAC, OTP auth, Postgres RLS and a GPT-4o hiring tool.",
  blurbProduct:
    "Designed approval workflows, audit logs and SLA tracking that cut manual coordination by 70%.",
  bulletsTech: [
    "Built Project Rakshak, a 4-portal full-stack internal platform in React 19 with RBAC and OTP-based authentication.",
    "Engineered approval pipelines with PostgreSQL RLS, audit logs and Google Calendar API (OAuth 2.0).",
    "Maintained a 24K+ LOC AI hiring tool using GPT-4o and vector embeddings for JD-fit scoring and PDF parsing.",
  ],
  bulletsProduct: [
    "Built and launched a 4-portal internal platform (admin, mentor, evaluator, team) with role-based access.",
    "Designed approval workflows, audit logs and SLA tracking; cut manual coordination by 70% across 31+ audits and 25+ approvals.",
    "Built a 6-dimension IS Score in an AI-powered ATS (GPT-4o, vector embeddings) to automate candidate shortlisting.",
  ],
  stack: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "OpenAI GPT-4o", "RBAC", "OAuth 2.0"],
};

export const experience: Item[] = [
  {
    slug: "makemytrip",
    title: "MakeMyTrip (Goibibo BU)",
    org: "MakeMyTrip (Goibibo BU)",
    role: "Project Intern, Technology",
    kicker: "Project Intern, Technology",
    dates: "Nov 2026 to Present",
    location: "Gurugram",
    profiles: both,
    matchTech: 94,
    matchProduct: 96,
    logo: "makemytrip",
    secondaryLogo: "goibibo",
    blurbTech: "Internal tools and a cross-platform intent pipeline on WebEngage, Adobe Analytics and S3.",
    blurbProduct: "Turning usage data into coupon, messaging and ranking decisions for Goibibo.",
    bulletsTech: [
      "Building internal tools with tech and product teams to automate coupon and multimedia message workflows, cutting manual work by 25%.",
      "Designing a pipeline across Adobe Analytics (CJA) and WebEngage to segment users by travel intent for retention campaigns.",
      "Working on traveller-type based hotel and bus ranking.",
    ],
    bulletsProduct: [
      "Gathering requirements from marketing and operations users and turning usage data into insights that improve retention.",
      "Designing a cross-platform (MakeMyTrip + Goibibo) intent pipeline for retention campaigns.",
      "Sharing data insights that guide product and marketing decisions on hotel and bus ranking.",
    ],
    stack: ["WebEngage", "Adobe Analytics (CJA)", "AWS S3", "SQL", "Python"],
    links: {},
  },
  {
    slug: "cars24",
    title: "Cars24",
    org: "Cars24",
    role: "Tech and Product Intern",
    kicker: "Tech and Product Intern",
    dates: "Jun 2026 to Aug 2026",
    location: "Gurugram",
    profiles: both,
    matchTech: 95,
    matchProduct: 93,
    logo: "cars24",
    ...cars24Tech,
    links: { deck: TODO },
  },
  {
    slug: "kpmg",
    title: "KPMG",
    org: "KPMG",
    role: "Product Intern, Government and Public Sector (E&S team)",
    kicker: "Product Intern, Government and Public Sector",
    dates: "Aug 2026 to Oct 2026",
    location: "Gurugram",
    profiles: both,
    matchTech: 70,
    matchProduct: 98,
    pinProduct: true,
    logo: "kpmg",
    blurbTech: "Requirements engineering and UAT on government portals.",
    blurbProduct: "20+ PRDs for a Rs. 60,000 Cr ITI-upgrade programme with the World Bank and state governments.",
    bulletsTech: [
      "Ran user acceptance testing on the portals, validating features against acceptance criteria and flagging issues to engineering.",
      "Turned stakeholder requirements into user flows, specs and acceptance criteria.",
    ],
    bulletsProduct: [
      "Led client meetings with banks and state government stakeholders to gather requirements; presented insights to leads.",
      "Authored 20+ PRDs, turning client feedback into user flows, specs and acceptance criteria for cross-functional teams.",
      "Contributed to a small part of a Rs. 60,000 Cr programme alongside the World Bank, Central Bank of India, state governments and ministries.",
    ],
    stack: ["PRDs", "UAT", "Stakeholder management", "Power BI", "MS Excel"],
    links: {},
  },
  {
    slug: "drdo",
    title: "DRDO",
    org: "DRDO",
    role: "Research Intern (LLM-GISx)",
    kicker: "Research Intern (LLM-GISx)",
    dates: "Jan 2025 to Jul 2025",
    location: "Delhi",
    profiles: both,
    matchTech: 97,
    matchProduct: 80,
    logo: "drdo",
    secondaryLogo: "isro",
    blurbTech: "LLM agent that plans Chain-of-Thought workflows across 9 geoprocessing tools; Best Paper at AIST-2025.",
    blurbProduct: "Made GIS usable by ministries and farmers through plain-language, 15-language voice and text chat.",
    bulletsTech: [
      "Built a FastAPI backend and React frontend where a Llama 3.3 70B agent plans Chain-of-Thought workflows across 9 geoprocessing tools.",
      "Added voice and text chat in 15+ Indian languages, map-based area selection and PDF reports, cutting GIS task time by 95%.",
    ],
    bulletsProduct: [
      "Designed role-based entry (email login for ministries, OTP for farmers) and accessibility-first flows for low-literacy users.",
      "Published the work in IEEE Xplore; Best Paper at AIST-2025.",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "Llama 3.3 70B", "GeoPandas", "Rasterio", "OpenLayers"],
    links: {
      github: "https://github.com/sneharc16/LLM-GISx-ISRO-Hackathon",
      live: "https://llm-gisx-frontend.vercel.app",
      paper: "https://ieeexplore.ieee.org/document/11441593",
    },
  },
];

/* ----------------------------------------------------------------- projects */

export const projects: Item[] = [
  {
    slug: "llm-gisx",
    title: "LLM-GISx: AI Geospatial Planner",
    org: "DRDO",
    kicker: "DRDO Research, Best Paper AIST-2025",
    dates: "Jan to Jul 2025",
    profiles: both,
    matchTech: 98,
    matchProduct: 85,
    logo: "drdo",
    secondaryLogo: "isro",
    blurbTech: "An LLM agent that turns a plain-English spatial question into a multi-step GIS workflow and a PDF report.",
    blurbProduct: "Geospatial intelligence for ministries, planners and farmers, with no GIS expertise needed.",
    bulletsTech: [
      "FastAPI backend and React + Vite + OpenLayers frontend; Llama 3.3 70B plans Chain-of-Thought workflows across 9 geoprocessing tools with a transparent CoT log.",
      "Voice and text chat in 15+ Indian languages via Web Speech API; bounding-box drawing, .tif upload, PDF reports; 95% reduction in GIS task time.",
    ],
    bulletsProduct: [
      "Three user personas (policy makers, GIS analysts, farmers) with role-based login and an accessibility-first UI for rural users.",
      "Built for ISRO's Bharatiya Antariksh Hackathon 2025; Best Paper at AIST-2025; published in IEEE Xplore.",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "Llama 3.3 70B", "GeoPandas", "Rasterio", "OpenLayers", "Tailwind"],
    links: {
      github: "https://github.com/sneharc16/LLM-GISx-ISRO-Hackathon",
      live: "https://llm-gisx-frontend.vercel.app",
      paper: "https://ieeexplore.ieee.org/document/11441593",
    },
  },
  {
    slug: "groww-delta",
    title: "Groww Delta (DELTA)",
    org: "B.Tech minor project",
    kicker: "Intent-conditioned financial event ranking",
    dates: "2026",
    profiles: both,
    matchTech: 96,
    matchProduct: 97,
    logo: "groww",
    blurbTech:
      "A deterministic attention engine with a knowledge cursor and a bounded driver graph; 100 unit tests and 7 Playwright e2e tests.",
    blurbProduct:
      "A watchlist that remembers why you are watching, what you have already seen, and what changed that actually matters.",
    bulletsTech: [
      "Next.js 16, React 19, TypeScript, Prisma 7 on PostgreSQL (Neon), Zod, Vitest + Playwright; layered monolith with domain, services and presentation separated.",
      "Attention score = 0.30 significance + 0.35 relevance + 0.15 novelty + 0.10 urgency + 0.10 confidence; graph traversal bounded to depth 3 and 25 nodes.",
      "Deterministic five-step replay so evaluators reproduce behaviour without live market APIs.",
    ],
    bulletsProduct: [
      "Three new pieces of state a normal watchlist lacks: Watch Intent, Knowledge Cursor and a user-confirmed Driver Graph (crude oil to IndiGo through fuel cost).",
      "Classifies every update as Relevant, Significant or Quiet and explains why; acknowledged items never resurface.",
      "B.Tech minor project and the subject of a research paper targeted at AIST 2026.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Neon", "Zod", "Vitest", "Playwright", "Vercel"],
    links: {
      github: "https://github.com/sneharc16/fin-baddie",
      live: "https://groww-delta-dusky.vercel.app/",
      paper: TODO,
    },
  },
  {
    slug: "swasth-infinity",
    title: "Swasth Infinity (SaathiSync)",
    org: "Smart India Hackathon 2024",
    kicker: "Winning Project, Smart India Hackathon 2024",
    dates: "Nov 2024",
    profiles: both,
    matchTech: 95,
    matchProduct: 92,
    logo: "sih",
    blurbTech: "Real-time pose scoring with MoveNet and TensorFlow.js, a Next.js app with an A-Frame virtual forest.",
    blurbProduct: "A holistic wellness platform that won SIH 2024 against 88,000+ teams; freemium model.",
    bulletsTech: [
      "Real-time computer vision (MoveNet, TensorFlow.js) scoring yoga posture on 8 joint angles and counting gym reps.",
      "Diet recommender (K-Means + Random Forest over 30K+ dishes, OpenFoodFacts and USDA data), health-risk classifier, A-Frame 3D virtual forest, expert chat.",
    ],
    bulletsProduct: [
      "Designed a holistic product: carbon-footprint tracker, gamified virtual forest, SheFit women's care with an AI chatbot, expert consults and a community recipe feed.",
      "Led the team to 1st among 88,000+ teams and 492,000+ students (Ministry of Education).",
    ],
    stack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "TensorFlow.js", "MoveNet", "Hugging Face", "Google Maps API"],
    links: {
      github: "https://github.com/sneharc16/sih-project",
      live: "https://work-sih.vercel.app",
      deck: "https://drive.google.com/file/d/1wwRBo-9S6oTYRxNL8K2Xxe4HGGBRlKKF/view?usp=sharing",
    },
  },
  {
    slug: "intelligent-os-assistant",
    title: "Intelligent OS Assistant (NeuroOS)",
    org: "Samsung EnnovateX 2025",
    kicker: "Samsung EnnovateX 2025 AI Challenge",
    dates: "Aug 2025",
    profiles: ["tech"],
    matchTech: 93,
    matchProduct: 60,
    logo: "samsung",
    blurbTech:
      "Offline-first OS assistant for Linux, macOS and Windows that turns chained voice and text commands into system automation.",
    blurbProduct: "A privacy-first, no-cloud OS assistant built to a strict compliance brief.",
    bulletsTech: [
      'Chained commands ("open firefox and code and terminal", saved workspaces, reminders, file and media control) parsed into intents and executed via shell automation.',
      "Speech-to-text on CPU with faster-whisper (int8) and intent parsing; 90%+ accuracy at under 1 s latency; optional local GGUF or Hugging Face models, no network calls.",
    ],
    bulletsProduct: [
      "Offline by default, local storage only, no telemetry; Raspberry Pi-ready architecture.",
      "Team NeuroKernels (3 members); 10-minute demo video submitted.",
    ],
    stack: ["Python", "faster-whisper", "Hugging Face Transformers", "Shell automation"],
    links: {
      github: "https://github.com/sneharc16/NeuroKernel-NextOS-EnnovateX2025",
      demo: "https://www.youtube.com/watch?v=ziajMIa0Iyc",
    },
  },
  {
    slug: "quant-forecasting",
    title: "Quantitative Time-Series Forecasting Pipeline",
    org: "Citadel Datathon 2025",
    kicker: "Citadel Datathon 2025, Finalist",
    dates: "May 2025",
    profiles: both,
    matchTech: 90,
    matchProduct: 75,
    logo: "citadel",
    blurbTech: "680K+ rows of energy-market data, Granger causality, and a Random Forest with R² of 0.9991.",
    blurbProduct: "Does the gasoline price predict energy-sector returns? A finalist answer for Citadel and Correlation One.",
    bulletsTech: [
      "Built a Python pipeline on 680K+ rows across 7 energy datasets (2000 to 2023); tested price drivers with Granger causality.",
      "Engineered lag, moving-average and volatility features; Random Forest hit R² = 0.9991, 73% lower RMSE than VAR.",
    ],
    bulletsProduct: [
      "Framed the question for investors, policymakers and energy companies and wrote the final report.",
      "Finalist, top 60 of 4,000+.",
    ],
    stack: ["Python", "Pandas", "NumPy", "scikit-learn", "statsmodels"],
    links: {
      github: "https://github.com/sneharc16/Quantitative-Time-Series-Forecasting-Pipeline-for-Energy-Markets",
      report: "https://drive.google.com/file/d/1CQ41W88-lcLbF9VXr0A__QxVhAyqYt-U/view?usp=share_link",
    },
  },
  {
    slug: "makhmade",
    title: "Makhmade",
    org: "Business proposal",
    kicker: "D2C makhana beverage, business proposal and GTM strategy",
    profiles: ["product"],
    matchTech: 40,
    matchProduct: 95,
    blurbProduct:
      "A D2C makhana drink proposal with a farm-to-package supply chain, pricing model and Rs. 12 Cr Year-5 projection.",
    bulletsProduct: [
      "Market research and sizing (TAM $5.95B) for a D2C makhana drink with a farm-to-package supply chain.",
      "Business case and pricing model (Rs. 50 sachet, 53% gross margin), GTM plan and Rs. 12 Cr Year-5 projection.",
    ],
    stack: ["Market sizing", "Unit economics", "Pricing", "GTM"],
    links: {
      deck: "https://drive.google.com/file/d/1qBiakTRpm0SKgTAwrXMIrbmekF3xA2pM/view?usp=sharing",
    },
  },
  {
    slug: "project-rakshak",
    title: "Project Rakshak (Cars24)",
    org: "Cars24",
    kicker: "4-portal internal platform",
    dates: "Jun to Aug 2026",
    profiles: ["product"],
    matchTech: 95,
    matchProduct: 93,
    logo: "cars24",
    ...cars24Tech,
    links: { deck: TODO },
  },
];

/* ------------------------------------------------------------- competitions */

export const competitions: Item[] = [
  {
    slug: "sih-2024",
    title: "Smart India Hackathon 2024",
    org: "Ministry of Education",
    role: "Winner and Team Lead",
    kicker: "Winner and Team Lead",
    dates: "Nov 2024",
    profiles: both,
    logo: "sih",
    blurb: "1st among 88,000+ teams and 492,000+ students (Ministry of Education).",
    stack: [],
    links: { event: TODO },
    related: "swasth-infinity",
  },
  {
    slug: "icpc-2025",
    title: "ICPC Asia West Regionals 2025",
    org: "ICPC",
    kicker: "AIR-80 Chennai, AIR-234 Amritapuri",
    dates: "2025",
    profiles: both,
    logo: "icpc",
    blurb:
      "AIR-80 (Chennai) and AIR-234 (Amritapuri), ICPC Asia West Regionals 2025; AIR-4 Women in 2024; College Rank-1. Three-time ICPC Asia regionalist.",
    stack: [],
    links: { event: TODO },
  },
  {
    slug: "algo-queen-2025",
    title: "ICPC Algo Queen World Finals 2025",
    org: "ICPC, sponsored by Jane Street",
    kicker: "Global Rank 243 among 5,000+",
    dates: "2025",
    profiles: both,
    logo: "icpc",
    secondaryLogo: "janestreet",
    blurb: "Global Rank 243 among 5,000+, ICPC Algo Queen World Finals 2025, sponsored by Jane Street.",
    stack: [],
    links: { event: TODO },
  },
  {
    slug: "citadel-2025",
    title: "Citadel Women's Datathon 2025",
    org: "Citadel LLC and Correlation One",
    kicker: "Finalist, top 60 of 4,000+",
    dates: "2025",
    profiles: both,
    logo: "citadel",
    blurb: "Finalist (top 60 of 4,000+), Citadel Women's Datathon 2025, by Citadel LLC and Correlation One.",
    stack: [],
    links: { event: TODO },
    related: "quant-forecasting",
  },
  {
    slug: "eightfold-2026",
    title: "Eightfold.ai Hackathon, Techkriti 2026",
    org: "Techkriti, IIT Kanpur",
    role: "Team Lead",
    kicker: "1st of 2,000+",
    dates: "2026",
    profiles: both,
    logo: "eightfold",
    secondaryLogo: "iitkanpur",
    blurb:
      "1st of 2,000+, Eightfold.ai Hackathon, and 3rd of 700+, Strategy Sprint, Techkriti IIT Kanpur 2026, as Team Lead.",
    stack: [],
    links: { deck: TODO },
  },
  {
    slug: "becon-2025",
    title: "BECon'25 B-Plan",
    org: "IIT Delhi",
    kicker: "1st of 1,500+",
    dates: "2025",
    profiles: both,
    pinProduct: true,
    logo: "iitdelhi",
    blurb: "1st of 1,500+, BECon'25, IIT Delhi (B-Plan).",
    stack: [],
    links: { deck: TODO },
  },
  {
    slug: "eximus-2024",
    title: "Eximus'24",
    org: "IIM Bangalore",
    kicker: "3rd of 2,500+",
    dates: "2024",
    profiles: both,
    pinProduct: true,
    logo: "iimbangalore",
    blurb: "3rd of 2,500+, Eximus'24, IIM Bangalore.",
    stack: [],
    links: { deck: TODO },
  },
  {
    slug: "dtu-bplan",
    title: "DTU B-Plan Competition",
    org: "DTU",
    kicker: "2nd place",
    profiles: both,
    pinProduct: true,
    logo: "dtu",
    blurb: "2nd, DTU B-Plan competition. Overall: 8+ product and B-plan wins.",
    stack: [],
    links: { deck: TODO },
  },
  {
    slug: "goldman-2025",
    title: "Goldman Sachs India Hackathon 2025",
    org: "Goldman Sachs",
    kicker: "All-India Rank 1 (CS, prelims)",
    dates: "2025",
    profiles: both,
    logo: "goldmansachs",
    blurb: "All-India Rank 1 (CS category, prelims), Goldman Sachs India Hackathon 2025, among 5,000+.",
    stack: [],
    links: { event: TODO },
  },
  {
    slug: "worldquant-2025",
    title: "WorldQuant International Quant Championship 2025",
    org: "WorldQuant",
    kicker: "Top 0.1%, Gold Researcher",
    dates: "2025",
    profiles: both,
    logo: "worldquant",
    blurb: "Top 0.1% of 100,000+ teams, WorldQuant International Quant Championship 2025; Gold Researcher.",
    stack: [],
    links: { event: TODO },
  },
  {
    slug: "kaggle-2025",
    title: "Kaggle Playground Series 2025",
    org: "Kaggle",
    kicker: "Top 500 of 7,000+",
    dates: "2025",
    profiles: both,
    logo: "kaggle",
    blurb: "Top 500 of 7,000+ globally, Kaggle Playground Series 2025, ensemble ML classifier optimised for MAP@3.",
    stack: [],
    links: { event: TODO },
  },
  {
    slug: "codechef",
    title: "CodeChef 4-Star",
    org: "CodeChef",
    kicker: "Max rating 1841",
    profiles: both,
    logo: "codechef",
    blurb:
      "4-Star on CodeChef (max rating 1841), Global Rank 15 in Starters 82; 400+ problems solved across platforms.",
    stack: [],
    links: { profile: "https://www.codechef.com/users/sneharc16", event: TODO },
  },
  {
    slug: "paytm-2026",
    title: "Paytm Build for India AI Hackathon 2026",
    org: "Paytm",
    kicker: "Finalist, Delhi edition (top 20 of 3,000+)",
    dates: "2026",
    profiles: both,
    pinProduct: true,
    logo: "paytm",
    blurb: 'Finalist, Delhi edition (top 20 of 3,000+), Paytm Build for India AI Hackathon 2026, team "Let\'s Crack It!".',
    stack: [],
    links: { deck: TODO },
  },
  {
    slug: "cisco-thingqbator",
    title: "Cisco ThingQbator Cohort 8",
    org: "Cisco and NASSCOM",
    kicker: "Top 125 of 1,200+ teams",
    profiles: both,
    pinProduct: true,
    logo: "cisco",
    blurb: "Top 125 of 1,200+ teams, Cisco ThingQbator Cohort 8 (Cisco and NASSCOM startup incubation).",
    stack: [],
    links: { event: TODO },
  },
];

/* ----------------------------------------------------------------- research */

export const research: Item[] = [
  {
    slug: "ieee-paper",
    title: "LLM-GISx in IEEE Xplore",
    org: "IEEE",
    kicker: "Best Paper, AIST-2025",
    dates: "2025",
    profiles: both,
    logo: "ieee",
    blurb: "LLM-GISx, published in IEEE Xplore; Best Paper, AIST-2025.",
    stack: [],
    links: { paper: "https://ieeexplore.ieee.org/document/11441593" },
    related: "llm-gisx",
  },
  {
    slug: "neurips-reviewer",
    title: "NeurIPS 2026 InterpScience Workshop",
    org: "NeurIPS",
    role: "Invited Reviewer",
    kicker: "Invited Reviewer",
    dates: "2026",
    profiles: both,
    logo: "neurips",
    blurb: "Invited Reviewer, NeurIPS 2026 InterpScience Workshop, reviewing AI research papers on OpenReview.",
    stack: [],
    links: {},
  },
  {
    slug: "delta-paper",
    title: "DELTA: empirical systems paper",
    org: "AIST 2026 (Springer LNCS/CCIS)",
    kicker: "In progress",
    dates: "2026",
    profiles: both,
    logo: "groww",
    blurb: "Empirical systems paper on DELTA (Groww Delta), targeted at AIST 2026 (Springer LNCS/CCIS). Status: in progress.",
    stack: [],
    links: {},
    related: "groww-delta",
  },
];

/* --------------------------------------------------------------- leadership */

export const leadership: Item[] = [
  {
    slug: "tedx",
    title: "TEDxIGDTU",
    org: "TEDxIGDTU",
    role: "President and Curator",
    kicker: "President and Curator",
    dates: "2025 to 26",
    profiles: both,
    logo: "tedx",
    blurb:
      "Led 70+ members across 6 verticals; McDonald's and PVR as sponsors; raised Rs. 4L+; 3k+ footfall; event on 10 April 2026.",
    stack: [],
    links: { event: "https://www.ted.com/tedx/events/67321" },
  },
  {
    slug: "ieee-gensec",
    title: "IEEE IGDTUW",
    org: "IEEE IGDTUW",
    role: "General Secretary",
    kicker: "General Secretary",
    dates: "2025 to 26",
    profiles: both,
    logo: "ieee",
    blurb: "Managed 400+ members across 6+ teams for tech events; 2k+ average engagement.",
    stack: [],
    links: {},
  },
  {
    slug: "algo-queen-mentor",
    title: "ICPC Algo Queen",
    org: "ICPC Algo Queen",
    role: "Mentor",
    kicker: "Mentor",
    dates: "2025 to 26",
    profiles: both,
    logo: "icpc",
    secondaryLogo: "janestreet",
    blurb: "Mentored 5,000+ women programmers in the Jane Street-sponsored global programme.",
    stack: [],
    links: {},
  },
  {
    slug: "lean-in",
    title: "Lean In IGDTUW",
    org: "Lean In IGDTUW",
    role: "ML Cohort Mentor",
    kicker: "ML Cohort Mentor",
    dates: "2025",
    profiles: both,
    logo: "igdtuw",
    blurb: "ML Cohort Mentor, Lean In IGDTUW.",
    stack: [],
    links: {},
  },
];

/* ------------------------------------------------------------------- awards */

export const awards: Item[] = [
  {
    slug: "eaa-2026",
    title: "Exceptional Achievement Award 2026",
    org: "IGDTUW Felicitation 2026",
    kicker: "One of 10 students university-wide",
    dates: "2026",
    profiles: both,
    logo: "igdtuw",
    blurb:
      "Exceptional Achievement Awardee, IGDTUW Felicitation 2026, one of 10 students university-wide, conferred by the Delhi CM, Lt. Governor and Education Minister.",
    stack: [],
    links: {},
  },
  {
    slug: "eaa-2025",
    title: "Exceptional Achievement Award 2025",
    org: "IGDTUW",
    kicker: "Conferred by the Vice-Chancellor",
    dates: "2025",
    profiles: both,
    logo: "igdtuw",
    blurb: "Exceptional Achievement Awardee 2025, conferred by the Vice-Chancellor.",
    stack: [],
    links: {},
  },
];

/* ------------------------------------------------------------------- skills */

export const skills: { tech: Record<string, string[]>; product: Record<string, string[]> } = {
  tech: {
    Languages: ["Python", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Shell", "Perl"],
    "Web and Frameworks": ["Django", "FastAPI", "React", "Angular", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase"],
    "Cloud and Tools": ["AWS (EC2, Lambda, ELB, Route 53)", "Linux/Unix", "Git", "Vercel", "Pandas", "PyTorch", "LLMs and RAG"],
    "Core CS": ["DSA", "Operating Systems", "System Design", "DBMS", "OOP", "Computer Networks"],
  },
  product: {
    "Product and Business": ["PRDs", "Requirements gathering", "Stakeholder management", "Market sizing", "Unit economics", "Pricing", "GTM", "Agile"],
    "Technical and AI/ML": ["Python", "C++", "SQL", "TypeScript", "React.js", "FastAPI", "PostgreSQL", "PyTorch", "Hugging Face", "LLMs", "RAG", "ML"],
    Tools: ["Excel", "PowerPoint", "Word", "Power BI", "WebEngage", "Adobe Analytics (CJA)", "AWS S3", "Git", "Supabase", "Vercel", "Weights and Biases"],
  },
};

export function skillsFor(profile: Profile): Record<string, string[]> {
  if (profile === "tech") return skills.tech;
  if (profile === "product") return skills.product;
  return { ...skills.tech, ...skills.product };
}

/* ---------------------------------------------------------------- lookups */

export const allItems: Item[] = [...experience, ...projects, ...competitions, ...research, ...leadership, ...awards];

export function getItem(slug: string | null | undefined): Item | undefined {
  return slug ? allItems.find((i) => i.slug === slug) : undefined;
}

function pick(list: Item[], slugs: string[]): Item[] {
  return slugs.map((s) => {
    const found = list.find((i) => i.slug === s);
    if (!found) throw new Error(`Unknown slug ${s}`);
    return found;
  });
}

/** The lane whose blurb a card shows. BOTH picks the lane with the higher match score. */
export function laneFor(item: Item, profile: Profile): Lane {
  if (profile !== "both") return profile;
  return (item.matchProduct ?? 0) > (item.matchTech ?? 0) ? "product" : "tech";
}

export function blurbFor(item: Item, profile: Profile): string {
  const lane = laneFor(item, profile);
  const own = lane === "tech" ? item.blurbTech : item.blurbProduct;
  return own ?? item.blurb ?? item.blurbTech ?? item.blurbProduct ?? "";
}

/* ------------------------------------------------------------------- rows */

export type RowKind = "feature" | "cards" | "top10" | "skills" | "contact";
export type Row = { id: string; title: string; kind: RowKind; anchor?: string; items: Item[] };

const TECH_TOP = ["llm-gisx", "groww-delta", "swasth-infinity", "intelligent-os-assistant", "quant-forecasting"];
const PRODUCT_TOP = ["groww-delta", "makhmade", "llm-gisx", "swasth-infinity", "project-rakshak"];
const BOTH_TOP = [...TECH_TOP, "makhmade", "project-rakshak"];

export function rowsFor(profile: Profile): Row[] {
  const now: Row = { id: "now", title: "Now streaming", kind: "feature", items: pick(experience, ["makemytrip"]) };
  const research_: Row = { id: "research", title: "Research and publications", kind: "cards", items: research };
  const leadership_: Row = { id: "leadership", title: "Leadership", kind: "cards", anchor: "leadership", items: leadership };
  const skills_: Row = { id: "skills", title: "Skills", kind: "skills", anchor: "skills", items: [] };
  const awards_: Row = { id: "awards", title: "Awards and recognition", kind: "cards", items: awards };
  const contact: Row = { id: "contact", title: "Contact", kind: "contact", anchor: "contact", items: [] };

  if (profile === "product") {
    const pinned = competitions.filter((c) => c.pinProduct);
    const rest = competitions.filter((c) => !c.pinProduct);
    return [
      now,
      { id: "experience", title: "Experience", kind: "cards", anchor: "experience", items: pick(experience, ["kpmg", "makemytrip", "cars24", "drdo"]) },
      { id: "competitions", title: "Competitions and case wins", kind: "cards", anchor: "achievements", items: [...pinned, ...rest] },
      { id: "projects", title: "Top projects", kind: "top10", anchor: "projects", items: pick(projects, PRODUCT_TOP) },
      research_,
      leadership_,
      skills_,
      awards_,
      contact,
    ];
  }

  return [
    now,
    { id: "experience", title: "Experience", kind: "cards", anchor: "experience", items: pick(experience, ["makemytrip", "cars24", "kpmg", "drdo"]) },
    { id: "projects", title: "Top projects", kind: "top10", anchor: "projects", items: pick(projects, profile === "both" ? BOTH_TOP : TECH_TOP) },
    { id: "competitions", title: "Hackathons and competitions", kind: "cards", anchor: "achievements", items: competitions },
    research_,
    leadership_,
    skills_,
    awards_,
    contact,
  ];
}
