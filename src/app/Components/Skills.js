import Image from 'next/image';
import JS from "../../../public/output-onlinegiftools jS.gif";
import python from "../../../public/output-onlinegiftools PY.gif";
import HTML from "../../../public/icons8-html-48.png";
import CSS from "../../../public/icons8-css-48.png";
import Node from "../../../public/nodejs.png";
import react from "../../../public/reacticon.gif";
import figma from "../../../public/figmaicon.gif";
import PowerBI from "../../../public/powerbi.png";
import SQL from "../../../public/sql.png";

const skillImages = [
  { src: JS, alt: "JavaScript" },
  { src: python, alt: "Python" },
  { src: HTML, alt: "HTML" },
  { src: CSS, alt: "CSS" },
  { src: Node, alt: "Node.js" },
  { src: react, alt: "React" },
  { src: figma, alt: "Figma" },
  { src: PowerBI, alt: "Power BI" },
  { src: SQL, alt: "SQL", height: 48, width: 48 }
];

export default function Skills() {
  return (
    <section className="py-10">
      <h3 className="text-2xl sm:text-3xl py-1 font-orbitron text-center dark:text-white animate-fadeInBottom">Skills</h3>
      <div className="flex flex-wrap justify-center gap-4 pt-5 dark:text-gray-200">
        {skillImages.map((skill, index) => (
          <Image
            key={skill.alt}
            src={skill.src}
            alt={skill.alt}
            width={skill.width || 48}
            height={skill.height || 48}
            className={`animate-fadeIn${index < 3 ? 'Left' : index < 6 ? 'Forward' : 'Right'}`}
          />
        ))}
      </div>
    </section>
  );
}