const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', "handlebars", '*.hbs'),
      output: path.join(process.cwd(), 'src', '[name].html'),
      data: path.join(__dirname, 'src/dataset.json'),
      partials: [
        path.join(process.cwd(), 'src', 'handlebars', 'partials', '*.handlebars')
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/media/favicon.ico'),
      publicPath: "auto",
      meta: {
        'charset': {
          'charset': 'utf-8'
        },
        viewport: 'width=device-width, initial-scale=1.0',
        'Content-Type': {
          'http-equiv': 'Content-Type',
          'content': 'text/html; charset=utf-8'
        }
      }
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.hbs'],
    descriptionFiles: ['package.json'],
    mainFiles: ['index'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'public'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
    config.devtool = 'inline-source-map';
    config.devServer = {
      static: path.resolve(__dirname, 'dist'),
      historyApiFallback: true,
      compress: true,
      hot: true,
      open: true,
      host: 'localhost',
    }
  }
  return config;
};
