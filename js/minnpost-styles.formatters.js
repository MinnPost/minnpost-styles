/**
 * Formatters
 */

(function(global, factory) {
  // Common JS (i.e. browserify) environment
  if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
    factory(require('minnpost-styles'), require('underscore'));
  }
  // AMD?
  else if (typeof define === 'function' && define.amd) {
    define('minnpost-styles.formatters', ['minnpost-styles', 'underscore'], factory);
  }
  // Browser global
  else if (global.MP && global._) {
    factory(global.MP, global._);
  }
  else {
    throw new Error('Could not find dependencies for MinnPost Styles Formatters.' );
  }
})(typeof window !== 'undefined' ? window : this, function(MP, _) {

  // Placeholder for formatters stuff
  MP.formatters = MP.formatters || {};

  // Format number
  MP.formatters.number = function(num, decimals) {
    decimals = (decimals || decimals === 0) ? decimals : 2;
    var rgx = (/(\d+)(\d{3})/);
    split = num.toFixed(decimals).toString().split('.');

    while (rgx.test(split[0])) {
      split[0] = split[0].replace(rgx, '$1' + ',' + '$2');
    }
    return (decimals) ? split[0] + '.' + split[1] : split[0];
  };

  // Format integer
  MP.formatters.integer = function(num, round) {
    round = round || true;
    num = (round) ? Math.round(num) : num;
    return MP.formatters.number(num, 0);
  };

  // Basic US currency
  MP.formatters.currency = function(num) {
    return '$' + MP.formatters.number(num, 2);
  };

  // Percentage
  MP.formatters.percent = function(num, decimals) {
    decimals = (decimals || decimals === 0) ? decimals : 1;
    return MP.formatters.number(num * 100, decimals) + '%';
  };

  // Percent change
  MP.formatters.percentChange = function(num, decimals) {
    return ((num > 0) ? '+' : '') + MP.formatters.percent(num, decimals);
  };

  // Number change
  MP.formatters.change = function(num, decimals) {
    decimals = (decimals || decimals === 0) ? decimals : 2;
    return ((num > 0) ? '+' : '') + MP.formatters.number(num);
  };

  // Converts string into a hash (very basically).
  MP.formatters.hash = function(str) {
    return Math.abs(_.reduce(str.split(''), function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0));
  };

  // Identifier/slug maker
  MP.formatters.identifier = function(str) {
    return str.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-').replace(/[^\w-]+/g,'');
  };

});
