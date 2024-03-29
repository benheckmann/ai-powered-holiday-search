import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      // used for flowbite / plain Tailwind CSS components
      // primary: "#16366F",
      // secondary: "#F5BE47",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        check24: {
          primary: "#16366F",
          secondary: "#F5BE47",
          accent: "#486ba8",
          neutral: "#d1d5db",
          "base-100": "#FFFFFF",
          info: "#EEF7FC",
          success: "#DDECDB",
          warning: "#FFE6C8",
          error: "#F8CBCB",
        },
      },
    ],
  },
};
