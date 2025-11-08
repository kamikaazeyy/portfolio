import React from 'react';

const techStack = [
  { src: "/output-onlinegiftools jS.gif", alt: "JavaScript" },
  { src: "/output-onlinegiftools PY.gif", alt: "Python" },
  { src: "/icons8-html-48.png", alt: "HTML" },
  { src: "/icons8-css-48.png", alt: "CSS" },
  { src: "/nodejs.png", alt: "Node.js" },
  { src: "/reacticon.gif", alt: "React" },
  { src: "/figmaicon.gif", alt: "Figma" },
  { src: "/powerbi.png", alt: "Power BI" },
  { src: "/sql.png", alt: "SQL" },
  { src: "/docker.png", alt: "Docker" },
  { src: "/mongodb.png", alt: "MongoDB" },
  { src: "/git.png", alt: "Git" }
];

const Tape = () => {
  return (
    <div className="w-full overflow-x-clip py-16 lg:py-24">
      <div className="w-full bg-transparent">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-8 py-3 animate-move-left [animation-duration:30s]">
            {/* First set of logos */}
            {techStack.map((tech, index) => (
              <div key={`first-${index}`} className="inline-flex items-center shrink-0">
                <img 
                  src={tech.src} 
                  alt={tech.alt}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            ))}
            {/* Second set of logos (duplicate for seamless loop) */}
            {techStack.map((tech, index) => (
              <div key={`second-${index}`} className="inline-flex items-center shrink-0">
                <img 
                  src={tech.src} 
                  alt={tech.alt}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tape;
