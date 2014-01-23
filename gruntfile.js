/*global module:false*/
module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: "", //grunt.file.read('../banner'),
    clean: {
      src: ['build']
    },

    typescript: {
      src: {
        src: ['src/client/**/*.ts'],
        dest: 'build',
        options: {
          module: 'commonjs',
          target: 'es5',
          sourcemap: false,
          declaration: false,
          comments: true
        }
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      core: {
        src: ['src/prefix',

          'src/suffix'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      core: {
        src: '<%= concat.core.dest %>',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    karma: {
      jquery: {
        configFile: 'env/karma-config.js',
        port: 4000,
        runnerPort: 4010,
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    connect: {
      blog: {
        options: {
          port: 8088,
          base: 'src/client',
          keepalive: true
        }
      }
    },

    watch: {
      files: ['src/**/*.ts'],
      tasks: ['build']
    },

    copy: {
      release: {
        files: [{
          expand: true,
          src: ['build/*.js'],
          dest: 'release/',
          rename: function (dest, src) {
            if (src.indexOf('.min') !== -1) {
              return src
                .replace('.min.js', '-<%= pkg.version %>.min.js')
                .replace('build', 'release/v<%= pkg.version %>');
            } else {
              return src
                .replace('.js', '-<%= pkg.version %>.js')
                .replace('build', 'release/v<%= pkg.version %>');
            }
          }
        }]
      }
    },

    tslint: {
      options: {
        configuration: grunt.file.readJSON("env/tslint.json")
      },
      files: {
        src: ['src/client/**/*.ts']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-tslint');

  // Default task.
  grunt.registerTask('build', ['typescript', 'concat', 'uglify']);
  grunt.registerTask('default', ['clean', 'tslint', 'build', 'karma', 'ngdocs']);
  grunt.registerTask('release', ['default', 'copy:release']);
  grunt.registerTask('server', ['clean', 'build', 'connect', 'watch']);
  grunt.registerTask('docs', ['clean', 'build', 'ngdocs']);
};