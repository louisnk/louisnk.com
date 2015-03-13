LnkAPP.factory("DataService", ["$http", "$cacheFactory", "UtilitiesService", "Constants", 
	function($http, $cacheFactory, UtilitiesService, Constants) {

	var STATE = Constants.STATE;
	var Cache = $cacheFactory("LnkCache");

	var get = function(what, params, callback) {
		if (typeof params === "function") {
			callback = params;
			params = {};
		}

		var requestUrl = "./models";


		params.details = UtilitiesService.getUserDetails();

		switch (what) {
			case STATE.CODE:
				requestUrl += "/code";
				break;

			case STATE.LIFE:
				requestUrl += "/life";
				break;
				
			default:
				requestUrl += "/home";
				break;
		}

		var existingData = Cache.get(what);

		if (!existingData) {
			$http.get(requestUrl, { params: params, cache: Cache })
				.success(function(data, status, headers, config) {
				 	Cache.put(what, data); 
				 	callback(data);
				})
				.error(function(data, status, headers, config) {
				 		new Error(data, status);
				});
		} else {
			return callback(existingData);
		}
	};

	var post = function(what, data) {
		// TODO: Do I need to post anything?
		console.log(what, data);
	};

	return {
		get: get,
		post: post
	};

}]);
