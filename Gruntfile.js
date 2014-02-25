'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-hashres');

  grunt.loadNpmTasks('grunt-bower-task');

  // Project configuration.
  grunt.initConfig({

    hashres: {
      options: {
        encoding: 'utf8',
        fileNameFormat: '${name}.${hash}.cache.${ext}',
        renameFiles: true
      },
      css: {
        options: {
        },
        src: [
          'dist/css/devopsdays.min.css'
        ],
        dest: 'dist/**/*.html'
      },
      js: {
        options: {
        },
        src: [
          'dist/js/devopsdays.min.js'
        ],
        dest: 'dist/**/*.html'
      },
      images: {
        options: {
        },
        src: [
          'dist/**/*.png',
          'dist/**/*.jpg',
          'dist/**/*.jpeg',
          'dist/**/*.gif',
        ],
        dest: 'dist/**/*.html'
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {
          expand: true, 
          src: [
            '**', 
            '!**/*.html', 
            '!**/*.jpg', 
            '!**/*.jpeg', 
            '!**/*.js', 
            '!**/*.txt', 
            '!**/*.yaml', 
            '!**/*.gif', 
            '!**/*.png'
          ], 
          cwd: 'src',
          dest: 'dist/', filter: 'isFile',
        },
        ]
      }
    },
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },
    uglify: {
      options: {
        mangle: false
      },
      devopsdays: {
        files: {
          'dist/js/devopsdays.min.js': [
            'lib/jquery/dist/jquery.min.js', 
            'lib/bootstrap/dist/js/bootstrap.min.js', 
            'lib/jquery-ui/ui/minified/jquery-ui.min.js',
            'lib/google-maps-utility-library-v3/markerclusterer/src/markerclusterer_compiled.js',
            'lib/google-maps-utility-library-v3/markerwithlabel/src/markerwithlabel_packed.js',
            'lib/custom.js'
          ]
        }
      }
    },
    cssmin: {
      devopsdays: {
        files: {
          'dist/css/devopsdays.min.css': [
            'lib/bootstrap/dist/css/bootstrap.min.css',
            'lib/bootstrap/dist/css/bootstrap-theme.min.css' ,
            'lib/custom.css' 
          ]
        }
      }
    },

    watch: {
      images: {
        files: [ 'src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif' , 'src/**/*.jpeg' ],
        tasks: ['imagemin'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: 'src/**/*.html',
        tasks: ['htmlmin'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: [
          'lib/bootstrap/dist/css/bootstrap.css',
          'lib/bootstrap/dist/css/bootstrap-theme.css' 
        ],
        tasks: ['cssmin:devopsdays'],
        options: {
          livereload: true,
        }
      },
      javascript: {
        files: [
          'lib/bootstrap/dist/js/bootstrap.min.js', 
          'lib/jquery/dist/jquery.min.js', 
          'lib/jquery-ui/ui/minified/jquery-ui.min.js',
          'lib/googlemaps-utility-library-v3/markerwithlabel/src/markerwithlabel.js',
          'lib/custom.js'
        ],
        tasks: [ 'uglify:devopsdays'],
        options: {
          livereload: true,
        }
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [ 'dist/**/**' ],
        expand: true
      }
    },

    clean: {
      build: ["dist"],
    },

    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['path/to/**/*.css']
      },
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dist',
          livereload: true,
          debug: true
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/bootstrap/dist/js/bootstrap.min.js', 'lib/jquery/dist/jquery.min.js', 'lib/jquery-ui/ui/minified/jquery-ui.min.js'],
        dest: 'dist/js/devopsdays.js',
      },
    },

    htmlmin: {                                     // Task
      content: {                                       // Another target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['**/*.html', '**/*.txt'],   // Actual patterns to match
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 7,
          cache: false //PDB - seems necesary
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    },
    webby: {
      options: {
      },
      content: {
        files: [ {
          expand: true,
          cwd: 'src/',
          src: ['**/*.{html,txt}'],
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    }

  })

  grunt.loadTasks('tasks');

  grunt.registerTask('live', [
    'clean:build',
    'copy',
    'htmlmin',
    'imagemin',
    'uglify:devopsdays',
    'cssmin:devopsdays',
    //'hashres',
    'connect:server',
    'watch'
  ]);
}
