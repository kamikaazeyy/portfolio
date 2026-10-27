import Image from 'next/image';
import Kamikaazeyy from '../../../public/Avatar.png';

export default function Hero({ onOpenTerminal }) {
  return (
    <section id="about" className="relative pt-6 pb-20 sm:pt-12 sm:pb-28">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 font-mono text-xs animate-fadeInTop">
          <span className="size-1.5 rounded-full bg-bat-400" />
          <span>FULL-STACK &bull; GENERATIVE AI &bull; CYBERSECURITY</span>
        </div>

        {/* Name */}
        <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-7xl font-bold font-orbitron tracking-wider text-white mb-4 text-balance animate-fadeInBottom [animation-delay:100ms] [animation-fill-mode:both]">
          Pranav <span className="text-bat-300">Mehrotra</span>
        </h1>

        {/* Subtitle */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-orbitron text-bat-300 uppercase animate-fadeInBottom [animation-delay:200ms] [animation-fill-mode:both]">
            Software Engineer &amp; Fullstack Architect
            <span className="caret-blink ml-1.5 inline-block w-[2px] h-[0.9em] bg-bat-400 align-middle" />
          </h2>
        </div>

        {/* Bio Copy */}
        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 max-w-2xl mx-auto font-sans mb-8 text-pretty animate-fadeInBottom [animation-delay:300ms] [animation-fill-mode:both]">
          Results-driven engineer combining <span className="text-bat-300 font-medium">full-stack architecture</span> with <span className="text-bat-300 font-medium">generative AI pipelines</span>, self-hosted DevOps, and <span className="text-bat-300 font-medium">enterprise cybersecurity</span>. Proven ability to architect scalable databases, low-latency microservices, and high-performance web and mobile applications from the ground up.
        </p>

        {/* Hero Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 animate-fadeInBottom [animation-delay:400ms] [animation-fill-mode:both]">
          <a
            href="#projects"
            className="group px-6 py-2.5 rounded-full font-orbitron text-xs sm:text-sm tracking-wider uppercase font-semibold text-cyber-bg bg-bat-400 hover:bg-bat-300 transition duration-200 active:scale-[0.97] inline-flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <svg className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          {onOpenTerminal && (
            <button
              type="button"
              onClick={onOpenTerminal}
              className="px-6 py-2.5 rounded-full font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold text-gray-200 hover:text-bat-300 bg-white/[0.03] hover:bg-white/[0.06] border border-white/15 hover:border-bat-400/50 transition duration-200 active:scale-[0.97] flex items-center gap-2"
            >
              <span className="font-bold">&gt;_</span>
              <span>Terminal Mode</span>
            </button>
          )}
        </div>

        {/* Quick Credentials Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 text-[11px] font-mono text-gray-400 animate-fadeInBottom [animation-delay:500ms] [animation-fill-mode:both]">
          <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            B.Tech CSE &bull; 9.0 CGPA
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            Meta Certified Developer
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            Manjaro Linux &bull; Docker Hub
          </span>
        </div>

        {/* Avatar */}
        <div className="relative group animate-fadeInForward">
          <div className="relative rounded-full p-1 border border-white/10 ring-1 ring-bat-400/20 ring-offset-4 ring-offset-cyber-bg group-hover:border-bat-400/40 group-hover:ring-bat-400/40 transition duration-300">
            <div className="relative rounded-full overflow-hidden size-48 sm:size-64 md:size-72 bg-cyber-card">
              <Image
                src={Kamikaazeyy}
                fill
                alt="Pranav Mehrotra"
                className="object-cover pt-4 transition-transform duration-500 group-hover:scale-[1.03]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
