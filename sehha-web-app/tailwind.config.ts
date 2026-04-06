import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1E3E",
        surface1: "#101F38",
        surface2: "#152843",
        accent: "#00D4FF",
        critical: "#EF4444",
        warning: "#F97316",
        ok: "#22C55E",
        textprimary: "#E8F4FD",
        textmuted: "#7A9CBD"
      },
      fontFamily: {
        sans: ['var(--font-dmsans)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
      },
      animation: {
        'floatA': 'floatA 5s ease-in-out infinite',
        'floatB': 'floatB 6s ease-in-out infinite',
        'floatC': 'floatC 7s ease-in-out infinite',
        'rotateDash': 'rotateDash 30s linear infinite',
        'pulseDot': 'pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        floatA: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatB: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatC: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        rotateDash: {
           from: { transform: 'rotate(0deg)' },
           to: { transform: 'rotate(360deg)' }
        },
        pulseDot: {
           '0%, 100%': { opacity: '1', transform: 'scale(1)' },
           '50%': { opacity: '0.5', transform: 'scale(1.2)' }
        }
      }
    },
  },
  plugins: [],
};
export default config;
