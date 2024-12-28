import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
    './pages/**/*.{html,js,tsx,jsx,ts}',
    './components/**/*.{html,js,tsx,jsx,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    daisyui,
  ],
}