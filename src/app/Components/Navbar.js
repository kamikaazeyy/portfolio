import { BsFillMoonStarsFill } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
import web_dev_resume from '../../../public/Pranav Mehrotra.pdf';

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="py-4 sm:py-10 mb-12 flex flex-wrap justify-between items-center dark:text-white animate-fadeInTop">
      <h1 className="text-xl font-orbitron text-red-800 dark:text-red-400 sm:text-2xl mb-4 sm:mb-0">Kamikaazeyy</h1>
      <ul className="flex items-center space-x-4">
        {/* <li>
          <Tooltip title="Toggle Dark Mode">
            <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
              <BsFillMoonStarsFill className="cursor-pointer text-xl" />
            </button>
          </Tooltip>
        </li> */}
        <li>
          <a
            className="bg-gradient-to-r from-cyan-500 to-red-500 text-white px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md"
            href="https://drive.google.com/file/d/1U12tWVHHvG3mK1RJS954a1aD0uRzQyM6/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
