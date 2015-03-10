"use strict";

describe("GodController", function() {
    var $scope, controller, constants, dataService, utilsService, $browser;

    beforeEach(module("LnkAPP"));

    beforeEach(function() {
      dataService = jasmine.createSpyObj("DataService", ["get"]);
      utilsService = jasmine.createSpyObj("UtilitiesService", ["isMobile"]);

      constants = {
        EVENT: {
          ANIMATION: {
            EXPLORE:                "EXPLORE",
            SCROLL_TO_CONTENT:      "SCROLL_TO_CONTENT"
          },
          NAVIGATION: {
            CLICK_ART:              "CLICK_ART",
            CLICK_CODE:             "CLICK_CODE",
            CLICK_EXPLORE:          "CLICK_EXPLORE",
            CLICK_LIFE:             "CLICK_LIFE",
            SHOW_MENU:              "SHOW_MENU"
          }
        },
        STATE: {
          HOME:                     "HOME",
          CODE:                     "CODE",
          ART:                      "ART",
          GALLERY:                  "GALLERY",
          PROJECT:                  "PROJECT",
          LIFE:                     "LIFE",
          PLACEHOLDER:              "PLACEHOLDER",
          RESUME:                   "RESUME"
        }
      };
    
      inject(function($rootScope, $controller, _$browser_, Constants) {
        // create a new $scope for each test
        $scope = $rootScope.$new();
        $browser = _$browser_;
        // use the new $scope in creating the controller
        controller = $controller("GodController", {
            $scope: $scope,
            DataService: dataService,
            UtilitiesService: utilsService,
            Constants: constants
        });
      });
    });

    it("exists, and is defined", function() {
        expect(controller).toBeDefined();
    });

    it("has a $scope and $scope.page", function() {
      expect($scope).toBeDefined();
      expect($scope.page).toEqual({});
    });

    it("has a broadcast method", function() {
      expect($scope.broadcast).toBeDefined();
      expect(typeof $scope.broadcast).toBe("function");
    });
});
