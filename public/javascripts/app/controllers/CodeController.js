LnkAPP.controller("CodeController", ["$scope", "$stateParams", "$timeout", "DataService", "GraphService", "Constants",
	function($scope, $stateParams, $timeout, DataService, GraphService, Constants) {

	var dataHandler = function(data, other) {
		if (data && data.title) {
			$scope.page = data;
			$timeout(function() { makeCircles(); }, 250);
		} else {
			// get some generic json to show an error?
		}
	};

	var makeCircles = function() {
		GraphService.donutGraph(false, ".js .graph-box");
	};

	$scope.getData(Constants.STATE.CODE, dataHandler);
}]);