import Image from "next/image";
import wordcounter from "../../../public/word-counter.png";
import to_do_List from "../../../public/to-do-list.png";
import dicegame from "../../../public/dice-game.png";
import guessnumber from "../../../public/guess game.png";
import notionPokedex from "../../../public/Pokedex.gif";
import { BackgroundGradient } from "./background-gradient";

const projects = [
  { src: wordcounter, alt: "Word Counter", link: "https://kamikaazeyy.github.io/Word-Counter/" },
  { src: to_do_List, alt: "To-Do List" },
  { src: guessnumber, alt: "Guess Number Game", link: "https://kamikaazeyy.github.io/guess-number/" },
  { src: dicegame, alt: "Dice Game", link: "https://kamikaazeyy.github.io/Dice-Game/" },
  { src: notionPokedex, alt: "Notion Pokédex", link: "https://github.com/kamikaazeyy/Pok-dex/" },
];

export default function Projects() {
  return (
    <section className="py-10">
      <h3 className="text-2xl sm:text-3xl text-center py-10 dark:text-white font-orbitron">
        Projects
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project) => (
          <BackgroundGradient
            key={project.alt}
            className="animate-fadeInBottom transition duration-300"
            containerClassName="rounded-3xl"
          >
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={project.src}
                  alt={project.alt}
                  className="rounded-2xl w-full h-auto object-cover shadow-lg"
                />
              </a>
            ) : (
              <Image
                src={project.src}
                alt={project.alt}
                className="rounded-2xl w-full h-auto object-cover shadow-lg"
              />
            )}
            <p className="mt-4 text-center text-gray-200 font-medium font-orbitron">
              {project.alt}
            </p>
          </BackgroundGradient>
        ))}
      </div>
    </section>
  );
}
