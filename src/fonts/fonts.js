// src/app/fonts/fonts.js

import { Orbitron } from 'next/font/google'
import localFont from 'next/font/local'

// Configure your Google Fonts
export const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron', // CSS variable
})

// Configure your local font
export const myCustomFont = localFont({
  // Use the correct path and filename
  src: './Hacked-KerX.ttf', 
  display: 'swap',
  variable: '--font-custom', // CSS variable
})