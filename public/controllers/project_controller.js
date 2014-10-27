
APP.directive('slideshow', ['$document', '$rootScope', 
	function($document, $rootScope, $timeout) {
	return {
		restrict: 'AE',
		replace: true,
		scope: false,
		link: function(scope, element, attrs) {
			scope.currentSlide = 0;

			var projects = scope.obj.projects,
					projLength = projects.length;

			$document.bind('keypress', function(e) {
				$rootScope.$broadcast('keypress',e);
			});

			scope.next = function() {
				console.log("next");
				scope.currentSlide < projLength - 1 ?
				scope.currentSlide++ : scope.currentSlide = 0;
			}

			scope.previous = function() {
				scope.currentSlide > 0 ?
				scope.currentSlide-- : 
				scope.currentSlide = projLength - 1;
				console.log("previous");
			}

			scope.keyNav = function($event) {
				console.log('hello');
				console.log($event);
				// console.log(e.which);
			}

			scope.$on('keypress', function(onEvent, keypressEvent) {
				var key = keypressEvent;

				if (key.which == 37) {
					scope.previous();
				} else if (key.which == 39) {
					scope.next();
				}
			});

			scope.$watch('currentSlide', function() {
				projects.forEach(function(slide,i) {
					slide.visible = false;
				});

				scope.obj.projects[scope.currentSlide].visible = true;
			})
		},
		templateUrl: 'partials/projects.html'
	}
} ]);

APP.controller('projectController', 
		function($scope, projectFactory, gFactory) {
			// window.bind('keydown', body)
			keyPressed = function(e) {
				console.log(e.which);
			}
			// document.bind('keydown', keyPressed($event));

			$scope.obj = {projects: projectFactory.projects};
});
