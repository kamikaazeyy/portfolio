import React from 'react';
import Image from 'next/image';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiPostgresql, 
  SiRedis, 
  SiTailwindcss, 
  SiFastapi, 
  SiLinux, 
  SiAmazonaws, 
  SiGooglecloud, 
  SiOpenai 
} from 'react-icons/si';

const techStack = [
  { src: "/output-onlinegiftools-js.gif", alt: "JavaScript" },
  { icon: <SiTypescript className="w-5 h-5 text-[#3178c6]" />, alt: "TypeScript" },
  { src: "/reacticon.gif", alt: "React.js" },
  { icon: <SiNextdotjs className="w-5 h-5 text-white" />, alt: "Next.js" },
  { src: "/nodejs.png", alt: "Node.js" },
  { icon: <SiOpenai className="w-5 h-5 text-emerald-400" />, alt: "Generative AI & LLMs" },
  { src: "/output-onlinegiftools-py.gif", alt: "Python" },
  { icon: <SiFastapi className="w-5 h-5 text-[#009688]" />, alt: "FastAPI / Fastify" },
  { src: "/mongodb.png", alt: "MongoDB" },
  { icon: <SiPostgresql className="w-5 h-5 text-[#336791]" />, alt: "PostgreSQL" },
  { icon: <SiRedis className="w-5 h-5 text-[#dc382d]" />, alt: "Redis" },
  { src: "/docker.png", alt: "Docker" },
  { icon: <SiLinux className="w-5 h-5 text-amber-400" />, alt: "Linux (Manjaro/Ubuntu)" },
  { icon: <SiAmazonaws className="w-5 h-5 text-[#ff9900]" />, alt: "AWS" },
  { icon: <SiGooglecloud className="w-5 h-5 text-[#4285f4]" />, alt: "GCP" },
  { icon: <SiTailwindcss className="w-5 h-5 text-cyan-400" />, alt: "Tailwind CSS" },
  { src: "/sql.png", alt: "SQL" },
  { src: "/powerbi.png", alt: "Power BI" },
  { src: "/git.png", alt: "Git" }
];

const skillCategories = [
  {
    category: "Frontend & Mobile",
    skills: ["React.js", "Next.js", "React Native", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5/CSS3"]
  },
  {
    category: "Backend & GenAI",
    skills: ["Node.js", "Express.js", "Fastify", "FastAPI", "Python", "Generative AI", "LLMs", "Pandas", "Scikit-Learn"]
  },
  {
    category: "Databases & Storage",
    skills: ["MongoDB", "PostgreSQL", "SQLite", "Redis", "WatermelonDB", "SQL"]
  },
  {
    category: "Cloud, DevOps & Systems",
    skills: ["Docker", "AWS", "GCP", "Linux (Manjaro/Debian)", "CI/CD", "Tailscale", "Hermes Agent", "Git/GitHub"]
  }
];

const Tape = () => {
  return (
    <section className="w-full py-12 sm:py-16">
      {/* Infinite Running Marquee */}
      <div className="relative py-4 border-y border-cyan-500/20 bg-[#0a0c14]/70 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Subtle accent light strips */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] overflow-hidden">
          <div className="flex flex-none gap-6 sm:gap-8 py-2 animate-move-left [animation-duration:45s] hover:[animation-play-state:paused]">
            {/* Duplicated for seamless infinite marquee loop */}
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={`${tech.alt}-${index}`}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 shrink-0 group"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {tech.src ? (
                    <Image 
                      src={tech.src} 
                      alt={tech.alt}
                      width={24}
                      height={24}
                      className="object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] transition-all"
                      unoptimized
                    />
                  ) : (
                    tech.icon
                  )}
                </div>
                <span className="font-mono text-xs sm:text-sm font-medium tracking-wide text-gray-300 group-hover:text-white transition-colors">
                  {tech.alt}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/40 group-hover:bg-cyan-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Technical Skills Bento Grid */}
      <div className="max-w-6xl mx-auto mt-12 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-5 backdrop-blur-md shadow-lg hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  {group.category}
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tape;
