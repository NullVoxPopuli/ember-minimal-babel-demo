'use strict';

const { buildEmberPlugins } = require('ember-cli-babel');

module.exports = function (api) {
  api.cache(true);

  let targets = require('./config/targets');


  let fromEmberCliBabel = buildEmberPlugins(__dirname, {})
      .filter(plugin => {
        if (Array.isArray(plugin)) {
          let [name, config] = plugin;

          if (name === '@babel/plugin-proposal-class-properties') return false;
          if (name.includes('babel-plugin-module-resolver')) return false;
          if (name.includes('babel-plugin')) return false;
          if (name.includes('plugin-transform')) return false;
        }

        return true;
      });

  console.log(targets, fromEmberCliBabel);

  return {
    presets: [
      [require.resolve('@babel/preset-env')],
    ],
    plugins: [
      ...fromEmberCliBabel
    ],
  };
};
