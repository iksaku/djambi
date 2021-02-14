module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts}'],

  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      gridTemplateRows: {
        9: 'repeat(9, minmax(0, 1fr))',
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
}
