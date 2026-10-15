"use client";

import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. Official Magic UI Terminal Primitives (Terminal, TypingAnimation, AnimatedSpan)
// ============================================================================

const SequenceContext = createContext(null);
const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext(null);
const useItemIndex = () => useContext(ItemIndexContext);

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
};

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}) => {
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, {
    amount: 0.3,
    once: true,
  });

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!sequence || itemIndex === null) return;
    if (!sequence.sequenceStarted) return;
    if (hasStarted) return;
    if (sequence.activeIndex === itemIndex) {
      setHasStarted(true);
    }
  }, [sequence, hasStarted, itemIndex]);

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true;

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.25, delay: sequence ? 0 : delay / 1000 }}
      className={cn("grid text-sm font-normal tracking-tight", className)}
      onAnimationComplete={() => {
        if (!sequence) return;
        if (itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const TypingAnimation = ({
  children,
  className,
  duration = 25,
  delay = 0,
  as: Component = "span",
  startOnView = true,
  ...props
}) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string.");
  }

  const MotionComponent = motionElements[Component] || motion.span;

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, {
    amount: 0.3,
    once: true,
  });

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const hasSequence = sequence !== null;
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex ?? null;
  const sequenceCompleteItemRef = useRef(null);
  const sequenceItemIndexRef = useRef(null);

  useEffect(() => {
    sequenceCompleteItemRef.current = sequence?.completeItem ?? null;
    sequenceItemIndexRef.current = itemIndex;
  }, [sequence?.completeItem, itemIndex]);

  useEffect(() => {
    let startTimeout = null;

    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) {
        setStarted(true);
      }
    } else if (!startOnView || isInView) {
      startTimeout = setTimeout(() => setStarted(true), delay);
    }

    return () => {
      if (startTimeout !== null) {
        clearTimeout(startTimeout);
      }
    };
  }, [
    delay,
    startOnView,
    isInView,
    started,
    hasSequence,
    sequenceActiveIndex,
    sequenceStarted,
    itemIndex,
  ]);

  useEffect(() => {
    let typingEffect = null;

    if (started) {
      let i = 0;
      typingEffect = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.substring(0, i + 1));
          i++;
        } else {
          if (typingEffect !== null) {
            clearInterval(typingEffect);
          }
          const completeItem = sequenceCompleteItemRef.current;
          const currentItemIndex = sequenceItemIndexRef.current;
          if (completeItem && currentItemIndex !== null) {
            completeItem(currentItemIndex);
          }
        }
      }, duration);
    }

    return () => {
      if (typingEffect !== null) {
        clearInterval(typingEffect);
      }
    };
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
};

