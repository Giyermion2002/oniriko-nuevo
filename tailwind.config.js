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
          50: "#FBF8F4",
          100: "#F5EFE6",
          200: "#EBE2D2",
        },
        espresso: {
          DEFAULT: "#2A1810",
          900: "#1A0E08",
          800: "#2A1810",
          700: "#3A2418",
          600: "#5A3A28",
        },
        sand: {
          DEFAULT: "#C8A882",
          light: "#D9C2A6",
          dark: "#A88A65",
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
