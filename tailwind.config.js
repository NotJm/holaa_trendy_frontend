const { addDynamicIconSelectors } = require("@iconify/tailwind");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        monserrat: ["Monserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        wedgie: ["Wedgie", "sans-serif"],
        josefina: ["Josefina Sans", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        karla: ["Karla", "sans-serif"],
        "play-fair": ["Playfair", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(110%)" },
          "100%": { transform: "translateX(-110%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      maskImage: {
        fade: "linear-gradient(to bottom, black 60%, transparent 100%)",
      },
      colors: {
        "mallow-melon": "#e91e63",
        "cascara": "#f44336"
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
};
