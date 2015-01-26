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



	$scope.getData = function(fromWhere, callback) {
		DataService.get(fromWhere, callback);
		// Do other stuff, if needed?
	};


}]);
