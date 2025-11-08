// src/app/fonts/fonts.js

import { Orbitron, Dancing_Script } from 'next/font/google'
import localFont from 'next/font/local'

// Configure your Google Fonts
export const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron', // CSS variable
})

export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing', // CSS variable
})

// Configure your local font
export const myCustomFont = localFont({
  // Use the correct path and filename
  src: './Hacked-KerX.ttf', 
  display: 'swap',
  variable: '--font-custom', // CSS variable
})