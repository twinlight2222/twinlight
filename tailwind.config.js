/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "hover:shadow-[0_0_60px_30px_#ffffff]", 
  ],
  theme: {
    extend: {
      fontFamily: {
        klee: ['"Klee One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
