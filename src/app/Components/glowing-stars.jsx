"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";

export const GlowingStarsBackgroundCard = ({ className, children }) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
      className={cn(
        "bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 max-w-md max-h-[20rem] h-full w-full rounded-xl border border-[#eaeaea] dark:border-neutral-600",
        className
      )}
    >
      <div className="flex justify-center items-center">
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className="px-2 pb-6">{children}</div>
    </div>
  );
};

export const GlowingStarsDescription = ({ className, children }) => {
  return (
    <p className={cn("text-base text-white max-w-[16rem]", className)}>{children}</p>
  );
};

export const GlowingStarsTitle = ({ className, children }) => {
  return (
    <h2 className={cn("font-bold text-2xl text-[#eaeaea]", className)}>{children}</h2>
  );
};

export const Illustration = ({ mouseEnter }) => {
  // Responsive columns and rows based on window size
  const [dimensions, setDimensions] = useState({ columns: 18, rows: 6 });

  useEffect(() => {
    function updateDimensions() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Each star approx 40px wide and tall; adjust as needed
      const columns = Math.max(10, Math.floor(width / 40));
      const rows = Math.max(6, Math.floor(height / 40));
      setDimensions({ columns, rows });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const stars = dimensions.columns * dimensions.rows;

  const [glowingStars, setGlowingStars] = useState([]);

  const highlightedStars = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, [stars]);

  return (
    <div
      className="w-full h-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${dimensions.columns}, 1fr)`,
        gridTemplateRows: `repeat(${dimensions.rows}, 1fr)`,
        gap: "1px",
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        const staticDelay = starIdx * 0.01;
        return (
          <div
            key={`matrix-col-${starIdx}`}
            className="relative flex items-center justify-center"
          >
            <Star
              isGlowing={mouseEnter ? true : isGlowing}
              delay={mouseEnter ? staticDelay : delay}
            />
            {mouseEnter && <Glow delay={staticDelay} />}
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("bg-[#666] h-[2px] w-[2px] rounded-full relative z-20")}
    ></motion.div>
  );
};

const Glow = ({ delay }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
    />
  );
};
