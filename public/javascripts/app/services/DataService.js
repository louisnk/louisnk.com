LnkAPP.factory("DataService", ["$http", "CacheingService", "Constants", 
	function($http, CacheingService, Constants) {

	var STATE = Constants.STATE;

	var makeRequestString = function(req, params) {
		var url = "./DataService";

		switch (req) {
			case STATE.PROJECT:
				url += "/projects?id=" + 
						params.ids && params.ids.length > 0 ? 
						params.ids.join(",") : "all";
				break; 

			case STATE.CODE:
				url += "/code";
				break;

			case STATE.ART:
				url += "/art";
				break;

			default:
				url += "/home";
				break;
		}

		return url;
	};

	var get = function(what, params, callback) {
		params = params || false;
		callback = typeof params === "function" ? params : callback;

		var req = "";

		switch (what) {
			case STATE.CODE:
				req = makeRequestString(STATE.CODE);
				break;
			default:
				req = makeRequestString(STATE.HOME);
				break;
		}

		var existingData = CacheingService.getFromRegistry(what);

		if (!existingData) {
			$http.get(makeRequestString(what, params))
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