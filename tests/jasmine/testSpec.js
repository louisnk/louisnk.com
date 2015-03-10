"use strict";

describe("GodController", function() {
    var $scope, controller = false, constants, dataService, utilsService, $browser;

    beforeEach(module("LnkAPP"));

    beforeEach(function() {
      dataService = jasmine.createSpyObj("DataService", ["get"]);
      utilsService = jasmine.createSpyObj("UtilitiesService", ["isMobile"]);
      constants = jasmine.createSpyObj("Constants", ["EVENT"]);
    });

    beforeEach(inject(function($rootScope, $controller, _$browser_) {
      // create a new $scope for each test
      $scope = $rootScope.$new();
      $browser = _$browser_;
      // use the new $scope in creating the controller
      controller = $controller("GodController", {
          $scope: $scope,
          DataService: dataService,
          UtilitiesService: utilsService
      });
    }));

    it("should work", function() {
      expect($scope).toBeDefined();
      expect($scope.page).toBeDefined();
    });

    it("should exist", function() {
        expect(controller).toBeDefined();
    });
});
