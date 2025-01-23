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
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        circle: 'circle 4s linear infinite',
        fadeIn: 'fade 1s ease-in-out'
      },
      boxShadow: {
        'card': '0px 0px 16px 0px rgba(171, 171, 171, 0.25)',
        'button': '0 0 4px 2px rgba(171, 171, 171, 0.25)'
      },
      screens: {
        'xs': '320px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
