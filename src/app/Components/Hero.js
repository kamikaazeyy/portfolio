import Image from 'next/image';
import Kamikaazeyy from '../../../public/Avatar.png';

export default function Hero({ onOpenTerminal }) {
  return (
    <section id="about" className="relative pt-6 pb-20 sm:pt-12 sm:pb-28">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Cyber Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm text-cyan-300 font-mono text-xs tracking-wider animate-fadeInTop">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>FULL-STACK &bull; GENERATIVE AI &bull; CYBERSECURITY</span>
        </div>

        {/* Glitch Title */}
        <h1 
          className="hover-glitch-text text-4xl sm:text-6xl lg:text-7xl font-bold font-custom tracking-wider text-white mb-4"
          data-text="Pranav Mehrotra"
        >
          Pranav Mehrotra
        </h1>

        {/* Subtitle with Orbitron */}
        <div className="inline-block mb-6">
          <h2 className="typewriter text-lg sm:text-2xl md:text-3xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-cyan-300 tracking-widest uppercase">
            Software Engineer &amp; Fullstack Architect
          </h2>
        </div>

        {/* Bio Copy with Refined Typography from Resume */}
        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 max-w-2xl mx-auto font-sans mb-8">
          Results-driven engineer combining <span className="text-cyan-300 font-medium">full-stack architecture</span> with <span className="text-cyan-300 font-medium">generative AI pipelines</span>, self-hosted DevOps, and <span className="text-red-400 font-medium">enterprise cybersecurity</span>. Proven ability to architect scalable databases, low-latency microservices, and high-performance web and mobile applications from the ground up.
        </p>

        {/* Hero Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="#projects"
            className="px-6 py-2.5 rounded-full font-orbitron text-xs sm:text-sm tracking-wider uppercase font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_28px_rgba(239,68,68,0.6)] transition-all duration-300"
          >
            Explore Projects
          </a>
          {onOpenTerminal && (
            <button
              type="button"
              onClick={onOpenTerminal}
              className="px-6 py-2.5 rounded-full font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold text-emerald-300 hover:text-white bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.2)] hover:shadow-[0_0_24px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center gap-2"
            >
              <span className="font-bold">&gt;_</span>
              <span>Terminal Mode</span>
            </button>
          )}
        </div>

        {/* Quick Credentials Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 text-[11px] font-mono text-gray-400">
          <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            B.Tech CSE &bull; 9.0 CGPA
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            Meta Certified Developer
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            Manjaro Linux &bull; Docker Hub
          </span>
        </div>

        {/* Refined Avatar with Dual Cyber Halo Rings */}
        <div className="relative group animate-fadeInForward">
          {/* Ambient Cyber Glow */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-red-600/40 via-cyan-500/30 to-rose-600/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse" />
          
          {/* Rotating Decorative Outer Ring */}
          <div className="absolute -inset-3 rounded-full border border-dashed border-cyan-500/30 animate-[spin_30s_linear_infinite]" />
          
          {/* Outer Cyber Border */}
          <div className="relative rounded-full p-1 bg-gradient-to-b from-red-500 via-rose-700 to-cyan-500 shadow-2xl">
            <div className="relative rounded-full overflow-hidden w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#0c0e17]">
              <Image
                src={Kamikaazeyy}
                fill
                alt="Pranav Mehrotra"
                className="object-cover pt-4 scale-105 group-hover:scale-110 transition duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}