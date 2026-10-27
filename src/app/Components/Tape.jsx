import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
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
  { icon: <SiTypescript className="size-5 text-[#3178c6]" />, alt: "TypeScript" },
  { src: "/reacticon.gif", alt: "React.js" },
  { icon: <SiNextdotjs className="size-5 text-white" />, alt: "Next.js" },
  { src: "/nodejs.png", alt: "Node.js" },
  { icon: <SiOpenai className="size-5 text-emerald-400" />, alt: "Generative AI & LLMs" },
  { src: "/output-onlinegiftools-py.gif", alt: "Python" },
  { icon: <SiFastapi className="size-5 text-[#009688]" />, alt: "FastAPI / Fastify" },
  { src: "/mongodb.png", alt: "MongoDB" },
  { icon: <SiPostgresql className="size-5 text-[#336791]" />, alt: "PostgreSQL" },
  { icon: <SiRedis className="size-5 text-[#dc382d]" />, alt: "Redis" },
  { src: "/docker.png", alt: "Docker" },
  { icon: <SiLinux className="size-5 text-amber-400" />, alt: "Linux (Manjaro/Ubuntu)" },
  { icon: <SiAmazonaws className="size-5 text-[#ff9900]" />, alt: "AWS" },
  { icon: <SiGooglecloud className="size-5 text-[#4285f4]" />, alt: "GCP" },
  { icon: <SiTailwindcss className="size-5 text-bat-400" />, alt: "Tailwind CSS" },
  { src: "/sql.png", alt: "SQL" },
  { src: "/powerbi.png", alt: "Power BI" },
  { src: "/git.png", alt: "Git" }
];

export const skillCategories = [
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
  const marqueeRef = useRef(null);
  const marqueeInView = useInView(marqueeRef, { amount: 0.1 });

  return (
    <section className="w-full py-12 sm:py-16">
      {/* Infinite Running Marquee */}
      <div
        ref={marqueeRef}
        className="relative py-4 border-y border-cyber-border bg-cyber-surface/70 overflow-hidden"
      >
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] overflow-hidden">
          <div
            className="flex flex-none py-2 animate-move-left motion-reduce:animate-none [animation-duration:45s] hover:[animation-play-state:paused]"
            style={{ animationPlayState: marqueeInView ? 'running' : 'paused' }}
          >
            {/* Duplicated for seamless infinite marquee loop */}
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={`${tech.alt}-${index}`}
                className="inline-flex items-center gap-3 mr-6 sm:mr-8 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-bat-400/50 hover:bg-white/[0.06] transition-colors duration-200 shrink-0 group"
              >
                <div className="relative size-6 flex items-center justify-center">
                  {tech.src ? (
                    <Image
                      src={tech.src}
                      alt={tech.alt}
                      width={24}
                      height={24}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    tech.icon
                  )}
                </div>
                <span className="font-mono text-xs sm:text-sm font-medium tracking-wide text-gray-300 group-hover:text-white transition-colors">
                  {tech.alt}
                </span>
                <span className="size-1.5 rounded-full bg-white/20 group-hover:bg-bat-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Technical Skills Bento Grid */}
      <div className="max-w-6xl mx-auto mt-12 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
              className="relative group rounded-xl border border-cyber-border bg-cyber-card p-5 hover:border-bat-500/30 hover:-translate-y-0.5 transition duration-200"
            >
              <span className="absolute inset-x-6 top-0 h-px bg-bat-400/0 group-hover:bg-bat-400/70 transition-colors duration-300 pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <span className="size-1.5 rounded-full bg-bat-400" />
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tape;
