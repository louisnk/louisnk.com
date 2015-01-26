LnkAPP.controller("CodeController", ["$scope", "$stateParams", "DataService", "Constants",
	function($scope, $stateParams, DataService, Constants) {
	$scope.page.title = "CODE";
	$scope.page.heroImageUrl = "/images/hero/code.jpg";
	$scope.page.heroImageAlt = "Bridger mountains as seen from Belgrade, MT";

	$scope.projects = [];

	var dataHandler = function(data, other) {
		if (data && data.title) {

			$scope.code = data;
			$scope.page.title = data.title;
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