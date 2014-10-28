var APP = angular.module('APP', ['ngRoute','ngAnimate']);

APP.config(function($routeProvider) {
	$routeProvider
		.when('/', {templateUrl: 'partials/front.html', controller: 'mainController'})
		.when('/bio', {templateUrl: 'partials/bio.html', controller: 'bioController'})
		.when('/projects', {templateUrl: 'partials/carousel.html', controller: 'projectController'})
		.when('/resume', {templateUrl: 'partials/resume.html', controller: 'resumeController'})
		.otherwise({templateUrl: 'partials/front.html', controller: 'mainController'})
});