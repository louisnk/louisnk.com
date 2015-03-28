LnkAPP.factory("UserService", ["$rootScope", "DataService", "Constants", 
	function($rootScope, DataService, Constants) {

		function User(info) {
			for (var prop in info) {
				this[prop] = info[prop];
			}
		};


		var init = function() {
			var user = getUser();
			if (user.firstName) {
				$rootScope.broadcast(Constants.EVENT.USER.FOUND, user);
			} else {
				user = new User({
					firstName: "",
					github: "",
					twitter: "",
					access: false
				});
			}
		};

		var getUserFromLocalstorage = function() {
			try {
				if (window.localStorage) {
					var user = window.localStorage.getItem("LnkUser");

				} else {

				}
			} catch (e) {

			}
		};
}]);
