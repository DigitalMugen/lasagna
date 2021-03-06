module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'lasagna.js',
    path: __dirname + '/dist/es6'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    rules: [
      {test: /.js$/, loader: 'source-map-loader', enforce: 'pre'},
      {test: /.ts$/, loader: 'awesome-typescript-loader'}
    ]
  }
}