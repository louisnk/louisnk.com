LnkAPP.controller("CodeController", ["$scope", "$stateParams", "DataService", "Constants",
	function($scope, $stateParams, DataService, Constants) {

	var dataHandler = function(data, other) {
		if (data && data.title) {
			$scope.page = data;
		} else {
			// get some generic json to show an error?
		}
	};

	$scope.getData(Constants.STATE.CODE, dataHandler);
}]);