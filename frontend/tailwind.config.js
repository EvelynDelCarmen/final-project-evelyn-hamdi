/** @type {import('tailwindcss').Config} */
export default {
  content:
    ['./src/**/*.html',
      './src/**/*.jsx',
      './src/**/*.js',],
  theme: {
    extend: {
      colors: {
        customBlue: '#0D00FF', // Replace with your desired color
      },
      fontFamily: {
        'plex-mono': ['IBM Plex Mono', 'monospace'],
        'rubik-mono-one': ['Rubik Mono One', 'sans-serif']
      },
    },
  },
  plugins: [],
}

