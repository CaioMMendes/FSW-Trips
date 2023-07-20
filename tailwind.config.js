/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'walterWhite': "#f5f5f5"
      },

      backgroundImage: {
        'search-background': 'url(/world-map.png)',

      },
      fill: {
        whiteTransparent: 'rgba(255, 255, 255, 0.5)',
      },
      colors: {
        whiteTransparent: 'rgba(255, 255, 255, 0.5)',
        primary: '#590bd8',
        primaryLighter: '#DDD5EA',
        primaryMiddle: '#c5b2e1',
        primaryDarker: '#312a4f',
        secondaryGray: '#717171',
        grayLight: '#9ca3af',
      },
      textColor: {
        dark: '#717171',

      }
    },
  },
  plugins: [],
}