/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue,css}'],
  theme: {
    extend: {
      boxShadow: {
        normal: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      },
      scale: {
        102: 1.02,
        98: 0.98
      }
    }
  },
  plugins: []
}
