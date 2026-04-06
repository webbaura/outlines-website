import type { Config } from 'tailwindcss';

// In Tailwind v4, colors are defined via @theme in globals.css
// This file is kept for content configuration only
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
};

export default config;
