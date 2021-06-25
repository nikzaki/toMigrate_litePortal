import HardSourceWebpackPlugin from "hard-source-webpack-plugin";

export default class ProjectWebpack {
  apply(webpackHandler) {


    /**
     * Adding hard source webpack plugin
     */
    webpackHandler.hooks.beforeConfig.tap("AddHardSourceWebpackPlugin", (env, type, config) => {
      try {
        let allConfigs = config;

        if (!Array.isArray(allConfigs)) {
          allConfigs = [config];
        }
        allConfigs.forEach(config => {
          // Check if the config already have the plugin added
          const alreadyHasPlugin = config.plugins.some(plugin => plugin instanceof HardSourceWebpackPlugin);

          // if so, do not add it again
          if (alreadyHasPlugin) return;

          // else add the Plugin
          config.plugins.push(new HardSourceWebpackPlugin(/** options= {} **/));


          const alreadyHasExcludePlugin = config.plugins.some(plugin => plugin instanceof HardSourceWebpackPlugin.ExcludeModulePlugin);
          if (alreadyHasExcludePlugin) return;

          config.plugins.push(new HardSourceWebpackPlugin.ExcludeModulePlugin([
            {
              // HardSource works with mini-css-extract-plugin but due to how
              // mini-css emits assets, assets are not emitted on repeated builds with
              // mini-css and hard-source together. Ignoring the mini-css loader
              // modules, but not the other css loader modules, excludes the modules
              // that mini-css needs rebuilt to output assets every time.
              test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
            }
          ]));
        });
      }catch (ex) {
        //eslint-disable-next-line
        console.log(ex);
      }
    });
  }
}
