'use client'
import {BsFillMoonStarsFill,BsLinkedin,BsTwitterX,BsGithub} from 'react-icons/bs';
import { SiGmail } from "react-icons/si";
import Image from 'next/image';
import Kamikaazeyy from "../../public/aiavatar-removebg.png";
import JS from "../../public/output-onlinegiftools jS.gif"
import python from "../../public/output-onlinegiftools PY.gif"
import HTML from "../../public/icons8-html-48.png"
import CSS from "../../public/icons8-css-48.png"
import Node from "../../public/nodejs.png"
import react from "../../public/reacticon.gif" 
import figma from "../../public/figmaicon.gif"
import SQL from "../../public/sql.png"
import PowerBI from "../../public/powerbi.png"
import wordcounter from "../../public/word-counter.png"
import to_do_List from "../../public/to-do-list.png"
import dicegame from "../../public/dice-game.png"
import guessnumber from "../../public/guess game.png"
import { useState } from 'react';
import web_dev_resume from "../../public/web-dev Resume Final.pdf"
import Tooltip from '@mui/material/Tooltip';




export default function Home() {
  function Submit(e){
    const formEle=document.querySelector(".My-Form")
    e.preventDefault()
    console.log("Submitted")
    const formDatab = new FormData(formEle)
    fetch("https://script.google.com/macros/s/AKfycbywETVl6nfVENm82tKF3L9lv7u5SkeYXbWdjDG7iuKJYhjE6M2td6rT3XqPcWR4Tooxtg/exec",{  method:"POST",
    body:formDatab})
    .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const[darkMode, setDarkMode]=useState(false);  
  return (
    <div className={`transition-colors duration-500 ${darkMode? "dark" : ""}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Orbitron:wght@400..900&display=swap" rel="stylesheet"/>
        <title>Pranav Mehrotra</title>
      </head>
      <main className="bg-slate-200 px-4 sm:px-10 md:px-20 lg:px-40 xl:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
          <nav className="py-4 sm:py-10 mb-12 flex flex-col sm:flex-row justify-between dark:text-white animate-fadeInTop">
            <h1 className="text-4xl font-orbitron text-red-800 dark:text-red-400 sm:text-3xl">Kamikaazeyy</h1>
            <ul className="flex items-center space-x-4 sm:space-x-8">
              <Tooltip title="Toggle Dark Mode">
                <li><BsFillMoonStarsFill onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl"/></li>
              </Tooltip>
              <li><a className="bg-gradient-to-r from-cyan-500 to-red-500 text-white px-4 py-2 rounded-md" href={web_dev_resume} target="_blank" rel="noopener noreferrer">Resume</a></li>
            </ul>
          </nav>
          <div className="animate-fadeInBottom text-center p-4 sm:p-10 justify-center items-center">
            <h2 className="text-red-800 dark:text-red-400 text-6xl font-bold font-orbitron mb-5">Pranav Mehrotra</h2>
            <h3 className="text-2xl py-2 dark:text-white md:text-3xl font-orbitron mb-5">Web Developer/Data Analyst</h3>
            <p className="text-md py-5 leading-8 text-gray-800 dark:text-gray-200 md:text-xl max-w-xl mx-auto">Tech Enthusiast who like to try and play around with various technologies</p>
          </div>
          <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
            <a href="https://twitter.com/mehrotrapranav1" target="_blank" className="hover:text-gray-400 transition duration-200"><BsTwitterX /></a>
            <a href="https://www.linkedin.com/in/pranav-mehrotra-879025194/" target="_blank" className="hover:text-gray-400 transition duration-200"><BsLinkedin /></a>
            <a href="https://github.com/kamikaazeyy?tab=overview&from=2024-03-01&to=2024-03-26" target="_blank" className="hover:text-gray-400 transition duration-200"><BsGithub /></a>
            <a href="mailto:mehrotrapranav240@gmail.com" target="_blank" className="hover:text-gray-400 transition-duration-200"><SiGmail/></a>
          </div>
          <div className="relative mx-auto bg-gradient-to-b from-red-500 rounded-full w-80 h-80 mt-20 overflow-hidden md:w-96 md:h-96 pb-10 animate-fadeInForward">
            <Image src={Kamikaazeyy} layout="fill" objectFit="cover"/>
          </div>
        </section>

        <section>
          <div >
            <h3 className="text-3xl py-1 font-orbitron text-center pt-5 dark:text-white animate-fadeInBottom "> Skills</h3>
            <div className="flex justify-center pt-5 dark:text-gray-200 "> 
              <Image src={JS} className="mr-6 animate-fadeInLeft"/>
              <Image src={python} className="mr-6 animate-fadeInLeft"/>
              <Image src={HTML} className="mr-6 animate-fadeInLeft"/>
              <Image src={CSS} className="mr-6 animate-fadeInForward"/>
              <Image src={Node} className="mr-6 animate-fadeInForward"/>
              <Image src={react} className="mr-6 animate-fadeInForward"/>
              <Image src={figma} className="mr-6 animate-fadeInRight"/>
              <Image src={PowerBI} className="mr-6 animate-fadeInRight"/>
              <Image src={SQL} height={48} width={48} className="mr-6 animate-fadeInRight"/>
            </div>
        
          </div>
          
        </section>

        <section className=" flex flex-col justify-center items-center min-h-screen">
          <h2 className="text-3xl mt-10 py-1 font-orbitron text-center pt-5 dark:text-white animate-fadeInBottom">Contact me</h2>
          <div className="mt-15 w-96 h-96 flex justify-center pb-10 text-center shadow-lg p-10 rounded-xl my-10 animate-fadeInBottom hover:bg-gray-400 transition duration-200">
              <form className="max-w-sm mx-auto My-Form" onSubmit={(e)=>Submit(e)}>
                <div>
                  <label htmlFor="name-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" id="name-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" name="Name"/>
                </div>
                <div>
                  <label htmlFor="email-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="text" id="email-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Email" name="Email"/>
                </div>
                <div className="mb-5">
                  <label htmlFor="message-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                  <input type="text" id="message-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Message" name="Message"/>
                </div>
                <div>
                  <button className="bg-gradient-to-r from-cyan-500 to-red-500 text-white px-4 py-2 rounded-md ml-8 items-center text-center"type="submit">Submit</button>
                </div>
              </form>
          </div>
        </section>



        <section>
          <div>
            <h3 className="text-3xl text-center py-10 dark:text-white font-orbitron">Projects</h3>
          </div>
          <div className="flex justify-center pb-10 text-center shadow-lg p-10 rounded-xl my-10 animate-fadeInBottom hover:bg-gray-400 transition duration-200">
            <a href="https://kamikaazeyy.github.io/Word-Counter/" target="_blank">
                <Image src={wordcounter} className="rounded-xl animate-fadeInBottom"/>
            </a>
          </div>
          <div className="flex justify-center pb-10 text-center shadow-lg p-10 rounded-xl my-10 animate-fadeInBottom hover:bg-gray-400 transition duration-200">
          <Image src={to_do_List} className="rounded-xl animate-fadeInBottom"/>
          </div>
          <div className="flex justify-center pb-10 text-center shadow-lg p-10 rounded-xl my-10 animate-fadeInBottom hover:bg-gray-400 transition duration-200">
          <a href="https://kamikaazeyy.github.io/guess-number/" target="_blank">
              <Image src={guessnumber} className="rounded-xl animate-fadeInBottom"/>
          </a>
          </div>
          <div className="flex justify-center pb-10 text-center shadow-lg p-10 rounded-xl my-10 animate-fadeInBottom hover:bg-gray-400 transition duration-200">
          <a href="https://kamikaazeyy.github.io/Dice-Game/" target="_blank">
              <Image src={dicegame} className="rounded-xl animate-fadeInBottom"/>
          </a>
        </div>

        </section>
      </main>

    </div>
    
  );
}
