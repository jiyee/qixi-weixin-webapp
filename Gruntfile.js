module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['css/*.css' ], // _base.css required for .animated helper class
        dest: 'css/default.css'
      }
    },

    autoprefixer: { // https://github.com/nDmitry/grunt-autoprefixer
      options: {
        browsers: ['last 3 versions', 'android 3']
      },
      no_dest: {
        src: 'css/default.css' // output file
      }
    },

    cssmin: {
      minify: {
        src: ['css/default.css'],
        dest: 'css/default.min.css',
      }
    },

    watch: {
      css: {
        files: [ 'css/app.css', 'css/animate.css' ],
        tasks: ['default']
      }
    }

  });

  // register task
  grunt.registerTask('default', ['concat', 'autoprefixer', 'cssmin']);
  grunt.registerTask('dev', ['watch']);

};
