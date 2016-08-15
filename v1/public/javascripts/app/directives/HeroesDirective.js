LnkAPP.directive("heroImage", function factory($state) {
	var heroImageObject = {
		restrict: "A",
		priority: 0,
		templateUrl: "/views/partials/heroes.html",
		// controller: "HeroController",
		scope: false,
		compile: function compile(tElement, tAttrs) {
			tElement.addClass($state.current.name);
		}
	};

	return heroImageObject;
});
