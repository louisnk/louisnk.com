var navLinks = [
	{name: 'RESUME', path: '#/resume', active: false},
	{name: 'BIO', path: '#/bio', active: false},
	{name: 'PROJECTS', path: '#/projects', active: false}
]

var controllers = {
	navController: function($scope, gFactory, $location) {
		$scope.navLinks = navLinks;

		$scope.isActive = function(path) {
			path = path.substr(1,path.length);

			if ($location.path().substr(0, path.length) == path) {
				return "active";
			} else return "";
		}
	}
}

var factories = {
	gFactory: function() {
		// TODO GA tracking stuff
		var factory = {}

		factory.track = function(page) {
			// DO SOME STUFF
		}
		return factory;
	},

	lightbox: function() {

	}
}


// THEN ASSIGN controllers AND factories - Boom
APP.controller(controllers).factory(factories);