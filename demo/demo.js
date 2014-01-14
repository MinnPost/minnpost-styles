/**
 * JS specific to demo page.
 */

require.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'Highcharts': {
      exports: 'Highcharts',
      'deps': ['jquery']
    }
  },
  baseUrl: 'js',
  paths: {
    'underscore': '../bower_components/underscore/underscore-min',
    'jquery': '../bower_components/jquery/jquery.min',
    'Highcharts': '../bower_components/highcharts/highcharts'
  }
});

require(['underscore', 'minnpost-styles', 'minnpost-styles.highcharts'], function(_, MP) {

  // Highcharts
  var exampleData = [{
    name: 'Example',
    data: [ 6 , 11, 32, 110, 235, 369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605, 24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
  }];

  // Line chart
  MP.highcharts.makeChart('.chart-line-example', $.extend(true, {}, MP.highcharts.lineOptions, {
    series: exampleData
  }));

  // Column chart
  MP.highcharts.makeChart('.chart-column-example', $.extend(true, {}, MP.highcharts.columnOptions, {
    series: exampleData
  }));

  // Bar chart
  MP.highcharts.makeChart('.chart-bar-example', $.extend(true, {}, MP.highcharts.barOptions, {
    xAxis: {
      categories: ['A', 'B', 'C', 'D']
    },
    series: [{
      name: 'Example',
      data: [24826, 12144, 27342, 24401]
    },
    {
      name: 'Example 2',
      data: [640, 765, 999, 123]
    }]
  }));
});