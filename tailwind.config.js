/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gradientColorStops: {
        DEFAULT: {},
        0: {},
        1: {},
        2: {},
        3: {},
        4: {}, // Additional stop
        5: {}, // Additional stop
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        300: "#00117A",
        "dark-blue": "#000030",
        "neon-blue": "#0038FF",
        "light-blue": "#54A2FF",
        "neon-pink": "#FF00E5",
        "neon-violet": "#4717F6",
        "light-violet": "#A283F6",
        "neon-green": "#00FF19",
        blue: "#00117A",
        violet: "#a387ff",
        red: "#FF0065",
      },
      boxShadow: {
        box: "0px 0px 20px 4px #0038FF",
        "box-xs": "0px 0px 7px 2px #0038FF",
      },
      height: {
        "screen-no-header": "calc(100vh -64px)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        blink: {
          "0%": { opacity: "1" },
          "50%": { opacity: "1" },
          "51%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      borderWidth: {
        "05": "0.5px",
      },
      animation: {
        blinking: "blink 1.5s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
