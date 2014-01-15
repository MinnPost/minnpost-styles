/**
 * Stylings for Highcharts
 */

(function(global, factory) {
  // Common JS (i.e. browserify) environment
  if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
    factory(require('minnpost-styles'), require('jquery'), require('underscore'));
  }
  // AMD?
  else if (typeof define === 'function' && define.amd) {
    define('minnpost-styles.nav', ['minnpost-styles', 'jquery', 'underscore'], factory);
  }
  // Browser global
  else if (global.MP && global.jQuery && global._) {
    factory(global.MP, global.jQuery, global._);
  }
  else {
    throw new Error('Could not find dependencies for MinnPost Styles Maps.' );
  }
})(typeof window !== 'undefined' ? window : this, function(MP, $, _) {

  // Wrapper object for some various things
  MP.nav = MP.nav || {};

  // Plugin for horizontal sticky menu
  MP.nav.MPHorizontalStickDefaults = {
    activeClass: 'stuck',
    throttle: 90
  };
  function MPHorizontalStick(element, options) {
    this.element = element;
    this.$element = $(element);
    this._defaults = MP.nav.MPHorizontalStickDefaults;
    this.options = $.extend( {}, this._defaults, options);
    this._name = 'mpHStick';
    this._scrollEvent = 'scroll.mp.mpHStick';
    this._on = false;
    this.init();
  }
  MPHorizontalStick.prototype = {
    init: function() {
      // If contaier not passed, use parent
      this.$container = (this.options.container === undefined) ? this.$element.parent() : $(this.options.container);

      // Create a spacer element so content doesn't jump
      this.$spacer = $('<div>').height(this.$element.height()).hide();
      this.$element.after(this.$spacer);

      // Throttle the scoll listen for better perfomance
      this._throttledListen = _.bind(_.throttle(this.listen, this.options.throttle), this);
      this._throttledListen();
      $(window).on(this._scrollEvent, this._throttledListen);
    },

    listen: function() {
      var containerTop = this.$container.offset().top;
      var containerBottom = containerTop + this.$container.height();
      var scrollTop = $(window).scrollTop();

      if (!this._on && scrollTop > containerTop && scrollTop < containerBottom) {
        this.on();
      }
      else if (this._on && (scrollTop < containerTop || scrollTop > containerBottom)) {
        this.off();
      }
    },

    on: function() {
      this.$element.addClass(this.options.activeClass);
      this.$spacer.show();
      this._on = true;
    },

    off: function() {
      this.$element.removeClass(this.options.activeClass);
      this.$spacer.hide();
      this._on = false;
    },

    remove: function() {
      this.$container.off(this._scrollEvent);
    }
  };
  // Register plugin
  $.fn.mpHStick = function(options) {
    return this.each(function() {
      if (!$.data(this, 'mpHStick')) {
        $.data(this, 'mpHStick', new MPHorizontalStick(this, options));
      }
    });
  };
});
