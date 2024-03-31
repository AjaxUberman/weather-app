/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pastel-mor": "#7469B6",
        "pastel-sari": "#F5DD61",
        "pastel-turuncu": "#F6995C",
        "pastel-mavi": "#59D5E0",
        "pastel-yesil": "#A4CE95",
        "pastel-pembe": "#FF7ED4",
        "pastel-lila": "#824D74",
        "pastel-bugday": "#FFE3CA",
        "pastel-acik-pembe": "#EEA5A6",
        clouds: "#B4B4B8",
        rainy: "#92C7CF",
        sunny: "#EEC759",
        clear: "#FFF3DA",
        soguk :"#6096B4"
      },
      boxShadow: {
        "neon-pink": "0 10px 20px rgba(240,46,170,0.7)",
        subtle:
          "0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px -7px rgba(0, 0, 0, 0.2)",
        aesthetic: "0 3px 10px rgb(0,0,0,0.2);",
        morcerceve: " 5px 5px 0px 0px rgba(109,40,217);",
      },
      fontFamily: {
        playfairDisplay: ["Playfair Display", "serif"],
        rakkas: ["Rakkas", "serif"],
        roboto: ["Roboto Slab", "sans"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
