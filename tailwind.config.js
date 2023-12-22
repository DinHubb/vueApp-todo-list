/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#1A1A1A',
        'header-color': '#0D0D0D',
        'input-color': '#262626'
      },
      borderRadius: {
        'max-br': '50%'
      },
      inset: {
        50: '50%'
      },
      maxHeight: {
        '424-h': '420px'
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwind-scrollbar')]
}
