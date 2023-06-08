/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "basic": "radial-gradient(circle, rgba(255,35,35,1) 0%, rgba(28,16,16,1) 100%);",
      },
      backgroundColor: {
        "def-block": "rgba(83,79,79,0.7063200280112045)"
      }
    },
  },
  plugins: [],
}

