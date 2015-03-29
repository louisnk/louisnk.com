LnkAPP.factory("UserService", ["$rootScope", "$cookies", "DataService", "Constants", 
	function($rootScope, $cookies, DataService, Constants) {

		function User(info) {
			info = info || {};
			return {
				firstName: info.firstName || "",
				github: info.github || "",
				twitter: info.twitter || "",
				access: false,
				logOut: function() {
					$rootScope.broadcast(Constants.REQUESTS.USER.LOG_OUT, true);
				}
			};
		}


		var init = function() {
			var user = getUser();
			listenForUserChanges();
			console.log("running user service");
			// if (user && user.firstName) {
			// 	return $rootScope.broadcast(Constants.EVENT.USER.FOUND, user);
			// } else {
			// 	return $rootScope.broadcast(Constants.EVENT.USER.NEW, new User());
			// }

		};

		var listenForUserChanges = function() {
			// $rootScope.on(Constants.EVENT.USER.CHANGED, updateUser);
			console.log($rootScope, $rootScope.on);
		};

		var checkUser = function() {
			return user.firstName &&
						 user.github &&
						 user.twitter &&
						 user.hasOwnProperty(access) &&
						 user.hasOwnProperty(logOut);
		};

		var getUser = function() {
			var user = {};
			try {
				if (window.localStorage) {
					user = window.localStorage.getItem("LnkUser");
				} else {
					user = $cookies.getObject("LnkUser");
				}

				if (!user.firstName) {
					return false;
				} else {
					return user;
				}
			} catch (e) {
				console.log("browser doesn't have local storage? ", e);
				return false;
			}
		};

		var setUser = function(user) {
			if (checkUser(user)) {
				try {
					
					if (window.localStorage) {
						window.localStorage.setItem("LnkUser", user);
					} else {
						$cookies.putObject("LnkUser", user);
					}
					
					var savedUser = new Promise(function(resolve, reject) {	
						var requestUrl = "/users";
						
						DataService.post(requestUrl, user).then(function(success) {
							return resolve(true);
							// console.log(success);
						}).catch(function(err) {
							return reject(err);
							// console.log(err);
						});
					});

					// return the result of getting the user,
					// so that we can be sure it got set correctly
					return savedUser && getUser("LnkUser");

				} catch (e) {
					console.log("browser doesn't have local storage? ", e);
					return false;
				}
			} else {
				console.log("Invalid user object passed to setUser");
				return false;
			}
		};

		var updateUser = function(user) {
			if (checkUser(user)) { // it's a valid user object
				if (setUser(user)) {
					// re-use the same event, which leads to this method -
					// this will trigger it to do nothing, but allow other
					// systems to react to the change.
					$rootScope.broadcast(Constants.EVENT.USER.CHANGED, true);
				}
			} else {
				return false;
			}
		};

		return {
			init: init
		};

}]);
