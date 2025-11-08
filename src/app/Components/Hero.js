import Image from 'next/image';
import Kamikaazeyy from '../../../public/Avatar.png';
import SocialLinks from './SocialLinks';

export default function Hero() {
  return (
    <section className="min-h-screen">
      <div className="animate-fadeInBottom text-center p-4 sm:p-10">
        <h2 className="text-red-800 dark:text-red-400 text-4xl sm:text-6xl font-bold font-orbitron mb-5">
          Pranav Mehrotra
        </h2>
        <h3 className="text-xl sm:text-2xl py-2 text-white md:text-3xl font-orbitron mb-5">
          Web Developer
        </h3>
        <p className="text-md py-5 leading-8 text-gray-200 md:text-xl max-w-xl mx-auto">
          Tech Enthusiast who likes to try and play around with various
          technologies
        </p>
      </div>
      <SocialLinks />
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