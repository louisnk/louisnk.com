APP.controller("CodeController", ["$scope", "$stateParams", "DataService", "Constants",
	function($scope, $stateParams, DataService, Constants) {
	$scope.page.title = "CODE";
	$scope.page.heroImageUrl = "/images/hero/code.jpg";
	$scope.page.heroImageAlt = "Bridger mountains as seen from Belgrade, MT";

	$scope.projects = {};

	var dataHandler = function(data, other) {
		console.log(data);
	};

	var getData = function() {
		// Do other stuff, if needed?
		DataService.get(Constants.REQUESTS.CODE, dataHandler);
	};

	getData();
}]);