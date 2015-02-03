LnkAPP.factory("DataService", ["$http", "CacheingService", "UtilitiesService", "Constants", 
	function($http, CacheingService, UtilitiesService, Constants) {

	var STATE = Constants.STATE;

	var get = function(what, params, callback) {
		if (typeof params === "function") {
			callback = params;
			params = {};
		}

		var requestUrl = "./DataService";

		params.location = UtilitiesService.getUserDetails();

		switch (what) {
			case STATE.CODE:
				requestUrl += "/code";
				break;
			default:
				requestUrl += "/home";
				break;
		}

		var existingData = CacheingService.getFromRegistry(what);

		if (!existingData) {
			$http.get(requestUrl, { params: params })
				 .success(function(data, status, headers, config) {
				 	CacheingService.register(what, data);
				 	callback(data);
				 })
				 .error(function(data, status, headers, config) {
				 	console.log(data, status);
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