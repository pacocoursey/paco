module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './components',
          '@lib': './lib',
          '@styles': './styles',
          '@data': './data'
        }
      }
    ]
  ]
}
