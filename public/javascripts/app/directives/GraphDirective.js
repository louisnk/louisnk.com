LnkAPP.directive("donutGraph", ["GraphService", "$state", function(GraphService, $state) {
	var graphDirectiveObject = {
		restrict: "A",
		priority: 0,
		template: "<svg class='graph-box'></svg>",
		scope: "=",
		link: function(scope, tElement, tAttrs) {
			GraphService.makeDonutGraphFor(scope.page.skills[tAttrs.index], tElement[0].parentElement);
		}
	};

	return graphDirectiveObject;
}]);
