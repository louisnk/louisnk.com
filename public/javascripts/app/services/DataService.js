APP.factory("DataService", ["$http", "CacheingService", "Constants", 
	function($http, CacheingService, Constants) {

	var REQUESTS = Constants.REQUESTS;
	var STATES = Constants.STATE;

	var makeRequestString = function(req, params) {
		var url = "./DataService";
		switch (req) {
			case REQUESTS.PROJECT:
				url += "/projects?id=" + params.ids.join(",");
				break; 

			case REQUESTS.CODE:
				url += "/code";
				break;
		}

		return url;
	};

	// TODO: Make back-end for this to actually GET the data.

	var get = function(what, params, callback) {
		params = params || false;
		callback = typeof params === "function" ? params : callback;
		
		var req = "";

		switch (what) {
			case STATES.CODE:
				req = makeRequestString(REQUESTS.CODE);
				break;
			default:
				req = makeRequestString(REQUESTS.HOME);
				break;
		}

		var existingData = CacheingService.getFromRegistry(req);

		if (!existingData) {
			$http.get(makeRequestString(what, params))
				 .success(function(data, status, headers, config) {
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
		console.log(what, data);
	};


	return {
		get: get,
		post: post
	};

}]);