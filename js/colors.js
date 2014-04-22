/**
 * Stylings for Colors
 */

(function(global, factory) {
  // Common JS (i.e. browserify) environment
  if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
    module.exports = factory(require('underscore'), require('jquery'), require('datatables'));
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
    throw new Error('Could not find dependencies for MinnPost Styles Colors.' );
  }
})(typeof window !== 'undefined' ? window : this, function(_, $, dt) {

  // Placeholder for datatables stuff
  var colors = {};

  // Interface colors.  Unfortunately, these are maintained in
  // styles/_variables.scss as well.
  colors.interface = {
    'dark-gray': '#282828',
    'medium-gray': '#404040',
    'gray': '#7A7A7A',
    'light-gray': '#ABABAB',
    'lighter-gray': '#CCCCCC',
    'lightest-gray': '#F8F8F8',
    'minnpost-red': '#801019',
    'blue': '#0084A8',
    'red': '#C83D2D',
    'green': '#469B61',
    'orange': '#FF6633',
    'yellow': '#FBD341'
  };
  // Data colors
  colors.data = {
    'green1': '#1D8C47',
    'green2': '#32955D',
    'green3': '#36A174',
    'purple': '#55307E',
    'blue1': '#0D57A0',
    'blue2': '#0793AB',
    'blue3': '#55CBDD',
    'red': '#C83D2D',
    'orange': '#FF6633',
    'yellow': '#FBD341'
  };

  return colors;

});
