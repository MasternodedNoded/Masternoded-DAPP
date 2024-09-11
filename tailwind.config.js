/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
      },
      fontFamily: {
        gothamNormal: "Gotham-normal",
        gothamBold: "Gotham-bold",
        gothamMedium: "Gotham-medium",
      },
      colors: {
        cadetgrey: "#6F7277",
        yellowishorange: "#DBA92B",
        yellowishbrown: "#CD9B2D",
        richblack: "#1A1A1A",
        lightgray: "#B2B2B2",
        vermilion: "#D3181F",
        goldenrod: "#F9BB34",
        amber: "#DEAC2B",
        slategray: "#838487",
        silver: "#D9D9D9",
        citronne: "#cc9a2d",
        tawnyolive: "#c7962e",
        heavymetal: "#86888d",
        caviar: "#2b2c2f",
        verifiedblack: "#1e1e1f",
      },
      borderRadius: {
        rounded60: "60px",
        rounded15: "15px",
        rounded10: "10px",
      },
      screens: {
        sm: "639.98px",
        md: "767.98px",
        lg: "1023px",
        xl: "1280px",
        "2xl": "1361px",
        "3xl": "1440px",
        "4xl": "1536px",
      },
    },
  },
  plugins: [],
};
