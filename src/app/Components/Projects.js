import Image from "next/image";
import { motion } from "motion/react";
import wordcounter from "../../../public/word-counter.png";
import to_do_List from "../../../public/to-do-list.png";
import dicegame from "../../../public/dice-game.png";
import guessnumber from "../../../public/guess-game.png";
import notionPokedex from "../../../public/Pokedex.gif";

export const engineeringProjects = [
  {
    title: "Flexo",
    subtitle: "Offline-First Mobile Fitness App",
    category: "Mobile Architecture & Systems",
    status: "In Development",
    description: "High-performance mobile workout tracking application engineered with an offline-first architecture. Implements local data synchronization between WatermelonDB/SQLite and a Fastify backend to guarantee granular logging and zero-latency performance in low-connectivity gym environments.",
    tags: ["React Native", "Fastify", "WatermelonDB", "SQLite", "Offline Sync", "Node.js"],
    icon: (
      <svg className="size-8 text-bat-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Custom Network Infrastructure",
    subtitle: "Self-Hosted Server & Multi-Agent Hub",
    category: "Infrastructure & Autonomous AI",
    status: "Personal Infrastructure",
    description: "Hardened custom home server operating on Manjaro Linux. Docker Compose containerization runs all service backends behind the open-sourced monitoring dashboard. Features a persistent multi-agent AI hub orchestrated by Hermes Agent and LLMs for autonomous task execution and automated daily briefings.",
    tags: ["Manjaro Linux", "Docker", "Hermes Agent", "LLMs", "DevOps", "Tailscale"],
    icon: (
      <svg className="size-8 text-bat-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    )
  },
  {
    title: "server-monitor",
    subtitle: "Open-Source Monitoring Dashboard",
    category: "Systems Observability & DevOps",
    status: "Open Source · MIT",
    link: "https://github.com/kamikaazeyy/server-monitor",
    description: "Lightweight self-hosted observability dashboard. Streams live CPU, memory, disk, and network telemetry over Socket.io with sparkline charts, Docker container controls, systemd service status, GitHub Actions/PR tracking, a full xterm.js web terminal, and a read-only Postgres browser — all behind JWT auth.",
    tags: ["Express", "Socket.io", "React", "TypeScript", "Docker", "node-pty", "systemd"],
    icon: (
      <svg className="size-8 text-bat-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

export const featuredWebProject = {
  title: "Notion Pokédex",
  category: "Featured Application",
  description: "An animated, database-driven Pokédex web application inspired by the Notion aesthetic. Features real-time API queries, dynamic sprite rendering, and fluid categorical filtering.",
  src: notionPokedex,
  tags: ["React", "PokéAPI", "CSS3 Animations", "REST API"],
  demo: "https://kamikaazeyy.github.io/Pok-dex/",
  repo: "https://github.com/kamikaazeyy/Pok-dex/"
};

export const webProjects = [
  {
    title: "Word Counter",
    category: "Utility Tool",
    description: "Real-time content analysis engine calculating character frequency, word density, reading times, and paragraph metrics instantly.",
    src: wordcounter,
    tags: ["JavaScript", "Regex", "DOM Manipulation"],
    demo: "https://kamikaazeyy.github.io/Word-Counter/",
    repo: "https://github.com/kamikaazeyy/Word-Counter"
  },
  {
    title: "To-Do List",
    category: "Productivity",
    description: "Sleek task manager featuring persistent browser storage, priority flagging, and dynamic task completion analytics.",
    src: to_do_List,
    tags: ["JavaScript", "Local Storage", "Responsive UI"],
    demo: null,
    repo: null
  },
  {
    title: "Guess Number Game",
    category: "Interactive Game",
    description: "Algorithmic number deduction game with dynamic proximity hints, scoring mechanisms, and high-score retention.",
    src: guessnumber,
    tags: ["JavaScript", "Game Logic", "CSS Modules"],
    demo: "https://kamikaazeyy.github.io/guess-number/",
    repo: "https://github.com/kamikaazeyy/guess-number"
  },
  {
    title: "Dice Game",
    category: "Turn-based Game",
    description: "Two-player competitive roll-and-hold dice game implementing probabilistic game theory and dynamic score boards.",
    src: dicegame,
    tags: ["JavaScript", "State Logic", "Event Architecture"],
    demo: "https://kamikaazeyy.github.io/Dice-Game/",
    repo: "https://github.com/kamikaazeyy/Dice-Game"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-bat-400/80">
              {"// 02. BUILDS & ARCHITECTURE"}
            </span>
            <span className="h-px flex-1 bg-cyber-border" />
          </div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold text-white tracking-wider text-balance">
              Featured Projects
            </h2>
            <span className="hidden sm:block font-orbitron font-bold text-6xl lg:text-7xl leading-none text-white/[0.05] select-none" aria-hidden="true">02</span>
          </div>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-sans max-w-lg text-pretty">
            From offline-first mobile apps and self-hosted AI hubs to interactive web applications.
          </p>
        </motion.div>

        {/* --- PART 1: CORE SYSTEMS & MOBILE ENGINEERING (From Resume) --- */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="size-2 rounded-full bg-bat-400" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400">
              {"// SYSTEMS & MOBILE ARCHITECTURE"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {engineeringProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
                className="relative rounded-xl border border-cyber-border bg-cyber-card p-6 sm:p-8 group hover:border-bat-500/50 hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between"
              >
                <span className="absolute inset-x-6 top-0 h-px bg-bat-400/0 group-hover:bg-bat-400/70 transition-colors duration-300 pointer-events-none" />
                <div>
                  {/* Top Bar with Icon & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-white/20 transition-colors">
                      {project.icon}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide whitespace-nowrap bg-white/5 border border-white/10 text-gray-300">
                      <span className="size-1.5 rounded-full bg-bat-400" />
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div className="text-xs font-mono text-gray-400 mb-1">
                    {project.category}
                  </div>
                  <h4 className="text-2xl font-orbitron font-bold text-white mb-1 group-hover:text-bat-300 transition-colors">
                    {project.title}
                  </h4>
                  <div className="text-xs font-mono text-bat-400/90 mb-4">
                    {project.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed font-sans mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md bg-bat-500/10 border border-bat-500/30 text-bat-300 hover:bg-bat-500/20 hover:border-bat-400/60 transition-colors"
                    >
                      <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- PART 2: WEB APPLICATIONS & TOOLS --- */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="size-2 rounded-full bg-bat-400" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400">
              {"// WEB APPLICATIONS & LABS"}
            </h3>
          </div>

          {/* Featured Web Application (Full Width Lead Card) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative mb-8 rounded-xl border border-cyber-border bg-cyber-card p-6 sm:p-8 group hover:border-bat-400/50 transition duration-200"
          >
            <span className="absolute inset-x-6 top-0 h-px bg-bat-400/0 group-hover:bg-bat-400/70 transition-colors duration-300 pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Visual Preview */}
              <div className="lg:col-span-7 overflow-hidden rounded-xl border border-white/10 bg-cyber-bg relative aspect-video flex items-center justify-center">
                <Image
                  src={featuredWebProject.src}
                  alt={featuredWebProject.title}
                  unoptimized
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-bat-400">
                    <span className="size-1.5 rounded-full bg-bat-400" />
                    <span>{featuredWebProject.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-white mb-3">
                    {featuredWebProject.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans mb-6">
                    {featuredWebProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredWebProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-bat-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {featuredWebProject.demo && (
                    <a
                      href={featuredWebProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wide text-bat-300 bg-bat-500/10 hover:bg-bat-500/20 border border-bat-500/40 hover:border-bat-400 transition-colors"
                    >
                      <span>Live Demo</span>
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                  {featuredWebProject.repo && (
                    <a
                      href={featuredWebProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wide text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-bat-400/50 transition-colors"
                    >
                      <span>View Repository</span>
                      <svg className="size-3.5 text-bat-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2x2 Symmetrical Grid for other 4 web projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {webProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
                className="relative flex flex-col justify-between rounded-xl border border-cyber-border bg-cyber-card p-5 sm:p-6 group hover:border-bat-500/40 hover:-translate-y-0.5 transition duration-200"
              >
                <span className="absolute inset-x-6 top-0 h-px bg-bat-400/0 group-hover:bg-bat-400/70 transition-colors duration-300 pointer-events-none" />
                <div>
                  {/* Image container */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-cyber-bg mb-5">
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-bat-400/80">
                    <span className="size-1.5 rounded-full bg-bat-400" />
                    <span>{project.category}</span>
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-bat-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-4">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-bat-300 bg-bat-500/10 hover:bg-bat-500/20 border border-bat-500/40 hover:border-bat-400 transition-colors active:scale-[0.97]"
                    >
                      <span>Live Demo</span>
                      <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-colors active:scale-[0.97]"
                    >
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
