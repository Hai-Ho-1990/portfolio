/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
    },
  },

  safelist: [
    // Dynamic utility classes
    { pattern: /^text-/ },
    { pattern: /^font-/ },
    { pattern: /^bg-/ },
    { pattern: /^from-/ },
    { pattern: /^to-/ },
    { pattern: /^p-/ },
    { pattern: /^max-w-/ },
    { pattern: /^mx-/ },
    { pattern: /^container$/ },

    // Specific utilities
    'text-3xl',
    'font-bold',

    // 🔥 REQUIRED for GradientText
    'animate-gradient',
  ],

  plugins: [],
};
