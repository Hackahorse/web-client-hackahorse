const { IgnorePlugin } = require('webpack')

module.exports = {
  devServer: {
    port: 8095,
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    plugins: [
      new IgnorePlugin(/ed25519/),
    ],
  },
}
