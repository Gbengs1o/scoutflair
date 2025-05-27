import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "black-50": "#1B1B1B",
        error: "#FF0000",
        dark: "#222222",
        primary: "#192B4D",
        "primary-2": "#041931",
        "primary-3": "#4BBAC1",
        "primary-4": "#0A2A56",
        secondary: "#F2A725",
        "secondary-3": "#FFA500",
        "pale-green": "#4BBAC1",
        "bright-green": "#08F108",
        "green-80": "rgba(183, 234, 237, 0.8)",
        "secondary-2": "#946108",
        "background-gray": "#F7F7F7",
        "border-gray": "#D5D5D5",
        placeholder: "#555555",
        "black-56": "rgba(0, 0, 0, 0.56)",
        "black-80": "rgba(0, 0, 0, 0.8)",

        "black-92": "rgba(0, 0, 0, 0.92)",
        "border-black": "rgba(0, 0, 0, 0.48)",
        "white-56": "rgba(255, 255, 255, 0.56)",
        "orange-50": "#E5AA42",
        "orange-100": "#DB8E08",
        ghostwhite: "#f8f8ff",
        "card-1": "#0E6868",
        "card-2": "#680E58",
        "card-3": "#53680E",
        "card-4": "#037D11",
      },
      fontFamily: {
        merriweather: ["var(--font-merriweather)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      screens: {
        xs: "120px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      boxShadow: {
        custom: "0 0 10px rgba(0, 0, 0, 0.1)",
        "custom-1": "0 0 20px rgba(0, 0, 0, 0.2)",
        "custom-2": "0px 8px 10px 0 rgba(209,209,209,0.12)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(135 135 135) rgb(247 247 247)",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(247 247 247)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(135 135 135)",
            borderRadius: "4px",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover", "focus"]);
    },
  ],
};
export default config;
