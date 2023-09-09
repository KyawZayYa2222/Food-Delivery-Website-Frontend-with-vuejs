/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    theme: {
      extend: {
        boxShadow: ['focus-within'],
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
    ],
  }