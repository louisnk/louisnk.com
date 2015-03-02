LnkAPP.directive("donutGraph", ["GraphService", "$state", "$timeout", function(GraphService, $state, $timeout) {
	var graphDirectiveObject = {
		restrict: "A",
		priority: 0,
		scope: "=",
		link: function(scope, element, attributes) {
			GraphService.makeDonutGraphFor(scope.page.skills[attributes.index], element[0]); 
		}
	};

	return graphDirectiveObject;
}]);