export const Terminal = ({
  children,
  className,
  sequence = true,
  startOnView = true,
  title = "kamikaazeyy — /opt/portfolio (zsh)",
  headerRight = null,
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    amount: 0.2,
    once: true,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceHasStarted = sequence ? !startOnView || isInView : false;

  const contextValue = useMemo(() => {
    if (!sequence) return null;
    return {
      completeItem: (index) => {
        setActiveIndex((current) => (index === current ? current + 1 : current));
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    };
  }, [sequence, activeIndex, sequenceHasStarted]);

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children;
    const array = Children.toArray(children);
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence]);

  const content = (
    <div
      ref={containerRef}
      className={cn(
        "z-0 h-full w-full rounded-2xl border border-cyan-500/30 bg-[#080a12]/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden",
        className
      )}
    >
      {/* Unified Cyber Terminal Window Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0c0f1a] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="font-mono text-xs text-cyan-400/90 tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
        </div>
      </div>

      {/* Unified Single Terminal Canvas */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm bg-[#070910]/90 text-gray-100">
        {wrappedChildren}
      </div>
    </div>
  );

  if (!sequence) return content;

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  );
};

// ============================================================================
// 2. Portfolio Knowledge Base & Kamikaazeyy Single Terminal Engine
// ============================================================================

const KAMIKAAZEYY_AVATAR_ASCII = [
  "⠀⠀⠀⠀⠀⢀⢄⢴⢴⢔⢔⢔⢄⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⢀⢕⢝⢝⠝⠝⠝⠝⢕⢝⢕⠅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢠⠠⠀",
  "⠀⠀⠀⢔⢕⢵⣵⣷⣿⣿⣿⣿⣿⢷⢕⠀⠀⠀⠀⠀⠀⠄⠄⡐⢰⣿⣽⢿⣼",
  "⠀⠀⠀⢕⢽⣿⢟⢿⢿⢿⢿⢿⢽⢽⢵⢴⢐⠀⠀⠀⢄⢿⣷⣰⣿⣿⢿⣿⣯",
  "⠀⠀⠀⠕⢽⢿⢿⢝⢿⢿⣽⢿⢝⣽⣿⢿⡎⡆⠀⠀⢸⢸⢿⣿⣿⣿⣿⣿⢟",
  "⠀⠀⠆⢶⢝⢽⢿⢷⢿⣿⢿⢿⢿⢽⣽⢽⠇⡇⠀⠀⠘⠘⢽⣿⣿⢿⠿⠁⠃",
  "⠀⠀⢣⢻⢷⠝⢿⢟⢝⠽⢟⢟⢽⢗⠝⠅⠄⠀⠀⠀⠀⠀⢝⢝⢝⢕⠈⠀⠀",
  "⠀⠀⠀⠀⠉⠀⠑⠕⠝⢿⢟⢝⢝⠕⠁⢔⢕⢕⢕⢅⠀⠐⢕⢕⢝⢕⢕⠠⠀",
  "⠀⠀⠀⠀⠄⠀⢔⢔⢵⣕⢵⢵⢝⢕⢕⢕⢕⢝⢕⢕⢕⢔⢕⢕⢕⢝⢕⠅⠀",
  "⠀⢀⢔⢔⢕⢕⢵⢝⢝⢝⢿⢿⢟⢕⢕⢕⢕⠕⠕⢝⢕⢕⢕⢕⢕⢕⢕⠕⠀",
  "⠀⢕⢕⢕⢕⢕⢕⢕⢕⢝⢕⢕⢝⢕⢿⢕⢕⠕⠕⠕⢕⢕⠕⢕⢕⢕⢕⠕⠀",
  "⠀⢕⢕⢕⢝⢝⢕⢕⢽⢝⢝⢕⢵⢝⢕⢕⠕⠕⠅⠑⠕⠕⢕⢕⢕⢕⢕⠕⠁",
  "⠐⢕⢕⢕⢕⠕⢕⢕⢕⢝⢕⢝⢕⢕⢵⢝⢕⠕⠅⠀⠀⠀⠑⠕⠕⠕⠕⠅⠀",
  "⢕⢕⢕⢕⢕⠕⢕⢕⢕⢕⢽⢕⢕⢝⢕⢕⢕⠕⠅⠀⠀⠀⠀⠀⠁⠁⠀⠀⠀",
  "⠑⠑⠑⠑⠑⠑⠑⠑⠑⠑⠙⠑⠑⠑⠑⠑⠑⠑⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
];

const PORTFOLIO_DATA = {
  profile: {
    name: "Pranav Mehrotra",
    handle: "Kamikaazeyy",
    role: "Software Engineer & Full-Stack Architect",
    email: "mehrotrapranav240@gmail.com",
    phone: "+91 8076734237",
    website: "https://pranavmehrotra.netlify.app",
    linkedin: "https://www.linkedin.com/in/pranav-mehrotra-879025194/",
    github: "https://github.com/kamikaazeyy",
    twitter: "https://twitter.com/mehrotrapranav1",
    resume: "https://drive.google.com/file/d/1b-vtf1Ayiibdu9i6KoWtBUcwiRb8qmL9/view?usp=sharing",
    objective:
      "Results-driven Software Engineer combining full-stack development expertise with generative AI, secure infrastructure orchestration, and enterprise cybersecurity. Proven ability to architect scalable databases, deploy secure network solutions, and build high-performance web and mobile applications from the ground up.",
    interests: [
      "Full-Stack Architecture",
      "Generative AI & LLM Pipelines",
      "Self-Hosted Infrastructure & DevOps",
      "Mobile Application Development",
    ],
  },
  experiences: [
    {
      cmd: "/warmo",
      company: "Warmo",
      role: "Full-Stack Developer",
      period: "Jan 2026 – Present",
      highlights: [
        "Generative AI Lead Engine: Architected TargetSense AI with custom GenAI pipelines to autonomously research, aggregate, and extract qualified client leads and contact details from web data.",
        "Automated Email Campaign System: Built multi-step outreach utilizing Redis job queuing, connection pooling, multi-SMTP routing, and auto-pause upon reply detection.",
        "Unified Inbox Architecture: Centralized multi-account inbox synchronization with corporate vs. standard email filtering.",
        "End-to-End Monetization: Integrated Stripe payment gateway for full-stack subscription tiers and automated billing.",
        "Cloud & DB Migration: Migrated platform infrastructure from AWS to GCP and transitioned database to MongoDB.",
        "Email Sync Protocols: Centralized IMAP/SMTP pooling with app password security for high-volume email fetching.",
      ],
      tags: ["GenAI", "LLMs", "Node.js", "Redis", "MongoDB", "GCP", "AWS", "Stripe", "IMAP/SMTP"],
    },
    {
      cmd: "/dataresolve",
      company: "Data Resolve Technologies",
      role: "Cyber Security Intern",
      period: "Jan 2025 – Oct 2025",
      highlights: [
        "ML-Based Logging System: Built Python tool using Pandas & Scikit-Learn to flag unusual system behavior and log outliers.",
        "System Administration: Designed network architectures & lab environments using Linux CLI and PostgreSQL for large-scale government DLP projects.",
        "Real-time Log Handling: Implemented Watchdog for local file monitoring and ingestion into PostgreSQL audit trails.",
        "Deployment & Automation: Managed end-to-end agent rollouts on Linux, macOS, and Windows for ASEAN & MEA clients with SIEM protocols.",
      ],
      tags: ["Cybersecurity", "Python", "Pandas", "Scikit-Learn", "PostgreSQL", "Linux CLI", "SIEM", "DLP"],
    },
    {
      cmd: "/musigma",
      company: "Mu Sigma Business Solutions",
      role: "Decision Scientist",
      period: "Aug 2023 – Mar 2024",
      highlights: [
        "Advanced Sales Forecasting (Client - Microsoft): Developed a Python ARIMA time-series model to predict sales trends and optimize inventory.",
        "Pharma Analytics Automation (Client - U.S. Pharma Firm): Automated a Tableau analytics dashboard to monitor clinical trial performance in real-time.",
        "Strategic Problem Solving (Client - Nike): Identified operational bottlenecks in Nike's inventory flow, improving tracking efficiency.",
      ],
      tags: ["Python", "ARIMA", "SQL", "Tableau", "Power BI", "Decision Science"],
    },
    {
      cmd: "/webixy",
      company: "Webixy Technologies",
      role: "Web Developer Intern",
      period: "Feb 2023 – Apr 2023",
      highlights: [
        "Engineered responsive, accessible frontend web interfaces and reusable UI components.",
        "Collaborated on cross-browser optimization, REST API integration, and modern JavaScript workflows.",
      ],
      tags: ["React", "JavaScript", "Tailwind CSS", "HTML/CSS", "REST APIs"],
    },
  ],
  skills: {
    "frontend-mobile": ["react.js", "next.js", "react-native", "javascript", "typescript", "html5", "css3", "tailwind-css"],
    "backend-genai": ["node.js", "express.js", "fastify", "rest-apis", "microservices", "python", "fastapi", "pandas", "numpy", "scikit-learn", "llms"],
    "databases": ["mongodb", "postgresql", "sqlite", "redis", "watermelondb", "sql"],
    "cloud-devops": ["aws", "gcp", "docker", "git", "github", "ci/cd", "linux (manjaro, ubuntu, debian)", "tailscale", "hermes-agent"],
  },
  projects: [
    {
      name: "Flexo — Offline-First Mobile Fitness App",
      status: "In Development",
      stack: "React Native, Fastify, WatermelonDB, SQLite",
      desc: "High-performance mobile workout tracker with granular session metric logging and offline-first local sync between WatermelonDB/SQLite and Fastify.",
    },
    {
      name: "Custom Network Infrastructure & Private Server",
      status: "Personal Infrastructure",
      stack: "Manjaro Linux, Docker, Hermes Agent, LLMs, Tailscale",
      desc: "Self-hosted home server on Manjaro OS with Docker Compose, open-source monitoring dashboard, and persistent Hermes Agent multi-agent AI automation hub.",
    },
    {
      name: "server-monitor — Monitoring Dashboard",
      status: "Open Source · MIT",
      stack: "Express, Socket.io, React, TypeScript, Docker, node-pty, systemd",
      desc: "Self-hosted observability dashboard: live CPU/RAM/disk/network sparklines, Docker container controls, systemd status, GitHub CI runs, xterm.js web terminal, read-only Postgres browser, JWT auth.",
      link: "https://github.com/kamikaazeyy/server-monitor",
    },
    {
      name: "Notion Pokédex",
      status: "Live",
      stack: "React, PokéAPI, CSS3",
      desc: "Animated database-driven Pokédex web application inspired by Notion.",
      link: "https://github.com/kamikaazeyy/Pok-dex/",
    },
    {
      name: "Word Counter",
      status: "Live",
      stack: "JavaScript, Regex, DOM",
      desc: "Real-time text analysis tool for word frequency, character counts, and reading time.",
      link: "https://kamikaazeyy.github.io/Word-Counter/",
    },
    {
      name: "To-Do List",
      status: "Completed",
      stack: "JavaScript, LocalStorage",
      desc: "Persistent browser task manager with priority categories.",
      link: "https://github.com/kamikaazeyy",
    },
    {
      name: "Guess Number Game",
      status: "Live",
      stack: "JavaScript, Game Logic",
      desc: "Interactive deduction game with dynamic hints and high-score tracking.",
      link: "https://kamikaazeyy.github.io/guess-number/",
    },
    {
      name: "Dice Game",
      status: "Live",
      stack: "JavaScript, State Logic",
      desc: "Two-player turn-based probabilistic dice game.",
      link: "https://kamikaazeyy.github.io/Dice-Game/",
    },
  ],
  education: {
    degree: "Bachelor of Technology (B.Tech) - Computer Science",
    institution: "SRM Institute of Science and Technology",
    period: "2019 – 2023",
    cgpa: "9.0 / 10.0",
    certifications: [
      "Introduction to Front-End Development (Meta)",
      "Programming with JavaScript (Meta)",
      "Version Control (Meta)",
    ],
  },
};

const QUICK_COMMANDS = [
  "/help",
  "/about",
  "/experience",
  "/warmo",
  "/dataresolve",
  "/musigma",
  "/skills",
  "/projects",
  "/education",
  "/contact",
  "/resume",
  "/clear",
];

export function PortfolioTerminal({ onSwitchToUI }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (history.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [history]);

  const executeCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();
    const parts = normalized.replace(/^\//, "").split(/\s+/);
    const baseCmd = parts[0];
    const queryArg = parts.slice(1).join(" ");

    let responseNode = null;

    if (baseCmd === "clear" || baseCmd === "cls") {
      setHistory([]);
      setCmdHistory((prev) => [trimmed, ...prev]);
      setHistoryIdx(-1);
      setInput("");
      return;
    }

    if (baseCmd === "ui" || baseCmd === "gui" || baseCmd === "exit") {
      if (onSwitchToUI) onSwitchToUI();
      return;
    }

    switch (baseCmd) {
      case "help":
      case "commands":
      case "?":
        responseNode = (
          <div className="space-y-1.5 text-gray-200 py-1">
            <div className="text-cyan-400 font-bold">Available Portfolio Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
              <div><span className="text-red-400 font-semibold">/about</span>       : Who is Pranav Mehrotra</div>
              <div><span className="text-red-400 font-semibold">/experience</span>  : Full career timeline (4 roles)</div>
              <div><span className="text-red-400 font-semibold">/warmo</span>       : Full-Stack Dev @ Warmo (GenAI)</div>
              <div><span className="text-red-400 font-semibold">/dataresolve</span> : Cyber Security @ Data Resolve</div>
              <div><span className="text-red-400 font-semibold">/musigma</span>     : Decision Scientist @ Mu Sigma</div>
              <div><span className="text-red-400 font-semibold">/skills</span>      : Categorized technical arsenal</div>
              <div><span className="text-red-400 font-semibold">/projects</span>    : All 7 mobile, server &amp; web builds</div>
              <div><span className="text-red-400 font-semibold">/education</span>   : B.Tech CSE (9.0 CGPA) &amp; Meta Certs</div>
              <div><span className="text-red-400 font-semibold">/contact</span>     : Email, Phone, LinkedIn, GitHub, X</div>
              <div><span className="text-red-400 font-semibold">/resume</span>      : Launch official PDF resume</div>
              <div><span className="text-red-400 font-semibold">/clear</span>       : Reset terminal history</div>
              <div><span className="text-red-400 font-semibold">/ui</span>          : Switch back to graphical UI</div>
            </div>
            <div className="text-xs text-cyan-300/80 pt-1">
              Tip: Type any keyword (e.g. <span className="text-white">redis</span>, <span className="text-white">hermes</span>, <span className="text-white">docker</span>, <span className="text-white">microsoft</span>) to search directly.
            </div>
          </div>
        );
        break;

      case "about":
      case "whoami":
      case "profile":
        responseNode = (
          <div className="space-y-1.5 py-1 border-l-2 border-cyan-500/60 pl-3">
            <div className="text-white font-bold">
              {PORTFOLIO_DATA.profile.name} <span className="text-cyan-400 font-normal">(@{PORTFOLIO_DATA.profile.handle})</span>
            </div>
            <div className="text-xs text-red-400 font-semibold uppercase tracking-wider">
              {PORTFOLIO_DATA.profile.role}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {PORTFOLIO_DATA.profile.objective}
            </p>
            <div className="text-xs">
              <span className="text-cyan-400">fields_of_interest: </span>
              <span className="text-white">{PORTFOLIO_DATA.profile.interests.join(", ")}</span>
            </div>
          </div>
        );
        break;

      case "experience":
      case "experiences":
      case "work":
      case "career":
      case "exp":
        responseNode = (
          <div className="space-y-4 py-1">
            {PORTFOLIO_DATA.experiences.map((exp) => (
              <div key={exp.company} className="border-l-2 border-cyan-500/50 pl-3 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-cyan-300 font-bold">{exp.company}</span>
                  <span className="text-xs text-red-400">{exp.period}</span>
                </div>
                <div className="text-xs text-white font-semibold">{exp.role}</div>
                <ul className="space-y-1 pt-0.5">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="text-xs text-gray-300 leading-relaxed">
                      <span className="text-cyan-400 mr-1.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case "warmo":
      case "dataresolve":
      case "musigma":
      case "webixy": {
        const expMatch = PORTFOLIO_DATA.experiences.find(
          (e) => e.cmd.replace("/", "") === baseCmd
        );
        if (expMatch) {
          responseNode = (
            <div className="border-l-2 border-red-500/70 pl-3 space-y-1.5 py-1">
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-bold">{expMatch.company}</span>
                <span className="text-xs text-red-400">{expMatch.period}</span>
              </div>
              <div className="text-xs text-white font-semibold">{expMatch.role}</div>
              <ul className="space-y-1">
                {expMatch.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-gray-300">
                    <span className="text-cyan-400 mr-1.5">✔</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="text-xs pt-1">
                <span className="text-red-400">stack: </span>
                <span className="text-white">{expMatch.tags.join(", ")}</span>
              </div>
            </div>
          );
        }
        break;
      }

      case "skill":
      case "skills":
      case "stack":
      case "tech":
        responseNode = (
          <div className="space-y-1.5 py-1 border-l-2 border-cyan-500/60 pl-3">
            <div className="text-cyan-400 font-bold text-xs">Technical Skills Breakdown:</div>
            {Object.entries(PORTFOLIO_DATA.skills).map(([cat, list]) => (
              <div key={cat} className="text-xs leading-relaxed">
                <span className="text-red-400">{cat}: </span>
                <span className="text-white">{list.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "project":
      case "projects":
      case "builds":
      case "flexo":
      case "server":
      case "pokedex":
        responseNode = (
          <div className="space-y-3 py-1">
            {PORTFOLIO_DATA.projects.map((proj) => (
              <div key={proj.name} className="border-l-2 border-red-500/60 pl-3 space-y-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-cyan-300 font-bold text-xs sm:text-sm">{proj.name}</span>
                  <span className="text-[11px] text-red-400">[{proj.status}]</span>
                </div>
                <div className="text-xs">
                  <span className="text-cyan-400/80">tech_stack: </span>
                  <span className="text-white">{proj.stack}</span>
                </div>
                <p className="text-xs text-gray-300">{proj.desc}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-cyan-400 underline hover:text-white"
                  >
                    {proj.link} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case "education":
      case "edu":
      case "cert":
      case "certs":
      case "certifications":
        responseNode = (
          <div className="space-y-1.5 py-1 border-l-2 border-cyan-400 pl-3 text-xs">
            <div className="text-cyan-300 font-bold text-sm">
              {PORTFOLIO_DATA.education.degree}
            </div>
            <div className="text-white">
              {PORTFOLIO_DATA.education.institution} ({PORTFOLIO_DATA.education.period})
            </div>
            <div className="text-red-400 font-bold">
              CGPA: {PORTFOLIO_DATA.education.cgpa}
            </div>
            <div className="pt-1 text-cyan-400 font-bold">Meta Certifications:</div>
            {PORTFOLIO_DATA.education.certifications.map((c) => (
              <div key={c} className="text-gray-200">
                <span className="text-red-400 mr-1.5">•</span>
                {c}
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
      case "socials":
      case "email":
        responseNode = (
          <div className="space-y-1 py-1 border-l-2 border-cyan-500/60 pl-3 text-xs">
            <div><span className="text-red-400">email:    </span><a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="text-white hover:underline">{PORTFOLIO_DATA.profile.email}</a></div>
            <div><span className="text-red-400">phone:    </span><span className="text-white">{PORTFOLIO_DATA.profile.phone}</span></div>
            <div><span className="text-red-400">linkedin: </span><a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{PORTFOLIO_DATA.profile.linkedin}</a></div>
            <div><span className="text-red-400">github:   </span><a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{PORTFOLIO_DATA.profile.github}</a></div>
            <div><span className="text-red-400">x/twitter:</span><a href={PORTFOLIO_DATA.profile.twitter} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{PORTFOLIO_DATA.profile.twitter}</a></div>
          </div>
        );
        break;

      case "resume":
      case "cv":
        window.open(PORTFOLIO_DATA.profile.resume, "_blank", "noopener,noreferrer");
        responseNode = (
          <div className="text-xs text-cyan-400 py-1">
            ✔ Opening Resume in a new tab...{" "}
            <a href={PORTFOLIO_DATA.profile.resume} target="_blank" rel="noopener noreferrer" className="underline text-white">
              Click here if blocked ↗
            </a>
          </div>
        );
        break;

      default: {
        const searchTerm = baseCmd === "search" || baseCmd === "find" || baseCmd === "grep"
          ? queryArg
          : normalized.replace(/^\//, "");

        if (!searchTerm) {
          responseNode = (
            <div className="text-xs text-cyan-400">
              Usage: <span className="text-white">/search &lt;keyword&gt;</span> (e.g. <span className="text-red-400">redis</span>, <span className="text-red-400">docker</span>)
            </div>
          );
          break;
        }

        const matchedExp = PORTFOLIO_DATA.experiences.filter(
          (e) =>
            e.company.toLowerCase().includes(searchTerm) ||
            e.role.toLowerCase().includes(searchTerm) ||
            e.highlights.some((h) => h.toLowerCase().includes(searchTerm)) ||
            e.tags.some((t) => t.toLowerCase().includes(searchTerm))
        );

        const matchedProjects = PORTFOLIO_DATA.projects.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.stack.toLowerCase().includes(searchTerm) ||
            p.desc.toLowerCase().includes(searchTerm)
        );

        const matchedSkills = Object.entries(PORTFOLIO_DATA.skills).flatMap(
          ([cat, list]) =>
            list
              .filter((s) => s.toLowerCase().includes(searchTerm))
              .map((s) => `${s} (${cat})`)
        );

        const totalHits = matchedExp.length + matchedProjects.length + matchedSkills.length;

        if (totalHits === 0) {
          responseNode = (
            <div className="text-xs text-red-400 py-1">
              No matches found for <span className="text-white font-bold">&quot;{searchTerm}&quot;</span>. Type <span className="text-cyan-400">/help</span> or <span className="text-cyan-400">/skills</span>.
            </div>
          );
        } else {
          responseNode = (
            <div className="space-y-2 py-1 border-l-2 border-cyan-400 pl-3 text-xs">
              <div className="text-cyan-400">
                ✔ Found {totalHits} match(es) for <span className="text-white font-bold">&quot;{searchTerm}&quot;</span>:
              </div>

              {matchedSkills.length > 0 && (
                <div>
                  <span className="text-red-400">skills: </span>
                  <span className="text-white">{matchedSkills.join(", ")}</span>
                </div>
              )}

              {matchedExp.map((e) => (
                <div key={e.company} className="space-y-0.5">
                  <div className="text-cyan-300 font-bold">
                    {e.company} — <span className="text-white">{e.role}</span> ({e.period})
                  </div>
                  {e.highlights
                    .filter((h) => h.toLowerCase().includes(searchTerm) || e.company.toLowerCase().includes(searchTerm))
                    .map((h, i) => (
                      <div key={i} className="text-gray-300 pl-2">• {h}</div>
                    ))}
                </div>
              ))}

              {matchedProjects.map((p) => (
                <div key={p.name}>
                  <span className="text-cyan-300 font-bold">{p.name}</span>{" "}
                  <span className="text-red-400">[{p.stack}]</span> —{" "}
                  <span className="text-gray-300">{p.desc}</span>
                </div>
              ))}
            </div>
          );
        }
        break;
      }
    }

    setHistory((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), command: trimmed, output: responseNode },
    ]);
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (input.startsWith("/")) {
        const match = QUICK_COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full max-w-5xl mx-auto my-2 animate-fadeInBottom"
    >
      {/* SINGLE UNIFIED CYBER TERMINAL */}
      <Terminal
        sequence={false}
        title="kamikaazeyy — /opt/portfolio (v2.6.0)"
        headerRight={
          onSwitchToUI && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSwitchToUI();
              }}
              className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 transition-colors"
            >
              Switch to UI ↗
            </button>
          )
        }
      >
        {/* 1. KAMIKAAZEYY 3D BLOCK BANNER IN PORTFOLIO CYBER COLORS */}
        <div className="mb-3 select-none overflow-x-auto">
          <div
            className="font-custom text-3xl sm:text-5xl md:text-6xl font-black tracking-widest uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-cyan-400"
            style={{
              filter: "drop-shadow(3px 3px 0px rgba(239, 68, 68, 0.35))",
            }}
          >
            KAMIKAAZEYY
          </div>
        </div>

        {/* 2. CYBER BORDERED TUI PANEL MATCHING PORTFOLIO PALETTE */}
        <div className="relative border border-cyan-500/40 rounded-lg p-4 sm:p-5 mb-4 bg-[#0a0d17]/90 shadow-[inset_0_0_30px_rgba(0,229,255,0.03)]">
          {/* Top-right embedded border title */}
          <div className="hidden sm:block absolute -top-2.5 right-4 bg-[#070910] px-2 text-xs font-mono font-bold text-cyan-400">
            Kamikaazeyy v2.6.0 (2026.10.15)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Column: Kamikaazeyy Dot-Matrix Avatar Emblem + Session Info */}
            <div className="md:col-span-4 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
              <pre className="text-[10px] sm:text-[11px] leading-[1.15] text-cyan-400 font-mono select-none mb-3 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                {KAMIKAAZEYY_AVATAR_ASCII.join("\n")}
              </pre>
              <div className="text-xs leading-tight space-y-0.5">
                <div>
                  <span className="text-red-400 font-bold">kamikaazeyy</span>
                  <span className="text-gray-400"> · Full-Stack &amp; AI</span>
                </div>
                <div className="text-cyan-400/80">/opt/kamikaazeyy</div>
                <div className="text-gray-500 text-[11px]">
                  Session: 20261015_pranav_m
                </div>
              </div>
            </div>

            {/* Right Column: Available Commands & Available Skills */}
            <div className="md:col-span-8 space-y-3 text-xs leading-relaxed">
              {/* Available Commands */}
              <div>
                <div className="text-cyan-400 font-bold mb-0.5">
                  Available Commands
                </div>
                <div className="space-y-0.5">
                  <div>
                    <span className="text-red-400/90">profile: </span>
                    <span className="text-gray-200">/about, /whoami, /education, /certs, /resume</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">experience: </span>
                    <span className="text-gray-200">/experience, /warmo, /dataresolve, /musigma, /webixy</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">projects: </span>
                    <span className="text-gray-200">/projects, /flexo, /server, /pokedex</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">skills_search: </span>
                    <span className="text-gray-200">/skills, /contact, /search &lt;query&gt;, /clear, /ui</span>
                  </div>
                </div>
              </div>

              {/* Available Skills & Experience Domains */}
              <div>
                <div className="text-cyan-400 font-bold mb-0.5">
                  Available Skills &amp; Domains
                </div>
                <div className="space-y-0.5">
                  <div>
                    <span className="text-red-400/90">autonomous-ai-agents: </span>
                    <span className="text-gray-200">targetsense-ai, hermes-agent, llm-pipelines, lead-engine</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">frontend-mobile: </span>
                    <span className="text-gray-200">react.js, next.js, react-native, typescript, tailwind-css</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">backend-systems: </span>
                    <span className="text-gray-200">node.js, fastify, express.js, python, fastapi, microservices</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">databases-queues: </span>
                    <span className="text-gray-200">mongodb, postgresql, sqlite, redis, watermelondb</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">cloud-infrastructure: </span>
                    <span className="text-gray-200">aws, gcp, docker, manjaro-linux, tailscale, ci/cd</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">cybersecurity-dlp: </span>
                    <span className="text-gray-200">ml-outlier-detection, siem, watchdog, linux-cli, network-sec</span>
                  </div>
                  <div>
                    <span className="text-red-400/90">decision-science: </span>
                    <span className="text-gray-200">arima-forecasting, pandas, scikit-learn, tableau, power-bi</span>
                  </div>
                </div>
              </div>

              {/* Profile Summary Line */}
              <div className="pt-1">
                <div>
                  <span className="text-cyan-400 font-bold">Profile: </span>
                  <span className="text-white">Pranav Mehrotra (CGPA 9.0 · Meta Certified)</span>
                </div>
                <div className="text-gray-400">
                  4 companies · 7 projects · 35+ skills · <span className="text-red-400">/help</span> for commands
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. WELCOME LINE & CLICKABLE QUICK COMMANDS */}
        <div className="mb-3 space-y-2">
          <div className="text-gray-200 text-xs sm:text-sm">
            Welcome to <span className="text-cyan-400 font-semibold">Kamikaazeyy</span>! Type your query or <span className="text-red-400">/help</span> for commands:
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.03] hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/60 text-gray-300 hover:text-cyan-300 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* 4. COMMAND OUTPUT STREAM (Inside the same single terminal) */}
        {history.length > 0 && (
          <div className="my-4 space-y-4 max-h-[420px] overflow-y-auto pr-1 border-t border-white/10 pt-3">
            {history.map((entry) => (
              <div key={entry.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-red-400 font-bold">❯</span>
                  <span className="text-white font-bold">{entry.command}</span>
                </div>
                <div className="pl-3">{entry.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {/* 5. PROMPT IN PORTFOLIO CYBER COLORS */}
        <div className="mt-4">
          {/* Prompt Bar with top & bottom cyber rules */}
          <div className="border-y border-cyan-500/40 py-2 flex items-center gap-2">
            <span className="text-red-400 font-bold text-sm select-none">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type /help, /experience, /warmo, /skills, or any keyword (e.g. redis, ai)..."
              className="w-full bg-transparent text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none font-mono caret-cyan-400"
              autoFocus
            />
            <button
              type="button"
              onClick={() => executeCommand(input)}
              className="px-3 py-0.5 rounded-md bg-gradient-to-r from-red-600/30 to-cyan-500/30 hover:from-red-600/50 hover:to-cyan-500/50 border border-cyan-400/40 text-cyan-300 text-xs font-mono shrink-0 transition-all"
            >
              Run ↵
            </button>
          </div>
        </div>
      </Terminal>
    </div>
  );
}
