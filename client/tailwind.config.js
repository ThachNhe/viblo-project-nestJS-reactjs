const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      textUnderlineOffset: {
        4: "4px",
        8: "8px",
      },
      colors: {
        "post-nav-bar": "#0b1a33",
      },
      fontSize: {
        "post-nav-bar": ".9em",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
});
