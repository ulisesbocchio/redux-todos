const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
    let updatedConfig = injectBabelPlugin('transform-decorators', config);
    updatedConfig = injectBabelPlugin('transform-decorators-legacy', updatedConfig);
    return updatedConfig;
};