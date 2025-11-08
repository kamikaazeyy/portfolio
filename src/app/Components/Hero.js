import Image from 'next/image';
import Kamikaazeyy from '../../../public/Avatar.png';

export default function Hero() {
  return (
    <section className="min-h-screen">
      <div className="animate-fadeInBottom text-center p-4 sm:p-10">
        
        {/* --- Glitch effect H2 tag --- */}
        <h2 
          className="hover-glitch-text text-red-500 dark:text-red-400 text-4xl sm:text-6xl font-bold font-custom mb-5 tracking-widest"
          data-text="Pranav Mehrotra"
        >
          Pranav Mehrotra
        </h2>
        
        {/* --- Typewriter effect H3 tag (FIXED) --- */}
        <h3 className="typewriter text-xl sm:text-2xl py-2 text-white md:text-3xl font-orbitron mb-5 tracking-widest">
        Fullstack Web Developer</h3>
        
        <p className=" text-md py-5 leading-8 text-gray-200 md:text-xl max-w-xl mx-auto">
          Fullstack web developer with strong expertise in building responsive, user-centric web applications combined with practical experience in cybersecurity. Skilled at integrating secure coding practices and vulnerability mitigation to deliver seamless, safe digital experiences that meet both user needs and stringent security standards.
        </p>
      </div>
      
      <div className="relative mx-auto bg-red-500 rounded-full w-64 h-64 sm:w-80 sm:h-80 mt-20 overflow-hidden md:w-96 md:h-96 animate-fadeInForward">
        <Image
          src={Kamikaazeyy}
          layout="fill"
          objectFit="cover"
          alt="Profile picture"
          className="pt-20"
        />
      </div>
    </section>
  );
}