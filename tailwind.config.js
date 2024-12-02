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
      keyframes: {
        circle: {
          '0%': { transform: 'translate(50px, 0)' },
          '25%': { transform: 'translate(0, 50px)' },
          '50%': { transform: 'translate(-50px, 0)' },
          '75%': { transform: 'translate(0, -50px)' },
          '100%': { transform: 'translate(50px, 0)' },
        },
      },
      animation: {
        circle: 'circle 4s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
