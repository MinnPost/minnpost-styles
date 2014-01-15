/**
 * The main MinnPost Styles JS.
 */

(function (global) {

  // MP is simply a container for other things
  var MP = {};


  // Export as Common JS module, AMD module, or as global
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MP;
  }
  else if (typeof define === 'function' && define.amd) {
    define('minnpost-styles', function() {
      return MP;
    });
  }
  else {
    global.MP = MP;
  }
})(typeof window !== 'undefined' ? window : this);
