const mix = require('laravel-mix');
const webpack = require('webpack');

mix.js('src/js/app.js', 'public/js/app.js').
    js('src/js/env.js', 'public/js/env.js').
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
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.JWT_TOKEN': JSON.stringify(process.env.JWT_TOKEN),
    }),
  ],
});
