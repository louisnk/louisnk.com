module.exports = function(grunt) {
  
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    config: {
      app: "public",
      node: "./node_app",
      test: "./tests",
      build: "build"
    },
    concat: {
      options: {
        separator: "\n"
      },
      js_app: {
        src: [
          "<%= config.app %>/javascripts/app/main.js", 
          "<%= config.app %>/javascripts/app/**/*.js",
          "!<%= config.app %>/javascripts/app/lnk.js",
          "!<%= config.app %>/javascripts/app/lnk.min.js"
        ],
        dest: "<%= config.build %>/js/lnk.js"
      }
    },
    concurrent: {
      dev: {
        tasks: ["nodemon:dev", "watch"]
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
    jasmine: {
      test: {
        src: [ 
          "<%= config.build %>/js/lnk.js"
        ],
        options: {
          specs: "<%= config.test %>/jasmine/testSpec.js",
          vendor: [
            "<%= config.app %>/javascripts/vendor/jasmine/lib/jasmine-2.2.0/jasmine.js",
            "<%= config.app %>/javascripts/vendor/angular/angular.js",
            "<%= config.app %>/javascripts/vendor/angular-ui-router/release/angular-ui-router.min.js",
            "<%= config.app %>/javascripts/vendor/angular-mocks/angular-mocks.js",
            "<%= config.app %>/javascripts/vendor/angular-cookies/angular-cookies.js",
            "<%= config.test %>/jasmine/testSpec.js"
          ]
        }
      },
    },
    jshint: {
      fe: {
        files: [
          { src: [ 
              "<%= config.app %>/javascripts/app/**/*.js",
              "!<%= config.app %>/javascripts/app/lnk.js",
              "!<%= config.app %>/javascripts/app/lnk.min.js"
            ]
          }
        ]
      },
      node: {
        files: { src: [ "<%= config.node %>/**/*.js" ]}
      },
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
    karma: {
      unit: {
        files: [ 
          { src: [ "<%= config.build %>/js/lnk.js" ], served: true}
        ],
        options: {
          browsers: ["Chrome", "Firefox"],
          frameworks: ["jasmine"],
          singleRun: true,
          files: [
            "<%= config.app %>/javascripts/vendor/jasmine/lib/jasmine-2.2.0/jasmine.js",
            "<%= config.app %>/javascripts/vendor/angular/angular.js",
            "<%= config.app %>/javascripts/vendor/angular-ui-router/release/angular-ui-router.min.js",
            "<%= config.app %>/javascripts/vendor/angular-mocks/angular-mocks.js",
            "<%= config.test %>/jasmine/testSpec.js"
          ],
          plugins: [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-jasmine"
          ]
        }
      },
    },
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          "<%= config.build %>/css/lnk.min.css": "<%= config.app %>/stylesheets/lnk.less"
        }
      }
    },
    lesslint: {
      src: [ "<% config.app %>/stylesheets/**/*.less" ]
    },
    nodemon: {
      dev: {
        script: "app.js"
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
          "<%= config.build %>/js/lnk.min.js": "<%= config.build %>/js/lnk.js"
        }
      }
    },
    watch: {
      // livereload: {
      //   options: {
      //     livereload: true
      //   },
      //   files: {}
      // }
      js_dev :{
        files: [
          "<%= config.app %>/javascripts/**/*.js"
        ],
        tasks: [ "jshint:fe", "concat:js_app", "jasmine" ]
      },
      node: {
        files: [
          "<%= config.node %>/**/*.js"
        ],
        tasks: [ "jshint:node", "shell:test" ]
      },
      less: {
        files: [
          "<%= config.app %>/stylesheets/**/*.less"
        ],
        tasks: [ "lesslint", "less" ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-lesslint");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");


  grunt.registerTask("build", [
    "jshint",
    "concat",
    // "test",
    "less",
    "uglify"
  ]);

  grunt.registerTask("serve", ["build", "connect:livereload", "watch"]);

  grunt.registerTask("dev", [ "watch" ]);

  grunt.registerTask("b", [ "build" ]);

  grunt.registerTask("j", [ "jasmine" ]);

  grunt.registerTask("test", [ "jshint", "shell:test", "jasmine" ]);

  grunt.registerTask("testb", [ "jshint", "shell:test", "karma" ]);

  grunt.registerTask("default", ["build"]);

};

