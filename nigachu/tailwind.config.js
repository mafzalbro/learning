/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        alternateRotate: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
      },
      animation: {
        alternateRotate: "alternateRotate 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
