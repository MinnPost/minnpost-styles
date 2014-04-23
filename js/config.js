/**
 * Gets config from SASS so that it can be refrenced on the front end.
 */

(function(global, factory) {
  // Common JS (i.e. browserify) environment
  if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
    module.exports = factory(require('underscore'), require('jquery'));
  }
  // AMD
  else if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery'], factory);
  }
  // Browser global
  else if (global._ && global.jQuery.fn.dataTable) {
    global.MP = global.MP || {};
    global.MP.colors = factory(global._, global.jQuery);
  }
  else {
    throw new Error('Could not find dependencies for MinnPost Styles Config.' );
  }
})(typeof window !== 'undefined' ? window : this, function(_, $, dt) {
  // Placeholder for config and other vars
  var config = {};
  var lists;

  // We use the build process to replace this data.  Hacky for sure.
  config = 'REPLACE-CONFIG';

  // Function to help turn a config value into another if it is a reference
  function findReference(value) {
    if (_.isString(value) && value.indexOf('$') === 0 && !_.isUndefined(config[value.substring(1)])) {
      value = config[value.substring(1)];
    }
    return value;
  }

  // Process config
  if (_.isObject(config)) {
    // Process the lists that are meant to be objects
    lists = ['responsive-points', 'colors-data', 'colors-information', 'colors-interface'];
    _.each(lists, function(l, li) {
      var converted = {};

      if (!_.isUndefined(config[l])) {
        _.each(config[l], function(i, ii) {
          converted[i[0]] = findReference(i[1]);
        });

        config[l] = converted;
      }
    });
  }

  return config;

});
