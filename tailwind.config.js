
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        screens: {
            xs: "440px",
        },
        colors: {
            "primary-400": "#2664EB",
            "primary-500": "#2460E2",
            "primary-600": "#1F52C0",
            "primary-700": "#19439E",
            "primary-800": "#14357C",
            "contrast-400": "#EBAF26",
            "contrast-500": "#F29C29",
            "contrast-500": "#F29C29",
            "contrast-600": "#C88022",
            "contrast-700": "#C07A1F",
            "contrast-800": "#9E6519",
        },
        fontFamily: {
            roboto: ["Roboto", "sans-serif"],
        },
    },
  },
  plugins: [],
});