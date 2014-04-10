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
  baseUrl: 'dist',
  paths: {
    'underscore': '../bower_components/underscore/underscore-min',
    'jquery': '../bower_components/jquery/jquery.min',
    'highcharts': '../bower_components/highcharts/highcharts',
    'leaflet': '../bower_components/leaflet/dist/leaflet',
    'datatables': '../bower_components/datatables/media/js/jquery.dataTables',
    'hcharts': 'minnpost-styles.highcharts.min',
    'maps': 'minnpost-styles.maps.min',
    'nav': 'minnpost-styles.nav.min',
    'dtables': 'minnpost-styles.datatables.min',
    'formatters': 'minnpost-styles.formatters.min'
  }
});

require([
  'underscore', 'jquery', 'leaflet',
  'hcharts', 'maps', 'nav', 'dtables', 'formatters'
], function(_, $, L, hcharts, maps, nav, dtables, formatters) {

  // When document is ready
  $(document).ready(function() {
    makeHighcharts();
    makeMaps();
    makeNavs();
    makeDatatables();
  });


  // Highcharts
  function makeHighcharts() {
    var exampleData = [{
      name: 'Example',
      data: [ 6 , 11, 32, 110, 235, 369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605, 24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
    }];

    // Line chart
    hcharts.makeChart('.chart-line-example', $.extend(true, {}, hcharts.lineOptions, {
      series: exampleData
    }));

    // Column chart
    hcharts.makeChart('.chart-column-example', $.extend(true, {}, hcharts.columnOptions, {
      series: exampleData
    }));

    // Bar chart
    hcharts.makeChart('.chart-bar-example', $.extend(true, {}, hcharts.barOptions, {
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

    // Scatterplot
    hcharts.makeChart('.chart-scatter-example', $.extend(true, {}, hcharts.scatterOptions, {
      series: [{
        name: 'Example',
        data: [[11, 23], [12, 22], [13, 28], [14, 30], [14.01, 30], [15, 30], [16, 33],
          [11.2, 22], [12.7, 21], [13.2, 27], [14.1, 34], [15.8, 33], [16.3, 30]]
      },
      {
        name: 'Example 2',
        data: [[11, 13], [12, 10], [13, 9], [14, 6], [15, 8], [16, 7]]
      }]
    }));
  }



  // Maps
  function makeMaps() {
    // Basic maps with layer choices
    var basicMapLayer = new L.tileLayer('//{s}.tiles.mapbox.com/v3/' + maps.mapboxStreetsLightLabels + '/{z}/{x}/{y}.png');
    var basicMap = new L.Map('example-leaflet-map', maps.mapOptions);
    basicMap.addLayer(basicMapLayer);
    basicMap.setView(maps.minneapolisPoint, 8);
    basicMap.removeControl(basicMap.attributionControl);

    $('.map-baselayer-choices .button').on('click', function(e) {
      e.preventDefault();
      var $link = $(this);
      var $links = $link.parent().find('.button');
      var layer = maps[$link.data('map')];

      $links.removeClass('active');
      $link.addClass('active');
      basicMap.removeLayer(basicMapLayer);
      basicMapLayer = new L.tileLayer('//{s}.tiles.mapbox.com/v3/' + layer + '/{z}/{x}/{y}.png');
      basicMap.addLayer(basicMapLayer);
    });

    // Marker map
    var markerMap = maps.makeLeafletMap('example-markers-features-map');
    var tooltipControl = new maps.TooltipControl();
    markerMap.setZoom(9);
    markerMap.addControl(tooltipControl);

    // Markers
    var iconCinema = maps.makeMakiIcon('cinema', 'm');
    var iconBlank = maps.makeMakiIcon('', 's', '222222');
    L.marker(maps.minneapolisPoint, { icon: iconCinema })
      .addTo(markerMap).bindPopup('Minneapolis', {
        closeButton: false
      });
    L.marker(maps.stPaulPoint, { icon: iconBlank })
      .addTo(markerMap).bindPopup('St. Paul', {
        closeButton: false
      });

    // GeoJSON example
    $.getJSON('http://boundaries.minnpost.com/1.0/boundary/27-county-2010/?callback=?', function(data) {
      if (data.simple_shape) {
        L.geoJson(data.simple_shape, {
          style: maps.mapStyle,
          onEachFeature: function(feature, layer) {
            layer.on('mouseover', function(e) {
              tooltipControl.update('Hennepin County');
            });
            layer.on('mouseout', function(e) {
              tooltipControl.hide();
            });
          }
        }).addTo(markerMap);
      }
    });

    // Attribution
    $('.map-attribution').html(maps.mapboxAttribution + ' ' + maps.openstreetmapAttribution);
  }



  // Navigations
  function makeNavs() {
    // Scoll spy it all
    $('body').mpScrollSpy();

    // Sticky horizontal
    $('.example-stick-top').mpStick();

    // Vertical stick
    $('.example-stick-container').mpStick({
      activeClass: 'stuck container',
      wrapperClass: '',
      container: $('.example-stick-container').parent().parent(),
      topPadding: 20,
      throttle: 100
    });
  }



  // Datatables
  function makeDatatables() {
    var sampleCSVData = [];
    var tableColumns = {};
    var options = {};
    var i;
    var row;
    var $dataTable;

    // Make some data
    for (i = 0; i < 55; i++) {
      row = [];
      row.push(_.sample(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']));
      row.push(_.random(1, 12) + '/' + _.random(1, 28) + '/' + _.random(1975, 2014));
      row.push((_.random(1000, 10000) / 100).toString());
      row.push(_.random(10000, 100000).toString());
      row.push(_.sample(['lastA', 'lastB', 'lastC', 'lastD', 'lastE', 'lastF', 'lastG', 'lastH', 'lastI', 'lastJ', 'lastK']));
      row.push(_.sample(['firstA', 'firstB', 'firstC', 'firstD', 'firstE', 'firstF', 'firstG', 'firstH', 'firstI', 'firstJ', 'firstK']));
      sampleCSVData.push(row);
    }

    // Define specific about how the columns work.
    tableColumns = $.extend(true, {}, {
      0: { sTitle: 'Thing' },
      1: { sTitle: 'Date' },
      // Makes it so that the last name column sorts on
      // both last and first name
      4: {
        sTitle: 'Last',
        aDataSort: [4, 5]
      },
      5: {
        sTitle: 'First',
        bSortable: false
      },
      3: {
        sTitle: 'Number',
        bSearchable: false,
        mRender: function(data, type, full) {
          return formatters.integer(parseFloat(data));
        }
      },
      2: {
        sTitle: 'Money',
        sClass: 'money',
        bSearchable: false,
        mRender: function(data, type, full) {
          return formatters.currency(parseFloat(data));
        }
      }
    });
    options = $.extend(true, {}, {
      aaData: sampleCSVData,
      aoColumns: _.values(tableColumns)
    }, options);

    dtables.makeTable($('.datatable-example'), options);
  }
});
