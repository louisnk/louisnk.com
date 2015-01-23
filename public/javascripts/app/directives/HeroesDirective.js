APP.directive("heroImage", function factory($state) {
	var heroImageObject = {
		priority: 0,
		template: "/views/partials/heroes.html",
		restrict: "A",
		scope: false,
		compile: function compile(tElement, tAttrs) {
			tElement.addClass($state.current.name);
		}
	};

	return heroImageObject;
});