/* global module:false */

/**
 * Grunt file that handles managing tasks such as rendering
 * SASS, providing a basic HTTP server, building a
 * distribution.
 */
module.exports = function(grunt) {
  var _ = grunt.util._;

  // Project configuration.  Many values are directly read from
  // package.json.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= pkg.license || _.pluck(pkg.licenses, "type").join(", ") %> */' +
        '<%= "\\n\\n" %>'
    },

    // Clean up the distribution fold
    clean: {
      folder: 'dist/'
    },

    // JS Hint checks code for coding styles and possible errors
    jshint: {
      options: {
        curly: true,
        //es3: true,
        forin: true,
        latedef: true,
        //maxlen: 80,
        indent: 2
      },
      files: ['Gruntfile.js', 'js/*.js']
    },

    // Compass is an extended SASS.  Set it up so that it generates to .tmp/
    compass: {
      options: {
        sassDir: 'styles',
        cssDir: '.tmp/css',
        generatedImagesDir: '.tmp/images',
        fontsDir: 'styles/fonts',
        imagesDir: 'images',
        javascriptsDir: 'js',
        //importPath: 'bower_components',
        httpPath: './',
        relativeAssets: true
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'expanded',
          relativeAssets: false
        }
      }
    },

    // Copy relevant files over to distribution
    copy: {
      images: {
        files: [
          {
            cwd: './images/',
            expand: true,
            src: ['**'],
            dest: 'dist/images/'
          }
        ]
      }
    },

    // Brings files toggether
    concat: {
      options: {
        separator: '\r\n\r\n'
      },
      // JS
      js: {
        src: [
          'js/site.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      // CSS
      css: {
        src: [
          '<%= compass.options.cssDir %>/main.css'
        ],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },

    // Minify JS for network efficiency
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= concat.js.dest %>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    // Minify CSS for network efficiency
    cssmin: {
      options: {
        banner: '<%= meta.banner %>',
        report: true
      },
      css: {
        src: ['<%= concat.css.dest %>'],
        dest: 'dist/<%= pkg.name %>.min.css'
      }
    },

    // HTTP Server
    connect: {
      server: {
        options: {
          port: 8833
        }
      }
    },

    // Watches files for changes and performs task
    watch: {
      files: ['<%= jshint.files %>', 'styles/*.scss'],
      tasks: 'default'
    }
  });

  // Load plugin tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default build task
  grunt.registerTask('default', ['jshint', 'compass', 'clean', 'copy', 'concat', 'cssmin', 'uglify']);

  // Server/watch
  grunt.registerTask('server', ['default', 'connect', 'watch']);

};