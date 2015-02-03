LnkAPP.factory("DataService", ["$http", "CacheingService", "UtilitiesService", "Constants", 
	function($http, CacheingService, UtilitiesService, Constants) {

	var STATE = Constants.STATE;

	var makeRequestString = function(request, params) {
		var url = "./DataService";

		var appendParams = function(params) {
			if (typeof params === "object" && Object.keys(params).length) {
				var query = "?";
				var keys = Object.keys(params);

				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					if (typeof params[key] === "object") {

						var subKeys = Object.keys(params[key]);
						for (var j = 0; j < subKeys.length; j++) {
							var sub = subKeys[j];
							query += sub + "=" + params[key][sub];
							query += j < subKeys.length - 1 ? "&" : "";
						}
					} else {
						query += key + "=" + params[key];						
					}
					query += i < keys.length -1 ? "&" : "";
				}

				return query;
			}
		};

		switch (request) {
			case STATE.PROJECT:
				url += "/projects?id=" + 
						params.ids && params.ids.length > 0 ? 
						params.ids.join(",") : "all";
				break; 

			case STATE.CODE:
				url += "/code";
				if (params) {
					url += appendParams(params);
				}
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
		if (typeof params === "function") {
			callback = params;
			params = {};
		}

		var request = "";

		params.location = UtilitiesService.getUserDetails();

		switch (what) {
			case STATE.CODE:
				request = makeRequestString(STATE.CODE, params);
				break;
			default:
				request = makeRequestString(STATE.HOME, params);
				break;
		}

		var existingData = CacheingService.getFromRegistry(what);

		if (!existingData) {
			$http.get(request)
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