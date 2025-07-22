// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      perspective: {
        1000: "1000px",
      },
      rotate: {
        6: "6deg",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [],
};
