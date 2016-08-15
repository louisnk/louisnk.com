LnkAPP.controller("CodeController", ["$scope", "$stateParams", "$timeout", "DataService", "GraphService", "Constants",
	function($scope, $stateParams, $timeout, DataService, GraphService, Constants) {

	var dataHandler = function(data, other) {
		if (data && data.title) {
			$scope.page = data;
		} else {
			// get some generic json to show an error?
		}
	};

	var init = function() {
		$scope.getData(Constants.STATE.CODE, dataHandler);
	};

	init();
}]);
