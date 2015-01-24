LnkAPP.controller("GodController", ["$rootScope", "$scope", "$state", "DataService", "UtilitiesService", "NavigationService", "AnimationService", "Constants",
	function ($rootScope, $scope, $state, DataService, UtilitiesService, NavigationService, AnimationService, Constants) {
	
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

	LnkAPP.constant("ConstantsTest", DataService.getConstants());
}]);
