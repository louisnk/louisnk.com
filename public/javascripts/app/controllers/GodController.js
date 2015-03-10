LnkAPP.controller("GodController", ["$rootScope", "$scope", "$state", "UtilitiesService", "DataService", "Constants", 
	function ($rootScope, $scope, $state, UtilitiesService, DataService, Constants) {
	var EVENT = Constants.EVENT;

	$scope.page = {};

	$scope.menu = [
		{
			EVENT: EVENT.NAVIGATION.CLICK_CODE,
			name: Constants.STATE.CODE
		},{
			EVENT: EVENT.NAVIGATION.CLICK_ART,
			name: Constants.STATE.ART
		},{
			EVENT: EVENT.NAVIGATION.CLICK_LIFE,
			name: Constants.STATE.LIFE
		}
	];

	$scope.states = {
	  nav: false,
	  mobile: UtilitiesService.isMobile()
	};

	$scope.NAV_EVENT = EVENT.NAVIGATION;
	$scope.TO_CONTENT = EVENT.ANIMATION.SCROLL_TO_CONTENT;
	$scope.STATE = Constants.STATE;
	$scope.ANIM_EVENT = EVENT.NANIMATION;

	$scope.broadcast = function(e, eventName, eventData) {
	  if (e && e.isDefaultPrevented) { e.preventDefault(); }
	  $rootScope.$broadcast(eventName, eventData);
	};

	$scope.getData = function(fromWhere, callback) {
		DataService.get(fromWhere, callback);
		// Do other stuff, if needed?
	};

}]);
