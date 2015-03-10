"use strict";

describe("GodController", function() {
    var $scope, controller, constants, dataService, utilsService;

    beforeEach(module("LnkAPP"));

    beforeEach(function() {
      dataService = jasmine.createSpyObj("DataService", ["get"]);
      utilsService = jasmine.createSpyObj("UtilitiesService", ["isMobile"]);
      constants = jasmine.createSpyObj("Constants", ["EVENT"]);

      inject(function($rootScope, $controller) {
        // create a new $scope for each test
        $scope = $rootScope.$new();
        console.log(typeof controller);
        // use the new $scope in creating the controller
        controller = $controller("GodController", {
            $scope: $scope,
            DataService: dataService,
            UtilitiesService: utilsService,
            constants: Constants
        });
      })
    });

    it("should work", function() {
      expect(1).toEqual(1);
    });

    it("should exist", function() {
        expect(controller).toBeDefined();
    });
});
