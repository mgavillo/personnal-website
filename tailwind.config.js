/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        300: "#031531",
        "dark-blue": "#030921",
        "neon-blue": "#00FFFF",
        "neon-pink": "#FF00E5",
        "neon-green": "#00FF19",
        "blue": "#0021FF",
        "violet": "#3C0398",
      },
      boxShadow: {
        box: "0px 0px 20px 4px #0038FF",
        "box-xs": "0px 0px 7px 2px #0038FF",
      },
      height:{
        'screen-no-header': 'calc(100vh -64px)',
      }
    },
  },
  plugins: []
}
