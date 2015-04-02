'use strict';

describe("Home page loads", function() {
	
	it("is working", function() {
		expect(1).toEqual(1);
	});

	var $scope, ctrl, $timeout, dataService, $browser;

	beforeEach(module("LnkAPP"));
	beforeEach(function() { dataService = jasmine.createSpyObj("DataService", ["get"]); });

	beforeEach(
		inject(function($rootScope, $controller, $q, _$timeout_, _$browser_) {
      // create a scope object for us to use.
      $scope = $rootScope.$new();
  
      // set up the returns for our someServiceMock
      // $q.when('weee') creates a resolved promise to "weee".
      // this is important since our service is async and returns
      // a promise.
      someServiceMock.someAsyncCall.andReturn($q.when('weee'));
      
      // assign $timeout to a scoped variable so we can use 
      // $timeout.flush() later. Notice the _underscore_ trick
      // so we can keep our names clean in the tests.
      $timeout = _$timeout_;

      $browser = _$browser_;
      
      // now run that scope through the controller function,
      // injecting any services or other injectables we need.
      // **NOTE**: this is the only time the controller function
      // will be run, so anything that occurs inside of that
      // will already be done before the first spec.
      ctrl = $controller('MainCtrl', {
        $scope: $scope,
        someService: someServiceMock
      });

		// inject(function($rootScope, $controller, $q, _$timeout_) {
		// 	$scope = $rootScope.$new();

		// 	dataService.get.andReturn($q.when("wheee"));
		// 	$timeout = _$timeout_;

		// 	ctrl = $controller("GodController", {
		// 		$scope: $scope,
		// 		DataService: dataService
		// 	});

		// });
	}));

	// it ("should have a page object", function() {
	// 	expect($scope.page).toEqual({});
	// });
	// // var $controller, $scope;
	// // beforeEach(inject(function(_$controller_) {
	// // 	$controller = _$controller_;
	// // 	$scope = {};
	// // }));

	// // // critical
	// // it("has all the controllers", function() {
	// // 	var controllers = [
	// // 		"GodController",
	// // 		"CodeController",
	// // 		"HomeController",
	// // 		"LifeController"
	// // 	];

	// // 	controllers.forEach(function(ctrl, i) {
	// // 		expect(LnkAPP[ctrl]).toBeDefined();
	// // 	});
	// // });

	// // it("has constants", inject["Constants", function(Constants) {
	// // 	expect(Constants).toBeDefined();
	// // 	expect(Object.keys(Constants).length).toBeGreaterThan(0);
	// // 	expect(Constants.NINJA).toMatch("ninja");
	// // }]);

	// // it("asks for data", inject(["DataService", function(DataService) {
	// // 	var home = "HOME";

	// // 	expect(DataService.get).toBeDefined();
	// // 	expect(typeof DataService.get).toBe("function");
	// // 	DataService.get(home, function(data, extra) {
	// // 		expect(data).toBeDefined();
	// // 		expect(typeof data).toBe("object");
	// // 		expect(data.title).toContain("LOUIS KINLEY");
	// // 	});
	// // });

	// // it("gets datas from the server", function() {

	// // });

	// // it("can make sense of datas from the server", function() {

	// // });

});
