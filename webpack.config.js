const path = require('path');
const src = path.resolve(__dirname, 'src');
const components = path.resolve(__dirname, 'src', 'components');

module.exports = {
  entry: {
    server: path.resolve(__dirname, 'server', 'index'),
    app: path.resolve(__dirname, 'client', 'index'),
  },
  output: {
    path: path.join(__dirname, 'dist', 'server')
  },
  mode: 'development',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        },
        exclude: '/node_modules/',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', src, components],
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src,
      components
    },
  }
};
