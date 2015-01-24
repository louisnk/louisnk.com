LnkAPP.controller("CodeController", ["$scope", "$stateParams", "DataService", "Constants",
	function($scope, $stateParams, DataService, Constants) {
	$scope.page.title = "CODE";
	$scope.page.heroImageUrl = "/images/hero/code.jpg";
	$scope.page.heroImageAlt = "Bridger mountains as seen from Belgrade, MT";

	$scope.projects = [];

	var dataHandler = function(data, other) {
		if (data && data.length && data.length > 0) {
			$scope.projects = data;
			console.log($scope.projects);
		} else {
			// get some generic json to show an error?
		}
	};

	var getData = function() {
		// Do other stuff, if needed?
		DataService.get(Constants.REQUESTS.CODE, dataHandler);
	};

	getData();
}]);