LnkAPP.controller("GodController", ["$rootScope", "$scope", "$state", "UtilitiesService", "DataService", "Constants", 
	function ($rootScope, $scope, $state, UtilitiesService, DataService, Constants) {
	
	$scope.page = {};

	$scope.states = {
	  nav: true,
	  mobile: UtilitiesService.isMobile()
	};

	$scope.NAV_EVENT = Constants.EVENT.NAVIGATION;
	$scope.TO_CONTENT = Constants.EVENT.ANIMATION.SCROLL_TO_CONTENT;
	$scope.STATE = Constants.STATE;

	$scope.broadcast = function(e, eventName, eventData) {
	  if (e && e.isDefaultPrevented) { e.preventDefault(); }
	  $rootScope.$broadcast(eventName, eventData);
	};

	$scope.getData = function(fromWhere, callback) {
		DataService.get(fromWhere, callback);
		// Do other stuff, if needed?
	};


}]);
