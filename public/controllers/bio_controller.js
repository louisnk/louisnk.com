var content = [
	{heading: 'The Dirty Details',
	 content: [
	 	{	value: "I'm highly motivated, " +
	 					 "and dedicated to perfecting my craft.",
 	 		imgUrl: 'img/brucelee.jpg'
 	 	},
	 	{	value: "I've always loved technology. I had my own RedHat server at 14.",
	 		imgUrl: "img/redhat.jpg"
	 	},
	 	{	value: "I taught myself almost everything I know about technology.",
	 		imgUrl: "img/self.jpg"
	 	},
	 	{	value: "I'm a list maker, who prioritizes daily tasks to reach bigger goals.",
	 		imgUrl: "img/list.jpg"
	 	}
	]},

	{heading: "The Clean Details",
	 content: [
			{	
				value: "I've built an eclectic collection of knowledge.",
				imgUrl: "img/eclectic.jpg"
			},
			{	
				value: "Great coaches have taught me to be a great team player.",
				imgUrl: "img/coaches.jpg"
			},
		 	{
		 		value: "I loved backpacking through SE Asia for 100 days by myself.",
		 		imgUrl: "img/asia.jpg"
		 	},
			{
			 value: "I'm an able communicator, and unafraid of public speaking.",
				imgUrl: "img/public.jpg"
			}
	]}
]

APP.controller('bioController', function($scope, gFactory) {
	$scope.content = content;
});