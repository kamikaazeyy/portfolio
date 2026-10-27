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
        colors: {
          cyber: {
            bg: '#0d1016',
            surface: '#141825',
            card: '#1b2131',
            cardHover: '#242b3e',
            border: '#28304a',
            red: '#ff3355',
            accent: '#ffdf00',
            muted: '#8b949e',
          },
          bat: {
            200: '#fff3a3',
            300: '#ffe95c',
            400: '#ffdf00',
            500: '#f0c800',
            600: '#c9a800',
            950: '#292403',
          }
        },
        fontFamily: {
          orbitron: ['var(--font-orbitron)', 'sans-serif'],
          custom: ['var(--font-custom)', 'sans-serif'],
        },
        
        keyframes: {
            fadeInBottom: {
                '0%': {
                    opacity: '0',
                    transform: 'translateY(50px)'
                },
                '100%': {
                    opacity: '1',
                    transform: 'translateY(0)'
                }
            },
            fadeInTop: {
                '0%': {
                    opacity: '0',
                    transform: 'translateY(-50px)'
                },
                '100%': {
                    opacity: 1,
                    transform: 'translateY(0)'
                }
            },
            fadeInForward: {
                '0%': {
                    'opacity': '0',
                    'transform': 'scale(0.6)'
                },
                '100%': {
                    'opacity': '1',
                    'transform': 'scale(1)'
                }
            },
            'move-left': {
                '0%': {
                    transform: 'translateX(0%)'
                },
                '100%': {
                    transform: 'translateX(-50%)'
                }
            }
        },
        animation: {
            fadeInBottom: 'fadeInBottom 2s ease 0s 1 normal forwards',
            fadeInTop: 'fadeInTop 2s ease 0s 1 normal forwards',
            fadeInForward: 'fadeInForward 2s ease 0s 1 normal forwards',
            // UPDATED: Fixed move-left animation with proper duration variable support
            'move-left': 'move-left 30s linear infinite',
        }
    }
  }
}
