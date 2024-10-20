/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        lighterBackground: "#fafafa",
        // lighterBackground: "#f6f3ec",
        // lightBackground: "#574c3f",
        lightBackground: "#000000",
        // darkBackground: "#36302a",
        darkBackground: "#000000",
        NavLinkBackground: "#000000",
        // NavLinkBackground: "#b9a590",
        NavLinkText: "#fafafa",
        // NavLinkText: "#36302a",
        // NavLinkHover: "#a59380",
        NavLinkHover: "#dcdcdc",
        lightText: "#fafafa",
        darkText: "#000000",
        // arrow: "#b9a590",
        arrow: "#a2a2a2",
        // arrowHover: "#8b7b6b",
        arrowHover: "#dcdcdc",
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
