const serverless = require('serverless-webpack')
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: serverless.lib.webpack.isLocal ? 'development' : 'production',
  entry: serverless.lib.entries,
  resolve: {
    extensions: ['.ts'],
    plugins: [new tsconfigPathsPlugin({ configFile: './tsconfig.paths.json' })]
  },
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts?)$/,
        loader: 'ts-loader'
      }
    ]
  }
}