const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Source Sans Pro'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        secondary: '#IE91D6',
        dark: '#333333',
        light: '#FAFAFA',
      },
    },
  },
  variants: {},
  plugins: [],
};
