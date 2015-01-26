LnkAPP.controller("GodController", ["$rootScope", "$scope", "$state", "DataService", "UtilitiesService", "NavigationService", "AnimationService", "Constants", 
	function ($rootScope, $scope, $state, DataService, UtilitiesService, NavigationService, AnimationService, Constants) {
	
	$scope.page = {};

	$scope.states = {
	  nav: true
	};

	$scope.navEvents = Constants.EVENT.NAVIGATION;
	$scope.TO_CONTENT = Constants.EVENT.ANIMATION.SCROLL_TO_CONTENT;

	$scope.broadcast = function(e, eventName, eventData) {
	  if (e && e.preventDefault) { e.preventDefault(); }
	  $rootScope.$broadcast(eventName, eventData);
	};

	var dataHandler = function(data, other) {
		if (data && data.title) {

			$scope.page = data;
			$scope.page.title = data.title;
		} else {
			// get some generic json to show an error?
		}
	};

	$scope.getData = function(fromWhere) {
		console.log(fromWhere, typeof fromWhere);
		DataService.get(fromWhere, dataHandler);
		// Do other stuff, if needed?
		
	};


}]);
