import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    { pattern: /^(bg|text|border|rounded|w|h|p|m|gap|grid|flex|absolute|relative|fixed|inset|top|left|right|bottom|overflow|pointer-events|z)-/ }
  ]
};
export default config;
