/**
 * Stylings for Highcharts
 */

(function(global, factory) {
  // Common JS (i.e. browserify) environment
  if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
    factory(require('MP'), require('jquery'), require('Highcharts'));
  }
  // AMD?
  else if (typeof define === 'function' && define.amd) {
    define('minnpost-styles.highcharts', ['minnpost-styles', 'jquery', 'Highcharts'], factory);
  }
  // Browser global
  else if (global.MP && global.jQuery && global.Highcharts) {
    factory(global.MP, global.jQuery, global.Highcharts);
  }
  else {
    throw new Error('Could not find dependencies for MinnPost Styles Highchart.' );
  }
})(typeof window !== 'undefined' ? window : this, function(MP, $, Highcharts) {

  // Placeholder for highcharts stuff
  MP.highcharts = MP.highcharts || {};

  // A wrapper to make highchart with selector and
  // return the highcharts object
  MP.highcharts.makeChart = function(selector, options) {
    var chart = $(selector).highcharts(options);
    return chart.highcharts();
  };

  // Common colors
  MP.highcharts.colors = {};
  MP.highcharts.colors.interface = '#BCBCBC';

  // Common defauls
  MP.highcharts.defaults = {
    chart: {
      style: {
        fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
        color: MP.highcharts.colors.interface
      }
    },
    colors: ['#094C86', '#0D6CBF', '#098643', '#4C8609'],
    credits: {
      enabled: false
    },
    title: {
      enabled: false,
      text: null
    },
    legend: {
      margin: 20,
      borderWidth: 0,
      itemDistance: 6,
      style: {
        color: 'inherit'
      },
      itemStyle: {
        color: 'inherit'
      }
    },
    xAxis: {
      title: {
        enabled: false,
        text: '[Update me]',
        style: {
          color: 'inherit',
          fontWeight: 'normal'
        }
      },
      minPadding: 0,
      maxPadding: 0,
      lineColor: MP.highcharts.colors.interface,
      tickColor: MP.highcharts.colors.interface,
      labels: {
        y: 18,
        //format: '${value}'
        formatter: function() {
          return this.value;
        }
      }
    },
    yAxis: {
      title: {
        enabled: false,
        text: '[Update me]',
        margin: 40,
        style: {
          color: 'inherit',
          fontWeight: 'normal'
        }
      },
      min: 0,
      lineColor: MP.highcharts.colors.interface,
      gridLineDashStyle: 'ShortDash'
    },
    tooltip: {
      //shadow: false,
      //borderRadius: 0,
      //borderWidth: 0,
      style: {},
      useHTML: true,
      formatter: function() {
        return '<strong>' + this.series.name + '</strong>: ' + this.y;
      }
    }
  };

  // Line charts defaults
  MP.highcharts.lineOptions = $.extend(true, {}, MP.highcharts.defaults, {
    chart: {
      type: 'line'
    },
    plotOptions: {
      line: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          fillColor: '#ffffff',
          lineWidth: 2,
          lineColor: null,
          symbol: 'circle',
          enabled: false,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    }
  });

  // Column charts defaults
  MP.highcharts.columnOptions = $.extend(true, {}, MP.highcharts.defaults, {
    chart: {
      type: 'column'
    },
    plotOptions: {
      column: {
        minPointLength: 3
      }
    }
  });

  // Bar charts defaults
  MP.highcharts.barOptions = $.extend(true, {}, MP.highcharts.defaults, {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        minPointLength: 3
      }
    },
    xAxis: {
      labels: {
        y: 0
      }
    }
  });

});
