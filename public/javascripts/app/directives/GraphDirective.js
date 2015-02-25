LnkAPP.directive("donutGraph", ["GraphService", "$state", "$timeout", function(GraphService, $state, $timeout) {
	var graphDirectiveObject = {
		restrict: "A",
		priority: 0,
		scope: "=",
		link: function(scope, tElement, tAttrs) {
			GraphService.makeDonutGraphFor(scope.page.skills[tAttrs.index], tElement[0]); 
		}
	};

	return graphDirectiveObject;
}]);
