/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Blueish brand palette
        primary: "#2563eb", // blue-600
        secondary: "#0f172a", // slate-900
        brown: "#DBEAFE", // blue-100 accent
      },
      fontSize: {
        heading01: "2.25rem",
      },
      padding: {
        main: "4rem",
        sidepanel: "16.666667%", // equals w-sidepanel (width)
      },
      width: {
        sidepanel: "16.666667%", // equals m-sidepanel (margin)
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-amber-100",
    "bg-amber-600",
    "bg-sky-100",
    "bg-sky-600",
    "hover:bg-amber-700",
    "hover:bg-sky-700",
  ],
};
