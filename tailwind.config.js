// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary": "#FFDA29",
        "secondary": "#33B1C2",
        "accent": "#FF6633",
        "danger": "#F53030",
      },
      fontFamily: {
        zenMaru: ["Zen Maru Gothic"],
        notoSans: ["Noto Sans JP"]
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
