/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  purge: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // This searches within the src directory
    "./*.{js,jsx,ts,tsx,html}", // This searches the parent directory for files directly within it
  ],
  theme: {
    borderWidth: {
      DEFAULT: "0.5px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    extend: {},
  },
  plugins: [],
};
