LnkAPP.controller("CodeController", ["$scope", "$stateParams", "DataService", "Constants",
	function($scope, $stateParams, DataService, Constants) {



	$scope.getData(Constants.REQUESTS.CODE);
}]);