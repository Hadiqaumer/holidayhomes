import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#06323a", deep: "#0b4f5c", teal: "#0e9aa7", em: "#10b981", mint: "#d9f7ee", mist: "#f1fbf9", mut: "#4d6f75" },
      fontFamily: { head: ["var(--font-head)", "system-ui", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
      backgroundImage: {
        grad: "linear-gradient(135deg,#0e9aa7,#10b981)",
        deepg: "linear-gradient(135deg,#06323a,#0b6b73 60%,#0e9aa7)",
        soft: "linear-gradient(160deg,#fff,#e3f8f4 65%,#dbf7e8)",
      },
      keyframes: { float: { "50%": { transform: "translateY(-14px)" } } },
      animation: { float: "float 6s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
