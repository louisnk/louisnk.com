APP.controller("GodController", ["$rootScope", "$scope", "$state", "UtilitiesService", "NavigationService", "AnimationService", "Constants",
	function ($rootScope, $scope, $state, UtilitiesService, NavigationService, AnimationService, Constants) {
	
	$scope.page = {};
	
	$scope.states = {
	  nav: true
	};

	$scope.TO_CONTENT = Constants.EVENT.ANIMATION.SCROLL_TO_CONTENT;

	$scope.broadcast = function(e, eventName, eventData) {
	  if (e && e.preventDefault) { e.preventDefault(); }
	  $rootScope.$broadcast(eventName, eventData);
	};

	NavigationService.init();
	AnimationService.init();
}]);
