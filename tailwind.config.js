/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFDFB",
          100: "#F7F5F0",
          200: "#EBE6D8",
        },
        espresso: {
          DEFAULT: "#1A0E08",
          900: "#0D0604",
          800: "#1A0E08",
          700: "#2A1810",
          600: "#4A2D22",
        },
        sand: {
          DEFAULT: "#B8966A",
          light: "#CFC0B0",
          dark: "#8C724D",
        },
        sage: {
          DEFAULT: "#7C8C6E",
          dark: "#5C6A50",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-up": "fadeUp 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
