// app/layout.js

import "./globals.css";

// Import your custom fonts
import { orbitron, dancingScript, myCustomFont } from '../fonts/fonts.js';

// Export metadata (this is allowed now)
export const metadata = {
  title: "Pranav Mehrotra",
  description: "Personal Portfolio",
};

export default function RootLayout({ children }) {
  return (
    // Add the font variable classes to the <html> tag
    <html 
      lang="en" 
      className={`${orbitron.variable} ${dancingScript.variable} ${myCustomFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}