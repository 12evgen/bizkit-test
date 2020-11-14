const traverse = require('./utils').traverse;

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    cracoConfig,
    pluginOptions,
    context: { env, paths },
  }) => {
    const allowSourceMaps = webpackConfig.mode == 'development' ? true : false;
    traverse(webpackConfig, (node, key) => {
      if (key === 'loader') {
        if (
          node[key].includes('/css-loader/') ||
          node[key].includes('/postcss-loader/') ||
          node[key].includes('/resolve-url-loader/') ||
          node[key].includes('/sass-loader/')
        ) {
          if (node.options) {
            node.options.sourceMap = allowSourceMaps;
          }
        }
      }
    });
    // console.dir(webpackConfig, { depth: null });
    return webpackConfig;
  },
};
