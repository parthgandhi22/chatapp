/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ Make sure this is correct
  ],
  theme: {
    extend: {}, 
  },
  plugins: [daisyui],
};
