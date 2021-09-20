const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        side: "20px 0px 40px -20px rgb(0, 0, 0, 0.3)",
        'spot-sm': "#6b72804f 0px 0px 5px 0px",
        spot: "#6b72804f 0px 0px 20px 0px",
      },
      colors: {
        cyan: colors.teal,
        orange: colors.orange,
        "cool-gray": colors.coolGray,
        "light-blue": colors.sky,
        teal: colors.teal,
      },
      fontSize: {
        tiny: ".575rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
