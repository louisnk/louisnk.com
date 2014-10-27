APP.directive('slideshow', function($timeout) {
	return {
		restrict: 'AE',
		replace: true,
		scope: false,
		link: function(scope, element, attrs) {
			scope.currentSlide = 0;
			scope.next = function() {
				scope.currentSlide < scope.projects.length ?
				scope.currentSlide++ : scope.currentSlide = 0;
			}

			scope.previous = function() {
				scope.currentSlide > 0 ?
				scope.currentSlide-- : 
				scope.currentSlide = scope.projects.length - 1
			}

			scope.$watch('currentSlide', function() {
				scope.projects.forEach(function(slide,i) {
					slide.visible = false;
				});
				scope.projects[scope.currentSlide].visible = true;
			console.log(scope);
			})
		},
		templateUrl: 'partials/projects.html'
	}
});

APP.controller('projectController', 
		function($scope, projectFactory, gFactory) {
			$scope.projects = projectFactory.projects;
});
