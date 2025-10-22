module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    { pattern: /^text-/ },
    { pattern: /^font-/ },
    { pattern: /^bg-/ },
    { pattern: /^from-/ },
    { pattern: /^to-/ },
    { pattern: /^p-/ },
    { pattern: /^max-w-/ },
    { pattern: /^mx-/ },
    { pattern: /^container$/ },
    // Ensure these specific utilities are always present
    'text-3xl',
    'font-bold',
  ],
  plugins: [],
};
