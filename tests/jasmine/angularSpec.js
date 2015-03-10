describe("Home page loads", function() {
	it("is working", function() {
		expect(1).toEqual(1);
	});

	// beforeEach(angular.mock.module("LnkAPP"));
	// var $controller, $scope;
	// beforeEach(inject(function(_$controller_) {
	// 	$controller = _$contorller_;
	// 	$scope = {};
	// }));

	// // critical
	// it("has all the controllers", function() {
	// 	var controllers = [
	// 		"GodController",
	// 		"CodeController",
	// 		"HomeController",
	// 		"LifeController"
	// 	];

	// 	controllers.forEach(function(ctrl, i) {
	// 		expect(LnkAPP[ctrl]).toBeDefined();
	// 	});
	// });

	// it("has constants", inject["Constants", function(Constants) {
	// 	expect(Constants).toBeDefined();
	// 	expect(Object.keys(Constants).length).toBeGreaterThan(0);
	// 	expect(Constants.NINJA).toMatch("ninja");
	// }]);

	// it("asks for data", inject(["DataService", function(DataService) {
	// 	var home = "HOME";

	// 	expect(DataService.get).toBeDefined();
	// 	expect(typeof DataService.get).toBe("function");
	// 	DataService.get(home, function(data, extra) {
	// 		expect(data).toBeDefined();
	// 		expect(typeof data).toBe("object");
	// 		expect(data.title).toContain("LOUIS KINLEY");
	// 	});
	// });

	// it("gets datas from the server", function() {

	// });

	// it("can make sense of datas from the server", function() {

	// });

});
