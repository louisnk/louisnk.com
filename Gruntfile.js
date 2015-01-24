module.exports = function(grunt) {
  
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    config: {
      app: "public",
      dev: "dev",
      views: "views"
    },
    concat: {
      options: {
        separator: "\n"
      },
      js_frontend: {
        src: [
          "<%= config.app %>/javascripts/app/main.js", 
          "<%= config.app %>/javascripts/app/**/*.js",
          "!<%= config.app %>/javascripts/app/lnk.js"
        ],
        dest: "<%= config.app %>/javascripts/app/lnk.js"
      }
    },
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          "./<%= config.dev %>/public/stylesheets/LNK.css": "./<%= config.app %>/stylesheets/**/*.less"
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      frontend: {
        files: {
          "<%= config.dev %>/public/js/LNK.js": "<%= config.dev %>/public/js/LNK.js"
        }
      }
    },
    jshint: {
      files: [
        "<%= config.app %>/javascripts/app/**/*.js",
        "!<%= config.app %>/javascripts/app/lnk.js"
      ],
      options: {
        curly: true,
        undef: false,
        trailing: true,
        camelcase: true,
        globals: {
          jQuery: true,
          console: true,
          moduel: true,
          document: true
        }
      },

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
                    '<%= config.app %>/public/'
                ]
            }
        }
    },
    watch: {
      js_dev :{
        files: [
          "<%= config.app %>/javascripts/**/*.js",
          "!<%= config.app %>/javascripts/app/lnk.js"
        ],
        tasks: [ "jshint", "concat:js_frontend" ]
      },
      js_frontend: {
        files: [
          "<%= config.app %>/javascript/**/*.js"
        ],
        tasks: [ "concat:js_frontend", "uglify:frontend" ],
        options: {
          livereload: true
        }
      },
      less: {
        files: [
          "<%= config.app %>/stylesheets/*.less"
        ],
        tasks: [ "less" ],
        options: {
          livereload: true
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
            dest: "<%= config.dev %>"
          }
        ]
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

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-wiredep");

  grunt.registerTask("build", [
    "jshint",
    "concat:js_frontend",
    "uglify",
    "less",
    "copy",
    "wiredep"
  ]);

  grunt.registerTask("b", [ "build" ]);

  grunt.registerTask("w", [ "wiredep" ]);

  grunt.registerTask("serve", [ 
    "build", 
    "connect:livereload",
    "watch" 
  ]);

  grunt.registerTask("js", [ "watch:js_dev" ]);

  grunt.registerTask("s", [ "serve" ]);

  grunt.registerTask("default", ["build"]);

};

