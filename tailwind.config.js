/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        lightBackground: "#574c3f",
        darkBackground: "#36302a",
        NavLinkBackground: "#b9a590",
        NavLinkText: "#36302a",
        NavLinkHover: "#a59380",
        lightText: "#f6f3ec",
        darkText: "#36302a",
        brand: {
          light: "#3da9fc",
          DEFAULT: "#0077c8",
          dark: "#004a74",
        },
      },
      // Custom Font Sizes
      fontSize: {
        xs: "0.75rem", // Extra small text
        sm: "0.875rem", // Small text
        base: "1rem", // Base size (default)
        lg: "1.125rem", // Large text
        xl: "1.25rem", // Extra large
        "2xl": "1.5rem", // Double extra large
        "3xl": "1.875rem", // Triple extra large
      },

      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
