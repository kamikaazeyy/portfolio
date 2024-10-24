import Image from 'next/image';
import wordcounter from "../../../public/word-counter.png";
import to_do_List from "../../../public/to-do-list.png";
import dicegame from "../../../public/dice-game.png";
import guessnumber from "../../../public/guess game.png";
import notionPokedex from "../../../public/Pokedex.gif"

const projects = [
  { src: wordcounter, alt: "Word Counter", link: "https://kamikaazeyy.github.io/Word-Counter/" },
  { src: to_do_List, alt: "To-Do List" },
  { src: guessnumber, alt: "Guess Number Game", link: "https://kamikaazeyy.github.io/guess-number/" },
  { src: dicegame, alt: "Dice Game", link: "https://kamikaazeyy.github.io/Dice-Game/" },
  { src: notionPokedex, alt: "Notion Pokédex", link: "https://github.com/kamikaazeyy/Pok-dex/" }

];

export default function Projects() {
  return (
    <section className="py-10">
      <h3 className="text-2xl sm:text-3xl text-center py-10 dark:text-white font-orbitron">Projects</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={project.alt} className="shadow-lg p-6 rounded-xl bg-white dark:bg-gray-800 animate-fadeInBottom hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300">
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Image src={project.src} alt={project.alt} className="rounded-xl w-full h-auto" />
              </a>
            ) : (
              <Image src={project.src} alt={project.alt} className="rounded-xl w-full h-auto" />
            )}
            <p className="mt-4 text-center text-gray-800 dark:text-gray-200">{project.alt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}