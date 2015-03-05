LnkAPP.controller("LifeController", ["$scope", "$stateParams", "Constants",
	function($scope, $stateParams, Constants) {

	var dataHandler = function(data, other) {
		if (data && data.title) {
			$scope.page = data;
		} else {
			// get some generic json to show an error?
		}
	};

	var init = function() {
		$scope.getData(Constants.STATE.LIFE, dataHandler);
	};

	init();
}]);
