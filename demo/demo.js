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
    'Highcharts': '../bower_components/highcharts/highcharts',
    'Leaflet': '../bower_components/leaflet/dist/leaflet',
    'minnpost-styles': 'minnpost-styles.all.min',
    'minnpost-styles.highcharts': 'minnpost-styles.all.min',
    'minnpost-styles.maps': 'minnpost-styles.all.min',
    'minnpost-styles.nav': 'minnpost-styles.all.min',
  }
});

require(['underscore', 'jquery', 'Leaflet', 'minnpost-styles', 'minnpost-styles.highcharts', 'minnpost-styles.maps', 'minnpost-styles.nav'], function(_, $, L, MP) {

  // When document is ready
  $(document).ready(function() {
    highcharts();
    maps();
    navs();
  });


  // Highcharts
  function highcharts() {
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

    // Scatterplot
    MP.highcharts.makeChart('.chart-scatter-example', $.extend(true, {}, MP.highcharts.scatterOptions, {
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
  function maps() {
    // Basic maps with layer choices
    var basicMapLayer = new L.tileLayer('//{s}.tiles.mapbox.com/v3/' + MP.maps.mapboxStreetsLightLabels + '/{z}/{x}/{y}.png');
    var basicMap = new L.Map('example-leaflet-map', MP.maps.mapOptions);
    basicMap.addLayer(basicMapLayer);
    basicMap.setView(MP.maps.minneapolisPoint, 8);
    basicMap.removeControl(basicMap.attributionControl);

    $('.map-baselayer-choices .button').on('click', function(e) {
      e.preventDefault();
      var $link = $(this);
      var $links = $link.parent().find('.button');
      var layer = MP.maps[$link.data('map')];

      $links.removeClass('active');
      $link.addClass('active');
      basicMap.removeLayer(basicMapLayer);
      basicMapLayer = new L.tileLayer('//{s}.tiles.mapbox.com/v3/' + layer + '/{z}/{x}/{y}.png');
      basicMap.addLayer(basicMapLayer);
    });

    // Marker map
    var markerMap = MP.maps.makeLeafletMap('example-markers-features-map');
    var tooltipControl = new MP.maps.TooltipControl();
    markerMap.setZoom(9);
    markerMap.addControl(tooltipControl);

    // Markers
    var iconCinema = MP.maps.makeMakiIcon('cinema', 'm');
    var iconBlank = MP.maps.makeMakiIcon('', 's', '222222');
    L.marker(MP.maps.minneapolisPoint, { icon: iconCinema })
      .addTo(markerMap).bindPopup('Minneapolis', {
        closeButton: false
      });
    L.marker(MP.maps.stPaulPoint, { icon: iconBlank })
      .addTo(markerMap).bindPopup('St. Paul', {
        closeButton: false
      });

    // GeoJSON example
    $.getJSON('http://boundaries.minnpost.com/1.0/boundary/27-county-2010/?callback=?', function(data) {
      if (data.simple_shape) {
        L.geoJson(data.simple_shape, {
          style: MP.maps.mapStyle,
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
    $('.map-attribution').html(MP.maps.mapboxAttribution + ' ' + MP.maps.openstreetmapAttribution);
  }



  // Navigations
  function navs() {
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
});
