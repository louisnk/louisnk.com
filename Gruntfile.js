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
    jasmine: {
      test: {
        src: [ 
          "<%= config.app %>/javascripts/app/lnk.js"
        ],
        options: {
          specs: "<%= config.test %>/jasmine/testSpec.js",
          vendor: [
            "<%= config.app %>/javascripts/vendor/jasmine/lib/jasmine-2.2.0/jasmine.js",
            "<%= config.app %>/javascripts/vendor/angular/angular.js",
            "<%= config.app %>/javascripts/vendor/angular-ui-router/release/angular-ui-router.min.js",
            "<%= config.app %>/javascripts/vendor/angular-mocks/angular-mocks.js",
            "<%= config.test %>/jasmine/testSpec.js"
          ]
        }
      },
    },
    karma: {
      unit: {
        files: [ 
          { src: [ "<%= config.app %>/javascripts/app/lnk.js" ], served: true}
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
    }
  });

  grunt.loadNpmTasks("grunt-karma");
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
    "test",
    "less",
    "uglify"
  ]);

  grunt.registerTask("dev", [ "watch:js_dev" ]);

  grunt.registerTask("b", [ "build" ]);

  grunt.registerTask("j", [ "jasmine" ]);

  grunt.registerTask("test", [ "jshint", "shell:test", "jasmine" ]);

  grunt.registerTask("testb", [ "jshint", "shell:test", "karma" ]);

  grunt.registerTask("default", ["build"]);

};

