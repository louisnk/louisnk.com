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

	var makeCircles = function(datas) {
		function makeSelector(className) {
			return "." + className + " .graph-box";
		}

		if (datas) {
			datas.skills.forEach(function(skill, i) {
				GraphService.makeDonutGraphFor(skill, makeSelector(skill.class));
			});
		}
	};

	init();
}]);
