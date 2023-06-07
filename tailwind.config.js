/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        greenPrimary: '#00bfa5',
        'gray-medium': '#f7f7f7',
        'gray-light': '#f5f5f5',
        'gray-bold': '#ededed'
      },
      backgroundImage: {
        primary: 'linear-gradient(-180deg,#f53d2d,#f63)'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
