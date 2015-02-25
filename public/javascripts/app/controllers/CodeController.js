LnkAPP.controller("CodeController", ["$scope", "$stateParams", "$timeout", "DataService", "GraphService", "Constants",
	function($scope, $stateParams, $timeout, DataService, GraphService, Constants) {

	this.dataHandler = function(data, other) {
		if (data && data.title) {
			$scope.page = data;
			$timeout(function() { makeCircles(data); }, 250);
		} else {
			// get some generic json to show an error?
		}
	};

	var init = function() {
		$scope.getdata(Constants.STATE.CODE, this.dataHandler);
	};

	var makeCircles = function() {
		var version = $scope.states.mobile ? "mobile" : "desktop";

		data[version].skills.forEach(function(skill, i) {
			var className = "." + skill.class + " .graph-box";
			GraphService.makeDonutGraphOf(null, className); // draw the black background arc
			GraphService.makeDonutGraphOf(skill, className); // draw the "skill" arc
		});
	};

	// $scope.getData(Constants.STATE.CODE, dataHandler);
	init();
}]);
