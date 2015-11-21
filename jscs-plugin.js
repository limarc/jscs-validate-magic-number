/**
 * @param {Configuration} conf
 */
module.exports = function(conf) {
    conf.registerRule(require('./src/validate-magic-number'));
};

