/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Apple Dark Colors
        "apple-black": "#000000",
        "apple-gray-900": "#1d1d1d",
        "apple-gray-800": "#2a2a2a",
        "apple-gray-700": "#3a3a3a",
        "apple-gray-600": "#4a4a4a",
        "apple-gray-500": "#5a5a5a",
        "apple-gray-400": "#8e8e93",
        "apple-gray-300": "#a0a0a0",
        "apple-gray-200": "#d1d1d6",
        "apple-gray-100": "#f5f5f7",
        "apple-white": "#ffffff",
        // Apple Accent Colors
        "apple-blue": "#0071e3",
        "apple-orange": "#ff9500",
        "apple-green": "#30b0c0",
        "apple-red": "#ff3b30",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        safe: "16px",
      },
      borderRadius: {
        apple: "8px",
        "apple-lg": "12px",
        "apple-xl": "16px",
      },
      boxShadow: {
        apple: "0 4px 6px rgba(0, 0, 0, 0.1)",
        "apple-lg": "0 20px 25px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
