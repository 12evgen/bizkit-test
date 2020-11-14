/* eslint-disable */
const path = require('path');
const fs = require('fs');
const sassSourcemapsPlugin = require('./craco-plugin-sass-sourcemaps');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = ({ env }) => {
  return {
    style: {
      sass: {
        loaderOptions: {
          sassOptions: {
            includePaths: [path.resolve(__dirname, '../src/styles')],
          },
        },
      },
    },
    plugins:[
      { plugin: sassSourcemapsPlugin },
    ],
    webpack: {
      plugins: [],
      configure: (webpackConfig, { env }) => {
        if (env === 'development') {
          webpackConfig.plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'server' }));
        }

        if (env === 'production') {
          webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'disabled', generateStatsFile: true }),
          );
        }

        return webpackConfig;
      },
    },
    "babel": {
      "plugins": [
        [
          "@babel/proposal-decorators",
          {
            "legacy": true
          }
        ],
        [
          "@babel/proposal-class-properties",
          {
            "loose": true
          }
        ]
      ]
    }
  };
};
