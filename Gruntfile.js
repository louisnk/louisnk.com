module.exports = function(grunt) {
  
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    config: {
      app: "public",
      node: "node_app",
      test: "./tests"
    },
    concat: {
      options: {
        separator: "\n"
      },
      js_app: {
        src: [
          "<%= config.app %>/javascripts/app/main.js", 
          "<%= config.app %>/javascripts/app/**/*.js",
          "!<%= config.app %>/javascripts/app/lnk.js"
        ],
        dest: "<%= config.app %>/javascripts/app/lnk.js"
      }
    },
    connect: {
        options: {
            port: 9500,
            livereload: 35729,
            // change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '<%= config.app %>/views/'
                ]
            }
        }
    },
    copy: {
      main: {
        files: [
          { 
            expand: true, 
            src: [
              "<%= config.app %>/index.html", 
              "<%= config.app %>/**/*.html",
              "<%= config.app %>/assets/"
            ],
            dest: "<%= config.app %>/copied"
          }
        ]
      }
    },
    jasmine: {
      test: {
        src: [ 
          "<%= config.app %>/javascripts/app/main.js",
          "<%= config.app %>/javascripts/app/**/*.js",
          "<%= config.app %>/javascripts/app/test.js"
        ],
      },
      options: {
        specs: "<%= config.test %>/jasmine/*.js",
        // host: "http://localhost:1337/#/",
        vendor: "<%= config.app =>/javascripts/vendor/**/*.js"
      }
    },
    jshint: {
      files: [
        "<%= config.app %>/javascripts/app/**/*.js",
        "<%= config.node %>/**/*.js",
        "!<%= config.app %>/javascripts/app/lnk.js",
        "!<%= config.app %>/javascripts/app/lnk.min.js"
      ],
      options: {
        camelcase: true,
        curly: true,
        trailing: true,
        shadow: true,
        undef: false,
        globals: {
          jQuery: true,
          console: true,
          moduel: true,
          document: true
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          "<%= config.app %>/stylesheets/lnk.css": "<%= config.app %>/stylesheets/lnk.less"
        }
      }
    },
    shell: {
      test: {
        command: "exam tests"
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      frontend: {
        files: {
          "<%= config.app %>/javascripts/app/lnk.min.js": "<%= config.app %>/javascripts/app/lnk.js"
        }
      }
    },
    watch: {
      js_dev :{
        files: [
          "<%= config.app %>/javascripts/**/*.js",
          "!<%= config.app %>/javascripts/app/lnk.js"
        ],
        tasks: [ "jshint", "concat:js_app", "jasmine" ]
      },
      less: {
        files: [
          "<%= config.app %>/stylesheets/**/*.less"
        ],
        tasks: [ "less" ],
        options: {
          livereload: true
        }
      }
    },
    wiredep: {
      task: {
        src: ["<%= config.views %>/index.hjs"],
        options: {
          fileTypes: {
            html: {
              block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
              detect: {
                js: /<script.*src=['"](.+)['"]>/gi,
                css: /<link.*href=['"](.+)['"]/gi
              },
              replace: {
                js: '<script src="{{filePath}}"></script>',
                css: '<link rel="stylesheet" href="{{filePath}}" />'
              }
            }
          }
        },
        ignorePath: [ '_old' ]
      },
      options: {
        directory: "<% config.app %>/javascripts/app"
      }
    }
  });

  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-wiredep");

  grunt.registerTask("build", [
    "jshint",
    "shell:test",
    "concat",
    "less",
    "uglify"
  ]);

  grunt.registerTask("dev", [ "watch:js_dev" ]);

  grunt.registerTask("b", [ "build" ]);

  grunt.registerTask("test", [ "jshint", "shell:test", "jasmine" ]);

  grunt.registerTask("w", [ "wiredep" ]);

  grunt.registerTask("default", ["build"]);

};

