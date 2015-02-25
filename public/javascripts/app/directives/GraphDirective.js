LnkAPP.directive("donutGraph", ["GraphService", "$state", "$timeout", function(GraphService, $state, $timeout) {
	var graphDirectiveObject = {
		restrict: "A",
		priority: 0,
		scope: "=",
		link: function(scope, tElement, tAttrs) {
			$timeout(function() {
				GraphService.makeDonutGraphFor(scope.page.skills[tAttrs.index], tElement[0]); 
			}, 200);
		}
	};

	return graphDirectiveObject;
}]);
