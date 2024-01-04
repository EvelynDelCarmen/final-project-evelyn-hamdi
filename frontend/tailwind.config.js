/** @type {import('tailwindcss').Config} */
export default {
  content:
    ['./src/**/*.html',
      './src/**/*.jsx',
      './src/**/*.js',],
  theme: {
    extend: {
      fontFamily: {
        archivoBlack: ['Archivo Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

