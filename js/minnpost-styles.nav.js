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
    wrapperClass: 'minnpost-full-container',
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

      // Add wrapper
      if (this.options.wrapperClass) {
        this.$element.wrapInner('<div class="' + this.options.wrapperClass + '"></div>');
      }

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



  // Plugin for scoll spying
  MP.nav.MPScrollSpyDefaults = {
    activeClass: 'active',
    offset: 80,
    throttle: 90
  };
  function MPScrollSpy(element, options) {
    this.element = element;
    this.$element = $(element);
    this._defaults = MP.nav.MPScrollSpyDefaults;
    this.options = $.extend( {}, this._defaults, options);
    this._name = 'mpScollSpy';
    this._scrollEvent = 'scroll.mp.mpScollSpy';
    this.init();
  }
  MPScrollSpy.prototype = {
    init: function() {
      this.$listeners = this.$element.find('[data-spy-on]');
      this.$targets = this.$element.find('[data-spy-me]');

      // Throttle the scoll listen for better perfomance
      this._throttledListen = _.bind(_.throttle(this.listen, this.options.throttle), this);
      this._throttledListen();
      $(window).on(this._scrollEvent, this._throttledListen);

      // Handle click
      this.$listeners.on('click', _.bind(this.gotoClick, this));
    },

    listen: function() {
      var thisPlugin = this;
      var scrollTop = $(window).scrollTop();
      var target;

      // Find target that is closest to scroll top
      this.$targets.each(function() {
        var $target = $(this);
        if ($target.offset().top <= (scrollTop + (thisPlugin.options.offset + 5))) {
          target = $target.data('spyMe');
        }
      });

      if (target) {
        this.$listeners.removeClass(this.options.activeClass);
        this.$element.find('[data-spy-on="' + target + '"]').addClass(this.options.activeClass);
      }
    },

    gotoClick: function(e) {
      e.preventDefault();
      var $listener = $(e.target);

      this.goto($(e.target).data('spyOn'));
    },

    goto: function(target) {
      var $target = this.$element.find('[data-spy-me="' + target + '"]');
      var top = $target.offset().top;

      $('html, body').animate({
        scrollTop: (top - this.options.offset)
      }, 600);
    },

    remove: function() {
      this.$container.off(this._scrollEvent);
    }
  };
  // Register plugin
  $.fn.mpScrollSpy = function(options) {
    return this.each(function() {
      if (!$.data(this, 'mpScrollSpy')) {
        $.data(this, 'mpScrollSpy', new MPScrollSpy(this, options));
      }
    });
  };
});
