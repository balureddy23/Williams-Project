/* eslint-disable */
const {WebpackManifestPlugin} = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://www.westelm.com/",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "" },
        logLevel: "debug",
      },
    },
  },
  chainWebpack: (config) => {
    if (!process.env.SSR) return;
    try {
      config.entry('app').clear().add('./src/main.server.ts');
      // start the next step
      config.target("node");
      config.output.libraryTarget('commonjs2');
      config
          .plugin("manifest")
          .use(new WebpackManifestPlugin());
      config.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));
      config.optimization.splitChunks(false).minimize(false);
      config.plugins.delete("hmr");
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      config.plugins.delete("progress");
      config.plugins.delete("friendly-errors");
      console.log(config.toConfig())
    }catch (e) {
      console.log(e)
    }

  },
};
