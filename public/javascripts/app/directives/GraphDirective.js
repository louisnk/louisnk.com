LnkAPP.directive("GraphDirective", function factory($state) {
	return {
		restrict: "A",
		priority: 0,
		templateUrl: "/views/partials/graphs.html",
		scope: false,
		compile: function compile(tElement, tAttrs) {
			tElement.forEach(function() {

			});
		}
	};
});
