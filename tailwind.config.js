/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'orbitron': ["Orbitron", "sans-serif"],

      },
      keyframes: {
        fadeInBottom: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInTop: {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInForward:{
          '0%': {  "opacity": "0", "transform": "scale(0.6)" },
          '100%': {"opacity": "1",  "transform": "scale(1)" },
        },
        fadeInLeft:{
          '0%': {  "opacity": "0", "transform": "translateX(-50px)" },
          '100%': {"opacity": "1",  "transform": "translateX(0)" },
        },
        fadeInRight:{
          '0%': {  "opacity": "0", "transform": "translateX(50px)" },
          '100%': {"opacity": "1",  "transform": "translateX(0)" },
        },
        boxShadow: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
          '100%': { boxShadow: '0 0 20px 0px rgba(0, 0, 0, 0.35)' },
        },
        typing:{
          "0%": {width: "0%",visibility: "hidden"},
          "100%": {width: "100%"}
        },
        blink:{
          "50%": { borderColor: "transparent"},
          "100%": { borderColor: "white"}
        }
        
      },
      animation: {
        fadeInBottom: 'fadeInBottom 2s ease 0s 1 normal forwards',
        fadeInTop: 'fadeInTop 2s ease 0s 1 normal forwards',
        fadeInForward:'fadeInForward 2s ease 0s 1 normal forwards',
        fadeInLeft:'fadeInLeft 2s ease 0s 1 normal forwards',
        fadeInRight:'fadeInRight 2s ease 0s 1 normal forwards',
        boxShadow: 'myAnim 2s ease 0s 1 normal forwards',
        typing:"typing 2s steps(20) infinite alternate, blink .7s infinite"
      },
    },
  },
  variants: {},
  plugins: [],
};
