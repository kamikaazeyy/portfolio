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
  { src: "/sql.png", alt: "SQL" }, // <-- Added comma
  { src: "/docker.png", alt: "Docker" }, // <-- Added comma, corrected alt text
  { src: "/mongodb.png", alt: "MongoDB" }, // <-- Added comma, corrected alt text & "monogodb" typo
  { src: "/git.png", alt: "Git" } ,// <-- Corrected alt text & added leading "/" to path
];

const Tape = () => {
  return (
    <div className="w-full overflow-x-clip py-16 lg:py-24">
      <div className="w-full bg-transparent">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none animate-move-left gap-8 py-3 [animation-duration:30s]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <React.Fragment key={index}>
                {techStack.map((tech, techIndex) => (
                  <div key={`${index}-${techIndex}`} className="inline-flex items-center">
                    <img 
                      src={tech.src} 
                      alt={tech.alt}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tape;
