var resume = [
	{title: "Development Skills", columns: [
		{header: "2,000+ hours", items: ['JavaScript','jQuery','HTML5','CSS3',
																		 'Full stack web app development']},
		{header: "1,000+ hours", items: ['Node.js Modules', 'PHP', 'SQL', 'Git', 
																		 'Responsive/mobile UI development',
																		 'Linux command line']},
		{header: "250+ hours", items: ['Node.js','Angular.js',]}
	]},
	{title: "Professional History:", rows: [
		{header: "Atomic Infotech", dates: "2014", facts: [
			{line: "Full stack development of custom business intelligence tools in Node.js."},
			{line: "Mobile web application development relying heavily on client side JavaScript."},
			{line: "Thorough integeration of 3rd party RESTful APIs in Node.js and PHP."},
			{line: "Creation of scalable state machines in JavaScript."}
		]},
		{header: "Alpha Kappa Psi - Omega Beta Chapter", dates: "2013 - 2014", facts: [
			{line: "Created a PHP/MySQL based platform for organizational management and marketing."},
			{line: "Built an intuitive and simple CMS to fit the needs of the chapter."},
			{line: "Developed role-based access control to increase transparency and security."}
		]},
		{header: "A.B.C Montana", dates: "2013", facts: [
			{line: "Developed custom WordPress theme to suit client needs."},
			{line: "Built custom JavaScript plugins to meet project requirements."}
		]}
	]}
]

// APP.directive('resume', function($timeout) {
// 	return {
// 		link: function(scope, element, attrs) {
// 			scope.$watch
// 		}
// 	}
// });

APP.controller('resumeController', function($scope, gFactory) {
	$scope.searchVisible = false;
	$scope.resume = resume;
	
	$scope.toggleSearch = function() {
		if ($scope.searchVisible === false) {
			return $scope.searchVisible = true;
		} else return $scope.searchVisible = false;
	}

	$scope.keySearch = function(e) {
		console.log('hello');
		if ($scope.searchVisible) {
			console.log('i can see')
		}
		console.log(e);
	}
});