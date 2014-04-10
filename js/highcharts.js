/**
 * Stylings for Highcharts
 */

(function(global, factory) {
  // Common JS (i.e. browserify) environment
  if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
    module.exports = factory(require('jquery'), require('highcharts'));
  }
  // AMD
  else if (typeof define === 'function' && define.amd) {
    define(['jquery', 'highcharts'], factory);
  }
  // Browser global
  else if (global.jQuery && global.Highcharts) {
    global.MP = global.MP || {};
    global.MP.highcharts = factory(global.jQuery, global.Highcharts);
  }
  else {
    throw new Error('Could not find dependencies for MinnPost Styles Highchart.' );
  }
})(typeof window !== 'undefined' ? window : this, function($, Highcharts) {

  // Placeholder for highcharts stuff
  var highcharts = {};

  // A wrapper to make highchart with selector and
  // return the highcharts object
  highcharts.makeChart = function(selector, options) {
    var chart = $(selector).highcharts(options);
    return chart.highcharts();
  };

  // Common colors
  highcharts.colors = {};
  highcharts.colors.interface = '#BCBCBC';

  // Common defauls
  highcharts.defaults = {
    chart: {
      style: {
        fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
        color: highcharts.colors.interface
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
        text: 'Units (un)',
        margin: 15,
        style: {
          color: 'inherit',
          fontWeight: 'normal'
        }
      },
      lineColor: highcharts.colors.interface,
      tickColor: highcharts.colors.interface,
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
        enabled: true,
        text: 'Units (un)',
        margin: 15,
        style: {
          color: 'inherit',
          fontWeight: 'normal'
        }
      },
      min: 0,
      lineColor: highcharts.colors.interface,
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
  highcharts.lineOptions = $.extend(true, {}, highcharts.defaults, {
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
          fillColor: '#FFFFFF',
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
  highcharts.columnOptions = $.extend(true, {}, highcharts.defaults, {
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
  highcharts.barOptions = $.extend(true, {}, highcharts.defaults, {
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

  // Scatter plot
  highcharts.scatterOptions = $.extend(true, {}, highcharts.defaults, {
    chart: {
      type: 'scatter'
    },
    xAxis: {
      title: {
        enabled: true
      }
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          lineWidth: 2,
          lineColor: 'rgba(255, 255, 255, 0.2)',
          hover: {
            lineColor: 'rgba(255, 255, 255, 1)'
          }
        }
      }
    },
    tooltip: {
      formatter: function() {
        return '<strong>' + this.series.name + '</strong>: (' + this.x + ', ' + this.y + ')';
      }
    }
  });

  return highcharts;
});
