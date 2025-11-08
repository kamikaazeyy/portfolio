'use client'
import { useState } from 'react';
import Head from 'next/head';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';

import ContactForm from './Components/ContactForm';
import Projects from './Components/Projects';
import Timeline from './Components/TimeLineComponent';
import { Illustration } from './Components/glowing-stars';  // Adjust path if needed
import Tape from './Components/Tape';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`transition-colors duration-500 ${darkMode ? "dark" : ""} relative min-h-screen`}>
      <Head>
        <title>Pranav Mehrotra</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Orbitron:wght@400..900&display=swap" rel="stylesheet" />
      </Head>

      {/* Full viewport animated glowing stars background */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(110deg,#333_0.6%,#222)]">
        <div className='w-screen h-screen'>
          <Illustration mouseEnter={false} />
        </div>
      </div>

      {/* Main content with no background override */}
      <main className="px-4 sm:px-10 md:px-20 lg:px-40">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <Hero />
        {/* <Skills />  */}
        <Tape />  
        <Timeline />
        <Projects />
        <ContactForm /> {/* <-- Moved to the last position */}
      </main>
    </div>
  );
}