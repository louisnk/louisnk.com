APP.factory("CacheingService", [function() {

	var register = function(request, data) {
		// TODO: create cache-registry, fill this in
		console.log(request, data);
	};

	var remove = function(request) {
		// TODO: create cache-removal
	};

	var getFromRegistry = function(request, data) {
		// TODO: return data, or false
		return false;
	};

	return {
		getFromRegistry: getFromRegistry,
		register: 	register,
		remove: 	remove
	};
}]);