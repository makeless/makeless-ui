const mix = require('laravel-mix');
const webpack = require('webpack');

mix.js('src/app.js', 'public/app.js').
    copy('src/index.html', 'public/index.html');

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          {
            use: ['raw-loader', 'pug-plain-loader'],
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.JWT_TOKEN': JSON.stringify(process.env.JWT_TOKEN),
    }),
  ],
});
