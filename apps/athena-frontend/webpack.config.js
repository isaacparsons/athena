const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { NxReactWebpackPlugin } = require('@nx/react/webpack-plugin');
const { join } = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');

const envPath = join(__dirname, '.env');
const env = dotenv.parse(fs.readFileSync(envPath));

const envKeys = Object.entries(env).reduce((acc, [key, value]) => {
  acc[`process.env.${key}`] = JSON.stringify(value);
  return acc;
}, {});

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/athena-frontend'),
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new NxAppWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'babel',
      main: './src/main.tsx',
      index: './src/index.html',
      baseHref: '/',
      assets: [],
      styles: [],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
  ],
};
