/**
 * JS specific to demo page.
 */

require.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'highcharts': {
      exports: 'Highcharts',
      deps: ['jquery']
    }
  },
  paths: {
    'underscore': '../bower_components/underscore/underscore',
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'highcharts': '../bower_components/highcharts/highcharts',
    'leaflet': '../bower_components/leaflet/dist/leaflet',
    'datatables': '../bower_components/datatables/media/js/jquery.dataTables',
    'chroma': '../bower_components/chroma-js/chroma.min',
    'storymap-orig': '../bower_components/StoryMapJS/build/js/storymap',
    'storymap': '../demo/storymap-shim',
    'mpHighcharts': '../dist/minnpost-styles.highcharts.min',
    'mpMaps': '../dist/minnpost-styles.maps.min',
    'mpNav': '../dist/minnpost-styles.nav.min',
    'mpDatatables': '../dist/minnpost-styles.datatables.min',
    'mpFormatters': '../dist/minnpost-styles.formatters.min',
    'mpStorymaps': '../dist/minnpost-styles.storymaps.min',
    'mpConfig': '../dist/minnpost-styles.config.min'
  }
});

require([
  'underscore', 'jquery', 'leaflet', 'datatables', 'chroma', 'storymap',
  'mpHighcharts', 'mpMaps', 'mpNav', 'mpDatatables', 'mpFormatters',
  'mpStorymaps', 'mpConfig'
], function(_, $, L, dt, chroma, storymap, mpHighcharts, mpMaps, mpNav, mpDatatables, mpFormatters, mpStorymaps, mpConfig) {

  // When document is ready
  $(document).ready(function() {
    makeHighcharts();
    makeMaps();
    makeNavs();
    makeDatatables();
    makeColors();
    makeStoryMap();
  });


  // Highcharts
  function makeHighcharts() {
    var exampleData = [{
      name: 'Example',
      data: [ 6 , 11, 32, 110, 235, 369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605, 24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
    }];

    // Make sure that charts are there
    if ($('.chart-line-example, .chart-bar-example, .chart-scatter-example').length !== 3) {
      return;
    }

    // Line chart
    mpHighcharts.makeChart('.chart-line-example', $.extend(true, {}, mpHighcharts.lineOptions, {
      colors: _.sample(_.values(mpConfig['colors-data']), 3),
      series: exampleData,
      legend: { enabled: false },
      yAxis: {
        title: { enabled: false },
        labels: { format: '${value:,.0f}' }
      }
    }));

    // Column chart
    mpHighcharts.makeChart('.chart-column-example', $.extend(true, {}, mpHighcharts.columnOptions, {
      colors: _.sample(_.values(mpConfig['colors-data']), 3),
      series: exampleData,
      legend: { enabled: false }
    }));

    // Bar chart
    mpHighcharts.makeChart('.chart-bar-example', $.extend(true, {}, mpHighcharts.barOptions, {
      colors: _.sample(_.values(mpConfig['colors-data']), 3),
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
    mpHighcharts.makeChart('.chart-scatter-example', $.extend(true, {}, mpHighcharts.scatterOptions, {
      colors: _.sample(_.values(mpConfig['colors-data']), 3),
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
    // Make sure container is there
    if ($('#example-leaflet-map, #example-markers-features-map').length !== 2) {
      return;
    }

    // Basic maps with layer choices
    var basicMapLayer = new L.tileLayer('//{s}.tiles.mapbox.com/v3/' + mpMaps.mapboxStreetsLightLabels + '/{z}/{x}/{y}.png');
    var basicMap = new L.Map('example-leaflet-map', mpMaps.mapOptions);
    basicMap.addLayer(basicMapLayer);
    basicMap.setView(mpMaps.minneapolisPoint, 8);
    basicMap.removeControl(basicMap.attributionControl);

    $('.map-baselayer-choices .button').on('click', function(e) {
      e.preventDefault();
      var $link = $(this);
      var $links = $link.parent().find('.button');
      var layer = mpMaps[$link.data('map')];

      $links.removeClass('active');
      $link.addClass('active');
      basicMap.removeLayer(basicMapLayer);
      basicMapLayer = new L.tileLayer('//{s}.tiles.mapbox.com/v3/' + layer + '/{z}/{x}/{y}.png');
      basicMap.addLayer(basicMapLayer);
    });

    // Marker map
    var markerMap = mpMaps.makeLeafletMap('example-markers-features-map');
    var tooltipControl = new mpMaps.TooltipControl();
    markerMap.setZoom(9);
    markerMap.addControl(tooltipControl);

    // Markers
    var iconCinema = mpMaps.makeMakiIcon('cinema', 'm');
    var iconBlank = mpMaps.makeMakiIcon('', 's', '222222');
    L.marker(mpMaps.minneapolisPoint, { icon: iconCinema })
      .addTo(markerMap).bindPopup('Minneapolis', {
        closeButton: false
      });
    L.marker(mpMaps.stPaulPoint, { icon: iconBlank })
      .addTo(markerMap).bindPopup('St. Paul', {
        closeButton: false
      });

    // GeoJSON example
    $.getJSON('https://boundaries.minnpost.com/1.0/boundary/27-county-2010/?callback=?', function(data) {
      if (data.simple_shape) {
        L.geoJson(data.simple_shape, {
          style: mpMaps.mapStyle,
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
    $('.map-attribution').html(mpMaps.mapboxAttribution + ' ' + mpMaps.openstreetmapAttribution);
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

    // Make sure container is there
    if ($('.datatable-example').length !== 1) {
      return;
    }

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
          return mpFormatters.integer(parseFloat(data));
        }
      },
      2: {
        sTitle: 'Money',
        sClass: 'money',
        bSearchable: false,
        mRender: function(data, type, full) {
          return mpFormatters.currency(parseFloat(data));
        }
      }
    });
    options = $.extend(true, {}, {
      aaData: sampleCSVData,
      aoColumns: _.values(tableColumns)
    }, options);

    mpDatatables.makeTable($('.datatable-example'), options);
  }



  // Make color swatches
  function makeColors() {
    // Ensure container is there
    if ($('#template-color-swatch, #template-color-group').length !== 2) {
      return;
    }

    var swatchTemplate = _.template($('#template-color-swatch').html());
    var groupTemplate = _.template($('#template-color-group').html());

    // Order by hue
    var ordered = _.sortBy(mpConfig['colors-data'], function(c, ci) {
      return chroma(c).lch()[2];
    });
    var opposite = _.sample(ordered, ordered.length);

    // Manual color combos
    var divergingColors = [
      ['blue3', 'orange'],
      ['green1', 'orange'],
      ['blue1', 'yellow']
    ];

    // Add color swatches
    $('.interface-colors-placeholder').html(swatchTemplate({
      colors: mpConfig['colors-interface'],
      type: ''
    }));
    $('.political-colors-placeholder').html(swatchTemplate({
      colors: mpConfig['colors-political'],
      type: 'political',
      titles: mpConfig.politicalParties
    }));
    $('.data-colors-placeholder').html(swatchTemplate({
      colors: mpConfig['colors-data'],
      type: 'data'
    }));

    // Color examples
    function makeColorExamples() {
      var space = $('.color-example-space.active').data('colorSpace');
      var count = parseInt($('#color-example-count').val(), 10);
      var base = 'white';
      var minimum = 6;
      var interpolate = count - minimum;
      var sequentials, diverging;
      space = space || 'lab';

      // Make sequentials
      sequentials = _.map(ordered, function(c, ci) {
        var segment = (count < minimum) ? count : minimum;
        var scale = chroma.scale([base, c]).mode(space).correctLightness(true).domain([0, 1], segment).colors();
        var interoplated;

        // The data colors we use are not far enough along the scale to be
        // good at high number of intervals, so we interpolate further out
        // from our base color.
        if (interpolate > 0) {
          interpolated = chroma.interpolate(base, c, 1 + (interpolate / minimum), space).hex();
          scale = _.union(scale, chroma.scale([c, interpolated]).mode(space).correctLightness(true).domain([0, 1], interpolate + 1).colors());
        }

        return { colors: scale };
      });

      // Make diverging
      diverging = _.map(ordered, function(c, ci) {
        var scale = chroma.scale([c, base, opposite[ci]]).mode(space).domain([0, 1], count).colors();
        var distance = ((count - 2) / count);
        var i1, i2;

        // If the number of intervals is even, we need to interpolate to almost
        // white, otherwise we will have an odd space in the middle.
        if (count % 2 === 0) {
          i1 = chroma.interpolate(c, base, distance).hex();
          i2 = chroma.interpolate(opposite[ci], base, distance).hex();
          scale = chroma.scale([c, i1, i2, opposite[ci]]).mode(space).domain([0, 1], count).colors();
        }

        return { colors: scale };
      });

      // Sequential examples (lch or lab)
      $('.data-colors-groups-sequential-placeholder').html(groupTemplate({
        colorsets: sequentials
      }));
      // Diverging examples.  Match to oppposite order
      $('.data-colors-groups-diverging-placeholder').html(groupTemplate({
        colorsets: diverging
      }));
    }

    // Change space
    $('.color-example-space').on('click', function(e) {
      e.preventDefault();
      $('.color-example-space').removeClass('active');
      $(this).addClass('active');
      makeColorExamples();
    });
    $('#color-example-count').on('change', function(e) {
      e.preventDefault();
      makeColorExamples();
    });
    $('.color-form').on('submit', function(e) {
      e.preventDefault();
      makeColorExamples();
    });

    // Set initial
    makeColorExamples();
  }


  // Story map example
  function makeStoryMap() {
    // Make sure container is there
    if ($('#storymap-example').length !== 1) {
      return;
    }

    // Load JSON and make story map
    $.getJSON('../demo/storymap-example.json').done(function(data) {
      mpStorymaps.makeStorymap('storymap-example', data, true);
    });
  }
});
