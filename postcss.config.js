const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./components/**/*.js', './pages/**/*.js'],
    defaultExtractor: (content) =>
      content.match(/[\w-/:]+(?<!:)/g) || [],
  },
]
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-import'),
    require('autoprefixer'),
    // 'postcss-import',
    // 'tailwindcss',
    // 'autoprefixer',
    // ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
  // plugins: {
  //   tailwindcsfs: {},
  //   autoprefixer: {},
  //   ...(process.env.NODE_ENV === 'production'
  //     ? {
  //         '@fullhuman/postcss-purgecss': {
  //           content: ['./components/**/*.js', './pages/**/*.js'],
  //           defaultExtractor: (content) =>
  //             content.match(/[\w-/:]+(?<!:)/g) || [],
  //         },
  //       }
  //     : {}),
  // },
}
